const moviesInput = document.querySelector(".random-movies-input");
const searchButton = document.querySelector(".submit-button");
const contentSectionContent = document.querySelectorAll(
  ".content-section-content"
);

const movieSection = document.querySelector(".movie-section");
const singleMovieInFull = document.querySelector(".single-movie-in-full");
const homeHero = document.querySelector(".hero-section");

const apiKey = "11763de4";
// const url = `https://www.omdbapi.com/?s=${genre}&apikey=${apiKey}`;

searchButton.addEventListener("click", async function (e) {
  e.preventDefault();
  contentSectionContent.forEach((section) => (section.innerHTML = ""));
  const value = await fetchUrl();
  createMovies(value);
});
window.addEventListener("keydown", async function (e) {
  if (e.key == "Enter") {
    contentSectionContent.forEach((section) => (section.innerHTML = ""));
    const value = await fetchUrl();
    createMovies(value);
  }
});

async function fetchUrl() {
  const query = moviesInput.value;
  const myUrl = `https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${query}`;
  const res = await fetch(myUrl);

  const data = await res.json();
  console.log(data);
  moviesInput.value = "";
  return data;
}

function createMovies(value) {
  console.log(value.Search);

  value.Search.forEach((movie) => {
    const singleMovie = document.createElement("div");

    singleMovie.innerHTML = `<div class="single-movie">
                <div class="image">
                  <img style="width:230px; height: 250px" class="img" id="${
                    movie.imdbID
                  }" src=${movie.Poster} alt="${movie.Title}" />
                </div>
                <div class="title-rating">
                  <div>
                    <p class="title">${movie.Title.slice(0, 10)}</p>
                    <div class="line"></div>
                    <p class="year-text">${movie.Year}</p>
                  </div>
                  <div class="rating-circle" data-percentage="75">
                    <div class="inner-circle">
                      <div class="label">75%</div>
                    </div>
                  </div>
                </div>
              </div>`;
    homeHero.style.backgroundImage = `url(${value.Search[2].Poster})`;
    Array.from(contentSectionContent).forEach((section) => {
      section.appendChild(singleMovie.cloneNode(true));
    });
  });
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("img")) {
    console.log(e.target.id);

    const myUrl = `https://www.omdbapi.com/?i=${e.target.id}&apikey=${apiKey}`;
    fetch(myUrl)
      .then((response) => response.json())
      .then((data) => {
        movieSection.classList.add("hidden");
        singleMovieInFull.classList.remove("hidden");
        const smHeroSection = document.querySelector(".sm-hero-section");
        smHeroSection.style.backgroundImage = `linear-gradient(
      to right,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    url("${data.Poster}")`;

        const movieTitle = document.querySelector(".movie-title");
        const moviePlot = document.querySelector(".movie-desc");
        const allmovieinfo = document.querySelector(".allmovieinfo");
        allmovieinfo.innerHTML = `
        
            <p class="style">Genre 🔥: ${data.Genre}</p>
            <p class="style">Starring 👪: ${data.Actors}</p>
            <p class="style">Country 🚩: ${data.Country}</p>
            <p class="style">Audio 🔊: ${data.Language}</p>
            <p class="style">Runtime ⌛: ${data.Runtime}</p>`;

        movieTitle.textContent = data.Title;
        moviePlot.textContent = data.Plot;
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      });
  }
});
