const router = require('express').Router();
const db = require('../config/mysql');

router.get('/', async (req, res) => {
    const { bookId } = req.query;
    const GET_REVIEWS_QUERY = bookId ? `SELECT * FROM reviews WHERE book_id = ${bookId}` : `SELECT * FROM reviews`;
    
    try {
        const [ reviews ] = await db.query(GET_REVIEWS_QUERY);

        return res.send({ success: true, reviews });
    } catch(err) {
        return res.send({ success: false, message: err.message });
    }
});

router.get('/:reviewId', async (req, res) => {
    const { reviewId } = req.params;

    try {
        const GET_REVIEW_BY_ID_QUERY = `SELECT * FROM reviews WHERE review_id = ${reviewId}`;
        const [ reviews ] = await db.query(GET_REVIEW_BY_ID_QUERY);

        if(reviews.length === 0) return res.send({ success: false, message: 'No review with the given id' });

        res.send({ success: true, review: reviews[0] });
    } catch(err) {
        return res.send({ success: false, message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { rating, description, bookId } = req.body;

    try {
        const ADD_REVIEW_QUERY = `INSERT 
            INTO reviews(rating, description, book_id) 
            VALUES (${rating}, "${description}", ${bookId})`;

        await db.query(ADD_REVIEW_QUERY);

        return res.send({ success: true, message: "Review added successfully" });
    } catch(err) {
        return res.send({ success: false, message: err.message });
    }
});

router.put('/:reviewId', async (req, res) => {
    const { reviewId } = req.params;
    const { rating, description, bookId } = req.body;

    try {
        const EDIT_REVIEW_QUERY = `UPDATE reviews 
            SET rating = "${rating}", description = "${description}", book_id = ${bookId}
            WHERE review_id = ${reviewId}`;
            
        await db.query(EDIT_REVIEW_QUERY);

        res.send({ success: true, message: 'Review updated successfull' });
    } catch(err) {
        res.send({ success: false, message: err.message });
    }
});

router.delete('/:reviewId', async (req, res) => {
    const { reviewId } = req.params;

    try {
        const DELET_REVIEW_QUERY = `DELETE FROM reviews WHERE review_id = ${reviewId}`;
        await db.query(DELET_REVIEW_QUERY);

        res.send({ success: true, message: "Review deleted successfully" });
    } catch(err) {
        res.send({ success: false, message: err.message });
    }
});

module.exports = router;