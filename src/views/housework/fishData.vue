<template>
    <div class="box">
        <van-notice-bar
                left-icon="volume-o"
                text="鱼获数据分析:按月统计出勤次数，鱼获数量，去年同期鱼获数，打龟次数，中鱼天数,放流数量，花费，打龟率!是不是正宗打龟佬，数据一目了然！"
        />



        <div class="content">
            <van-empty image="search" description="暂无鱼获统计信息" v-show="showEmpty"/>
            <div class="list" v-for="item in list" :key="item.id" >
                <van-cell-group >
                    <van-cell title="月份" :value="item.month" />
                    <van-cell title="出勤次数" :value="item.time" />
                    <van-cell title="中鱼天数" :value="item.successNum" />
                    <van-cell title="打龟次数" :value="item.failNum" />
                    <van-cell title="鱼获数量" :value="item.fishNum" />
                    <van-cell title="去年同期数量" :value="item.fishNumLastYear" />
                    <van-cell title="放流数量" :value="item.fangNum" />
                    <van-cell title="打龟率" :value="item.rate" />
                    <van-cell title="花费" :value="item.spend" />
                    <van-cell title="最多连龟" :value="item.maxFail" />
                </van-cell-group>
                </div>
            <van-button class="button" @click="back" type="info" size="large" style="margin-top: 10px" >返回菜单</van-button>
        </div>

    </div>
</template>

<script>
    import {fishData,receiveWork} from "../../api/order";
    import Vue from 'vue';
    import { Toast } from 'vant';
    import { DropdownMenu, DropdownItem } from 'vant';
    import { DatetimePicker } from 'vant';

    Vue.use(DatetimePicker);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    Vue.use(Toast);
    export default {
        name: 'fishData',
        data() {
            return {
                miniDate:  new Date(2010, 0, 1),
                showEmpty: false,
                date: '',
                show: false,
                list: [],
                currentPage: 0,
                pageTotal: 0,
                value1: '',
                option1: [
                    { text: '全部', value: '' },
                    { text: '未处理', value: '0' },
                    { text: '已处理', value: 1 },
                ],





            }
        },
        mounted() {
            this.getList(this.currentPage - 1, 10);
        },
        methods: {

            toSearch(isSearch) {
                if (isSearch == 0) {
                    this.currentPage = 0;
                }
                this.getList(this.currentPage, 10)
            },
            getList: async function(cp,c) {
                let params = {};
                params.page = cp;
                params.limit = c;
                if(this.date!=null||this.date!=''){
                    params.startTime = this.date;
                }
                const result = await fishData(params);
                this.$toast.clear();
                console.log(result.data.data)
                if (result.data.code == '20000') {
                    if(result.data.data.length > 0) {
                        this.showEmpty = false;
                        this.list = result.data.data;
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
            back(){
                this.$router.push({name:'selectAction'});
            },
            doJob: async function(id,state,stateType){
                let params = {};
                params.id=id
                params.state=state
                params.stateType=stateType
                const result = await receiveWork(params);
                if (result.data.code == '20000') {
                    const toast = Toast.loading({
                        duration: 0, // 持续展示 toast
                        forbidClick: true,
                        message: '正在处理,剩余3 秒',
                    });

                    let second = 3;
                    const timer = setInterval(() => {
                        second--;
                        if (second) {
                            toast.message = `正在处理,剩余 ${second} 秒`;
                        } else {
                            clearInterval(timer);
                            // 手动清除 Toast
                            Toast.clear();
                        }
                    }, 1000);
                    let getist = 3;
                    const time = setInterval(() => {
                        getist--;
                        if (getist) {
                        } else {
                            clearInterval(time);
                            this.getList(this.currentPage - 1, 10);
                        }
                    }, 1000);
                }
            },
            changeValue:async function(){
                this.getList(this.currentPage - 1, 10);
                console.log(this.value1)
            },
            formatDate(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            },
            onConfirm1(date) {
                this.show = false;
                this.date = this.formatDate(date);
            },
            query(){
                this.getList(this.currentPage - 1, 10);
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
