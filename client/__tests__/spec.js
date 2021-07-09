/**
 * @jest-environment jsdom
 */

const testData = require('./test-posts.json');
const request = require('supertest');
global.fetch = require('jest-fetch-mock');
let funcs = require('../assets/js/allposts.js');

const fs = require('fs');
const path = require('path');
const JSDOMEnvironment = require('jest-environment-jsdom');
const html = fs.readFileSync(path.resolve(__dirname, '../allposts.html'));

describe('All Posts page test suite', ()=>{

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
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('adds a new journal entry', ()=>{
        const cardDiv = document.querySelector('.col .singleCard')
        funcs.appendPosts(testData);
        let createdCard = document.querySelector('.col .singleCard')
        expect(createdCard).toEqual(cardDiv);
    });

    test('must create all cards for appended data', () => { 
       funcs.appendPosts(testData); 
       expect(document.querySelector('img[src="https://media3.giphy.com/media/xT0BKiK5sOCVdBUhiM/200w_s.gif?cid=8cb6bcfbos957hqzue0pdqsmubozke5b2uy3ewsk8mub5oal&rid=200w_s.gif&ct=g"]')).toBeTruthy;
    })

     test('it catches errors and returns a warning', async () =>{
         fetch.mockReject(() =>{ Promise.reject("API failure");
         expect(testfunc).toEqual(null);
         })
     })
});