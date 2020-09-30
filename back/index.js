console.log('Starting server...');

require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const User = require('./models/user.js');

morgan.token('post', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'));
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors());

app.get('/info', (req, res) => {
  User.count({}, (err, count) => {
    res.send(
      `<div>Phone book has info for ${count} people</div>`
      + `<div>${new Date(Date.now()).toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })}</div>`,
    );
  });
});

app.get('/api/users', (req, res) => {
  User.find({}).then((users) => {
    res.json(users.map((person) => person.toJSON()));
  });
});

app.get('/api/users/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person.toJSON());
      } else {
        console.log('No content found with given ID ', req.params.id);
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/users/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then((result) => {
      console.log('User found and deleted with ID ', req.params.id, result);
      res.status(204).end();
    }).catch((error) => next(error));
});

app.put('/api/users/:id', (req, res) => {
  const { body } = req;

  const user = {
    username: body.username,
    pwHash: body.pwHash,
    highScore: body.highScore,
  };

  User.findByIdAndUpdate(req.params.id, user, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson.toJSON());
    })
    .catch(() => res.status(404).send({ error: 'Unknown endpoint' }));
});

/**
 * POST request for adding a user to database
 * Uses bcrypt to encrypt user password and password hash is saved to database
 * response: added user as json or status 401 if password is too short
 */
app.post('/api/users', async (req, res, next) => {
  const { body } = req;

  const saltRounds = 10;
  const pwHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    highScore: body.highScore,
    pwHash,
  });

  console.log('Attempt to POST: ', user);

  user.save().then((savedUser) => {
    res.json(savedUser.toJSON());
  }).catch((error) => next(error));
});

/**
 * POST request to log user in
 * check password with Bcrypt
 * response: if invalid username or password: status 401
 * else status 200 & user token, username, name and defaultCity (if not undefined)
 */

/* POSTMANISSA TOIMIVA
app.post('/api/login', async (request, response) => {
  const { body } = request;
  //  console.log('controllers/login.js', body);

  const user = await User.findOne({ username: body.username });
  //  console.log('ctrl login.js', user);
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.pwHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  //  console.log('tokeni', token);

  response
    .status(200)
    .send({ token, username: user.username });
});
 */

app.post('/api/login', async (request, response) => {
  const { body } = request;
  console.log('controllers/login.js', body);

  const user = await User.findOne({ username: body.username });
  console.log('index.js 137', user);
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.pwHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  //  console.log('tokeni', token);

  response
    .status(200)
    .send({ token, username: user.username, highScore: user.highScore });
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log(`Catched by errorhandler:\n${error.message}`);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
