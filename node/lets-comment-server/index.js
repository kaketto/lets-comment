const low = require('lowdb');
const shortid = require('shortid');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
// const categories = require('./src/db').categories;
// const posts = require('./src/db').posts;
// const comments = require('./src/db').comments;

db.defaults = ({ categories: [], posts: [], comments: [] })

const dbActions = {};

dbActions.getCategories = () => db
  .get('categories')
  .value()

dbActions.getPosts = () => db
  .get('posts')
  .value()

dbActions.getPostsByCategory = (category) => db
  .get('posts')
  .find({ category })
  .value()

dbActions.getPostById = (id) => db
  .get('posts')
  .find({ id })
  .value()

dbActions.addPost = (title, body, author, category) => db
  .get('posts')
  .push({
    id: shortid.generate(),
    timestamp: Date.now(),
    title,
    body,
    author, 
    category,
    voteScore: 1,
    deleted: false
  })
  .write()

dbActions.votePost = (id, option) => db
  .get('posts')
  .find({ id })
  .update('voteScore', n => option === 'upVote' ? n + 1 : n - 1)
  .write()

dbActions.editPost = (id, title, body) => db
  .get('posts')
  .find({ id })
  .assign({ title, body })
  .write()

dbActions.getComments = () => db
  .get('comments')
  .value()

dbActions.voteComment = (id, option) => db
  .get('comments')
  .find({ id })
  .update('voteScore', n => option === 'upVote' ? n + 1 : n - 1)
  .write()

module.exports = dbActions;