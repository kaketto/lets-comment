const express = require('express');
const app = express();
// const path = require('path');
const PORT = 8888;
const cors = require('cors')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const db = require('./index');


app.use(bodyParser.urlencoded({ extended: false}))
app.use(cors())

app.get('/categories', (req, res) => {
  res.json(db.getCategories());
});

app.get('/:category/posts', (req, res) => {
  res.json(db.getPostsByCategory(req.params.category));
});

app.get('/posts', (req, res) => {
  res.json(db.getPosts());
});

app.get('/posts/:id', (req, res) => {
  res.json(db.getPostById(req.params.id));
});

app.post('/posts', jsonParser, (req, res) => {
  res.json(db.addPost(req.body.title, req.body.body, req.body.author, req.body.category))
})

app.post('/posts/:id', jsonParser, (req, res) => {
  res.json(db.votePost(req.params.id, req.body.option))
})

app.put('/posts/:id', jsonParser, (req, res) => {
  res.json(db.editPost(req.params.id, req.body.title, req.body.body))
})

app.listen(PORT, () => {
  console.log(`The server is up and running on port ${PORT}`);  
});