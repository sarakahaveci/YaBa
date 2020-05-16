'use strict';
/************************************ Declarations ***************************************/
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");
const homeBtn = document.querySelector("#homeBtn");
const test = document.querySelector(".test");
const actorsBtn = document.querySelector('#actorsBtn');
const topRatedBtn = document.querySelector('#topRated');
const upComingBtn = document.querySelector('#upComing');
const popularBtn = document.querySelector('#popular');
const nowPlayingBtn = document.querySelector('#nowPlaying');
const searchBtn = document.querySelector('#searchBtn');
const aboutBtn = document.querySelector('#aboutBtn')

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};
// You may need to add to this function, definitely don't delete it.
const movieDetails = async (id) => {
  const movieRes = await fetchMovie(id);
  const creditRes = await fetchCredits(id);
  const similarRes = await fetchSimilar(id); 
  const trailerRes = await fetchTrailer(id);
  renderMovie(movieRes,creditRes,similarRes,trailerRes);
};
const personDetails = async(id)=>{
  const actorRes = await fetchActor(id);
  renderActor(actorRes);
}
const actorspageDetails = async()=>{
  const actorsRes = await fetchActors();
  renderActors(actorsRes.results);
}

/********************* Fetching ******************************/
const fetchSearch = async (query) => {
   const search= await fetch (`https://api.themoviedb.org/3/search/multi?api_key=542003918769df50083a13c415bbc602&language=en-US&query=${query}`);
    const searchRes =  await search.json();
    return searchRes.results;
};
const fetchUpcoming = async () => {
  const url = constructUrl(`movie/upcoming`);
  const res = await fetch(url);
  const upComingRes= await res.json();
  renderMovies(upComingRes.results);
  // return res.json();
};
const fetchTopRated = async () => {
  const url = constructUrl(`movie/top_rated`);
  const res = await fetch(url);
  const topRatedRes= await res.json();
  renderMovies(topRatedRes.results);

};
const fetchLatest = async () => {
  const url = constructUrl(`movie/latest`);
  const res = await fetch(url);
  const latestRes= await res.json();
  console.log(latestRes)
  // renderMovies(latestRes.results);
  // return res.json();
};
const fetchPopular = async () => {
  const url = constructUrl(`movie/popular`);
  const res = await fetch(url);
  const popularRes= await res.json();
  renderMovies(popularRes.results);
};
// fetchPopular();
const fetchGenres = async () => {
  const url = constructUrl(`genre/movie/list`);
  const res = await fetch(url);
  return res.json();
};
const fetchCredits= async(movieId)=>{
  const url= constructUrl(`movie/${movieId}/credits`);
  const res = await fetch (url);
  return res.json();
}
const fetchActor = async (personid)=>{
const url = constructUrl(`person/${personid}`);
  const res = await fetch(url);
  return res.json();
}
const fetchActorCredit= async(personid) =>{
  const url = constructUrl(`person/${personid}/movie_credits`)
  const res = await fetch(url);
  return res.json();
}
const fetchActors = async ()=>{
const url = constructUrl(`person/popular`);
const res = await fetch(url);
  return res.json();
}
const fetchSimilar = async(movieId)=>{
  const url = constructUrl(`movie/${movieId}/similar`);
  const res = await fetch(url);
  return res.json();
}
const fetchTrailer = async(movieId)=>{
  const url = constructUrl(`movie/${movieId}/videos`);
  const res = await fetch(url);
  return res.json();
}
  
  const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};
  const fetchOneGenre= async(idGenre) =>{
    const oneGenre= await fetch (`https://api.themoviedb.org/3/discover/movie?api_key=542003918769df50083a13c415bbc602&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${idGenre}`);
    const oneGenreRes =  await oneGenre.json()
   renderMovies(oneGenreRes.results);
  }

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};
/**********************************Render *****************************************/
// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies, shouldPreserveContainer) => {
  CONTAINER.setAttribute('class','container');
    if (!shouldPreserveContainer){
     CONTAINER.innerHTML = '';}
  const homeDiv = document.createElement("div");
  homeDiv.setAttribute("class","row")
  CONTAINER.appendChild(homeDiv);
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
        movieDiv.setAttribute("id","container");
        movieDiv.setAttribute("class","col-6 col-md-4 ");
  movieDiv.innerHTML = 
  `
<img class="movieImg" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${ movie.title } poster">
<h3 style="color:white;">${movie.title}</h3>
     ` ;
 movieDiv.addEventListener("click", () => {
      movieDetails(movie.id);
            });
    homeDiv.appendChild(movieDiv);
  });
};

