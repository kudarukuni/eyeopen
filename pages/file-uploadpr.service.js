import * as axios from 'axios';
const BASE_URL = 'http://172.16.29.12:3003';
function upload1(formData1) {
    const url = `${BASE_URL}/photos/upload`;
    return axios.post(url, formData1)
        // get data
        .then(x => x.data)
        // add url field
        .then(x => x.map(img => Object.assign({},
            img, { url: `${BASE_URL}/images/${img.id}` })));
}

export { upload1 }

/*import * as axios from 'axios';

const BASE_URL = 'http://172.16.29.12:3003';

function upload1(formData1) {
    const url = `${BASE_URL}/photos/upload`;
    return axios.post(url, formData1)
        .then(response => {
            // Get the uploaded files data
            const uploadedFiles = response.data;

            // Map the uploaded files data and add the URL field
            return uploadedFiles.map(file => {
                const fileType = file.type;
                let url;

                // Determine the appropriate URL based on the file type
                if (fileType.startsWith('application/pdf')) {
                    url = `${BASE_URL}/pdf/${file.id}`;
                } else if (fileType.startsWith('image/')) {
                    url = `${BASE_URL}/images/${file.id}`;
                }

                return { ...file, url };
            });
        })
        .catch(error => {
            console.error('Error uploading file:', error);
            throw error;
        });
}

export { upload1 };*/