const express = require('express')
const app = express()

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
]

const home = `<h1>Hello World!</h1><h3>This is exercise 3.2</h3>`

// Show homepage
app.get('/', (request, response) => {
    console.log('GET request: /')
    response.send(home)
})

// Show info page
app.get('/info', (request, response) => {
    console.log('GET request: /info')
    const info = `<p>Phonebook has info for ${persons.length} people.</p>
    <p>${new Date()}</p>`

    response.send(info)
})

// Fetch and show all persons
app.get('/api/persons', (request, response) => {
    console.log('GET request: /api/persons')
    response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})