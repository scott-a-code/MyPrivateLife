const app = require('../app');
const request = require('supertest');
const Post = require('../models/post');

const port = process.env.PORT || 3000;
const jsonData = Post.findAll();

describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
  })

describe('API', () => {
	let api;

	beforeAll(() => {
		api = app.listen(port, () => {
			console.log(`Server is listening on port ${port} for testing.`);
		});
	});

    describe('/GET', () => {

        test('responds to / with status 200', (done) => {
            request(api).get('/').expect(200, done);
        });

        test('GET /posts', (done) => {
            request(api)
                .get('/posts')
                .expect(hasExpectedKeys)
                .expect(hasAllPosts)
                .expect(200)
                .end(done);
        });

        test("GET /posts/:id", async () => {
            const post = Post.findById(1);
        
            request(api)
                .get("/posts/" + post.id)
                .expect(200)
                .then((response) => {
                    expect(response.body.id).toBe(post.id)
                    expect(response.body.title).toBe(post.title)
                    expect(response.body.content).toBe(post.content)
                })
        })

        test("GET /posts/:id Out of Range Error", async () => {    
            await request(api)
                .get("/posts/" + jsonData.data.length + 1)
                .expect(404)
        })

        test("GET /posts/:id/comments", async () => {   
            const post = Post.findById(1);

            await request(api)
                .get(`/posts/${post.id}/comments`)
                .expect(200)
                .then((response) => {
                    expect(response.body[0].commentText).toBe(post.comments[0].commentText)
                    expect(response.body[0].dateCommented).toBe(post.comments[0].dateCommented)
                })
        })

        test('GET /posts/random', (done) => {
            request(api)
                .get('/posts/random')
                .expect(hasExpectedKeys)
                .expect(200)
                .end(done);
        });

    })

    describe("/POST", () => {

        test('Create a new post', async () => {
            await request(api)
            .post('/posts')
            .send({
                "title": "Test Post",
                "content": "This is some content relating to the new test post",
                "gif": {
                    "url":"https://media0.giphy.com/media/BzyTuYCmvSORqs1ABM/200w.gif?cid=8cb6bcfbqj6372y7gx9df67a3zu0gq2tklt3osugze5hhffg&rid=200w.gif&ct=g"
                }
            })
            .expect(201)
        })

        test('Cannot create a post without a title -> error code returned', async () => {
            await request(api)
            .post('/posts')
            .send({
                "content": "This is some content relating to the new test post",
                "gif": {
                    "url":"https://media0.giphy.com/media/BzyTuYCmvSORqs1ABM/200w.gif?cid=8cb6bcfbqj6372y7gx9df67a3zu0gq2tklt3osugze5hhffg&rid=200w.gif&ct=g"
                }
            })
            .expect(422)
        })
        
    })

	afterAll((done) => {
		api.close(done);
	});

});

function hasExpectedKeys(res) {

    let result;
    if (Array.isArray(res.body)) {
        result = res.body[0];
    } else {
        result = res.body;
    }

    if (!('id' in result)) throw new Error("missing id key");
    if (!('title' in result)) throw new Error("missing title key");
    if (!('gif' in result)) throw new Error("missing gif key");
}

function hasAllPosts(res) {
    testDataSize = jsonData.data.length;
    apiDataSize = res.body.length;
    if (!(testDataSize === apiDataSize)) throw new Error(`not all posts returned, ${testDataSize} != ${apiDataSize}`);
}

