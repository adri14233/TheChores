'use-strict';

const groupModel = require('../models/group');

const postGroup = async (ctx) => {
  // Check if the group already exists
  const groups = await groupModel.find();

  if (groups.filter(group => group.name === ctx.request.body.name).length !== 0) {
    ctx.status = 200;
    ctx.body = { message: 'Group already exists!' };
  } else {
    try {
      let body = ctx.request.body;
      if (body.name === '') throw new Error();
      // Saving new group to DB
      const newGroup = new groupModel(body);
      await newGroup.save();
      ctx.body = { message: `Group succesfully created! \n ${JSON.stringify(body)}` };
    } catch (err) {
      ctx.status = 400;
      ctx.body = { message: 'Could not create group!' };
    }
  }
};

const postUserToGroup = async (ctx) => {
  const decodedToken = ctx.decodedToken;

  try {
    const groups = await groupModel.find();
    let group = groups.filter(group => group.name === ctx.request.body.name);

    if (ctx.request.body.name === '' | group.length === 0) throw new Error('Group does not exist!');

    group = group[0];
    if (group.members.includes(decodedToken.userId)) throw new Error('User already in group!');

    group.members.push(decodedToken.userId);
    await groupModel.findByIdAndUpdate(group._id, {members: group.members});
    ctx.body = { message: `User \n ${decodedToken.userId}\n succesfully added to Group \n ${ctx.request.body.name}` };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { message: JSON.stringify(err.message) };
  }
};

const getGroup = async (ctx) => {
  try {
    const group = await groupModel.findById(ctx.params.id);
    ctx.body = { message: JSON.stringify(group) };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { message: 'Could not retrieve group by such id.' };
  }
};

const getGroups = async (ctx) => {
  const decodedToken = ctx.decodedToken;
  
  try {
    let groups = await groupModel.find();
    groups = groups.filter(group => group.members.includes(decodedToken.userId));
    ctx.body = { message: JSON.stringify(groups) };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { message: 'Could not retrieve all groups.' };
  }
};

module.exports = { postGroup, getGroups, getGroup, postUserToGroup };