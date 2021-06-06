import { error, success } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&';
const ApiKey = '9062055-da883187fb30391728e11f5fd';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const searchParams = new URLSearchParams({
      q: this.searchQuery,
      page: this.page,
      per_page: 12,
    });
    const url = `${BASE_URL}${searchParams}&key=${ApiKey}`;
    return fetch(url)
      .then(res => {
        if (!res.ok) {
          res.status === 404
            ? error({
                text: 'Sorry, we can`t find entered image. Please try to change inputed value.',
                delay: 3500,
              })
            : error({
                text: 'Sorry, it can be issues with server.',
                delay: 3500,
              });
        }
        if (this.page === 1) {
          success({
    title: 'Success!',
    text: 'Find all pictures that you search.',
    delay: 2000,
  });
        }
        return res.json();
      })
      .then(({ hits }) => hits);
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
