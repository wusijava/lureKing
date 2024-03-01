import axios from '../config/axios'
import api from './'

export async function getStore(params){
    const result = await axios.post(api.trade.store,params);
    return result;
}

export async function getMealList(params){
    const result = await axios.post(api.trade.mealList,params);
    return result;
}

export async function getCashierList(params){
    const result = await axios.post(api.trade.cashierList,params);
    return result;
}

export async function getPayDetail(params){
    const result = await axios.post(api.trade.payDetail,params);
    return result;
}

export async function createOrder(params){
    const result = await axios.post(api.trade.createOrder,params);
    return result;
}

export async function create(params){
    const result = await axios.post(api.trade.create,params);
    return result;
}

export async function queryContract(params){
    const result = await axios.post(api.trade.queryContract,params);
    return result;
}

export async function saveContract(params){
    const result = await axios.post(api.trade.saveContract,params);
    return result;
}

export async function tradeList(params){
    const result = await axios.post(api.trade.list,params);
    return result;
}

export async function queryPacket(params){
    const result = await axios.post(api.trade.queryPacket,params);
    return result;
}

export async function receivePacket(params){
    const result = await axios.post(api.trade.receivePacket,params);
    return result;
}

export async function receivePacketNew(params){
    const result = await axios.post(api.trade.receivePacketNew,params);
    return result;
}

export async function tradeStateQuery(params){
    const result = await axios.post(api.trade.queryState,params);
    return result;
}


export async function tradeDetail(params){
    const result = await axios.post(api.trade.detail,params);
    return result;
}

export async function tradeRefund(params){
    const result = await axios.post(api.trade.refund,params);
    return result;
}

export async function queryOrder(params){
    const result = await axios.post(api.trade.queryOrder,params);
    return result;
}
export async function createSell(params){
    const result = await axios.post(api.trade.createSell,params);
    return result;
}
export async function getFishList(params){
    const result = await axios.post(api.trade.getFishList,params);
    return result;
}

export async function getLureList(params){
    const result = await axios.post(api.trade.getLureList,params);
    return result;
}
export async function saveFish(params){
    const result = await axios.post(api.trade.saveFish,params);
    return result;
}