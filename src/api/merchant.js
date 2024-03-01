import axios from '../config/axios'
import api from './'

export async function submit(params){
    const result = await axios.post(api.merchant.submit, params)
    return result
}
