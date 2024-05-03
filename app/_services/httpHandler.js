import axios from "axios";

function getDefaultHeaders() {
    return { "Content-Type": "application/json" }
    //return { "Content-Type": "application/java" }
}
function getDefaultMultipartHeaders() {
    return { 'Content-Type': undefined }
}

async function httpGet(url, customHeaders = getDefaultHeaders()) {
    let data = axios.get(url, {headers: customHeaders}).then(function (response) {
        return response.data;
    });
    return data;
}


async function httpPost(url, reqBody, customHeaders = getDefaultHeaders()) {
    let data = await axios.post(url, reqBody, { headers: customHeaders}).then(function (response) {
        return response.data;
    });
    return data;
}

async function httpPut(url, reqBody, customHeaders = getDefaultHeaders()) {
    let data = await axios.put(url, reqBody, { headers: customHeaders}).then(function (response) {
        return response.data;
    });
    return data;
}


export { getDefaultHeaders, getDefaultMultipartHeaders, httpGet, httpPost, httpPut }