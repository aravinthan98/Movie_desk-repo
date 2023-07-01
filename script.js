async function callApi(page) {
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTQxNzBjNjQ3MjRkMDIyZTkyOTZhNWZhOTg2NDRlYiIsInN1YiI6IjY0OTAyNGE5MjYzNDYyMDBhZTFjZGI1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7il3x7f91baELU8ceqe8OYauvsHEJ-lC34vS3Gslqoc'
        }
    };
        
    let filmObj = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`, options)   
    let response = await filmObj.json();
    return response; // Prmoise returns
}

let page = 1;

let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('prev');
let current = document.getElementById('current');

pageControl(page);

async function renderingPage(page) {
    let filmDetail = await callApi(page);
    let fims = await filmDetail.results;

    fims.forEach((item)=> {
        let {poster_path, name, vote_average, vote_count} = item;   // Destructuring assignment       
        document.querySelector('.movie-card-container').innerHTML += 
        `<div class="movie-cards">
            <div class="poster">
                <img class="poster-size" src="https://image.tmdb.org/t/p/original${poster_path}" alt="movie-image">
                <div class="heart-icon">
                <i class="fa-solid fa-heart"></i>
                </div>
            </div>
            <div class="name-vote-sorting">
                <div class="movie-title">
                    ${name}
                </div>
                <div class="movie-vote">
                    Votes: ${vote_count}
                    <br>
                    Rating: ${vote_average}
                </div>
            </div>
        </div>`
    })
    if (page === 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    current.innerHTML = `Current Page : ${page}`;
}


async function pageControl(page) {    
    document.querySelector('.movie-card-container').innerHTML = "";
    renderingPage(page);    
}


nextBtn.onclick = function() {
    page++;   
    pageControl(page);
}
prevBtn.onclick = function() {
    if (page > 1) {
        page--;   
        pageControl(page);
    }
}
let fav=document.querySelector('.movie-card-container');


fav.onclick=(e)=>{
    console.log(e);
    if(e.target.className==="fa-solid fa-heart"){
           if(e.target.style.color="black"){
                e.target.style.color="red"
           }
           else{    
                e.target.style.color="black"
            }  

    }
    
    
}