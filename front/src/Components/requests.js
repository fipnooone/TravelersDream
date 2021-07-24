import axios from 'axios';
import Cookies from 'js-cookie';

async function request(method, data) {
    let formData = new FormData();
    formData.append("method", method);
    formData.append("data", JSON.stringify(data));
    return await axios.post("http://dream", formData).then(res => {
        if (res.data.success) {
            return {success: true, data: res.data}
        }
        else {
            return {success: false, data: res.data}
        }
    })
    .catch(err => {
        return {success: false, error: true, err}
    });
}
async function uploadFiles(method, data, files) {
    let formData = new FormData();
    formData.append("method", method);
    formData.append("data", JSON.stringify(data));
    files.map(file => formData.append("files[]", file));
    return await axios.post("http://dream", formData, {
        cache: false,
        contentType: false,
        processData: false
    }).then(res => {
        if (res.data.success) {
            return {success: true, data: res.data.data}
        }
        else {
            return {success: false, data: res.data.data}
        }
    })
    .catch(err => {
        return {success: false, error: true, err}
    });
}
function getToken() {
    return JSON.parse(Cookies.get("data")).token
}

export {request, uploadFiles, getToken};
//import {request, uploadFiles, getToken} from './requests';