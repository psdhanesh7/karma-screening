const router = require('express').Router();
const db = require('../config/mysql');

router.get('/:bookId', async (req, res) => {
    const { bookId } = req.params;
    
    try {
        const GET_REVIEWS_QUERY = `SELECT rating, description FROM reviews WHERE book_id = ${bookId}`;
        const [ reviews ] = await db.query(GET_REVIEWS_QUERY);

        return res.send({ success: true, reviews });
    } catch(err) {
        return res.send({ success: false, message: err.message });
    }
});

router.post('/:bookId/add', async(req, res) => {
    const { bookId } = req.params;
    const { rating, description } = req.body;

    try {
        const ADD_REVIEW_QUERY = `INSERT INTO reviews(rating, description, book_id) VALUES (${rating}, "${description}", ${bookId})`;
        await db.query(ADD_REVIEW_QUERY);

        return res.send({ success: true, message: "Review added successfully" });
    } catch(err) {
        return res.send({ success: false, message: err.message });
    }
})


module.exports = router;