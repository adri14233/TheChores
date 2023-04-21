'use-strict';

const choreModel = require('../models/chore');
const { auth } = require('../utils/auth');

const postChore = async (ctx) => {
  if (auth(ctx)) {
    // Check if the chore already exists
    const chores = await choreModel.find();

    if (chores.filter(chore => chore.name === ctx.request.body.name).length !== 0) {
      ctx.status = 200;
      ctx.set('Content-Type', 'text/plain');
      ctx.body = 'Chore already exists!';
    } else {
      try {
        let body = ctx.request.body;
        if (body.name === '') throw new Error();

        // Saving new chore to DB
        const newChore = new choreModel(body);
        await newChore.save();
        ctx.body = `Chore succesfully created! \n ${JSON.stringify(body)}`;
      } catch (err) {
        ctx.status = 400;
        ctx.body = { err: JSON.stringify(err.message), message: 'Could not create chore,' };
      }
  }
  }
};

const getChore = async (ctx) => {
  if (auth(ctx)) {
    try {
      const chore = await choreModel.findById(ctx.params.id);
      ctx.body = JSON.stringify(chore);
    } catch (err) {
      ctx.status = 400;
      ctx.body = { err: JSON.stringify(err.message), message: 'Could not retrieve chore by such id.' };
    }
  }
};

const getChores = async (ctx) => {
  if(auth(ctx)) {
    try {
      const chores = await choreModel.find();
      ctx.body = JSON.stringify(chores);
    } catch (err) {
      ctx.status = 400;
      ctx.body = { err: JSON.stringify(err.message), message: 'Could not retrieve all chores.' };
    }
  }
};

module.exports = { postChore, getChore, getChores };