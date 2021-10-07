require('dotenv').config();

const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
const { PORT, URI } = process.env;

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

console.log(URI);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

// ROUTERS
app.use('/data/property', require('./routes/propertyRoutes'));
app.use('/data/agent', require('./routes/agentRoutes'));
app.use('/data/news', require('./routes/newsRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
 
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
