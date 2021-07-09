document.getElementById("gif-button").addEventListener("click", gifselection);
document.getElementById('postForm').addEventListener('submit', checkifposiblepost);
document.getElementById('postForm').addEventListener("keyup", stopenter);

/***** TEXTBOX *****/
//Tells you the amount of characters that are left
function showmaxtext(actual,limit){
    let p = document.getElementById('characters');
    let left = limit-actual.value.length;
    p.textContent = left + ' / ' + limit;
}

/***** GIPHY *****/
//Does the call to giphy [x] Tested
async function gifselection(e){
    e.preventDefault();
    let value = document.getElementById("gif-topic").value;
    document.getElementById("gif-topic").value = '';
    try{
        let data = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=aWqPT5uBm54EQ5x9ooFj4TpWjXxF0mNh&q=${value}&limit=10&offset=0&rating=g&lang=en`);
        let dataJson = await data.json();
        showgifs(dataJson);
    }catch(e){console.log(e)}                   
}

//Create the gif carousel [X] Tested
function showgifs(gifArray){
    let div = document.getElementById("gif-select")

    div.innerHTML = '';    
        
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
       
        img.setAttribute('loading',"lazy");
        
        input.setAttribute('value',JSON.stringify(gifArray));
        input.setAttribute('id', 'gif'+i);
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'gif');
        input.setAttribute('style','display:none');

        label.setAttribute('for','gif'+i);
        label.setAttribute('onclick',"putigiftop(this)");
        label.setAttribute('class','align-self-center mx-1');
        

        label.append(img);
        div.append(input);
        div.append(label);
        i++;
    }
    div.style.visibility='visible';
}

//Show the selected gif on top [ ]
function putigiftop(label){
    let div = document.getElementById('new-gif-container');
    div.innerHTML='';
    let input = document.getElementById(label.getAttributeNode("for").value);
    let src = JSON.parse(input.getAttributeNode("value").value);
    
    let img = document.createElement('img');
    img.setAttribute('loading',"lazy");
    img.src=src.still;
    img.setAttribute('onmouseover','changesrc(this,"'+src.moving+'")');
    img.setAttribute('onmouseout','changesrc(this,"'+src.still+'")');
    div.append(img);
}
//Changes the gif from static to moving
function changesrc(img,src){
    img.src = src;
}



/***** SERVER *****/
//Decide if its pertinent to do the call
function checkifposiblepost(event){
    event.preventDefault();

    let data = Object.fromEntries(new FormData(event.target));
    
    if(data.gif && data.title && data.content){

        data.gif = JSON.parse(data.gif);

        let datafinal  = JSON.stringify(data);
        dofetchpost(datafinal);  
    }
    else{
        if(!data.title) showerror('Title');
        else if(!data.content) showerror('Content');
        else showerror('Gif');
    }
};
//Do the call
function dofetchpost(data){
    let url = 'https://my-private-life.herokuapp.com/posts'
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: data
    }).then((resp) => {
        return resp.json();
    }).then((body) => {
        window.location.href = "./singlepost?id=" + body.id;
    }).catch((error) => {
        console.log(error)
    });
}

/***** AUXILIARS *****/
//Change the focus to the pertinent input area
function focuson(direction){
    document.getElementById(direction).focus();
}

//Inform the user of the things needed
function showerror(str){
    let p = document.getElementById('errormesage');
    p.textContent = str + ' needed';
    p.style.visibility = 'visible';
    if(str != 'Gif') {
        focuson(str.toLowerCase());
    }
}

//Stop the enter key from submiting the form
function stopenter(event) {
    event.preventDefault();
    if(event.keyCode == 13){
        document.getElementById("gif-button").click();
    }
};

module.exports = {
    dofetchpost,
    showmaxtext,
    gifselection,
    showgifs,
    putigiftop,
    checkifposiblepost,
    focuson,
    stopenter,
    showerror,
}