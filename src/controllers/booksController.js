import books from '../models/Book.js';

class BookController {

    static listBooks = (req, res) => {
        books.find()
            .populate('author')
            .exec((err, books) => {
            res.status(200).json(books)
        })
    }
    
    static listByIdBook = (req, res) => {
        const id = req.params.id;

        books.findById(id)
            .populate('author', 'name') 
            .exec((err, books) => {
            if (err) {
                res.status(400).send({ message: `${err.message} - Book id not found` })
            } else {
                res.status(200).send(books);
            }
        })
    }

    static createBook = (req, res) => {
        let book = new books(req.body);

        book.save((err) =>{
            
            if (err) {
                res.status(500).send({ message: `${err.message} - failed to register book` })
            } else {
                res.status(201).send(book.toJSON())
            }
        })
    }

    static updateBook = (req, res) => {
        const id = req.params.id;

        books.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Book successfully updated' });
            } else {
                res.status(500).send({ message: err.message });
            }
        })
    }

    static deleteBook = (req, res) => {
        const id = req.params.id;

        books.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Book successfully removed' });
            } else {
                res.status(500).send({ message: err.message });
            }
        })
    }

    static listByPublishingCompany = (req, res) => {
        const publishing_company = req.query.publishing_company;

        books.find({ 'publishing_company': publishing_company }, {}, (err, books) => {
            res.status(200).send(books);
        });
    }
}

export default BookController;