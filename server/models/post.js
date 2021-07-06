if (process.env.NODE_ENV !== 'prod') {
    require('dotenv').config();
}
const fs = require('fs');
const postsJson = require(`../${process.env.DEVDATA || 'posts'}.json`);

class Comment{
    constructor(data){
        this.commentText = data.commentText;
        this.dateCommented = data.dateCommented;
    }
    static create(str){
        let newComment = {commentText : str.text, dateCommented : Math.floor(Date.now() / 1000)};
        return new Comment(newComment);
    }
}

class Post { 
    
    constructor(data){
        this.id = data.id;
        this.title = data.title;
        this.content = data.content;
        this.gif = data.gif;
        this.comments = (data.comments) ? data.comments.map(x => {return new Comment(x)}): data.comments;
        this.reactions = data.reactions;
        this.timestamp = data.timestamp;
    }

    static create(post) {

        if(!post.title) {
            throw new Error('Missing a title');
            return
        }

        let newPost = {
            ...post,
            id : postsJson.data.length + 1,
            timestamp : Math.floor(Date.now() / 1000),
            comments : [],
            reactions: { thumbsUp: 0, heart : 0, angryFace: 0}
        }

        fs.readFile(`./${process.env.DEVDATA || 'posts'}.json`, (err, data) => {
            let json = JSON.parse(data);
            json.data.push(newPost);
        
            fs.writeFile(`./${process.env.DEVDATA || 'posts'}.json`, JSON.stringify(json), (err, result) => {
                if(err) console.log('error', err);
            })
        })

        return new Post(newPost);
    }

    addComment(comment){
        let newCommment = Comment.create(comment);
        this.comments.push(newCommment);
        return this.comments;
    }

    addReaction(reaction){
        this.reactions[reaction]++;
        return this.reactions;
    }

    static findById(id) {
        try {
            let post = postsJson.data.find(post => post.id === id);
            return new Post(post);
        } catch (err) { 
            throw new Error('That post does not exist!');
        }
    }

    static findAll() {
        try {
            return postsJson;
        } catch (err) {
            throw new Error('Error Processing Request');
        }
    }

    static random() {
        try {
            let random = Math.floor(Math.random() * (postsJson.data.length));
            return postsJson.data[random]
        } catch (err) {
            throw new Error('Error Processing Request');
        }
    }
}

module.exports = Post;
/*
let data = {
    title: "post title string",
    content: "post body string",
    gif: { url: "https://www.nbc.com/saturday-night-live" },
}


let post= Post.findById(2);
console.log(post.addComment("the weather is rainny"));
console.log(post.addReaction('heart'))
//console.log(Post.findById(2));
//console.log(Post.create(data));*/