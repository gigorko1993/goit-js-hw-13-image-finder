import './sass/main.scss';
import getRefs from '../src/js/markup.js';
import ImageApiService from '../src/js/apiService.js';
import imageCardsTpl from '../src/templates/imageCard.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import 'material-icons/iconfont/material-icons.css';

const basicLightbox = require('basiclightbox');

const imageApiService = new ImageApiService();

const debounce = require('lodash.debounce');
const refs = getRefs();


refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  imageApiService.query = e.target.value.trim();
  console.log(imageApiService.query.length)
  if (!imageApiService.query.length) {
    error({
      text: 'Please change inputed query',
      delay: 3500,
    });
   return refs.cardContainer.innerHTML = '';
  }
  imageApiService.resetPage();
  imageApiService.fetchImages().then(res => {
    renderImageCard(res);
    imageApiService.incrementPage();
    });
}

function renderImageCard(image) {
  refs.cardContainer.innerHTML = '';
  console.log(image.length)
  if (image.length > 0) {
      const markup = imageCardsTpl(image);
    refs.cardContainer.innerHTML = markup;
    imageEl.forEach(e => {e.addEventListener('click', onImgClicked(image.largeImageURL));})
  } else {
    error({
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 3500,
    });
  }
   return;
}

const onEntry = entries => {
  entries.forEach(element => {
    if (element.isIntersecting && imageApiService.query !== '') {
      imageApiService.fetchImages().then(res => {
        renderImageCard(res);
        imageApiService.incrementPage()
      });
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '100px',
});
observer.observe(refs.watcher);

const imageEl = document.querySelectorAll('.js-ligthbox');
function onImgClicked(value){
  const instance = basicLightbox.create(
        `<template>
        <div class="modal">
        <img src=${value} alt="{{tags}}"/>
        </div>
    </template>`
  )
  
  instance.show()
}