'use-strict';

const groupModel = require('../models/group');
const { auth } = require('../utils/auth');

const postGroup = async (ctx) => {
  const decodedToken = auth(ctx);

  if (decodedToken) {
    // Check if the group already exists
    const groups = await groupModel.find();

    if (groups.filter(group => group.name === ctx.request.body.name).length !== 0) {
      ctx.status = 200;
      ctx.set('Content-Type', 'text/plain');
      ctx.body = 'Group already exists!';
    } else {
      try {
        let body = ctx.request.body;
        if (body.name === '') throw new Error();

        // Saving new group to DB
        const newGroup = new groupModel(body);
        await newGroup.save();
        ctx.body = `Group succesfully created! \n ${JSON.stringify(body)}`;
      } catch (err) {
        ctx.status = 400;
        ctx.body = { err: JSON.stringify(err.message), message: 'Could not create group,' };
      }
    }
  }
};

const postUserToGroup = async (ctx) => {
  const decodedToken = auth(ctx);

  if (decodedToken) {
    try {
      if (ctx.params.groupId === '') throw new Error();

      const group = await groupModel.findById(ctx.params.groupId);
      group.members.push(decodedToken.userId);
      await groupModel.findByIdAndUpdate(ctx.params.groupId, {members: group.members});
      ctx.body = `User \n ${decodedToken.userId}\n succesfully added to Group \n ${ctx.params.groupId}`;
    } catch (err) {
      ctx.status = 400;
      ctx.body = { err: JSON.stringify(err.message), message: 'Could not create group,' };
    }
  }

  // const decodedToken = auth(ctx);

  // if (decodedToken) {
  //   // Check if the user is already within the group
  //   const groups = await groupModel.find();
  //   const group = groups.filter(group => group._id === ctx.params.groupId);

  //   if (group.length) {
  //     if (group.members.filter(member => member === ctx.params.userID).length) {
  //       ctx.status = 200;
  //       ctx.set('Content-Type', 'text/plain');
  //       ctx.body = 'Group already exists!';
  //     }
  //   } else {
  //     try {
  //       if (ctx.params.groupId === '' | ctx.params.userId === '') throw new Error();

  //       const group = await groupModel.findById(ctx.params.groupId);
  //       group.members.push(ctx.params.userId);
  //       await groupModel.findByIdAndUpdate(ctx.params.groupId, {members: group.members});
  //       ctx.body = `User \n ${ctx.params.userId}\n succesfully added to Group \n ${ctx.params.groupId}`;
  //     } catch (err) {
  //       ctx.status = 400;
  //       ctx.body = { err: JSON.stringify(err.message), message: 'Could not create group,' };
  //     }
  //   }
  // }
};

const getGroup = async (ctx) => {
  const decodedToken = auth(ctx);

  if (decodedToken) {
    try {
      const group = await groupModel.findById(ctx.params.id);
      ctx.body = JSON.stringify(group);
    } catch (err) {
      ctx.status = 400;
      ctx.body = { err: JSON.stringify(err.message), message: 'Could not retrieve group by such id.' };
    }
  }
};

const getGroups = async (ctx) => {
  const decodedToken = auth(ctx);

  if (decodedToken) {
    try {
      let groups = await groupModel.find();
      console.log(groups)
      // groups = groups.filter(group => group.members.includes(decodedToken.userId));
      ctx.body = JSON.stringify(groups);
    } catch (err) {
      ctx.status = 400;
      ctx.body = { err: JSON.stringify(err.message), message: 'Could not retrieve all groups.' };
    }
  }
};

module.exports = { postGroup, getGroups, getGroup, postUserToGroup };