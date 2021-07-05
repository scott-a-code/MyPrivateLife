const express = require('express');
const cors = require('cors');
const fs = require('fs')

const app = express();

app.use(cors());
app.use(express.json());

let jsonData = require('./posts.json');

/* Return all posts data object */
app.get('/', (req,res) => [
    res.send(jsonData)
])

/* Retrieve a random post */
app.get('/posts/random', (req, res) => {
    let post = getRandomPost();
    res.send(post);
})

/* Return all posts as array */
app.get('/posts', (req,res) => {
    let results = jsonData.data;
    res.send(results);
})

/* Append a post object to the file of all posts */
app.post('/posts', (req,res) => {

    let body = req.body;

    const newPost = { 
        /* this will use post model */
        "title" : body.title
    };

    fs.readFile('posts.json', (err, data) => {
        let json = JSON.parse(data);
        json.data.push(newPost)
    
        fs.writeFile("posts.json", JSON.stringify(json), (err, result) => {
            if(err) console.log('error', err);
        })
    })

    res.send('post created successfully');
})

/* Return a single post object */
app.get('/posts/:index', (req,res) => {

    let posts = jsonData.data;

    try {
        let index = req.params.index;
        if (index < 1 || index > posts.length) {
          throw new Error(`No post exists`)
        }
        res.send(posts[req.params.index - 1])
    } catch (error) {
        res.status(404).send({message: error.message})
    }
})

/* Return array of comments for a specific post */
app.get('/posts/:index/comments', (req,res) => {

    let posts = jsonData.data;

    try {
        let index = req.params.index;
        if (index < 1 || index > posts.length) {
          throw new Error(`No post exists`)
        }
        res.send(posts[req.params.index - 1].comments)
    } catch (error) {
        res.status(404).send({message: error.message})
    }
})

/* Add to comments for a specific post */
app.post('/posts/:index/comments', (req,res) => {
    res.send('add comments to a post');
})

function getRandomPost () {
    let random = Math.floor(Math.random() * (jsonData.data.length));
    return jsonData.data[random]
}

module.exports = app;