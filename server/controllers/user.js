'use-strict';

const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const SECURE = require('../SECURE');

const postUser = async (ctx) => {
  // Check if the user already exists
  const users = await userModel.find();

  if (users.filter(user => user.email === ctx.request.body.email).length !== 0) {
    ctx.status = 200;
    ctx.body = { message: 'User already exists!' };
  } else {
    try {
      let body = ctx.request.body;
      if (body.password === '') throw new Error();

      // Password hashing
      const hash = await bcrypt.hash(body.password, saltRounds);

      // Saving new user to DB
      const newUser = new userModel({ ...body, password: hash });
      await newUser.save();
      ctx.body = { message: `User succesfully created! \n ${body}` };
    } catch (err) {
      ctx.status = 400;
      ctx.body = { message: 'Could not create user' };
    }
  }
};

const getUser = async (ctx) => {
  try {
    const user = await userModel.findById(ctx.params.id);
    ctx.body = user;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { err: JSON.stringify(err.message), message: 'Could not retrieve user by such id.' };
  }
};

const getUsers = async (ctx) => {
  try {
    const users = await userModel.find();
    ctx.body = { message: JSON.stringify(users) };
    console.log(ctx.body)
  } catch (err) {
    ctx.status = 400;
    ctx.body = { message: 'Could not retrieve all users.' };
  }
};

const checkUserExist = async (username) => {
  try {
    const users = await userModel.find();
    
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === username) return users[i];
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = { err: JSON.stringify(err.message), message: 'Could not retrieve all users.' };
  }
};

const postUserLogin = async (ctx) => {
  const { username, password } = ctx.request.body;

  // Verify the username and password against the database
  const user = await checkUserExist(username);
  if (user && await bcrypt.compare(password, user.password)) {
    // User is authenticated, generate a JWT with their user ID
    const token = jwt.sign({ userId: user._id }, SECURE.JWT_SECRET);
    ctx.body = { token };
  } else {
    // User is not authenticated, return 401 Unauthorized
    ctx.status = 401;
    ctx.body = { message: 'Invalid username or password' };
  }
}

module.exports = { postUser, getUsers, getUser, checkUserExist, postUserLogin };