const router = require('express').Router();
const db = require('../config/mysql');

router.get('/', async (req, res) => {

    try {
        const GET_BOOKS_QUERY = `SELECT * FROM books`;
        const [ books ] = await db.query(GET_BOOKS_QUERY);

        res.send({ success: true, books });
    } catch(err) {
        return res.send({ success: false, message: err.message });
    }
});

router.post('/add', async (req, res) => {

    const { title, description, authorId } = req.body;

    try {
        const ADD_BOOK_QUERY = `INSERT INTO books(book_title, book_description, book_author) 
            VALUES ("${title}", "${description}", ${authorId})`;
        
        await db.query(ADD_BOOK_QUERY);

        res.send({ success: true, message: 'Book added succesfully' });
    } catch(err) {
        return res.send({ success: false, message: err.message });
    }
});

router.post('/edit/:bookId', async (req, res) => {

    const { bookId } = req.params;
    const { title, description, authorId } = req.body;

    try {
        const EDIT_BOOK_QUERY = `UPDATE books
            SET book_title="${title}", book_description="${description}", book_author=${authorId}
            WHERE book_id=${bookId}`;

        await db.query(EDIT_BOOK_QUERY);

        res.send({ success: true, message: 'Book details updated successfully' });
    } catch(err) {
        res.send({ success: false, message: err.message });
    }
});

router.get('/delete/:bookId', async (req, res) => {
    const { bookId } = req.params;

    try {
        const DELETE_BOOK_QUERY = `DELETE FROM books WHERE book_id=${bookId}`;
        await db.query(DELETE_BOOK_QUERY);

        res.send({ success: true, message: 'Book deleted successfully' });
    } catch(err) {
        res.send({ success: false, message: err.message });
    }
})



module.exports = router;