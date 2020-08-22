const router = require('express').Router();
const db = require('../config/mysql');

router.get('/', async (req, res) => {

    try {
        const GET_AUTHORS_QUERY = 'SELECT * FROM  authors';
        const [ authors ] = await db.query(GET_AUTHORS_QUERY);

        res.send({ success: true, authors });
    } catch(err) {
        return res.send({ success: false, message: err.message });
    }
});

router.get('/:authorId', async (req, res) => {
    const { authorId } = req.params;

    try {
        const GET_AUTHOR_BY_ID_QUERY = `SELECT * FROM authors WHERE author_id = ${authorId}`;
        const [ donors ] = await db.query(GET_AUTHOR_BY_ID_QUERY);

        if(donors.length === 0) return res.send({ success: false, message: 'No donor with given id' });
        
        res.send({ success: true, donor: donors[0] });
    } catch(err) {
        return res.send({ success: false, message: err.message });
    }
})

router.post('/', async (req, res) => {
    const { name, description } = req.body;

    try {
        const ADD_AUTHOR_QUERY = `INSERT INTO authors (author_name, author_description) VALUES ("${name}", "${description}")`;
        await db.query(ADD_AUTHOR_QUERY);

        res.send({ success: true, message: 'Author added succesfully' });
    } catch(err) {  
        res.send({ success: false, message: err.message });
    }
});

router.put('/:authorId', async (req, res) => {
    const { authorId } = req.params;
    const { name, description } = req.body;

    try {
        const EDIT_AUTHOR_QUERY = `UPDATE authors 
            SET author_name="${name}", author_description="${description}"
            WHERE author_id=${authorId}`;

        await db.query(EDIT_AUTHOR_QUERY);

        res.send({ success: true, message: 'Author details updated successfully' });
    } catch(err) {
        return res.send({ success: false, message: err.message });
    }
});

router.delete('/:authorId', async (req, res) => {
    const { authorId } = req.params;

    try {
        const DELETE_AUTHOR_QUERY = `DELETE FROM authors WHERE author_id=${authorId}`;
        await db.query(DELETE_AUTHOR_QUERY);
        
        return res.send({ success: true, message: 'Author deleted successfully' });
    } catch(err) {
        return res.send({ success: false, message: err.message });
    }
});

module.exports = router;
