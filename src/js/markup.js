export default function getRefs() {
  return {
    cardContainer: document.querySelector('.gallery'),
    input: document.querySelector('.search-form'),
    watcher: document.querySelector('#watcher'),
    imgIconEl: document.querySelector('.gallery'),
    buttonUpEl: document.querySelector('.button-up'),
  };
}
