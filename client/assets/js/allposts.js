const filter = document.getElementById('filter');
filter.addEventListener('keyup', filterPosts);

// const urlParams = new URLSearchParams(queryString);
// const postId = urlParams.get('id');

// getPost(postId);

// looping through cards to give each an event listener linked to the correct ID
// const cards = document.querySelectorAll('.singleCard'); 
// for(let i=0; i<cards.length; i++) {
//     // let link;
//     cards[i].addEventListener('click' , function getSpecificPost(){
//         console.log('hello');
//     });
// };


// function getSpecificPost (data){
//     let index;
//     console.log(data)
//     for(let i=0; i<data.length; i++){
//         if (i === parseInt(data.id)){
//             index = i;
//             fetch(`http://localhost:3000/posts/${index}`)
//             .then(resp => resp.json())
//             .then(appendPost)
//             .catch(console.warn);
//             return;
//         }
//     }
// }


// retrieve all posts as soon as site is loaded
function getAllPosts(){
    fetch('http://localhost:3000/posts')
    .then(resp => resp.json())
    .then(appendPosts)
    .catch(console.warn);
}

function appendPosts(data){
    console.log(data);
    for(let i=0; i<data.length; i++){
        let numComments = data[i].comments.length;
        console.log(numComments);
    
        let {heart: numHearts, thumbsUp: numThumbs, angryFace: numAngry} = data[i].reactions;

        let newCard = document.createElement('div');
        newCard.setAttribute('class','col singleCard');

        let newAnchor = document.createElement('a');
        newAnchor.href = data[i].url;
        newCard.appendChild(newAnchor);

        let newInnerCard = document.createElement('div');
        newInnerCard.setAttribute('class','card h-100');
        newAnchor.appendChild(newInnerCard);

        let gif = document.createElement('img');
        gif.setAttribute('class', 'card-img-top');
        gif.setAttribute('src', data.gif.url);
        gif.setAttribute('alt', 'Giphy gif');
        newInnerCard.appendChild(gif);

        let cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body')
        newInnerCard.appendChild(cardBody);

        let cardTitle = document.createElement('h5');
        cardTitle.setAttribute('class', 'card-title')
        cardTitle.textContent = data[i].title;
        cardBody.appendChild(cardTitle);

        let cardText = document.createElement('p');
        cardText.setAttribute('class', 'card-text')
        cardText.textContent = data[i].content;
        cardBody.appendChild(cardText);

        let commentAnchor = createElement('a');
        commentAnchor.setAttribute('class', 'btn btn-primary')
        commentAnchor.href = '#'
        commentAnchor.textContent = 'Comment'
        cardBody.appendChild(commentAnchor);

        let reactionsDiv = document.createElement('div');
        reactionsDiv.setAttribute('class', 'post-comments');
        cardBody.appendChild(reactionsDiv);

        let iForThumbs = document.createElement('i');
        iForThumbs.setAttribute('class', 'far fa-thumbs-up');
        reactionsDiv.appendChild(iForThumbs);
        let spanForThumbs = document.createElement('span')
        spanForThumbs.setAttribute('class', 'thumbs-count');
        spanForThumbs.textContent = numThumbs;
        reactionsDiv.appendChild(spanForThumbs);

        let iForHearts = document.createElement('i');
        iForHearts.setAttribute('class', 'far fa-heart');
        reactionsDiv.appendChild(iForHearts);
        let spanForHearts = document.createElement('span')
        spanForHearts.setAttribute('class', 'heart-count');
        spanForHearts.textContent = numHearts;
        reactionsDiv.appendChild(spanForHearts);

        let iForAngry = document.createElement('i');
        iForAngry.setAttribute('class', 'far fa-angry');
        reactionsDiv.appendChild(iForAngry);
        let spanForAngry = document.createElement('span')
        spanForAngry.setAttribute('class', 'angry-count');
        spanForAngry.textContent = numAngry;
        reactionsDiv.appendChild(spanForAngry);

        let iForComments = document.createElement('i');
        iForComments.setAttribute('class', 'far fa-comments');
        reactionsDiv.appendChild(iForComments);
        let spanForComments = document.createElement('span')
        spanForComments.setAttribute('class', 'comment-count');
        spanForComments.textContent = numComments;   
        reactionsDiv.appendChild(spanForComments);
    }
}

getAllPosts();

// fetch(`localhost:3000/posts/${index}`)
// .then(resp => resp.json())
// .then(result => appendResult(result))
// .catch(console.warn);














// function to currently correctly linked to our data structure
function filterPosts(e) {
    let text = e.target.value.toLowerCase();
    let cardTitle = document.getElementsByClassName('card-title'); 
    let cardText = document.getElementsByClassName('card-text');
   //match with card-title and card-text classes
   Array.from(cardTitle).forEach(function(title){
       let titleText = title.firstChild.textContent();
       if(titleText.toLowerCase().indexOf(text) !=-1){
           title.style.display='block';
        } else {
            title.style.display='none';
        }
    });
    // May need to use a slightly different approach as if in the first but not the second may get incorrect filtering 
    Array.from(cardText).forEach(function(post){
        let postText = post.firstChild.textContent();
        if(postText.toLowerCase().indexOf(text) !=-1){
            post.style.display='block';
        } else {
            post.style.display='none';
        }
    })
};

// filterPosts();