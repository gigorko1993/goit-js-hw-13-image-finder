import './sass/main.scss';
import getRefs from '../src/js/markup.js';
import ImageApiService from '../src/js/apiService.js';
import imageCardsTpl from '../src/templates/imageCard.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import 'material-icons/iconfont/material-icons.css';

const basicLightbox = require('basiclightbox');
const debounce = require('lodash.debounce');

const refs = getRefs();
const imageApiService = new ImageApiService();

refs.input.addEventListener('input', debounce(onSearch, 500));
refs.imgIconEl.addEventListener('click', onDisplayBigImg);

function onSearch(e) {
  e.preventDefault();

  imageApiService.query = e.target.value.trim();
  if (!imageApiService.query.length) {
    error({
      text: 'Please change inputed query',
      delay: 3500,
    });
    return clearImageCard();
  }
  clearImageCard();
  imageApiService.resetPage();
  imageApiService.fetchImages().then(res => {
    renderImageCard(res);
    imageApiService.incrementPage();
  });
}

function renderImageCard(image) {
  if (image.length <= 0) {
    error({
      text: 'Can`t find empty query. Please< enter, what you want to find!',
      delay: 3500,
    });
    return;
  }
  const markup = imageCardsTpl(image);
  return (refs.cardContainer.innerHTML += markup);
}

function clearImageCard() {
  return (refs.cardContainer.innerHTML = '');
}

const onEntry = entries => {
  entries.forEach(element => {
    if (element.isIntersecting && imageApiService.query !== '') {
      imageApiService.fetchImages().then(res => {
        renderImageCard(res);
        imageApiService.incrementPage();
        refs.buttonUpEl.classList.remove('visually-hidden')
      });
    }
  });
};
const options = {
  rootMargin: '200px',
};
const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.watcher);

function onDisplayBigImg(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  console.log(e.target.dataset.lightbox);
  const instance = basicLightbox.create(`
    <img src="${e.target.dataset.lightbox}" alt="${e.target.alt}">
`);
  instance.show();
  return;
}
