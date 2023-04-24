'use-strict';

const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { auth } = require('../utils/auth');

const postUser = async (ctx) => {
  // Check if the user already exists
  const users = await userModel.find();

  if (users.filter(user => user.email === ctx.request.body.email).length !== 0) {
    ctx.status = 200;
    ctx.set('Content-Type', 'text/plain');
    ctx.body = 'User already exists!';
  } else {
    try {
      let body = ctx.request.body;
      if (body.password === '') throw new Error();

      // Password hashing
      const hash = await bcrypt.hash(body.password, saltRounds);

      // Saving new user to DB
      const newUser = new userModel({ ...body, password: hash });
      await newUser.save();
      ctx.body = `User succesfully created! \n ${body}`;
    } catch (err) {
      ctx.status = 400;
      ctx.body = { err: JSON.stringify(err.message), message: 'Could not create user' };
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
    ctx.body = users;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { err: JSON.stringify(err.message), message: 'Could not retrieve all users.' };
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

module.exports = { postUser, getUsers, getUser, checkUserExist };