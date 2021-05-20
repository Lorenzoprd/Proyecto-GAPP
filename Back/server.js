require('dotenv').config();
// const path = require('path');
// const fs = require('fs');

const express = require('express');

// const multer = require('multer');

const {
  usersController,
  questionsController,
  answersController,
  commentsController,
  scoresController,
} = require('./Controllers/index');

const { validateAuthorization } = require('./Middlewares/validate_auth');

const { PORT } = process.env;
const app = express();
app.use(express.json());

//User
app.post('/api/users/register', usersController.register);
app.post('/api/users/login', usersController.login);
app.get(
  '/api/users/:id_user',
  validateAuthorization,
  usersController.getUserById
);
app.put('/api/users', validateAuthorization, usersController.updateUser);
app.delete(
  '/api/users/:id_user',
  validateAuthorization,
  usersController.deleteUser
);
app.get('/api/users/validate/:validateCode', usersController.validateUser);
// app.put('/api/users/cambiar_contraseña', );

//Questions
app.post(
  '/api/questions/',
  validateAuthorization,
  questionsController.createQuestion
);
app.get(
  '/api/questions/:id_question',
  validateAuthorization,
  questionsController.getQuestionById
);
app.put(
  '/api/questions/:id_question',
  validateAuthorization,
  questionsController.acceptAnswer
);
app.delete(
  '/api/questions/:id_question',
  validateAuthorization,
  questionsController.removeQuestion
);

//Answers
app.post(
  '/api/answers/:id_question',
  validateAuthorization,
  answersController.createAnswer
);
app.delete(
  '/api/answers/:id_answer',
  validateAuthorization,
  answersController.removeAnswer
);

//Comments
app.post(
  '/api/comments/:id_answer_father',
  validateAuthorization,
  commentsController.createComment
);

app.delete(
  '/api/comments/:id_comment',
  validateAuthorization,
  commentsController.removeComment
);

// Score;
app.post(
  '/api/score/question/:id_question',
  validateAuthorization,
  scoresController.voteQuestion
);

app.post(
  '/api/score/answer/:id_answer',
  validateAuthorization,
  scoresController.voteAnswer
);

app.post(
  '/api/score/comment/:id_answer',
  validateAuthorization,
  scoresController.voteComment
);

app.use(async (err, req, res) => {
  const status = err.isJoi ? 400 : err.code || 500;
  res.status(status);
  res.send({ error: err.message });
});

app.listen(PORT, () => console.log(`Gapp-API listening at port ${PORT}`));
