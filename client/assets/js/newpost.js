document.getElementById("gif-button").addEventListener("click", gifselection);

async function gifselection(e){
    e.preventDefault();
    let value = document.getElementById("gif-topic").value;
    document.getElementById("gif-topic").value = '';
    let data = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=aWqPT5uBm54EQ5x9ooFj4TpWjXxF0mNh&q=${value}&limit=10&offset=0&rating=g&lang=en`);
    let dataJson = await data.json();
    showgifs(dataJson)                   
}


function showgifs(gifArray){
    let div = document.getElementById("gif-select")

    div.innerHTML = '';
    console.log(gifArray.data);
    
        
    let i=1;
    for(gif of gifArray.data){
        let input = document.createElement('input');
        let label = document.createElement('label');
        let img = document.createElement('img');
        let gifArray =
        {
            url:[ 
                { moving: gif.images.fixed_width.url},
                { still: gif.images.fixed_width_still.url}
            ]
        };

        img.setAttribute('src', gif.images.fixed_width.url);
        img.setAttribute('class','img-fluid rounded');
        
        input.setAttribute('value',JSON.stringify(gifArray));
        input.setAttribute('id', 'gif'+i);
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'gif');
        input.setAttribute('style','visibility:hidden');

        label.setAttribute('for','gif'+i);
        label.setAttribute('onclick',"''");
        label.setAttribute('class','col-2 align-self-center');
        

        label.append(img);
        div.append(label);
        div.append(input);
        i++;
    }

    //finalgifHover(Json)
}

//Todo
function gitOnTop(value){

}
/*
//Todo
function submitPost(event){
    let url = 'localhost:3000'

    event.preventDefault();
    // TODO do something here to show user that form is being submitted
    fetch(url, {
        method: 'POST',
        body: new URLSearchParams(new FormData(event.target)) // event.target is the form
    }).then((resp) => {
        return resp.json(); // or resp.text() or whatever the server sends
    }).then((body) => {
        window.location.href = "./?id=" + body.id;
    }).catch((error) => {
        console.log(error)
    });
}
*/

document.getElementById('postForm').addEventListener('submit', (event) => {
    let url = 'http://localhost:3000/posts'
    event.preventDefault();

    let data = Object.fromEntries(new FormData(event.target));
    //console.log(data.gif);
    data.gif = JSON.parse(data.gif);
    //console.log(data.gif);
    let datafinal  = JSON.stringify(data);
    
    // TODO do something here to show user that form is being submitted
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: datafinal // event.target is the form
    }).then((resp) => {
        return resp.json(); // or resp.text() or whatever the server sends
    }).then((body) => {
        console.log(body);
        window.location.href = "./?id=" + body.id;
    }).catch((error) => {
        console.log(error)
    });
});