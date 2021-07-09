/**
 * @jest-environment jsdom
 */

 const testData = require('./test-random-post.json');
 const request = require('supertest');
 global.fetch = require('jest-fetch-mock');
 let funcs = require('../assets/js/index.js');
 
 const fs = require('fs');
 const path = require('path');
 const JSDOMEnvironment = require('jest-environment-jsdom');
 const html2 = fs.readFileSync(path.resolve(__dirname, '../index.html'));
  
 describe('Index /random post page test suite', ()=>{
 
     beforeEach(() => {
         document.documentElement.innerHTML = html2.toString();
         fetch.resetMocks();
     });
 
     test('html card has a title', ()=>{
         let postTitle = document.querySelector('h3');
         expect(postTitle.textContent).toBe('Title');
     })
 
     test('has a favicon', ()=>{
         let favLink = document.querySelector('link[rel="shortcut icon"]')
         expect(favLink).toBeTruthy();
     });
 
     test('has correct link label to other pages',()=>{
         let links = document.querySelector('a[href="newPost"]');
         expect(links.textContent).toBe('Add a Post');
     });
 
     test('has correct link label to other pages',()=>{
         let links = document.querySelector('a[href="allposts"]');
         expect(links.textContent).toBe('View All Posts');
     });
 
     test('making a fetch call to api', () => {
        funcs.getRandomPost();
         expect(fetch).toHaveBeenCalledWith('https://my-private-life.herokuapp.com/posts/random');
         expect(fetch).toHaveBeenCalledTimes(1);
     });

     test('must correctly update UI', () => { 
        funcs.updateUI(testData[0])
        expect(document.querySelector('img[src="https://media0.giphy.com/media/BzyTuYCmvSORqs1ABM/200w.gif?cid=8cb6bcfbqj6372y7gx9df67a3zu0gq2tklt3osugze5hhffg&rid=200w.gif&ct=g"')).toBeTruthy;
     });

    test('must correctly format time', () => {
        let dateFormatter = funcs.format_time(2020, 11, 20, 3, 23, 16, 738);
        expect(dateFormatter).toEqual('Thursday, 1 January 1970 at 00:33:40');
    });

     test('it catches errors and returns a warning', async () =>{
        fetch.mockReject(() =>{ Promise.reject("API failure");
        expect(testfunc).toEqual(null);
        })
    });
 });