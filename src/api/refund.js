import axios from '../config/axios'
import api from './'

export async function queryRefund(params){
    const result = await axios.post(api.refund.queryRefund,params);
    return result;
}

export async function queryRefundDetail(params){
    const result = await axios.post(api.refund.queryRefundDetail,params);
    return result;
}

export async function confirmRefund(params){
    const result = await axios.post(api.refund.confirmRefund,params);
    return result;
}

export async function queryTradeState(params){
    const result = await axios.post(api.refund.queryTradeState,params);
    return result;
}


