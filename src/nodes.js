const $ = (id) => document.querySelector(id);

// Sections
const principalPage = $('.principal-page');
const selectedMovie = $(".selected-movie");
const searchMovies = $(".search-movies");
const searchSection = $(".search");
const searchSelectedMoviesSection = $(".search-selected-movies");
const searchMoviesTag = $(".search-movies .search-movies--tag");
const searchMoviesList = $(".search-movies .search-movies--list");

// Lists & Containers
const trendingPreviewMovies = $('.principal-page .movies');
const previewCategoriesContainer = $('.principal-page .categories .categories-selection > ul');
const movieDetailCategoriesContainer = $(".selected-movie .categories-selection ul");
const recommendationsMoviesContainer = $(".selected-movie .recommendations .recommendations-movies");
const distributionPersons = $(".selected-movie .distribution .distribution-persons");

// Elements
const searchButton = $(".search .search-logo");
const searchSelectedMoviesButton = $(".search-selected-movies .search-logo");
const searchFormInput = $("#search-text");
const searchMoreButton = $(".search-movies--more");
const titlePage = $(".header-title");
const movieDetailBackground = $(".selected-movie .front-page");
const movieDetailTitle = $(".selected-movie--description .selected-movie--principal .title");
const movieDetailScore = $(".selected-movie--description .selected-movie--principal .punctuation");
const movieDetailDescription = $(".selected-movie--description .selected-movie--resume p");