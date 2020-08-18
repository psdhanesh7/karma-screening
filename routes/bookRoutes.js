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
})



module.exports = router;