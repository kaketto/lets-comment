const express = require('express');
const app = express();
// const path = require('path');
const PORT = 8888;
const cors = require('cors')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const db = require('./index');


app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

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
});

app.post('/posts/:id', jsonParser, (req, res) => {
  res.json(db.votePost(req.params.id, req.body.option))
});

app.put('/posts/:id', jsonParser, (req, res) => {
  res.json(db.editPost(req.params.id, req.body.title, req.body.body))
});

app.delete('/posts/:id', (req, res) => {
  res.json(db.deletePost(req.params.id))
});

app.get('/posts/:id/comments', (req, res) => {
  res.json(db.getCommentsByPostId(req.params.id));
});

app.post('/comments', jsonParser, (req, res) => {
  res.json(db.addComment(req.body.id, req.body.body, req.body.author))
});

app.get('/comments/:id', (req, res) => {
  res.json(db.getCommentById(req.params.id));
});

app.post('/comments/:id', jsonParser, (req, res) => {
  res.json(db.voteComment(req.params.id, req.body.option))
});

app.put('/comments/:id', jsonParser, (req, res) => {
  res.json(db.editComment(req.params.id, req.body.body))
});

app.delete('/comments/:id', (req, res) => {
  res.json(db.deleteComment(req.params.id))
});

app.listen(PORT, () => {
  console.log(`The server is up and running on port ${PORT}`);  
});