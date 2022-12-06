// write your code here

fetch('http://localhost:3000/ramens')
.then(resp => resp.json())
.then(data => {
    ramenCollector(data);
    ramenImgInit(ramenContainer);
    ramenDetails();
})

// console.log(data);

const ramenMenu = document.querySelector('div#ramen-menu');
const ramenForm = document.querySelector('form#new-ramen');
const ramenDeets = document.querySelector('div#ramen-detail');

const ramenImg = document.querySelector('img.detail-image');
const ramenName = document.querySelector('h2.name');
const ramenRest = document.querySelector('h3.restaurant');
const ramenRating = document.querySelector('span#rating-display');
const ramenComment = document.querySelector('p#comment-display');

const ramenContainer = []
const ramenSubmit = []

let submitCounter = 10;

function ramenCollector(param) {
    param.forEach( (ramenObj, i) => {
        ramenContainer.push(param[i]);
    })
    console.log(ramenContainer);
}

function ramenImgInit(source) {
    source.forEach((keyValue) => {
        ramenBuilder(keyValue)
    }
)}

function ramenBuilder(source) {
    const img = document.createElement('img')
    img.src = source.image;
    img.alt = source.name;
    if (source.id <= 5) {
        img.className = 'menu-img';
        img.id = source.id-1;
    } else {
        img.id = source.id;
        console.log(`${source}`)
    }
    ramenMenu.append(img);
}

function ramenDetails(id = 0) {
    let container = ''
    if (id >= 10) {
        container = ramenSubmit;
        id -= 10;
    } else {
        container = ramenContainer;
    }
    // ramenDeets.children[2].innerText - ramenContainer[id].restaurant; /* Won't work for some reason. Preserved for observation. */
    ramenImg.src = container[id].image;
    ramenName.innerText = container[id].name;
    ramenRest.innerText = container[id].restaurant;
    ramenRating.innerText = container[id].rating;
    ramenComment.innerText = container[id].comment;
}

function newRamen() {
    const newRName = document.querySelector('input#new-name').value;
    const newRRest = document.querySelector('input#new-restaurant').value;
    const newRImg = document.querySelector('input#new-image').value;
    const newRRating = document.querySelector('input#new-rating').value
    const newRComment = document.querySelector('textarea#new-comment').value;

    const newRamen = {};
        newRamen.comment = newRComment;
        newRamen.id = submitCounter;
        newRamen.image = newRImg;
        newRamen.name = newRName;
        newRamen.rating = newRRating;
        newRamen.restaurant = newRRest;

    return ramenSubmit.push(newRamen);
}

ramenMenu.addEventListener('click', e => {
    ramenDetails(e.target.id);
})

document.addEventListener('submit', e => {
    e.preventDefault();
    newRamen();
    ramenBuilder(ramenSubmit[ramenSubmit.length-1])
    ramenForm.reset();
    submitCounter++
})