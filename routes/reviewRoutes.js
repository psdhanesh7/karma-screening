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

router.post('/add/:bookId', async(req, res) => {
    const { bookId } = req.params;
    const { rating, description } = req.body;

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

router.post('/:bookId/edit/:reviewId', async (req, res) => {
    const { bookId, reviewId } = req.params;
    const { rating, description } = req.body;

    try {
        const EDIT_REVIEW_QUERY = `UPDATE reviews 
            SET rating = "${rating}", description = "${description}"
            WHERE review_id = ${reviewId}`;
        await db.query(EDIT_REVIEW_QUERY);

        res.send({ success: true, message: 'Review updated successfull' });
    } catch(err) {
        res.send({ success: false, message: err.message });
    }
})

router.get('/:bookId/delete/:reviewId', async (req, res) => {
    const { bookId, reviewId } = req.params;

    try {
        const DELET_REVIEW_QUERY = `DELETE FROM reviews WHERE review_id = ${reviewId}`;
        await db.query(DELET_REVIEW_QUERY);

        res.send({ success: true, message: "Review deleted successfully" });
    } catch(err) {
        res.send({ success: false, message: err.message });
    }
})

module.exports = router;