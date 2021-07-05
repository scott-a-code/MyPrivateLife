const express = require('express');
const cors = require('cors');
const fs = require('fs')

const app = express();

app.use(cors());
app.use(express.json());

let jsonData = require('./posts.json');

app.get('/', (req,res) => [
    res.send(jsonData)
])

app.get('/posts/random', (req, res) => {
    res.send('random post goes here');
})

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

app.get('/posts/:index', (req,res) => {
    let index = req.params.index;
    console.log(index);
    res.send('access single posts');
})

app.post('/posts/:index/comments', (req,res) => {
    res.send('add comments to a post');
})

module.exports = app;