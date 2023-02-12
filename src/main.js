const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': apiKey,
        'language': 'es'
    }
});

function loadMovies(data, container) {
    const movies = data.results;
    container.innerHTML = '';

    movies.forEach(movie => {
        const movieImg = document.createElement('img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);
        movieImg.addEventListener('click', () => location.hash = `movie=${movie.id}`);
        container.appendChild(movieImg);
    });
}
function loadMovies2(data, container) {
    const movies = data.results;
    container.innerHTML = '';

    movies.forEach(movie => {
        const movieImg = document.createElement('img');
        movieImg.setAttribute('alt', movie.name);
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.logo_path}`);
        container.appendChild(movieImg);
    });
}

function loadCategories(data, container) {
    const categories = data.genres;
    container.innerHTML = '';

    categories.forEach(category => {
        const categoryList = document.createElement('li');
        const categoryTitle = document.createElement('p');
        categoryTitle.setAttribute('id', category.id);
        categoryTitle.addEventListener('click', () => location.hash = `category=${category.id}-${category.name}`);
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryList.appendChild(categoryTitle);
        container.appendChild(categoryList);
    });
}

async function getTrendingMoviesPreview() {
    const { data } = await api(`trending/movie/day`);

    loadMovies(data, trendingPreviewMovies);
}

async function getCategoriesPreview() {
    const { data } = await api(`genre/movie/list`);

    loadCategories(data, previewCategoriesContainer);
}

async function getMoviesByCategory(id) {
    const { data } = await api(`discover/movie`, {
        params: {
            with_genres: id
        }
    });

    loadMovies(data, searchMoviesList);
}

async function getMoviesBySearch(query) {
    const { data } = await api(`search/company`, {
        params: {
            query
        }
    });
    loadMovies2(data, searchMoviesList);
}

async function getTrendingMovies() {
    const { data } = await api(`trending/movie/day`);

    loadMovies(data, searchMoviesList);
}

async function getRelatedMoviesId(id) {
    const { data } = await api(`movie/${id}/recommendations`);

    loadMovies(data, recommendationsMoviesContainer);
}

async function getDistributionMovieId(id) {
    const { data } = await api(`movie/${id}/credits`);

    const casts = data.cast;
    distributionPersons.innerHTML = '';

    casts.forEach(cast => {
        const castSection = document.createElement('section');
        castSection.classList.add('distribution-persons--card');

        const castImg = document.createElement('img');
        castImg.setAttribute('alt', cast.name);
        castImg.setAttribute('src', `https://image.tmdb.org/t/p/w200${cast.profile_path}`);
        const castName = document.createElement('p');
        castName.classList.add('distribution-persons--name');
        castName.innerText = cast.name;
        const castCharacter = document.createElement('p');
        castCharacter.classList.add('distribution-persons--character');
        castCharacter.innerText = cast.character;
        const castEpisodes = document.createElement('p');
        castEpisodes.classList.add('distribution-persons--episodes');
        castEpisodes.innerText = cast.cast_id;

        castSection.append(castImg, castName, castCharacter, castEpisodes);
        distributionPersons.appendChild(castSection);
    });
}

async function getMovieById(id) {
    const { data: movie } = await api(`movie/${id}`);

    const movieImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieDetailBackground.style.backgroundImage = `url(${movieImgUrl})`;

    movieDetailTitle.textContent = movie.title;
    movieDetailScore.textContent = movie.vote_average.toFixed(1) + '⭐';
    movieDetailDescription.textContent = movie.overview;

    loadCategories(movie, movieDetailCategoriesContainer);

    getDistributionMovieId(id);
    getRelatedMoviesId(id);
}