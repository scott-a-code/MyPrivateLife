getRandomPost();

function getRandomPost() {
  fetch('https://my-private-life.herokuapp.com/posts/random')
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

    let gifImageUrl = data.gif.moving;
    let numComments = data.comments.length;
    let datePosted = data.timestamp;

    let {heart: numHearts, thumbsUp: numThumbs, angryFace: numAngry} = data.reactions;

    let link = document.querySelector('.random-post a');
    link.href = "singlePost?id=" + data.id;

    let titleBox = document.querySelector('.random-post .post-title');
    titleBox.textContent = data.title;

    let bodyBox = document.querySelector('.random-post .post-content');
    bodyBox.textContent = data.content;

    let gif = document.querySelector('.random-post img');
    gif.src = gifImageUrl;

    let commentsCount = document.querySelector('.random-post .comment-count');
    commentsCount.textContent = numComments;
    let heartCount = document.querySelector('.random-post .heart-count');
    heartCount.textContent = numHearts;
    let thumbCount = document.querySelector('.random-post .thumbs-count');
    thumbCount.textContent = numThumbs;
    let angryCount = document.querySelector('.random-post .angry-count');
    angryCount.textContent = numAngry;

    let date = format_time(datePosted);
    let dateBox = document.querySelector('.random-post .date-posted');
    dateBox.textContent = date;

}

function format_time(s) {
    const dtFormat = new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'full',
      timeStyle: 'medium',
      timeZone: 'UTC'
    });
    
    return dtFormat.format(new Date(s * 1e3));
  }