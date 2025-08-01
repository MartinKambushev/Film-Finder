const tmdbKey = '08f78b11cf6d19a28afc072ae91f9fa3';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async() => {
    const genreRequestEndpoint = '/genre/movie/list';
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const genres = jsonResponse.genres;
            return genres;
        }

    } catch (error) {
        console.log(error)
    }


};

const getMovies = async() => {
    const discoverMovieEndpoint = '/discover/movie';
    const selectedGenre = getSelectedGenre();
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
    const with_genres = selectedGenre;
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const movies = jsonResponse.results;
            return movies;
        }
    } catch (error) {
        console.log(error)
    }
};

const getMovieInfo = async(movie) => {
    const movieId = movie.id;
    const movieEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`
    const urlTofetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlTofetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }

    } catch (error) {
        console.log(error)
    }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async() => {
    const movies = await getMovies();
    const randomMovie = getRandomMovie(movies);
    const info = await getMovieInfo(randomMovie);
    const movieInfo = document.getElementById('movieInfo');
    if (movieInfo.childNodes.length > 0) {
        clearCurrentMovie();
    }
    displayMovie(info);
};
getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;