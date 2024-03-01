import axios from '../config/axios'
import api from './'

export async function getUploadToken(params){
    const result = await axios.postForUrl(api.upload.getUploadToken,params);
    return result;
}

export async function submitInformFile(params){
    const result = await axios.post(api.upload.submitInform,params);
    return result;
}