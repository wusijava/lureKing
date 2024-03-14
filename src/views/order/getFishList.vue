<template>
    <div class="box">
        <van-notice-bar
                left-icon="volume-o"
                text="记录真实的野钓路亚数据，野钓路亚难，保持良好心态，当做锻炼身体来玩！"
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
                        :value="area"
                        placeholder="请选择出勤结果"
                        @click="showArea = true"
                >
                </van-field>
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
                <van-popup v-model="showStartDate" position="bottom">
                    <van-datetime-picker
                            title="选择时间"
                            type="date"
                            :min-date="minDate"
                            :max-date="maxDate"
                            @confirm="onConfirmDate"
                            @cancel="onCancelDate"
                    />
                </van-popup>
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
                <!-- 选择地区弹窗 -->
             <!--   <van-field
                        readonly
                        clickable
                        :value="area"
                        placeholder="请选择消费者"
                        @click="showArea = true"
                >
                </van-field>
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
                </van-popup>-->



<!--                <div class="radio">-->
<!--                    <p>请选择业务类型</p>-->
<!--                    <div class="radio-check" v-for="(item,index) in bizTypeList" :key="item.type"-->
<!--                         :class="activeType==index ? 'activeClass' : '' ">-->
<!--                        <input type="radio" name="num"-->
<!--                               :value="item.bizType"-->
<!--                               @click="changeType(index,item.type)"-->
<!--                        >-->
<!--                        <label>{{item.bizType}}</label>-->
<!--                    </div>-->
<!--                </div>-->

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
            <h4>订单截图</h4>
            <div class="detail-main">
                <van-row type="flex" justify="space-between" v-for="item in detailList" style="margin-bottom: 10px;">
                    <img :src=item.url style="width: 100%;height:100%" v-if="item.url!=null&&item.url!=''" >
                </van-row>
            </div>
        </van-popup>

        <div class="content">
            <van-empty image="search" description="暂无记录" v-show="showEmpty"/>
            <div class="list" v-for="item in list" :key="item.id">
                <van-swipe-cell :before-close="beforeClose">
                    <span style="color: #cf2d28 ;text-align: center;font-size: larger;margin-left: 70px" >{{item.createTime}}        {{item.week}}</span>
                    <van-cell-group >
                        <van-cell title="结果：" :value="item.desc" />
                        <van-cell title="地址：" :value="item.address" />
                        <van-cell title="天气：" :value="item.cond" />
                        <van-cell title="气压：" :value="item.pres" />
                        <van-cell title="气温：" :value="item.tmp" />
                        <van-cell title="水位：" :value="item.waterLevel" />
                        <van-cell title="备注：" :value="item.remark" />
                        <div class="detail-main">
                            <img :src=item.imageUrl style="width: 100%;height:100%" v-if="item.imageUrl!=null&&item.imageUrl!=''" >
                        </div>
                    </van-cell-group>
                    <div class="detail-main">
                        <img :src=item.url style="width: 100%;height:100%" v-if="item.url!=null&&item.url!=''" >
                    </div>
                    <van-col span="12" style="text-align: right">
                    </van-col>
                    <template #right>
                        <van-button square type="danger" text="删除" style="margin-top: 45px;margin-left: 10px" @click="cl(item.id)"/>
                    </template>
                </van-swipe-cell>
            </div>
            <van-button class="button" @click="back" type="info" size="large" >回菜单</van-button>
        </div>
        <div class="footer">
            <van-pagination v-model="currentPage" :page-count="pageTotal" mode="simple" @change="changePage"/>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import Vue from 'vue';
    import { Dialog } from 'vant';
    import { Toast } from 'vant';
    Vue.use(Toast);
    import areaJson from '@/util/fish'
    import {deleteFish,taoList,taoDetail} from "../../api/order";
    export default {
        name: 'getFishList',
        data() {
            return {
                getFish: '',
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
                showEmpty: false
            }
        },
        mounted() {
            this.getList(this.currentPage - 1, 10);
       /*     if(ap) {
                ap.setOptionButton({
                    items: [{
                        title: '切换账号'
                    }],
                    onClick: (data)=>{
                        ap.confirm({
                            title: '温馨提示',
                            content: '是否确认切换账号？',
                            confirmButtonText: '确认',
                            cancelButtonText: '取消'
                        }, function(result){
                            if(result.confirm === true) {
                                window.location.href = "/h5/logout?type=2"
                            }
                        });
                    }
                });
            }*/
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
                params.getFish= this.getFish
                if (this.query.fishKind){
                    params.fishKind = this.query.fishKind;
                }
                this.$toast.loading({
                    duration: 0, // 持续展示 toast
                    forbidClick: true,
                    message: '请稍后...',
                });
                const result = await taoList(params);
                this.$toast.clear();
                if (result.data.code == '20000') {
                    if(result.data.data.content.length > 0) {
                        this.showEmpty = false;
                        this.list = result.data.data.content;
                        this.pageTotal = result.data.data.totalPages;
                        this.query.buyerName=''
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
            confirmArea(arr) {
                this.area = arr[0].name;
                this.getFish=arr[0].code
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
                const result = await taoDetail(params)
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
            },beforeClose({ position, instance }) {
                switch (position) {
                    case 'right':
                        Dialog.confirm({
                            message: '确定删除吗？',
                        }).then(() => {
                            instance.close();
                            let query = {}
                            query.id = this.rowId
                            deleteFish(query)
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
            },cl(id){
                this.rowId=id
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
