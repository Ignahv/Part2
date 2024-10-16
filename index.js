const http = require('http')
const express = require('express')
const app = express()
app.use(express.json())

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.get('/', (request, response) => {
    response.send('<h1>a</h1>')
})

app.get('/api/notes',(request, response) =>{
    response.json(notes)
}) 

app.post('/api/notes', (request, response) => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id)) 
      : 0
  
    const note = request.body
    note.id = maxId + 1
  
    notes = notes.concat(note)
  
    response.json(note)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    
  
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

