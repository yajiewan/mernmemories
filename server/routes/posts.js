const express = require('express');

const {getPostsBySearch, getAllPosts, getPost, createPost, updatePost, deletePost, likePost, commentPost} = require('../controllers/posts');

const auth = require('../middleware/auth');


const postRouter = express.Router();

postRouter.get('/search', getPostsBySearch);
postRouter.get('/', getAllPosts);
postRouter.post('/', auth, createPost);
postRouter.patch('/:id', auth, updatePost);
postRouter.delete('/:id', auth, deletePost);
postRouter.patch('/:id/likePost', auth, likePost);
postRouter.get('/:id', getPost);
postRouter.post('/:id/commentPost', auth, commentPost);

// postRouter.route('/').get(getAllPosts).post(createPost);
// postRouter.route('/:id').get(getPost).patch(auth, updatePost).delete(deletePost);
// postRouter.route('/:id/likePost').patch(likePost);




module.exports = {postRouter}; 