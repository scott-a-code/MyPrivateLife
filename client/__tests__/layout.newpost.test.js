/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../newpost.html'), 'utf8');

describe('newpost.js requests', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();       
    })

    describe('head', () => {
        test('it has a title', () => {
            const title = document.querySelector('head title');
            expect(title).toBeTruthy();
            expect(title.textContent).toBe("My Private Life")
        })
    })

    describe('body', () => {
        describe('form', () => {
            let form;
            let titleInput, contentInput, submitBtn;
            beforeEach(() => {
                form = document.querySelector('form')
                titleInput = form.querySelector('#title');
                contentInput = form.querySelector('#content');
                gifInput = form.querySelector('#gif-topic');
                gifBtn = form.querySelector('#gif-button');
                submitBtn = form.querySelector('[type="submit"]');
            })
    
            test('it exists', () => {
                expect(form).toBeTruthy();
            });
    
            describe('title input', () => {
                test('it has an id of "name"', () => {
                    expect(titleInput).toBeTruthy();
                })

                test('it is a text input"', () => {
                    expect(titleInput.getAttribute('type')).toBe('text')
                })
    
            })

            describe('content input', () => {
                test('it has an id of "age"', () => {
                    expect(contentInput).toBeTruthy();
                })

                test('it is a number input"', () => {
                    expect(contentInput.getAttribute('maxlength')).toBe('300')
                })

            })

            describe('gif input', () => {
                test('it has an id of "age"', () => {
                    expect(gifInput).toBeTruthy();
                })

                test('it is a number input"', () => {
                    expect(gifInput.getAttribute('type')).toBe('text')
                })

            })
    
            describe('submit button', () => {
                test('it says "Post"', () => {
                    expect(submitBtn.textContent).toBe('Post');
                })
            })

        })

        test('it has a div to display gifs', () => {
            expect(document.querySelector('div#gif-select')).toBeTruthy();
        })
    })

})