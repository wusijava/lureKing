<template>
    <div class="box">
        <van-notice-bar
                left-icon="volume-o"
                text="每天完成作业任务后,会根据完成准确度发放奖励,加油哦,小柠檬~"
        />
        <div class="header">
            <van-button icon="filter-o" type="info" block size="small" @click="showPopup" class="filter-head">筛选</van-button>
        </div>
        <!-- 筛选条件弹窗 -->
        <van-popup v-model="show" position="top" :style="{ height: '100%'}" :close-on-click-overlay="false">
            <van-form class="filter" @submit="toSearch(0)">


                <van-field
                        readonly
                        clickable
                        placeholder="筛选惩罚或奖励?"
                        is-link
                        :value="state2"
                        @click="showArea2=true">
                </van-field>
                <van-popup
                        v-model="showArea2"
                        position="bottom"
                        :style="{ height: '50%' }"
                        round
                >
                    <van-area :area-list="areaList"
                              :columns-num="1"
                              @confirm="confirmArea2"
                              @cancel="onCancelArea2"
                    />
                </van-popup>


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
            <h4>产品图片</h4>
            <div class="detail-main">
                <img :src=this.image style="width: 100%;height:100%" >
            </div>
        </van-popup>

        <div class="content">
            <van-empty image="search" description="暂无记录" v-show="showEmpty"/>
            <div class="list" v-for="item in list" :key="item.id">
                <van-row style="padding: 5px 0;">
                    <van-col span="12"><h4>时间:</h4></van-col>
                    <van-col span="12"><p><h4>{{item.createTime}}</h4></p></van-col>
                    <van-col span="12"><h4>类型:</h4></van-col>
                    <van-col span="12"><p><h4>{{item.typeDesc}}</h4></p></van-col>
                </van-row>
                <van-row>
                    <van-col span="12"><p style="margin-top: 5px;">内容：{{item.awardName}}</p></van-col>
                    <van-col span="12"><p style="margin-top: 5px;">状态：{{item.stateDesc}}</p></van-col>
                    <van-col span="12" style="text-align: right">
                        <van-button type="info" plain hairline round size="small" class="btn-small" @click="toHandle(item,1)" v-if="item.state==0" style="margin-top: 20px">
                            我已完成
                        </van-button>
                        <van-button type="info" plain hairline round size="small" class="btn-small" @click="toHandle(item,-1)" v-if="item.type==1&&item.state==0" style="margin-left: 20px">
                            放弃奖励
                        </van-button>
                    </van-col>
                </van-row>
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
    import copy from '../../components/verifition/utils/copy';
    import areaJson from '@/util/award'
    import {getAwardList,handleAwardState} from "../../api/order";
    import { Notify } from 'vant';
    export default {
        name: 'chengChu',
        data() {
            return {
                queryModel: '',
                showArea2: false,
                state3: '',
                state2: '',
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
                image: '',
                amyState: '',
                productName: '',
                typeC: ''
            }
        },
        mounted() {
            this.getList(this.currentPage - 1, 10);
        },
        methods: {
            showPopup() {
                this.show = true;
            },
            cancelPopup() {
                this.show = false;
                this.query.buyerName = '';
                this.query.wayIr = '';
                this.area = '';
                this.areaCode = ''
                this.orderDate = '';
                this.activeState = 0;
                this.activeType = 0;
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
                if(this.typeC){
                    params.type = this.typeC;
                }
                this.$toast.loading({
                    duration: 0, // 持续展示 toast
                    forbidClick: true,
                    message: '请稍后...',
                });
                const result = await getAwardList(params);
                this.$toast.clear();
                if (result.data.code == '20000') {
                    if(result.data.data.content.length > 0) {
                        this.showEmpty = false;
                        this.list = result.data.data.content;
                        this.pageTotal = result.data.data.totalPages;
                        //this.query.name=''
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
            confirmArea2(arr) {
                this.typeC=arr[0].code
                this.state2=arr[0].name
                this.showArea2 = false;
            },
            onCancelArea2() {
                this.typeC=''
                this.state2=''
                this.showArea2 = false;
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
                this.image = info.image


            },
            back(){
                this.$router.push({name:'selectAction'});
            },
            toHandle:async function(item,type){
                let params = {};
                params.id=item.id
                params.value=type
                const result = await handleAwardState(params);
                if (result.data.code == '20000') {
                    this.getList(this.currentPage - 1, 10);
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            },
            copy(item) {
                this.productName=item
                copy.handleClipboard(this.productName, event, () => {
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
