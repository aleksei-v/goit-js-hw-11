export default function getRefs() {
    return {
        imageGallery: document.querySelector('.gallery'),
        searchInput: document.querySelector('input'),
        form: document.querySelector('.search-form'),
        loadMoreBtn: document.querySelector('.load-more')
    };
}