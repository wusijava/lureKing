<template>
    <div class="box">
        <van-notice-bar
                left-icon="volume-o"
                text="时刻关注水位,科学分析,才能获得更多更大的鱼获!!!奥力给!!!数据来自官网长江水文网"
        />



            <table >
            <div  v-for="item in list" :key="item.id" style="width: 100%;margin-left: 80px;margin-top: 20px">
                            <tr  v-for="d in item.list" :key="d.id"  >
                                <td style="width: fit-content" v-if="d.stnm!='汉口'">{{d.stnm}}</td>
                                <td style="width: fit-content;color: red" v-if="d.stnm=='汉口'">{{d.stnm}}</td>
                                <td style="width: fit-content" >{{item.createTime}}</td>
                                <td style="width: fit-content" v-if="d.stnm!='汉口'">{{d.z}}</td>
                                <td style="width: fit-content;color: #cf2d28" v-if="d.stnm=='汉口'">{{d.z}}</td>
                            </tr>

            </div>
            </table>
            <van-cell title="搜索,点击右侧，弹出日历-＞" :value="date" @click="show = true" />
            <van-calendar v-model="show" @confirm="onConfirm1" type="range" allow-same-day  :min-date="minDate" style="margin-bottom: 20px"/>
            <van-button class="button" @click="toSearch(0)" type="warning" size="large" style="margin-bottom: 10px;margin-top: 30px">日期查询</van-button>
           <!-- <van-button class="button" @click="getWaterLevel" type="primary" size="large" style="margin-bottom: 10px">获取水位</van-button>-->
            <van-button class="button" @click="back" type="info" size="large" >返回菜单</van-button>
       <!-- <van-dialog v-model="inputPassword" title="今日水位" show-cancel-button @confirm="submitShow" @cancel="cancelInput">
            <van-field v-model="lookPwd" label="今日水位" type="text" autofocus clearable/>
        </van-dialog>-->

        <div class="footer">
            <van-pagination v-model="currentPage" :page-count="pageTotal" mode="simple" @change="changePage"/>
        </div>
    </div>
</template>

<script>
    import {waterLevelNew,changeWaterLevel} from "../../api/order";
    import Vue from 'vue';
    import { Toast } from 'vant';
    import { DropdownMenu, DropdownItem } from 'vant';
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    Vue.use(Toast);
    export default {
        name: 'waterLevel',
        data() {
            return {
                rowId : '',
                lookPwd: '',
                inputPassword: false,
                minDate: new Date(2019, 1, 1),
                show: false,
                url: '',
                showDetails: false,
                list: [],
                currentPage: 0,
                pageTotal: 0,
                value1: '',
                option1: [
                    { text: '全部', value: '' },
                    { text: '未中奖', value: '0' },
                    { text: '已中奖', value: 1 },
                ],
                spend: '',
                bonus: '',
                date: '',
                startTime: '',
                endTime: ''




            }
        },
        mounted() {
            this.getList(this.currentPage - 1, 1);
        },
        methods: {

            toSearch(isSearch) {
                if (isSearch == 0) {
                    this.currentPage = 0;
                }
                this.getList(this.currentPage, 1)
            },
            getList: async function(cp,c) {
                let params = {};
                params.page = cp;
                params.limit = c;
                if(this.startTime){
                    params.startTime=this.startTime
                }
                if(this.endTime){
                    params.endTime=this.endTime
                }
                this.$toast.loading({
                    duration: 0, // 持续展示 toast
                    forbidClick: true,
                    message: '请稍后...',
                });
                const result = await waterLevelNew(params);
                this.$toast.clear();
                console.log(result.data.data.content)
                if (result.data.code == '20000') {
                    if(result.data.data.content.length > 0) {
                        this.showEmpty = false;
                        this.list = result.data.data.content;
                        console.log(this.list)
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
                this.getList((cp-1), 1)
            },
            back(){
                this.$router.push({name:'selectAction'});
            },
            changeValue:async function(){
                this.getList(this.currentPage - 1, 1);
            },
            toDetails(url){
                this.showDetails=true
                this.url=url
            },
            onConfirm1(date) {
                this.show = false;
                const [start, end] = date;
                this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
                this.startTime=this.formatDate(start)
                this.endTime=this.formatDate(end)
            },
            formatDate(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            },
            seeNet(href){
                console.log(href)
                window.open(href)
            }, changeWater(id){
                this.inputPassword=true
                this.rowId=id;

            },submitShow: async function(){
                let params = {};
                params.id = this.rowId;
                params.value=this.lookPwd
                console.log(params)
                const result = await changeWaterLevel(params);
                console.log(result)
                if (result.status == '200') {
                    this.$toast({
                        message: "修改成功",
                        icon: 'warning-o'
                    });
                    this.getList(this.currentPage - 1, 1);
                    this.lookPwd=''
                    this.inputPassword=false
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            },cancelInput(){
                this.inputPassword=false
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
    table td {
        width: 100%;
    }
    table td,
    table th {
        border: 1px black solid;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }
</style>
