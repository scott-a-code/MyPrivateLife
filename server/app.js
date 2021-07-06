if (process.env.NODE_ENV !== 'prod') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const fs = require('fs')

const app = express();

app.use(cors());
app.use(express.json());

const Post = require('./models/post.js');

/* Return all posts data object */
app.get('/', (req,res) => [
    res.send(Post.findAll())
])

/* Retrieve a random post */
app.get('/posts/random', (req, res) => {
    res.send(Post.random());
})

/* Return all posts as array */
app.get('/posts', (req,res) => {
    let allPosts = Post.findAll();
    let results = allPosts.data;
    res.send(results);
})

/* Append a post object to the file of all posts */
app.post('/posts', (req,res) => {

    let body = req.body;

    try {
        const newPost = Post.create(body);
        res.status(201).send(newPost);
    } catch (error) {
        res.status(422).send("Error processing request: " + error);
    }
})

/* Return a single post object */
app.get('/posts/:index', (req,res) => {

    let index = parseInt(req.params.index);

    try {
        let post = Post.findById(index)
        res.status(200).send(post);
    } catch (error) {
        res.status(404).send({message: error.message})
    }
})

/* Return array of comments for a specific post */
app.get('/posts/:index/comments', (req,res) => {

    let allPosts = Post.findAll();

    try {
        let index = req.params.index;
        if (index < 1 || index > allPosts.data.length) {
          throw new Error(`No post exists`)
        }
        res.send(allPosts.data[req.params.index - 1].comments)
    } catch (error) {
        res.status(404).send({message: error.message})
    }
})

/* Add to comments for a specific post */
app.post('/posts/:index/comment', (req,res) => {
    let comment = req.body;
    let id = parseInt(req.params.index) - 1;

    let jsonData = Post.findAll();
    let postsJson = jsonData.data.splice(id,1)[0];
    let post = new Post(postsJson);
    post.addComment(comment);
    jsonData.data.splice(id,0, post);
    fs.writeFile(`./${process.env.DEVDATA || 'posts'}.json`, JSON.stringify(jsonData), (err, result) => {
        if(err) console.log('error', err);
    })

    res.send(post);
})

/* Update reactions for a specific post */
app.put('/posts/:index/:reaction', (req,res) => {
    let reaction = req.params.reaction;
    let id = parseInt(req.params.index) - 1;

    let jsonData = Post.findAll();
    let postsJson = jsonData.data.splice(id,1)[0];
    let post = new Post(postsJson);
    post.addReaction(reaction);
    jsonData.data.splice(id,0, post);
    fs.writeFile(`./${process.env.DEVDATA || 'posts'}.json`, JSON.stringify(jsonData), (err, result) => {
        if(err) console.log('error', err);
    })

    res.send('reaction updated');
})

module.exports = app;