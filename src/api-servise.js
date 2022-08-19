const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29344845-320c81c87bec30b6c30cddfd7';
const axios = require('axios');


async function fetchImages(value, step) {
  
    const url = `${BASE_URL}?key=${API_KEY}&q=${value}`;
    const images = await axios.get(url, {
        page: step,
        params: {
        per_page: 40,
        page: step,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    }})
    
    return images;
}

export default fetchImages