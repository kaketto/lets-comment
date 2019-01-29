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
  .filter({ deleted: false })
  .value()

dbActions.getPostsByCategory = (category) => db
  .get('posts')
  .filter({ category, deleted: false })
  .value()

dbActions.getPostById = (id) => db
  .get('posts')
  .find({ id, deleted: false })
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
    deleted: false,
    numberOfComments: 0
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

dbActions.deletePost = (id) => db
  .get('posts')
  .find({ id })
  .update('deleted', boolean => true)
  .write()
  && db
  .get('comments')
  .filter({ parentId: id })
  .each(comment => comment.parentDeleted = true)
  .write()

dbActions.getCommentsByPostId = (id) => db
  .get('comments')
  .filter({ parentId: id, deleted: false })
  .value()

dbActions.getCommentById = (id) => db
  .get('comments')
  .find({ id, deleted: false, parentDeleted: false })
  .value()

dbActions.addComment = (id, body, author) => db
  .get('comments')
  .push({
    id: shortid.generate(),
    parentId: id,
    timestamp: Date.now(),
    body,
    author, 
    voteScore: 1,
    deleted: false,
    parentDeleted: false
  })
  .write() 
  && db
    .get('posts')
    .find({ id })
    .update('numberOfComments', n => n + 1)
    .write()

dbActions.voteComment = (id, option) => db
  .get('comments')
  .find({ id })
  .update('voteScore', n => option === 'upVote' ? n + 1 : n - 1)
  .write()

dbActions.editComment = (id, body) => db
  .get('comments')
  .find({ id })
  .assign({ body })
  .write()

dbActions.deleteComment = (id) => {
  db
  .get('comments')
  .find({ id })
  .update('deleted', boolean => true)
  .write()

  const parentId = db.get('comments').find({ id }).value().parentId
  db
  .get('posts')
  .find({ id: parentId})
  .update('numberOfComments', n => n - 1)
  .write()
}

module.exports = dbActions;