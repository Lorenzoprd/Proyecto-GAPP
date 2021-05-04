require('dotenv').config();
const path = require('path');
const fs = require('fs');

const express = require('express');

// const multer = require('multer');

const { usersController } = require('./Controllers/index');

const { validateAuthorization } = require('./Middlewares/validate_auth');

const { PORT } = process.env;
const app = express();
app.use(express.json());

//User
app.post('/api/users/register', usersController.register);
app.post('/api/users/login', usersController.login);
app.get('/api/users/:id_user', validateAuthorization, usersController.getUserById);

app.use(async (err, req, res, next) => {
    const status = err.isJoi ? 400 : err.code || 500;
    res.status(status);
    res.send({ error: err.message });
});

app.listen(PORT, () => console.log(`Restaurant-API listening at port ${PORT}`));