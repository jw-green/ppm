const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

const connection = mongoose.connection;

mongoose.connect('mongodb://127.0.0.1:27017/functions', { useNewUrlParser: true, useFindAndModify: false });
mongoose.connect('mongodb://127.0.0.1:27017/modules', { useNewUrlParser: true, useFindAndModify: false });
mongoose.connect('mongodb://127.0.0.1:27017/packages', { useNewUrlParser: true, useFindAndModify: false });

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

let moduleRoutes = require('./routes/module')
let functionRoutes = require('./routes/function')
let packageRoutes = require('./routes/package')

app.use('/packages', packageRoutes);
app.use('/modules', moduleRoutes);
app.use('/functions', functionRoutes);

