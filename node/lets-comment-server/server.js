const express = require('express');
const app = express();
// const path = require('path');
const PORT = 8888;
const cors = require('cors')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(cors())

app.get('/hello', (req, res) => {
  res.send('hello');
});

app.listen(PORT, () => {
  console.log(`The server is up and running on port ${PORT}`);  
});