import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";
import getRefs from './get-refs';
const refs = getRefs();
export default function renderMarkupImage(images) {
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

    refs.imageGallery.insertAdjacentHTML('beforeend', markup);

    const lightbox =  new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: 'alt',
        captionPosition: "top",
    });
    lightbox.refresh();
}