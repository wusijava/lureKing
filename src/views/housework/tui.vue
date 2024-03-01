<template>
    <div class="box">
        <van-notice-bar
                left-icon="volume-o"
                text="把平时购买到觉得不错的商品推荐给大家，独乐乐不如众乐乐！"
        />
        <div class="header">
            <van-button icon="filter-o" type="info" block size="small" @click="showPopup" class="filter-head">筛选</van-button>
        </div>
        <!-- 筛选条件弹窗 -->
        <van-popup v-model="show" position="top" :style="{ height: '100%'}" :close-on-click-overlay="false">
            <van-form class="filter" @submit="toSearch(0)">
                <!-- 1 -->
                <van-field
                        name="费用名称"
                        placeholder="输入消费项目"
                        clearable
                        type="text"
                        v-model.trim="query.item"
                />

                <!-- 4 -->
                <!-- 选择开始时间弹窗 -->
                <!--<van-field
                        readonly
                        clickable
                        name="datetimePicker"
                        :value="date"
                        placeholder="请选择时间"
                        @click="showStartDate = true"
                />
                <van-popup v-model="showStartDate" position="bottom">
                    <van-datetime-picker
                            title="选择时间"
                            type="date"
                            :min-date="minDate"
                            :max-date="maxDate"
                            @confirm="onConfirmDate"
                            @cancel="onCancelDate"
                    />
                </van-popup>-->
                <!-- 选择结束时间弹窗 -->
                <van-popup v-model="showEndDate" position="bottom">
                    <van-datetime-picker
                            title="选择时间"
                            type="date"
                            :min-date="minDate"
                            :max-date="maxDate"
                            @confirm="onEndDate"
                            @cancel="onCancelDate"
                    />
                </van-popup>
                <van-popup
                        v-model="showArea"
                        position="bottom"
                        :style="{ height: '50%' }"
                        round
                >
                    <van-area :area-list="areaList"
                          value="420000"
                          :columns-num="1"
                          @confirm="confirmArea"
                          @cancel="onCancelArea"
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
            <h4>消费截图</h4>
            <div class="detail-main">
                <van-row type="flex" justify="space-between" v-for="item in detailList" style="margin-bottom: 10px;">
                    <img :src=item.url style="width: 100%;height:100%" v-if="item.url!=null&&item.url!=''" >
                </van-row>
            </div>
        </van-popup>

        <div class="content">
            <van-empty image="search" description="暂无消费记录" v-show="showEmpty"/>
            <div class="list" v-for="item in list" :key="item.id">
            <van-swipe-cell :before-close="beforeClose">
                <van-cell-group :title="item.createTime">
                    <van-cell title="路亚花费：" :value="item.item" />
                    <van-cell title="价格：" :value="item.price" />
                    <van-cell title="备注：" :value="item.remark" />
                    <van-cell title="购买时间：" :value="item.date" />
                    <van-cell title="推荐大师：" :value="item.consumer" />
                    <div style="text-align: center">
                        <van-button type="info" v-if="item.receiveState==0" size="small"  @click="doJob(item.id,1,1)" >接受</van-button>
                        <van-button type="danger" v-if="item.receiveState==0" size="small"  @click="doJob(item.id,-1,1)" style="margin-left: 20px">拒绝</van-button>
                        <van-button type="warning" v-if="item.receiveState==1&&item.state==0" size="small"  @click="doJob(item.id,1,2)" style="margin-bottom: 10px" >任务已完成</van-button>
                    </div>
                </van-cell-group>
                    <div class="detail-main">
                            <img :src=item.url style="width: 100%;height:100%" v-if="item.url!=null&&item.url!=''" >
                    </div>
                    <van-col span="12" style="text-align: right">
                        <van-button type="info" plain hairline round size="large" class="btn-small" @click="refund(item)"  v-if="item.price!=0" style="margin-left: 70px">
                            退款
                        </van-button>
                    </van-col>
                <template #right>
                    <van-button square type="danger" text="删除" style="margin-top: 45px;margin-left: 10px" @click="cl(item.id)"/>
                </template>
            </van-swipe-cell>
            </div>
            <van-button class="button" @click="back" type="info" size="large" >回菜单</van-button>
            <van-dialog v-model="showInput" title="请输入退款金额" show-cancel-button @confirm="refundPart">
                <van-field v-model="number" type="number" label="金额:" autofocus/>
            </van-dialog>
            <van-dialog v-model="refundAll" title="请确认操作?" show-cancel-button @confirm="refundAllMoney">
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
    import {orderList,orderDetail,deleteRow,monthSpend,refundMoney} from "../../api/order";
    export default {
        name: 'tui',
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
                monthSum: '',
                refundId: ''
            }
        },
        mounted() {
            this.getList(this.currentPage - 1, 10);
            this.monthSpend();
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
                params.recommend =1
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
                setTimeout(() => {
                    Toast('刷新成功');
                    this.isLoading = false;
                }, 1000);
            },
            monthSpend: async function(){

                const result = await monthSpend();
                //console.log(result)
                Notify({ type: 'warning', message: "路亚已花费："+result.data.data+"元,请理智消费,存钱娶媳妇！",
                    duration: 10000 });
            },
            refund(item){
                this.refundId=item.id
                Dialog.confirm({
                    message: '请选择是部分退款还是全额退款?',
                    confirmButtonText: '部分退款',
                    cancelButtonText: '全额退款',
                    closeOnPopstate: true
                })
                    .then(() => {
                       this.showInput=true
                    })
                    .catch(() => {
                        this.refundAll=true
                    });
                /*const toast = Toast.loading({
                    duration: 0, // 持续展示 toast
                    forbidClick: true,
                    position: 'top'
                });*/
                let second = 8;
                const timer = setInterval(() => {
                    second--;
                    if (second) {
                        Notify(` ${second} 秒后自动关闭退款操作!`);
                        //toast.message = ` ${second} 秒后自动关闭退款操作!`;
                    } else {
                        clearInterval(timer);
                        // 手动清除 Toast
                        Toast.clear();
                        Dialog.close()
                    }
                }, 1000);

            },
            refundAllMoney: async function(){
                let params = {}
                params.id = this.refundId
                const result = await refundMoney(params);
                if (result.data.code == "20000") {
                    Notify({
                        message: result.data.data,
                        duration: 5000,
                    });
                    this.getList(this.currentPage - 1, 10);
                }else{
                    Notify({
                        message: result.data.msg,
                        duration: 5000,
                    });
                }
            },
            refundPart: async function(){
                let params = {}
                params.id = this.refundId
                params.amount=this.number
                if(this.number==''){
                    Dialog.alert({
                        message: '退款金额必填!',
                        theme: 'round-button',
                    }).then(() => {
                       return
                    });
                    return
                }
                const result = await refundMoney(params);
                if (result.data.code == "20000") {
                    Notify({
                        message: result.data.data,
                        duration: 5000,
                    });
                    this.getList(this.currentPage - 1, 10);
                }else{
                    Dialog({ message: result.data.msg, });
                }
                this.number=''
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
