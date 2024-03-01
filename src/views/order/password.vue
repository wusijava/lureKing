<template>
    <div class="box">
        <van-notice-bar
                left-icon="volume-o"
                text="总是记不住各种账号的密码,咋办呢?加密存储起来,忘了需要输入一个查看密码即可查看所有密码!"
        />
        <div class="header">
            <van-button icon="filter-o" type="info" block size="small" @click="showPopup" class="filter-head">筛选</van-button>
        </div>
        <!-- 筛选条件弹窗 -->
        <van-popup v-model="show" position="top" :style="{ height: '100%'}" :close-on-click-overlay="false">
            <van-form class="filter" @submit="toSearch(0)">
                <!-- 1 -->
                <van-field
                        name="名称"
                        placeholder="输入账号名称"
                        clearable
                        type="text"
                        v-model.trim="query.acount"
                />




                <div class="search">
                    <van-row>
                        <van-col span="10">
                            <van-button type="default" class="btn-cancel" @click="cancelPopup">
                                取消
                            </van-button>
                        </van-col>
                        <van-col span="14" style="text-align: right">
                            <van-button type="info" native-type="submit" class="btn-search">
                                查询
                            </van-button>
                        </van-col>
                    </van-row>
                </div>
            </van-form>
        </van-popup>
        <!-- 详情弹窗 -->
        <van-popup v-model="showDetails" class="detail" :close-on-click-overlay="false" closeable >
            <h4>消费截图</h4>
            <div class="detail-main">
                <van-row type="flex" justify="space-between" v-for="item in detailList" style="margin-bottom: 10px;">
                    <img :src=item.url style="width: 100%;height:100%" v-if="item.url!=null&&item.url!=''" >
                </van-row>
            </div>
        </van-popup>

        <div class="content">
            <van-empty image="search" description="暂无账号记录" v-show="showEmpty"/>
            <div class="list" v-for="item in list" :key="item.id">
            <van-swipe-cell :before-close="beforeClose">
                <van-row style="border-bottom: 1px solid #E6EBF2; padding-bottom: 5px;height: 45px">
                    <van-col span="20"><p style="text-align: center">{{item.acount}}     </p></van-col>
                    <van-button type="info" plain hairline round size="small" class="btn-small" @click="showPassword(item)" style="margin-left: 110px" >
                        显示密码
                    </van-button>
                </van-row>
                <template #right>
                    <van-button square type="danger" text="删除" style="margin-left: 10px" @click="cl(item.id)"/>
                </template>
            </van-swipe-cell>
            </div>
            <van-button class="button" @click="back" type="info" size="large" >返回菜单</van-button>
            <van-button class="button" @click="save" type="warning" size="large"  style="margin-top: 20px">新增记录</van-button>
            <van-dialog v-model="showInput" title="账号及密码" show-cancel-button @confirm="submitSave" @cancel="cancelSave">
                <van-field v-model="acount" label="名称" clearable autofocus/>
                <van-field v-model="password" label="密码" type="password" clearable/>
                <van-field v-model="pwdAgain" label="确认密码"type="password" clearable />
            </van-dialog>
            <van-dialog v-model="inputPassword" title="请输入查看密码" show-cancel-button @confirm="submitShow" @cancel="cancelInput">
                <van-field v-model="lookPwd" label="查看密码" type="password" autofocus clearable/>
            </van-dialog>
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
    import { Toast } from 'vant';
    Vue.use(Toast);
    import { Notify } from 'vant';
    import { PullRefresh } from 'vant';
    Vue.use(PullRefresh);
    import {passwordList,save,showPwd,deletePassword} from "../../api/order";
    import copy from '../../components/verifition/utils/copy';
    export default {
        name: 'password',
        data() {
            return {
                refundAll: false,
                number: '',
                showInput: false,
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
                acount: '',
                password: '',
                pwdAgain: '',
                inputPassword: false,
                lookPwd: '',
                pwd: ''
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
                this.acount = '';
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
                if (this.query.acount){
                    params.acount = this.query.acount;
                }
                this.$toast.loading({
                    duration: 0, // 持续展示 toast
                    forbidClick: true,
                    message: '请稍后...',
                });
                const result = await passwordList(params);
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
                            deletePassword(query)
                            Notify({
                                message: '删除成功了,伙计!',
                                color: '#ad0000',
                                background: '#ffe1e1',
                                duration: 2000,
                            });
                            let second = 3;
                            const timer = setInterval(() => {
                                second--;
                                if (second) {
                                    Notify(` ${second} 秒后自动刷新!`);
                                    //toast.message = ` ${second} 秒后自动关闭退款操作!`;
                                } else {
                                    clearInterval(timer);
                                    // 手动清除 Toast
                                    Toast.clear();
                                    Dialog.close()
                                    this.getList(this.currentPage - 1, 10);
                                }
                            }, 1000);
                        });
                        break;
                }
            },
            onRefresh() {
                setTimeout(() => {
                    Toast('刷新成功');
                    this.isLoading = false;
                }, 1000);
            },
            save(){
                this.acount=''
                this.pwd=''
                this.pwdAgain=''
                this.showInput=true
            },
            submitSave:async function(){
                let params = {};
                params.acount=this.acount
                params.pwd=this.password
                params.pwdAgain=this.pwdAgain
                const result = await save(params);
                if(result.data.code == '20000') {
                    Notify({
                        message: result.data.data,
                        duration: 2000,
                    });
                    this.showInput=false;
                    this.getList(this.currentPage - 1, 10);
                }else{
                    this.showInput=true
                    Notify({
                        message: result.data.msg,
                        duration: 2000,
                    });
                }
            },
            cancelSave(){
                this.acount=''
                this.pwd=''
                this.pwdAgain=''
            },
            showPassword(id){
               this.rowId=id.id;
                this.inputPassword=true
            },
            cancelInput(){
               this.lookPwd=''
            },
            submitShow:async function(){
                let params = {};
                params.rowId=this.rowId
                params.pwd=this.lookPwd
                const result = await showPwd(params);
                if(result.data.code == '20000') {
                    this.inputPassword=false
                    this.pwd=result.data.data
                    Dialog.confirm({ message: result.data.data, }).then(() => {
                        this.copy(this.pwd);
                    });;
                }else{
                    this.inputPassword=true
                    Notify({
                        message: result.data.msg,
                        duration: 2000,
                    });
                }
                this.lookPwd=''
            },
            copy(item) {
                this.pwd=item
                copy.handleClipboard(this.pwd, event, () => {
                    Notify({
                        type: 'success',
                        message: '复制名称成功',
                    });
                }, () => {
                    Notify({
                        type: 'danger',
                        message: '复制名称失败',
                    });
                })
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
