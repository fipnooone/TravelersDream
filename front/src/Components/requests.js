import axios from 'axios';
import Cookies from 'js-cookie';

async function request(method, data, onsuccess=function(){}, onfail=function(){}, onerr=function(){}) {
    let formData = new FormData();
    formData.append("method", method);
    formData.append("data", JSON.stringify(data));
    return await axios.post("http://dream", formData).then(res => {
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

export {request, getToken};