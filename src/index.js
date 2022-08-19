import { Notify } from 'notiflix/build/notiflix-notify-aio';
import renderMarkupImage from './render-markup'
import fetchImages from './api-servise';
import getRefs from './get-refs';
const refs = getRefs();

let value = null;
let step = 1;

refs.loadMoreBtn.classList.add('is-hidden');

const searchPhotoByName = (evt) => {
    evt.preventDefault();
    value = evt.target.searchQuery.value;
    step = 1;
    clearImageGallery();
    fetchImages(value, step)
        .then(showImageGallery)
        .catch(error => console.log(error));
}

function onLoadMore() {
    step += 1
    fetchImages(value, step)
        .then(data => onClickLoadMore(data, step))
        .catch(error => console.log(error));
}



refs.form.addEventListener('submit', searchPhotoByName);
refs.loadMoreBtn.addEventListener('click', onLoadMore)


function onClickLoadMore(response, step) {
    const countTotalPhoto = response.data.totalHits;
    const allImage = response.data.hits;
    const totalPages = countTotalPhoto / 40;
    console.log(step > totalPages);
    
    if (step > totalPages) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notify.info("We're sorry, but you've reached the end of search results.");
    };
    renderMarkupImage(allImage);
}

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
        Notify.success(`Hooray! We found ${totalHits} images.`);
        checkPhotoAmount(images)
        renderMarkupImage(images.data.hits)
    }
}

function checkPhotoAmount(response) {
    const photoPerPage = 40;
    const dataTotalHits = response.data.totalHits;
    if (dataTotalHits > photoPerPage) {
        refs.loadMoreBtn.classList.remove('is-hidden')
    } else {
        refs.loadMoreBtn.classList.add('is-hidden')
    }
}

function clearImageGallery() {
    refs.imageGallery.innerHTML = '';
    refs.loadMoreBtn.classList.add('is-hidden')
}


