const express = require('express');
const { connection } = require('./config/db');
const { bookRouter } = require("./routes/book.router")
const app = express();
require('dotenv').config;
const port = process.env.PORT;

app.use(express.json());
app.use(require('cors')());

app.get('/', (req, res) => {
    res.send('Server running');
});

app.use('/api',bookRouter)

app.listen(port, async() => {
    try {
        await connection;
        console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
    console.log(`Server running on port ${port}`);
});