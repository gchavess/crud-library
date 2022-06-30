import express from "express";

const app = express();

const books = [
    {id: 1, "title": "Harry Potter"},
    {id: 2, "title": "Parcy Jackson"}
]

app.get('/', (req, res) => {
    res.status(200).send('Crud library');
})

app.get('/books', (req, res) => {
    res.status(200).json(books);
})

export default app;