// You'll need to play with this function in order to add features and enhance the style.

const renderMovie = (movie,credits,similar,trailer) => {
  CONTAINER.setAttribute('class','container-fluid')
  const actors = credits.cast.slice(0,5).map(function (actor){
    return `<div id="oneActor" >
    <img class="actorImg" id ="${actor.id}"  src=${BACKDROP_BASE_URL+ actor.profile_path} width= "300"><li class="actorName">${actor.name}</li> </div>`});

let director = [];
let crew = credits.crew;
  crew.forEach((e)=>{
 if(e.job ==="Director") {director.push(e.name) }});

let production= movie.production_companies.slice(0,3).map(function(e){
  return `<div class="oneProduction"><img src=${BACKDROP_BASE_URL+ e.logo_path} width="150"> 
  <p> ${e.name}</p> </div>
  `
});

let related = similar.results.slice(0,5).map(function(e){
return `<div class="oneSimilar">
<img class="similari" src ="${BACKDROP_BASE_URL+ e.backdrop_path} "width= 300 id="${e.id}"><li> ${e.title}</li></div>
`});

let trailerVideos = trailer.results.map(function(e){
  return `<div class="oneTrailer">
  <iframe width="300" height="315" src="https://www.youtube.com/embed/${e.key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><li> ${e.name}</li></div>`
  
})
  CONTAINER.innerHTML = `
             <img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.backdrop_path}>
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${movie.release_date}</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled">
               ${actors.join(" ")}
            </ul>
            </div>
            <h4>Director :${director} </h4>
              </div>
            <h4>Movie language:${movie.original_language}</h4>
            <h4>Up Votes: ${movie.popularity}</h4>
            <h4> Trailers:</h4>
            <ul id ="trailers">
            ${trailerVideos.join(" ")}
            </ul>
            <h4> production companies : </h4>
            <ul id="production">
            ${production.join(" ")}
            </ul>
            <h4> Similar Movies: </h4>
            <ul id= "similar">
            ${related.join(" ")}
            </ul>
            `;

    const actorsImg = document.querySelectorAll('.actorImg');
    actorsImg.forEach((actor)=>{
      actor.addEventListener('click', (e)=>{personDetails(e.target.id)})
    });
    let similari = document.querySelectorAll('.similari');
    similari.forEach((similar)=>{similar.addEventListener('click',(e)=>{movieDetails(e.target.id)})});
  }

