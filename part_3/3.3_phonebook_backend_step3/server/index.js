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

const home = `<h1>Hello World!</h1><h3>This is exercise 3.3</h3>`

// Show homepage
app.get('/', (request, response) => {
    //console.log('GET request: /')
    response.send(home)
})

// Show info page
app.get('/info', (request, response) => {
    //console.log('GET request: /info')
    const info = `<p>Phonebook has info for ${persons.length} people.</p>
    <p>${new Date()}</p>`

    response.send(info)
})

// Fetch and show all persons
app.get('/api/persons', (request, response) => {
    //console.log('GET request: /api/persons')
    response.json(persons)
})

//Fetch and show a person
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    //console.log('GET request: /api/persons/', id)

    if (person) {
        //console.log('200 SUCCESS')
        const person_info = `<p><strong>${person.name}</strong><br/>
        ${person.number}</p>`
        response.send(person_info)
    }
    else {
        //console.log('400 NOT FOUND')
        const error_404 = `<p><strong>404</strong><br>"This is not the person you are looking for ..."</p>`
        response.status(404)
        response.send(error_404).end()
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})