const Joi = require('joi');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const { userRepository, commentsRepository } = require('../Repositories/index');

async function createComment(req, res, next) {
  try {
    const { id } = req.auth;
    const { id_answer_father } = req.params;
    const { body } = req.body;
    const id_question = await commentsRepository.findQuestionByAnswerId(
      id_answer_father
    );

    const schema = Joi.object({
      body: Joi.string().max(1000).required(),
    });
    await schema.validateAsync({ body });

    const comment = await commentsRepository.addComment(
      body,
      id_question,
      id,
      id_answer_father
    );

    const user = await userRepository.findUserById(id);

    res.status(201);
    res.send({
      id_answer: comment[0].id_answer,
      body: comment[0].body,
      name_user: user.name_user,
      id_answer_father: comment[0].id_answer_father,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createComment,
};