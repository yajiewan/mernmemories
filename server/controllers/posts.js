const { mongoose } = require('mongoose');
const PostMessage = require('../models/postMessage');

const getAllPosts = async (req, res) => {
    const {page} = req.query;

    try{
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of every page
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    }catch(error){
        res.status(404).json({msg: error.message});
    }
    
}

const getPost = async (req, res) => {
    try {
        const {id} = req.params;
        
        const postMessage = await PostMessage.findById(id);
        res.status(200).json({postMessage});
    } catch (error) {
        console.log(error);
    }
}

const getPostsBySearch = async (req, res) => {
    const {searchQuery, tags} = req.query;
    if(searchQuery === "none" && !tags){
        try {
            const allPosts = await PostMessage.find();
            res.status(200).json({data: allPosts});
        } catch (error) {
            console.log(error);   
        }
    }else{
        try {
            const title = new RegExp(searchQuery, 'i'); // 'i' stands for ignore-case. Test === test for example;
            const posts = await PostMessage.find({$or: [{title}, {tags: {$in: tags.split(',')}}]});    
            res.json({data : posts});
    
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }
}

const createPost = async (req, res) => {
    const body = req.body;
    console.log(body);
    const newPost = new PostMessage({...body, creator: req.userId, createAt: new Date().toISOString()});
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({msg: error.message});
    }
}


const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({msg: "No post with given id"});

    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new : true});

    res.status(200).json(updatedPost);
}

const deletePost = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg: "No post with given id"});

    await PostMessage.findByIdAndRemove(id);
    console.log('Delete');
    res.status(200).json({msg: "Post deleted successfully"});
}

const likePost = async (req, res) => {
    const {id} = req.params;
    if(!req.userId){
        return res.json({message: "User is unauthenticated"});
    }

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg: "No post with given id"});
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => {
        id === String(req.userId)
    });


    //If she wants to like the post
    if(index === -1){
        post.likes.push(req.userId);
    }else{
        //If she wants to dislike a post
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new : true});
    
    res.status(200).json(updatedPost);
}

const commentPost = async (req, res) => {
    const {id} = req.params;
    const {value} = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

    res.json(updatedPost);
}

module.exports = {getPostsBySearch, getAllPosts, getPost, createPost, updatePost, deletePost, likePost, commentPost};