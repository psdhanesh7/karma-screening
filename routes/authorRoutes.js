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

router.post('/add', async (req, res) => {
    const { name, description } = req.body;

    try {
        const ADD_AUTHOR_QUERY = `INSERT INTO authors (author_name, author_description) VALUES ("${name}", "${description}")`;
        await db.query(ADD_AUTHOR_QUERY);

        res.send({ success: true, message: 'Author added succesfully' });
    } catch(err) {  
        res.send({ success: false, message: err.message });
    }
})

module.exports = router;
