import axios from '../config/axios'
import api from './'

export async function addHomework(params){
    const result = await axios.post(api.homework.addHomework,params);
    return result;
}

export async function homeworkList(params){
    const result = await axios.post(api.homework.homeworkList,params);
    return result;
}

export async function addHouseWork(params){
    const result = await axios.post(api.homework.addHouseWork,params);
    return result;
}
export async function sendMsg(params){
    const result = await axios.post(api.homework.sendMsg,params);
    return result;
}
export async function saveAdd(params){
    const result = await axios.post(api.homework.saveAdd,params);
    return result;
}
export async function getResult(params){
    const result = await axios.post(api.homework.getResult,params);
    return result;
}
export async function addSsq(params){
    const result = await axios.post(api.homework.addSsq,params);
    return result;
}
export async function faQiDaiMai(params){
    const result = await axios.post(api.homework.faQiDaiMai,params);
    return result;
}
export async function suiJi(params){
    const result = await axios.post(api.homework.suiJi,params);
    return result;
}

export async function getOnlineNum(params){
    const result = await axios.post(api.homework.getOnlineNum,params);
    return result;
}
export async function ssqQuick(params){
    const result = await axios.post(api.homework.ssqQuick,params);
    return result;
}
export async function getHistory(params){
    const result = await axios.post(api.homework.getHistory,params);
    return result;
}
export async function getTi(params){
    const result = await axios.post(api.homework.getTi,params);
    return result;
}
export async function checkTi(params){
    const result = await axios.post(api.homework.checkTi,params);
    return result;
}
export async function dingDing(params){
    const result = await axios.post(api.homework.dingDing,params);
    return result;
}
export async function cuoTi(params){
    const result = await axios.post(api.homework.cuoTi,params);
    return result;
}
export async function shouDong(params){
    const result = await axios.post(api.homework.shouDong,params);
    return result;
}
export async function saveImg(params){
    const result = await axios.post(api.homework.saveImg,params);
    return result;
}
export async function english(params){
    const result = await axios.post(api.homework.english,params);
    return result;
}
export async function du(params){
    const result = await axios.post(api.homework.du,params);
    return result;
}
export async function wangYi(params){
    const result = await axios.post(api.homework.wangYi,params);
    return result;
}
export async function changeBlue(params){
    const result = await axios.post(api.homework.changeBlue,params);
    return result;
}
export async function huiFu(params){
    const result = await axios.post(api.homework.huiFu,params);
    return result;
}
export async function getSongCi(params){
    const result = await axios.post(api.homework.getSongCi,params);
    return result;
}
export async function getTaiCi(params){
    const result = await axios.post(api.homework.getTaiCi,params);
    return result;
}
export async function getTiKindTwo(params){
    const result = await axios.post(api.homework.getTiKindTwo,params);
    return result;
}
export async function checkTiKindTwo(params){
    const result = await axios.post(api.homework.checkTiKindTwo,params);
    return result;
}
export async function getchengChuTi(params){
    const result = await axios.post(api.homework.getchengChuTi,params);
    return result;
}
export async function checkChengChu(params){
    const result = await axios.post(api.homework.checkChengChu,params);
    return result;
}
export async function compareNum(params){
    const result = await axios.post(api.homework.compareNum,params);
    return result;
}
export async function checkCompare(params){
    const result = await axios.post(api.homework.checkCompare,params);
    return result;
}
export async function changeFestival(params){
    const result = await axios.post(api.homework.changeFestival,params);
    return result;
}