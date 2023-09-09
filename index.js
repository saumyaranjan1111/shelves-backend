const express = require('express')
// const { PORT, uri } = require('./config.js')
const mongoose = require('mongoose');
const Book = require('./models/bookModel.js')
const booksRoute = require('./routes/booksRoute.js')
require('dotenv').config();

const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended : false }));

const PORT = process.env.PORT || 5555
const URI = process.env.URI

// to parse json objects
app.use(express.json());

// middleware to handle the cors policy which does not allow pages to make requests to a different domain than the one that served the web page
app.use(cors());

app.get('/', (req, res)=>{
    // console.log(req);
    return res.status(234).send('Book Store')
})

app.use('/books', booksRoute);

app.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`Server connected to port : ${PORT}`);

})

async function connectToMongoDB() {
    try {
      await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }