import axios from 'axios'

// const baseURL = 'http://172.16.4.114:8088/h5/v1/'
const baseURL = 'http://43.142.106.205:8083'
//const baseURL = 'http://192.168.0.7:8083'

function setHeaders() {
    const header = {}
    header['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    header['Accept'] = 'application/json'

    if(localStorage.getItem('login_token')) {
        header['authorization'] = localStorage.getItem('login_token')
    }
    return header
}

const myAxios = {
    post: async function(url,param){
        let result = await axios.post(url, param, {
            baseURL: baseURL,
            timeout: 1000 * 15,
            withCredentials: false,
            headers: setHeaders(),
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }]
        });
        if(!result || result.data.code === "40015"){
            localStorage.removeItem('login_token');
        }
        return result;
    },
    postForUrl: async function(url,param){
        let result = await axios.post(url, param, {
            baseURL: baseURL,
            timeout: 1000 * 15,
            withCredentials: false,
            headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8",'Accept':'application/json'},
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }]
        });
        return result;
    },
}

export default myAxios
