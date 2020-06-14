const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
const app = express();


//middlewares
app.use(cors())
app.use(bodyParser.json());

//import routes
const todoRoutes = require('./routes/todos');
app.use('/todos', todoRoutes)

//routes
app.get('/', (req, res) => res.send('hello world'));

// db connection
mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('connected to mongodb');
})

// start the server
app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));
