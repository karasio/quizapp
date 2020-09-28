console.log('Starting server...')

require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const User = require('./models/user.js')

morgan.token('post', function (req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

app.get('/info', (req, res) => {
  User.count({}, function (err, count) {
    res.send(
      '<div>Phone book has info for ' + count + ' people</div>' +
      '<div>' + new Date(Date.now()).toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' }) + '</div>'
    )
  })

})


app.get('/api/users', (req, res) => {
  User.find({}).then(users => {
    res.json(users.map(person => person.toJSON()))
  })
})

app.get('/api/users/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        console.log('No content found with given ID ', req.params.id)
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/users/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(result => {
      console.log('User found and deleted with ID ', req.params.id, result)
      res.status(204).end()
    }).catch(error => next(error))
})

app.put('/api/users/:id', (req, res) => {
  const body = req.body

  const user = {
    username: body.username,
    pwHash: body.pwHash,
    highScore: body.highScore
  }

  User.findByIdAndUpdate(req.params.id, user, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(() => res.status(404).send({ error: 'Unknown endpoint' }))
})

app.post('/api/users', (req, res, next) => {
  const body = req.body

  const user = new User({
    username: body.username,
    pwHash: body.pwHash,
    highScore: body.highScore
  })

  console.log('Attempt to POST: ', user)

  user.save().then(savedUser => {
    res.json(savedUser.toJSON())
  }).catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log('Catched by errorhandler:\n' + error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
