searchButton.addEventListener('click', () => {
    titlePage.classList.add('hide');
    searchSection.classList.add('hide');
    searchSelectedMoviesSection.classList.remove('hide');
});
searchSelectedMoviesButton.addEventListener('click', () => {
    location.hash = `search=${searchFormInput.value}`;

    titlePage.classList.remove('hide');
    searchSection.classList.remove('hide');
    searchSelectedMoviesSection.classList.add('hide');
});
searchMoreButton.addEventListener('click', () => location.hash = 'trends');
titlePage.addEventListener('click', () => location.hash = 'home');

function trendsPage() {
    principalPage.classList.add('hide');
    selectedMovie.classList.add('hide');
    searchMoviesTag.classList.remove('hide');
    searchMoreButton.classList.add('hide');
    searchMovies.style.display = 'flex';

    searchMoviesTag.innerHTML = 'Tendencias';

    getTrendingMovies();
}

function searchPage() {
    principalPage.classList.add('hide');
    selectedMovie.classList.add('hide');
    searchMoviesTag.classList.add('hide');
    searchMoreButton.classList.remove('hide');
    searchMovies.style.display = 'flex';

    const [_, query] = location.hash.split('=');
    getMoviesBySearch(decodeURI(query));
}

function moviePage() {
    principalPage.classList.add('hide');
    selectedMovie.classList.remove('hide');
    searchMoviesTag.classList.add('hide');
    searchMoreButton.classList.remove('hide');

    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId);
}

function categoryPage() {
    principalPage.classList.add('hide');
    selectedMovie.classList.add('hide');
    searchMoviesTag.classList.remove('hide');
    searchMoreButton.classList.add('hide');
    searchMovies.style.display = 'flex';

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    searchMoviesTag.innerHTML = decodeURI(categoryName);

    getMoviesByCategory(categoryId);
}

function homePage() {
    principalPage.classList.remove('hide');
    selectedMovie.classList.add('hide');
    searchMoviesTag.classList.add('hide');
    searchMoreButton.classList.remove('hide');

    searchMovies.style.display = 'none';

    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function navigator() {
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        moviePage();
    } else if (location.hash.startsWith('#category=')) {
        categoryPage();
    } else {
        homePage();
    }

    window.scrollTo(0,0);
}

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);