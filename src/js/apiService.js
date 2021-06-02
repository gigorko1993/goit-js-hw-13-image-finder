import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&';
const ApiKey = '9062055-da883187fb30391728e11f5fd';

function fetchImages(name, pgNumber) {
  const url = `${BASE_URL}q=${name}&page=${pgNumber}&per_page=12&key=${ApiKey}`;
  return fetch(url).then(res => {
    if (!res.ok) {
      res.status === 404
        ? error({
            text: 'Sorry, we can`t find entered name of country. Please try to change inputed name.',
            delay: 3500,
          })
        : error({
            text: 'Sorry, it can be issues with server.',
            delay: 3500,
          });
    }
    return res.json();
  });
}

export default { fetchImages };
