<template>
    <div class="box">
        <van-notice-bar
                left-icon="volume-o"
                text="年年有余~年年有鱼~年年有余~年年有鱼~年年有余~年年有鱼~年年有余~年年有鱼~年年有余~年年有鱼~"
        />

        <van-popup v-model="showDetails" class="detail" :close-on-click-overlay="false" closeable >
            <h4>我的鱼获</h4>
            <div class="detail-main">
                <van-row type="flex" justify="space-between" v-for="item in detailList" style="margin-bottom: 10px;">
                    <img :src=item.url style="width: 100%;height:100%" v-if="item.url!=null&&item.url!=''" >
                </van-row>
            </div>
        </van-popup>
        <van-popup v-model="showWeather" class="detail" :close-on-click-overlay="false" closeable >
            <h4>天气及水位</h4>
            <div class="detail-main">
                <van-row   v-for="item in weatherList" >
                    <van-cell title="白天天气描述" :value=item.condTxtDay />
                    <van-cell title="夜晚天气描述" :value="item.condTxtNight" />
                    <van-cell title="气压" :value="item.pres" />
                    <van-cell title="温度" :value="item.temp" />
                    <van-cell title="风向" :value="item.windDir" />
                    <van-cell title="风力" :value="item.windSc" />
                    <van-cell title="水位" :value="item.waterLevel" />
                </van-row>
            </div>
        </van-popup>

        <div class="content">
            <van-empty image="search" description="暂无记录" v-show="showEmpty"/>
            <div class="list" v-for="item in list" :key="item.id">
            <van-swipe-cell :before-close="beforeClose">
                <van-row style="border-bottom: 1px solid #E6EBF2; padding-bottom: 5px">
                    <van-col span="20"><p style="text-align: right"><h5>野钓时间:{{item.date}}    </h5></p></van-col>
                </van-row>
                <van-row style="padding: 5px 0;">
                    <van-col ><h4>地点及收货:{{item.remark}}</h4></van-col>
                </van-row>
                <van-row>
                    <van-col span="12" style="text-align: right">
                        <van-button type="info" plain hairline round size="small" class="btn-small" @click="toDetails(item)">
                            鱼获展示
                        </van-button>
                        <van-button style="margin-left: 10px" type="info" plain hairline round size="small" class="btn-small" @click="weatherInfo(item)">
                            天气及水位
                        </van-button>
                    </van-col>
                </van-row>
                <template #right>
                    <van-button square type="danger" text="删除" style="margin-top: 45px;margin-left: 10px" @click="cl(item.id)"/>
                </template>
            </van-swipe-cell>
            </div>
            <van-button class="button" @click="back" type="info" size="large" >返回菜单</van-button>
        </div>
        <div class="footer">
            <van-pagination v-model="currentPage" :page-count="pageTotal" mode="simple" @change="changePage"/>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import areaJson from '@/util/area'
    import Vue from 'vue';
    import { Dialog } from 'vant';
    import { SwipeCell } from 'vant';
    Vue.use(SwipeCell);
    import { Notify } from 'vant';
    import { PullRefresh } from 'vant';
    Vue.use(PullRefresh);
    import {orderList,orderDetail,deleteRow,weatherInfo} from "../../api/order";
    export default {
        name: 'myFish',
        data() {
            return {
                condTxtNight:'',
                showWeather: false,
                list: [],
                fontColor:{
                    color: '#666'
                },
                currentPage: 0,
                pageTotal: 0,
                show: false,
                showStartDate: false,
                showEndDate: false,
                beginDate: '',
                overDate: '',
                date: '',
                minDate: new Date(2020, 0, 1),
                maxDate: new Date(2025, 10, 1),
                showArea: false,
                areaList: areaJson,
                area: '',
                areaCode: '',
                activeState: 0,
                state: 0,
                activeType: 0,
                type: 0,
                detailList: [],
                details: {
                    authNo: '',
                    title: '',
                    storeName: ''
                },
                showDetails: false,
                keyboardOutOrderNo: false,
                keyboardWayId: false,
                keyboardSellerNo: false,
                keyboardPhoneNumber: false,
                query:{
                    outTradeNo: '',
                    wayId: '',
                    sellerNo: '',
                    phoneNumber:'',
                    storeProvince: '',//省
                    storeProvinceCode: '',
                    storeCity: '',//市
                    storeCityCode: '',
                    storeCounty: '',//区
                    storeCountyCode: '',
                },
                showEmpty: false,
                rowId: '',
                isLoading :false,
                weatherList: ''
            }
        },
        mounted() {
            this.getList(this.currentPage - 1, 10);
        },
        methods: {
            showPopup() {
                this.show = true;
            },
            cl(id){
                this.rowId=id
            },
            cancelPopup() {
                this.show = false;
                this.query.outTradeNo = '';
                this.query.wayId = '';
                this.query.sellerNo = '';
                this.query.phoneNumber = '';
                this.area = '';
                this.areaCode = ''
                this.date = '';
                this.activeState = 0;
                this.activeType = 0;
            },
            onConfirmDate(startDate) {
                this.showStartDate = false;
                this.beginDate = moment(startDate).format('YYYY-MM-DD');
                this.onEndDate();
                this.showEndDate = true;
            },
            onEndDate(endDate) {
                this.overDate = moment(endDate).format('YYYY-MM-DD');
                if(this.beginDate > this.overDate){
                    this.overDate = this.beginDate;
                }
                this.date = this.beginDate + '－' + this.overDate;
                this.showEndDate = false;
            },
            onCancelDate() {
                this.date = ''
                this.showStartDate = false;
                //this.showEndDate = false;
            },
            toSearch(isSearch) {
                this.show = false;
                if (isSearch == 0) {
                    this.currentPage = 0;
                }
                this.getList(this.currentPage, 10)
            },
            getList: async function(cp,c) {
                let params = {};
                params.page = cp;
                params.limit = c;
                if (this.query.item){
                    params.item = this.query.item;
                }
                params.item="鱼获";

                if(this.area != '') {
                    if(this.query.storeCityCode == '420001') {
                        params.consumer = this.query.storeProvinceCode
                    }else {
                        params.consumer = this.query.storeProvinceCode
                    }
                }

                if (this.date != '') {
                    params.startTime = this.beginDate;
                    params.endTime = this.overDate;
                }

                this.$toast.loading({
                    duration: 0, // 持续展示 toast
                    forbidClick: true,
                    message: '请稍后...',
                });
                const result = await orderList(params);
                this.$toast.clear();
                if (result.data.code == '20000') {
                    if(result.data.data.content.length > 0) {
                        this.showEmpty = false;
                        this.list = result.data.data.content;
                        this.pageTotal = result.data.data.totalPages;
                    }else {
                        this.showEmpty = true;
                        this.list = [];
                        this.pageTotal = 0;
                        this.currentPage = 0;
                    }
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            },
            changePage: function (cp) {
                this.getList((cp-1), 10)
            },
            confirmArea(arr) {
                this.area = '';
                if (arr[0]) {
                    this.area += arr[0].name;
                    this.query.storeProvince = arr[0].name;
                    this.query.storeProvinceCode = arr[0].code;
                }
                if (arr[1]) {
                    this.area += '-' + arr[1].name;
                    this.query.storeCity = arr[1].name;
                    this.query.storeCityCode = arr[1].code;
                }
                this.showArea = false;
            },
            onCancelArea() {
                this.showArea = false;
                this.area = '';
            },
            changeState(index,i){
                //把index值赋给active，点击改变样式
                this.activeState=index;
                this.state=i;
            },
            changeType(index,i){
                //把index值赋给active，点击改变样式
                this.activeType=index;
                this.type=i;
            },
            toDetails: async function(info) {
                let params = {}
                params.id = info.id
                const result = await orderDetail(params)
                if(result.data.code == '20000') {
                    this.showDetails = true;
                    this.detailList = result.data
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            },
            back(){
                this.$router.push({name:'selectAction'});
            },
            beforeClose({ position, instance }) {
                switch (position) {
                    case 'right':
                        Dialog.confirm({
                            message: '确定删除吗？',
                        }).then(() => {
                            instance.close();
                            let query = {}
                            query.id = this.rowId
                            deleteRow(query)
                            Notify({
                                message: '删除成功了,伙计!',
                                color: '#ad0000',
                                background: '#ffe1e1',
                                duration: 2000,
                            });
                            this.getList(this.currentPage - 1, 10);
                        });
                        break;
                }
            },
            onRefresh() {
                console.log(666)
                setTimeout(() => {
                    Toast('刷新成功');
                    this.isLoading = false;
                }, 1000);
            },
            weatherInfo :async function (item){
                let params = {}
                params.date=item.date
                const result = await weatherInfo(params)
                if(result.data.code == '20000') {
                    this.showWeather = true;
                    this.weatherList = result.data.data
                    console.log(this.weatherList)
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            }
        }
    }
</script>

<style scoped>
    html,
    body {
        width: 100%;
        height: 100%;
    }
    .box{
        display:flex; /*父元素的定义为flex布局*/
        width:100%;
        height: calc(100vh - 0px); /* 高度自适应*/
        flex-direction: column; /*定义排列方向为竖排*/
        background: #F3F3F5;
    }
    .box .header{
        height: 35px;
        margin: 5px 12px;
    }
    .box .content{
        flex:1; /*中间分配剩下的所有空间*/
        overflow:auto;
        margin: 0 12px;
    }
    .content .list{
        background: #ffffff;
        border-radius: 3px;
        padding: 8px;
        margin-bottom: 8px;
    }
    .content .list p {
        font-size: 0.75em;
        margin: 0;
        line-height: 16px;
    }
    .content .list h4 {
        font-size: 1rem;
        margin: 0;
        color: #121212;
        line-height: 24px;
    }
    .filter-head{
        background: #ffffff;
        color: #121212;
        border: 0;
    }
    .box .footer{
        height: 65px;
    }
    .van-pagination {
        line-height: 60px;
    }
    .box .footer >>>.van-pagination__item {
        height: 65px;
    }
    .van-button{
        border-radius: 3px;
    }
    .btn-small{
        height:24px;
        min-width: 50px;
        line-height: 24px;
        font-size: 0.75em;
    }
    .color-1{
        color: #2873FF;
    }
    .color-2{
        color: #269B26;
    }
    .color-3{
        color: #FF8400;
    }
    .color-4{
        color: #9C00FF;
    }
    .filter{
        margin: 15px;
    }
    .van-cell {
        background-color: #F3F3F5;
        border-radius: 3px;
        line-height: 22px;
        font-size: 11px;
        margin-bottom: 8px;
    }
    .radio{
        margin-bottom: 20px;
    }
    .radio p{
        font-size: 0.75em;
    }
    .radio span{
        font-size: 0.75em;
        background: #F3F3F5;
        border: 1px solid #F3F3F5;
        border-radius: 5px;
        padding: 5px 8px;
        margin-right: 8px;
    }
    .search{
        margin-top: 45px;
    }
    .search .btn-cancel{
        width: 90%;
    }
    .search .btn-search{
        width: 100%;
    }
    .radio-label,
    .radio-check {
        display: inline-block;
        position: relative;
        margin-right: 5px;
        margin-top: 6px;
    }
    .radio-check input[type="radio"] {
        appearance: none; /*清楚默认样式*/
        -webkit-appearance: none;
        /* opacity: 0; */
        outline: none;
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 50%;
        background: #b4b4b4;
    }
    .radio-check input[type="radio"] {
        opacity: 0;
    }
    .radio-check label {
        display: inline-block;
        /* min-width: 50px; */
        height: 24px;
        font-size: 0.75em;
        line-height: 24px;
        text-align: center;
        padding-right: 10px;
        border: 1px solid #F3F3F5;
        background-color: #F3F3F5;
        border-radius: 5px;
        padding-left: 10px;
        cursor: pointer;
    }
    .radio-check input[type="radio"]:checked + label + span {
        background-color: #EFF3FF;
        color: #2873FF;
        opacity: 1;
    }
    .activeClass{
        color: #2873FF;
        border: 1px solid #2873FF;
        background-color: #EFF3FF;
        border-radius: 5px;
    }
    .detail{
        width: 90%;
        height: 90%;
        border-radius: 3px;
    }
    .detail h4{
        font-size: 1em;
        text-align: center;
    }
    .detail .detail-main{
        padding: 0 10px 10px 10px;
        font-size: 0.75em;
    }
    .detail .detail-main .left{
        text-align: left;
        color: #555555;
    }
    .detail .detail-main .right{
        text-align: right;
    }
    .overflow-hide{
        height: 32px;
        line-height: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .input-overlay{
        background-color: black;
        opacity: 0.2;
        width: 90%;
        height:40px;
        z-index: 999;
    }
</style>
