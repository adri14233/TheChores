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

module.exports = { postGoal, getGoals };