async function renderActor(actor){
  CONTAINER.setAttribute('class','container-fluid')

  let actorGender= [];
  let gender = actor.gender;
  function pleaseWork (actor) {
    if (gender == 1){
      actorGender.push("Female")
    }
    else if( gender ==2){
actorGender.push("Male")
    }
    else{
      actorGender.push(" - ")
    }      
    return actorGender;}

  let moviesActed = await fetchActorCredit(actor.id);
  let abuabdo = moviesActed.cast;
  let emabdu = abuabdo.slice(0,5).map(function (abi){
    return `<div class="movie[]">
    <img class="movImg" src="${BACKDROP_BASE_URL + abi.poster_path}" alt="${abi.title}" width="300" id="${abi.id}"></img>
    <li> ${abi.title}</li>
    </div>
    `
  });
  CONTAINER.innerHTML= `
  <img id="actor-profile" src=${PROFILE_BASE_URL + actor.profile_path}>
  <h3>${actor.name}</h3> <span> Popularity:${actor.popularity}</span>
  <p> Actor Gender: ${pleaseWork(gender)}</p>
  <h4> Birthday: ${actor.birthday}</h4>
  <h4> Death Day: ${actor.deathday}</h4>
  <p> ${actor.biography}</p>
  <h3> Know For Movies:</h3>
  <ul id="moviesActed" class="list-unstyled">
  ${emabdu.join(" ")}
  </ul>
  `
 let abla = document.querySelectorAll('.movImg');
 abla.forEach((movie)=>{
   movie.addEventListener('click',(e)=> {movieDetails(e.target.id)}); 
});
}
function renderActors(res,shouldPreserveContainer){
      if (!shouldPreserveContainer){
     CONTAINER.innerHTML = '';}
  let rowDiv = document.createElement('div');
    rowDiv.setAttribute('class', 'row');
  let actorDiv =document.createElement('div')
    actorDiv.setAttribute('class','col-6 col-md-4');
    actorDiv.setAttribute('class','container');
  let results = res.map(function(e){
    return ` 
    <div class="actorpics">
  <div > 
    <img class="hi" id="${e.id}" src=${PROFILE_BASE_URL + e.profile_path}><h3>${e.name}</h3>
    </div></div>`
  });
  let knownfor = res.knownfor
actorDiv.innerHTML = ` ${results.join(" ")}`
CONTAINER.appendChild(actorDiv);
    const bye = document.querySelectorAll('.hi');
    bye.forEach((actor)=>{actor.addEventListener('click', (e)=>{personDetails(e.target.id)})});
} 
 async function renderGenres(){
  const genreRes = await fetchGenres();
  // console.log(genreRes);
  let genresDiv = document.getElementById('Genres');
  let abi = genreRes.genres.map(function(genre){
    let oneGenre = document.createElement('a');
    oneGenre.setAttribute('class', 'dropdown-item');
    oneGenre.setAttribute('id', 'oneGenre');
    oneGenre.value = genre.id;
    oneGenre.innerText = genre.name; 
    genresDiv.appendChild(oneGenre);
     oneGenre.addEventListener('click',async ()=>{
       await fetchOneGenre(genre.id)});
  });}

  
renderGenres();
function renderABout(){
  CONTAINER.innerHTML= `<h1> welcome to your Cinema Box website</h1>
  <p>Cinema Box is a non profit organization simply because we are not making any!</p>
    <h2>here where you can find all the movies you love</h2>
    <h4> for contact: conatct us via slack!
    
    || via github: Yamoonz & Bahaa Dabbagh</h4>`
}





/*********************Eventlisteners***************************/
popularBtn.addEventListener('click',fetchPopular);
document.addEventListener("DOMContentLoaded", autorun);
actorsBtn.addEventListener('click', actorspageDetails);
topRatedBtn.addEventListener('click',fetchTopRated);
upComingBtn.addEventListener('click',fetchUpcoming);
nowPlayingBtn.addEventListener('click',autorun);
homeBtn.addEventListener('click',autorun);
aboutBtn.addEventListener('click',renderABout);
searchBtn.addEventListener('input', async function renderSearch(input){
    let inputValue = searchBtn.value;
    let resSearch = await fetchSearch(inputValue);
    let moviesRes=[];
    let actorsRes= [];
      for (let i=0; i<resSearch.length; i++){
      if (resSearch[i].media_type === "movie"){
        moviesRes.push(resSearch[i]);
        }
      else if (resSearch[i].known_for_department === "Acting"){
      actorsRes.push(resSearch[i]);
       }
      }
      CONTAINER.innerHTML= '';
    renderActors(actorsRes, true);
    renderMovies(moviesRes, true);
    
  });




