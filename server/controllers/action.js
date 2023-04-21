'use-strict';

const actionModel = require('../models/action');

const postAction = async (ctx) => {
  try {
    let body = ctx.request.body;
    if (body.time === '' | body.user === '' | body.group === '' | body.chore === '') throw new Error();

    // Saving new actioon to DB
    const newAction = new actionModel(body);
    await newAction.save();
    ctx.body = `Action succesfully saved! \n ${JSON.stringify(body)}`;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { err: JSON.stringify(err.message), message: 'Could not save action.' };
  }
};

const getAction = async (ctx) => {
  try {
    const action = await actionModel.findById(ctx.params.id);
    ctx.body = JSON.stringify(action);
  } catch (err) {
    ctx.status = 400;
    ctx.body = { err: JSON.stringify(err.message), message: 'Could not retrieve action by such id.' };
  }
};

const getActions = async (ctx) => {
  try {
    const actions = await actionModel.find();
    ctx.body = JSON.stringify(actions);
  } catch (err) {
    ctx.status = 400;
    ctx.body = { err: JSON.stringify(err.message), message: 'Could not retrieve all actions.' };
  }
};

const getUserActions = async (ctx) => {
  try {
    const actions = getActions(ctx);
    ctx.body =  JSON.stringify(actions.filter(action => action.user === ctx.params.id));
  } catch (err) {
    ctx.status = 400;
    ctx.body = { err: JSON.stringify(err.message), message: 'Could not retrieve all user actions.' };
  }
};

const getUserActionsInGroup = async (ctx) => {
  try {
    const actions = getActions(ctx);
    ctx.body =  JSON.stringify(actions.filter(action => action.user === ctx.params.userId).filter(action => action.group === ctx.params.groupId));
  } catch (err) {
    ctx.status = 400;
    ctx.body = { err: JSON.stringify(err.message), message: 'Could not retrieve user actions in that group.' };
  }
};

module.exports = { postAction, getAction, getActions, getUserActions, getUserActionsInGroup };