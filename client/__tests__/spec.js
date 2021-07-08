const testData = require('./test-posts.json');
const request = require('supertest');
global.fetch = require('jest-fetch-mock');
let funcs = require('../assets/js/allposts.js');

const fs = require('fs');
const path = require('path');
const allPostsPage = require('../assets/js/allposts');
const JSDOMEnvironment = require('jest-environment-jsdom');
const html = fs.readFileSync(path.resolve(__dirname, '../allposts.html'));

describe('client test suite', ()=>{

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        fetch.resetMocks();
	});

    test('html card has a title',()=>{
        let postTitle = document.querySelector('h5');
        expect(postTitle.textContent).toBe('Post Title');
    })

    test('has a favicon',()=>{
        let favLink = document.querySelector('link[rel="shortcut icon"]')
        expect(favLink).toBeTruthy();
    });

    test('has correct link label to other pages',()=>{
        let links = document.querySelector('a[href="newpost.html"]');
            expect(links.textContent).toBe('Add a Post');
    });

    test('has correct link label to other pages',()=>{
        let links = document.querySelector('a[href="allposts.html"]');
            expect(links.textContent).toBe('View All Posts');
    });

    test('making a fetch call to api', () =>{
        funcs.getAllPosts();
        expect(fetch).toHaveBeenCalledWith('https://my-private-life.herokuapp.com/posts');
    });

    test('adds a new journal entry', ()=>{
        const cardDiv = document.querySelector('.col .singleCard')
        allPostsPage.appendPosts(testData);
        let createdCard = document.querySelector('.col .singleCard')
        expect(createdCard).toEqual(cardDiv);
    });

    test('appending data', async () => {    
       fetch.mockResponse(JSON.stringify(testData.data[0].id))
       let response = await allPostsPage.appendPosts(testData); 
       expect(response).toEqual(testData.data[0].id);
    })

    test('appends data for all cards', () => {
        const gettingData = allPostsPage.getAllPosts();

        expect(gettingData).toEqual('nothing');
    })

    // test('appending post data', () =>{
    //     funcs.appendPosts(testData.data[0]);
    //     expect(fetch).toHaveBeenCalledWith('https://my-private-life.herokuapp.com/posts/2');
    // });

    // https://my-private-life.herokuapp.com/posts/2

    // test('filtering data', () =>{
    //     funcs.filterPosts();
    //     expect().
    // });
})