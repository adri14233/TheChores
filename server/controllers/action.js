'use-strict';

const actionModel = require('../models/action');

const postAction = async (ctx) => {
  ctx.decodedToken = decodedToken;

  try {
    let body = ctx.request.body;
    if (!body.time | !body.user | !body.group | !body.chore | !body.value) throw new Error();

    // Saving new actioon to DB
    body.user = decodedToken.userId;
    const newAction = new actionModel(body);
    await newAction.save();
    ctx.body = { message: `Action succesfully saved! \n ${JSON.stringify(ctx.request.body)}` };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { message: JSON.stringify(err.message) };
  }
};

const getAction = async (ctx) => {
  try {
    const action = await actionModel.findById(ctx.params.id);
    ctx.body = JSON.stringify(action);
    ctx.body = { message: JSON.stringify(action) };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { message: 'Could not retrieve action by such id.' };
  }
};

const getActions = async (ctx) => {
  try {
    const actions = await actionModel.find();
    ctx.body = { message: JSON.stringify(actions) };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { message: 'Could not retrieve all actions.' };
  }
};

const getUserActions = async (ctx) => {
  try {
    const actions = getActions(ctx);
    ctx.body = { message: JSON.stringify(actions.filter(action => action.user === ctx.params.id)) };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { message: 'Could not retrieve all user actions.' };
  }
};

const getUserActionsInGroup = async (ctx) => {
  try {
    const actions = getActions(ctx);
    ctx.body = { message: JSON.stringify(actions.filter(action => action.user === ctx.params.id)) };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { message: 'Could not retrieve user actions in that group.' };
  }
};

module.exports = { postAction, getAction, getActions, getUserActions, getUserActionsInGroup };