import {addHouseWork} from "./homework";

const method = {
    user:{
        login: '/login',
        changePassWord:  '/api/web/user/changePassword',
        addFisher:  '/api/web/user/addFisher',
        userList: '/api/userList'
    },
    merchant:{
        submit: '/merchant/merchantApply',
    },
    trade:{
        store: 'api/merchantStore/getStoreInfo',
        mealList: 'api/meal/getMealList',
        cashierList: 'api/merchantStore/getCashierList',
        createOrder:'api/saveLureSpend',
        payDetail:'api/trade/getPayDetail',
        create:'createAuthPrePay',
        queryContract:'orderDetail',
        queryState:'api/trade/queryTradeState',
        saveContract:'contract/signatureUpload',
        createSell: "order/save",
        getFishList: "api/getFishList",
        getLureList: "api/getLureList",
        saveFish: "api/saveFish"
    },
    refund:{
        queryRefund: 'refund/getOrderResult',
        queryRefundDetail: 'refund/getRefundDetail',
        confirmRefund: 'refund/getRefundQr',
        queryTradeState: 'refund/queryTradeState'
    },
    order:{
        orderList: 'api/lureShoppingList',
        detail: 'spendDetail',
        taoList: 'api/lureGetList',
        taoDetail: 'logDetail',
        showProductState: '/product/showProductState',
        monitorRecord: '/product/monitorRecord',
        changeState: '/product/changeState',
        deleteRow: 'api/delLure',
        myTask : '/api/myTask',
        receiveWork: '/api/receiveWork',
        address: '/api/address',
        remind: '/api/remind',
        deleteRec: '/api/deleteRec',
        ssqRecord: '/api/ssq/getSsqRecord',
        buyRecord: '/api/ssq/buyRecord',
        changeSsqState:'/api/ssq/changeSsqState',
        history: '/api/ssq/history',
        gaiLv: '/api/ssq/getHistoryTimes',
        blueThree: '/api/ssq/blueThree',
        mathLog: '/api/math/homeworkLog',
        handleState: '/product/handleState',
        homeworkTotal: '/api/math/homeworkTotal',
        mind: 'api/mind',
        getTime: 'getTime',
        monthSpend: 'api/lureMonthSpend',
        shouDongSaoMiao: '/product/getProductState',
        refundMoney: 'api/refundLure',
        passwordList: 'api/password/list',
        save: 'api/password/save',
        showPwd: 'api/password/showPassword',
        deletePassword: 'api/password/deletePassword',
        getAwardList: '/api/math/getAwardList',
        handleAwardState: '/api/math/handleAwardState',
        paiBan: 'api/open/list',
        waterLevel: 'waterLevel/getWaterLevelList',
        getWaterLevel: 'waterLevel/getTodayData',
        weatherList: 'api/open/weather/list',
        weatherInfo: 'api/open/weather/weatherInfo',
        change: 'waterLevel/change',
        changeWaterLevel: 'waterLevel/changeWaterLevel',
        fishCount: '/api/fishCount',
        monthCount: '/api/monthCount',
        monthData: '/api/monthData',
        yearData: '/api/yearData',
        geti: '/api/geti',
        sort: '/api/sort',
        fishShare: '/api/fishShare',
        fishDayCount: '/api/fishDayCount',
        guiWang: '/api/guiWang',
        spendPai: '/api/spendPai',
        deleteFish: 'api/deleteFish',
        firstFish: 'api/firstFish',
        waterLevelNew: 'waterLevelNew/getWaterLevelList',
    },
    upload:{
        getUploadToken:'/upload/getToken'
    },
    homework:{
        addHomework:'/api/addHomework',
        homeworkList:'/api/homeworkList',
        addHouseWork:'/api/addHouseWork',
        sendMsg: '/api/sendMsg',
        saveAdd :'/api/saveAdd',
        getResult: '/api/ssq/getSsqNum',
        addSsq: '/api/ssq/addSsq',
        faQiDaiMai: '/api/ssq/addSsq',
        suiJi: '/api/ssq/suiJi',
        getOnlineNum: '/api/ssq/getOnlineNum',
        ssqQuick: '/api/ssq/SsqQuick',
        getHistory: '/api/ssq/getHistory',
        getTi: '/api/math/getTi',
        checkTi: '/api/math/checkTi',
        dingDing: '/sendDingDingMessage',
        cuoTi: '/api/math/cuoTi',
        shouDong: '/api/ssq/getBonusNum',
        saveImg: '/api/ssq/saveImg',
        english: '/english',
        du: '/du',
        wangYi: '/wangYi',
        changeBlue: '/api/ssq/changeBlue',
        huiFu: '/huiFu',
        getSongCi: '/songCi',
        getTaiCi: '/dialogue',
        getTiKindTwo: '/api/math/getTiKindTwo',
        checkTiKindTwo: '/api/math/checkTiKindTwo',
        getchengChuTi: '/api/math/getchengChuTi',
        checkChengChu: '/api/math/checkChengChu',
        compareNum: '/api/math/compareNum',
        checkCompare: '/api/math/checkCompare',
        changeFestival: '/api/math/changeFestival'

    }
}
export default method;
