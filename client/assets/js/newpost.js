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
            moving: gif.images.fixed_width.url,
            still: gif.images.fixed_width_still.url
        };

        img.setAttribute('src', gif.images.fixed_width.url);
        img.setAttribute('class','rounded');
        
        input.setAttribute('value',JSON.stringify(gifArray));
        input.setAttribute('id', 'gif'+i);
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'gif');
        input.setAttribute('style','display:none');

        label.setAttribute('for','gif'+i);
        label.setAttribute('onclick',"''");
        label.setAttribute('class','align-self-center mx-1');
        

        label.append(img);
        div.append(input);
        div.append(label);
        i++;
    }
}

document.getElementById('postForm').addEventListener('submit', (event) => {
    let url = 'http://localhost:3000/posts'
    event.preventDefault();

    let data = Object.fromEntries(new FormData(event.target));
    data.gif = JSON.parse(data.gif);
    let datafinal  = JSON.stringify(data);
    
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: 'POST',
        body: datafinal
    }).then((resp) => {
        return resp.json();
    }).then((body) => {
        console.log(body);
        window.location.href = "./singlepost?id=" + body.id;
    }).catch((error) => {
        console.log(error)
    });
});

document.getElementById('postForm').addEventListener("keyup", function(event) {
    if(event.keyCode == 13){
        event.preventDefault(); 
    }   
});

function showmaxtext(actual,limit){
    let p = document.getElementById('characters');
    let left = limit-actual.value.length;
    p.textContent = left + ' / ' + limit;
}