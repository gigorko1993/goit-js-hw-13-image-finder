// import './sass/main.scss';
// import getRefs from '../src/js/markup.js';
// import API from '../src/js/apiService.js';
// import imageCardsTpl from '../src/templates/imageCard.hbs';
// import { error } from '@pnotify/core';
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';

// const debounce = require('lodash.debounce');
// const refs = getRefs();

// const elPerPage = 12;
// let currentPageNumb = 1;
// // let intersectionObserver;

// refs.input.addEventListener('input', debounce(onSearch, 500));

// function onSearch(e) {
//   e.preventDefault();

//   const inputedText = e.target.value.trim();

//   API.fetchImages(inputedText, currentPageNumb, elPerPage).then(renderImageCard);
// }

// function renderImageCard(image) {
//   refs.cardContainer.innerHTML = '';
//   if (image.hits.length > 0) {
//       const markup = imageCardsTpl(image);
//     refs.cardContainer.innerHTML = markup;
//   } else {
//  error({
//       text: 'Too many matches found. Please enter a more specific query!',
//       delay: 3500,
//     });
//   }
   
//    return;
// }
