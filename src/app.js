import express from "express";
import db from "./config/dbConnect.js";

db.on("error", console.log.bind(console, 'Connection error'))
db.once("open", () => {
    console.log('Database connection successful')
})

const app = express();

app.use(express.json());

const books = [
    { id: 1, "title": "Harry Potter" },
    { id: 2, "title": "Parcy Jackson" }
]

app.get('/', (req, res) => {
    res.status(200).send('Crud library');
})

app.get('/books', (req, res) => {
    res.status(200).json(books);
})

app.get('/books/:id', (req, res) => {
    let index = searchBook(req.params.id);
    res.json(books[index]);
})

app.post('/books', (req, res) => {
    books.push(req.body);
    res.status(201).send('registered book')
})

app.put('/books/:id', (req, res) => {
    let index = searchBook(req.params.id);
    books[index].title = req.body.title;
    res.json(books);
})

app.delete('/books/:id', (req, res) => {
    let { id } = req.params;
    let index = searchBook(id);
    books.splice(index, 1);
    res.send(`Book ${id} removed`);
})

function searchBook(id) {
    return books.findIndex(book => book.id == id)
}

export default app;