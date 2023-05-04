"use-strict";

const goalModel = require("../models/goal");
const {auth} = require('../utils/auth')

const postGoal = async (ctx) => {
  try {
    const body = ctx.request.body;
    const newGoal = new goalModel(body);
    await newGoal.save();
    ctx.body = {
      message: `Goal succesfully created! \n ${JSON.stringify(body)}`,
    };
    ctx.status = 201;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: `Could not create goal!` };
  }
};

const getGoals = async (ctx) => {
  console.log(auth(ctx))
  const decodedToken = auth(ctx);

  if (decodedToken) {
    try {
      let goals = await goalModel.find();
      goals = goals.filter((goal) => goal.member === (decodedToken.userId));
      ctx.body = { message: JSON.stringify(goals) };
      ctx.status = 200;
    } catch (error) {
      ctx.status = 400;
      ctx.body = { message: "Could not retrieve all goals." };
    }
  }
};

const postUserToGoal = async (ctx) => {
  const decodedToken = auth(ctx);

  if (decodedToken) {
    try {
      const goals = await goalModel.find();
      let goal = goals.filter(goal => goal.name === ctx.request.body.name);

      if (ctx.request.body.name === '' | goal.length === 0) throw new Error('Goal does not exist!');

      goal = goal[0];
      if (goal.member === decodedToken.userId) throw new Error('Goal already assigned to user!');

      goal.member = decodedToken.userId;
      await goalModel.findByIdAndUpdate(goal._id, {member: goal.member});
      ctx.body = { message: `User \n ${decodedToken.userId}\n succesfully added to Goal \n ${ctx.request.body.name}` };
    } catch (err) {
      ctx.status = 400;
      ctx.body = { message: JSON.stringify(err.message)};
    }
  }
}

module.exports = { postGoal, getGoals };
