import * as axios from 'axios';
const BASE_URL = 'http://172.16.29.12:3005';
function upload2(formData) {
    const url = `${BASE_URL}/photos/upload`;
    return axios.post(url, formData)
        // get data
        .then(x => x.data)
        // add url field
        .then(x => x.map(img => Object.assign({},
            img, { url: `${BASE_URL}/images/${img.id}` })));
}

export { upload2 }