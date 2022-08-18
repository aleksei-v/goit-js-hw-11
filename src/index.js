import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29344845-320c81c87bec30b6c30cddfd7';
const axios = require('axios');
let page = 1;

const refs = {
    searchButton: document.querySelector('.submit-button'),
    imageGallery: document.querySelector('.gallery'),
    searchInput: document.querySelector('input'),
    form: document.querySelector('.search-form'),
}
async function fetchImages(name) {
    try {
    const url = `${BASE_URL}?key=${API_KEY}&q=${name}`;
    const images = await axios.get(url, {
        params: {
        per_page: 40,
        page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    }})
    return images;
    }
    catch {
        throw new Error(response.status);
    }
}


const searchPhotoByName = (evt) => {
    evt.preventDefault();
    const inputName = refs.searchInput.value;
 
        
    fetchImages(inputName)
        .then(showImageGallery)
        .catch(() => {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        });
    page += 1;


}
  

refs.form.addEventListener('submit', searchPhotoByName);

function showImageGallery(images) {
        const totalHits = images.data.totalHits

    if (images.data.hits.length === 0) {
           Notify.failure('Sorry, there are no images matching your search query. Please try again.');
           clearImageGallery();
           return;
            }
    if (refs.searchInput.value === '') {
        clearImageGallery(images.data.hits)
        return;
    } else {
        Notify.success(`Hooray! We found ${totalHits} images.`)
        renderMarkupImage(images.data.hits)
    }
    
}
function renderMarkupImage(images) {
    const markup = images
        .map(
            ({
                webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads
            }) => `<div class="photo-card">
                    <a class="info-item__link" href="${largeImageURL}">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" width="500px" height="400px"/>
                    </a>
                    <div class="info">
                        <p class="info-item">
                        <b>Likes ${likes}</b>
                        </p>
                        <p class="info-item">
                        <b>Views ${views}</b>
                        </p>
                        <p class="info-item">
                        <b>Comments ${comments}</b>
                        </p>
                        <p class="info-item">
                        <b>Downloads ${downloads}</b>
                        </p>
                    </div>
                    </div>`
            
        )
        .join('');

    refs.imageGallery.innerHTML = markup;

    const lightbox =  new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: 'alt',
        captionPosition: "top",
    });
    lightbox.refresh();
}

function clearImageGallery() {
    refs.imageGallery.innerHTML = '';
}

