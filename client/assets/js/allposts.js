const filter = document.getElementById('filter');
filter.addEventListener('keyup', filterPosts);

const allPosts = document.querySelector('#allPosts'); // 'allPosts may not be specific enough'

allPosts.addEventListener('click', (e) => {
    console.log(e)
    fetch('localhost:3000/posts')
    .then(resp => resp.json())
    .then(result => appendResult(result))
    .catch(console.warn);
})















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

filterPosts();