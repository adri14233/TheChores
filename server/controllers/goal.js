"use-strict";

const goalModel = require("../models/goal");

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

module.exports = postGoal;
