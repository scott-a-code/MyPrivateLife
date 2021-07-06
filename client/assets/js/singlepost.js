const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get('id');

getPost(postId);

let postButton = document.querySelector('table thead button');
postButton.addEventListener('click', (event) => {
    let textField = document.querySelector('table thead input');
    let comment = textField.value;
    if (comment) {
        addComment(comment,postId);
    }
})

document.addEventListener('keydown', (event) => {
    if(event.keyCode === 13) {
        let button = document.querySelector('table thead button');
        button.click();
    }
})


function getPost(id) {
  fetch(`http://localhost:3000/posts/${id}`)
    .then(function(res){
      if(!res.ok) {
        throw new Error("HTTP error " + res.status)
      }
      return res.json()
    })
    .then(function(data) {
        updateUI(data);
    })
    .catch(err => console.log(err))
}

function updateUI(data) {

    let gifImageUrl = data.gif.url;
    let numComments = data.comments.length;
    let datePosted = data.timestamp;

    let {heart: numHearts, thumbsUp: numThumbs, angryFace: numAngry} = data.reactions;

    let titleBox = document.querySelector('.single-post .post-title');
    titleBox.textContent = data.title;

    let bodyBox = document.querySelector('.single-post .post-content');
    bodyBox.textContent = data.content;

    let gif = document.querySelector('.single-post img');
    gif.src = gifImageUrl;

    getComments(data.comments);

    let commentsCount = document.querySelector('.single-post .comment-count');
    commentsCount.textContent = numComments;
    let heartCount = document.querySelector('.single-post .heart-count');
    heartCount.textContent = numHearts;
    let thumbCount = document.querySelector('.single-post .thumbs-count');
    thumbCount.textContent = numThumbs;
    let angryCount = document.querySelector('.single-post .angry-count');
    angryCount.textContent = numAngry;

    let date = format_time(datePosted,'full');
    let dateBox = document.querySelector('.single-post .date-posted');
    dateBox.textContent = date;

}

function getComments(commentArray) {

    let table = document.querySelector('.comments-table tbody');
    commentArray.forEach(comment => {

        let row = document.createElement('tr');
        let cell = document.createElement('td');
        let dateCell = document.createElement('td');

        cell.innerText = comment.commentText;
        dateCell.innerText = format_time(comment.dateCommented,'medium');

        row.appendChild(cell);
        row.appendChild(dateCell);
        table.appendChild(row);
    })
}

function addComment(string, id) {
    let data = {text: string};

    fetch(`http://localhost:3000/posts/${id}/comment`, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(res => {
        console.log("Request complete! response:", res);
        location.reload();
    });
}

function format_time(s,format) {
    const dtFormat = new Intl.DateTimeFormat('en-GB', {
      dateStyle: format,
      timeStyle: 'medium',
      timeZone: 'Europe/London'
    });
    
    return dtFormat.format(new Date(s * 1e3));
}