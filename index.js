const express = require('express');

require('./config/mysql');

const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
    if(err) return console.log(err);
    console.log(`Listening to port ${PORT}`);
});