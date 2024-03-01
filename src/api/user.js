import axios from '../config/axios'
import api from './'

export async function login(params){
    const result = await axios.post(api.user.login, params)
    return result
}
export async function changePassWord(params){
    const result = await axios.post(api.user.changePassWord, params)
    return result
}
export async function addFisher(params){
    const result = await axios.post(api.user.addFisher, params)
    return result
}
