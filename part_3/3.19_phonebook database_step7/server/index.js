require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

morgan.token('data', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status  :res[content-length] - :response-time ms :data'))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

// ----------------------------------------

const home = `<h1>Hello World!</h1><h3>This is Phonebook App (exercise 3.19)</h3>`

// Show info page
app.get('/info', (request, response) => {
    console.log('GET request: /info')
    Person.find({}).then(persons => {
        response.send(`
        <h2>Phonebook Info</h2>
        <p>Phonebook contains info for <strong>${persons.length} people.</strong></p>
        <p>Date: ${new Date()}</p>
        `)
    })
})

// ---- DATABASE OPERATIONS ---------------

// Fetch and show all persons
app.get('/api/persons', (request, response) => {
    console.log('GET request: /api/persons')
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
        .catch((error) => {
            console.log(error)
        })
})

// Fetch and show a person
app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person.toJSON());
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
});
  

// Add a person
app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    else if (body.number === undefined) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => {
            console.log("Error adding a person:", error.message.error)
            next(error)
        })
})

// Delete a person
app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end();
        })
        .catch(error => next(error))
})

// Update a person
app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body;
  
    const person = {
        name: body.name,
        number: body.number
    };
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson);
        })
        .catch(error => next(error))
});
  

// ---- ERROR HANDLING --------------------

const unknownEndpoint = (request, response) => {
    response.status(404)
        .send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
        return response.status(400)
            .send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400)
            .send({error: error.message})
    }
  
    next(error)
}

app.use(errorHandler)

// ----------------------------------------

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})