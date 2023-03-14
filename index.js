const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=eeef04e64851af2e7c191586f2274f39&page=1";

const IMG_Path = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=eeef04e64851af2e7c191586f2274f39&query=''";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

const getMovies = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);
    showMovies(data.results);
  } catch (e) {
    console.log("error:(", e);
  }
};
getMovies(API_URL);
form.addEventListener("submit", (e) => {
    e.preventDefault();
  const searchTerm = search.value; //try form.elements.query.value, where the name of input = 'query'
  if (searchTerm && searchTerm != "") {
    //if searchTerm exists, and searchTerm is not equal to empty,
    getMovies(SEARCH_API + searchTerm);
    search.value = ""; //to clear the input field after the results have been shown
  } else {
    //when you submit without anything in the input field
    window.location.reload(); //it will reload the page.
  }
});

function showMovies(movies) {
  for (let movie of movies) {
    const { title, poster_path, vote_average, overview, popularity } = movie; //deconstruction
    const movieEL = document.createElement("div");

    movieEL.classList.add("movie");
    movieEL.innerHTML = `
        <img src="${IMG_Path + poster_path}"
            alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        <h3 id="popularity">${popularity}</h3>
    `;
    main.append(movieEL)
  }
}

function getClassByRate(votes){
    if(votes >= 8) {
        return 'green'
    }else if(votes >= 5){
        return 'orange'
    }else {
        return 'red'
    }
}

//alternatively
// const getMovies = async() => {
//     const res = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=eeef04e64851af2e7c191586f2274f39&page=1')
//     const data = await res.json()
//     console.log(data)
// }
// getMovies()

//alternatively
// async function getMovies(url){
//     try{
//         const res = await fetch(url)
//         const data = await res.json()
//         console.log(data)
//     }catch(e) {
//         console.log('error:(', e)
//     }
// }
// getMovies(API_URL)
