/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../newpost.html'), 'utf8');

global.fetch = require('jest-fetch-mock');

const fakeData = require('./giphy.json');

let app;

describe('newpost.js requests', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../assets/js/newpost');        
    })

    afterEach(() => {
        fetch.resetMocks();
    })
    
    describe('textbox',() => {
        describe(' showmaxtext',() => {   
            test('it makes a get request to giphy API', () => {
                let textarea = document.querySelector('#content');
                textarea.value = 'str';
                expect(app.showmaxtext(textarea,300)).toBeTruthy;
                const p = document.getElementById('characters');
                expect(document.documentElement.innerHTML).toContain('297 / 300');
            })
        })
    })

    describe('giphy',()=>{
        describe('gifselection', () => {
            test('it makes a get request to giphy API', () => {
                const input = document.getElementById("gif-topic");
                input.value = 'cat';
                const fakeSubmitEvent = {
                    preventDefault: jest.fn()
                }            
                app.gifselection(fakeSubmitEvent);
                expect(fetch.mock.calls[0][0]).toContain('https://api.giphy.com/v1/gifs/search?api_key=aWqPT5uBm54EQ5x9ooFj4TpWjXxF0mNh&q=cat&limit=10&offset=0&rating=g&lang=en');
            })
        })
        describe('showgifs', () => {
            test('Must create the gif carousel', () => {
                app.showgifs(fakeData);
                expect(document.querySelector('#gif1')).toBeTruthy();
            })
        })
        describe('changesrc',() => {
            test('Changes the gif from static to moving', () => {

            })
        })

    })
    
 

    describe('submit Post', () => {
        test('it makes a post request to /posts with the posts data', () => {
            form = document.querySelector('form');
            const fakeSubmitEvent = {
                target: {
                    title: "Hi",
                    content: 'Just testing',
                    gif: {
                        moving: 'https://media1.giphy.com/media/Yg12tqyJwylsk/200w.gif?cid=8cb6bcfbshp425f2rxpf7u9653pjag6ws1yniofdfv93zvzm&rid=200w.gif&ct=g',
                        still: "https://media1.giphy.com/media/Yg12tqyJwylsk/200w_s.gif?cid=8cb6bcfbshp425f2rxpf7u9653pjag6ws1yniofdfv93zvzm&rid=200w_s.gif&ct=g"
                    }
                }
            }

            let target = fakeSubmitEvent.target;

            app.dofetchpost(JSON.stringify(target));
           
            expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
            expect(fetch.mock.calls[0][1]['body']).toContain("{\"title\":\"Hi\",\"content\":\"Just testing\",\"gif\":{\"moving\":\"https://media1.giphy.com/media/Yg12tqyJwylsk/200w.gif?cid=8cb6bcfbshp425f2rxpf7u9653pjag6ws1yniofdfv93zvzm&rid=200w.gif&ct=g\",\"still\":\"https://media1.giphy.com/media/Yg12tqyJwylsk/200w_s.gif?cid=8cb6bcfbshp425f2rxpf7u9653pjag6ws1yniofdfv93zvzm&rid=200w_s.gif&ct=g\"}}")
          
        })
    })

    describe('Auxiliars', () => {
        describe('focuson',() => {
            test('',()=>{
                expect(app.focuson('title')).toBeTruthy;
            })
        })
        describe('stopenter',() => {
            test('',()=>{
                const fakeSubmitEvent = {
                    preventDefault: jest.fn()
                }
                expect(app.stopenter(fakeSubmitEvent)).toBeTruthy;
            })
        })
    })
})