/**
 * @jest-environment jsdom
 */
 const fs = require('fs');
 const path = require('path');
 
 const html = fs.readFileSync(path.resolve(__dirname, '../singlepost.html'), 'utf8');
 
 global.fetch = require('jest-fetch-mock');
 
 const fakeData = require('./giphy.json');
 
 let app;
 
 describe('singlepost.js requests', () => {
     beforeEach(() => {
         document.documentElement.innerHTML = html.toString();
         app = require('../assets/js/singlepost');        
     })
 
     afterEach(() => {
         fetch.resetMocks();
     })


    describe('getPost', ( ) => {
        test('Should so a fetch get call to our server',()=>{
            app.getPost(4);
            expect(fetch.mock.calls[0][0]).toBeTruthy();
        })
     })
    
    describe('updateReaction', ( ) => {
        test('Should so a fetch post call to our server',()=>{
            app.updateReaction('thumbsUp',1);
            expect(fetch.mock.calls[0][0]).toBeTruthy();
        })
    })
    
    
    
    describe('updateUI', ( ) => {
        test('Should change the html to contain the post data ', ( ) => {
            let fakeData = 
            {
                title: "Fake test title",
                content: "Fake content too",
                gif: {
                    moving: "https://media2.giphy.com/media/5PSPV1ucLX31u/200w.gif?cid=8cb6bcfbyx3lv1yd4gxlxir1ivwfy7afkahz4cshzsne4m53&rid=200w.gif&ct=g",
                    still: "https://media2.giphy.com/media/5PSPV1ucLX31u/200w_s.gif?cid=8cb6bcfbyx3lv1yd4gxlxir1ivwfy7afkahz4cshzsne4m53&rid=200w_s.gif&ct=g"
                },
                id: 6,
                timestamp: 1625734365,
                comments: [],
                reactions: { thumbsUp: 0, heart: 0, angryFace: 0 }
            }
            app.updateUI(fakeData);
            expect(document.querySelector('.single-post .post-title').textContent).toContain('Fake test title');
            

        })
    })

    //This section gives me problems

    //it says that fetch is executing without a catch error function which is not true
    /*
    describe('addComment', ( ) => {
        test('Should so a fetch post call to our server', ( ) => {
            app.addComment('Test comment',3);
            //expect(fetch).toBeTruthy();
            //expect(fetch.mock.calls[0][0]).toHaveProperty('method', 'POST');
        })
    })
    */
    
    //It execute the function but the table is empty, is there anything wrong with my fakeData?
    /*
    describe('getComments', ( ) => {
        test('', ( ) => {
            const fakeData =  [
                {
                  commentText: "Wow! Crazy cat logic but I love it!",
                  dateCommented: 1625241921
                },
                {
                  commentText: "Cat Avengers vs Dog Avengers?",
                  dateCommented: 1625242133
                }
            ];
            app.getComments(fakeData);
            expect(document.querySelector('.comments-table tbody tr td').textContent).toContain('Wow! Crazy cat logic but I love it!')

        })

    })
    */
    describe('format_time', ( ) => {
        test('It should execute and return the new time', ( ) => {
            expect(app.format_time(1625242133, 'medium')).toBeTruthy();            
        })
    })


})