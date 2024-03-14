<template>
    <div class="box">
        <van-overlay :show="showOver" @click="showOver = false" />
        <van-notice-bar
                left-icon="volume-o"
                :text=this.gunDong
        />
        <van-notice-bar
                left-icon="volume-o"
                :text=this.weather
        />
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

        <div class="content">
            <span class="colon">距离{{this.fes1}}</span>
            <van-count-down :time="chuXi" style="margin-bottom: 20px" >
                <template #default="timeData">
                   <!-- <span class="colon">{{this.fes1}}</span>-->
                    <span class="block">{{ timeData.days }}</span>
                    <span class="colon">天</span>
                    <span class="block">{{ timeData.hours }}</span>
                    <span class="colon">小时</span>
                    <span class="block">{{ timeData.minutes }}</span>
                    <span class="colon">分</span>
                    <span class="block">{{ timeData.seconds }}</span>
                    <span class="colon">秒</span>
                </template>
            </van-count-down>
           <!-- <span class="colon" >距离{{this.fes2}}</span>
            <van-count-down :time="time" style="margin-bottom: 20px">
                <template #default="timeData">
                    <span class="block">{{ timeData.days }}</span>
                    <span class="colon">天</span>
                    <span class="block">{{ timeData.hours }}</span>
                    <span class="colon">小时</span>


                </template>
            </van-count-down>-->

            <div style="margin-bottom: 25px">
                <div class="module" style="margin-right: 25px" @click="dagui">
                    <img src="../../../src/assets/img/wg.png"/>
                    <p>打龟记录</p>
                </div>
                <div class="module" @click="getFishList">
                    <img src="../../../src/assets/img/jilu.png"/>
                    <p>我的出勤</p>
                </div>
            </div>

            <div style="margin-bottom: 25px">
                <div class="module" style="margin-right: 25px" @click="toBusiness(1)">
                    <img src="../../../src/assets/img/fish1.png"/>
                    <p>新增鱼获</p>
                </div>
                <div class="module" @click="toSign">
                    <img src="../../../src/assets/img/lun.png"/>
                    <p>买了装备</p>
                </div>
            </div>
            <div>
                <div class="module" style="margin-right: 25px" @click="toRefund">
                    <van-icon name="../lq.png" size="33" :badge="this.orderNum"/>
                    <p>我的鱼获</p>
                </div>
                <div class="module" @click="spend">
                    <van-icon name="../fj.png" size="33" :badge="this.spendNum"/>
                    <p>路亚花费</p>
                </div>
            </div>
            <div style="margin-top: 25px">
                <div class="module" style="margin-right: 25px" @click="yearData">
                    <img src="../../../src/assets/img/data.png"/>
                    <p>年度数据</p>
                </div>
                <div class="module" @click="fishData">
                    <img src="../../../src/assets/img/cq.png"/>
                    <p>月度数据</p>
                </div>
            </div>
            <div style="margin-top: 25px">
                <div class="module" style="margin-right: 25px" @click="weatherRouter">
                    <img src="../../../src/assets/img/wea.png"/>
                    <p>天气预报</p>
                </div>
                <div class="module"  @click="waterLevel">
                    <img src="../../../src/assets/img/sw.png"/>
                    <p>长江水位</p>
                </div>
            </div>
            <div style="margin-top: 25px">
                <div class="module" style="margin-right: 25px" @click="locationLog">
                    <img src="../../../src/assets/img/bd.png"/>
                    <p>标点记录</p>
                </div>
                <div class="module" @click="toFishVideo">
                    <img src="../../../src/assets/img/aixin.png"/>
                    <p>中鱼视频</p>
                </div>
            </div>
            <div style="margin-top: 25px">
                <div class="module" style="margin-right: 25px" @click="fishCount">
                    <img src="../../../src/assets/img/dy.png"/>
                    <p>鱼获统计</p>
                </div>
                <div class="module" @click="monthCount">
                    <img src="../../../src/assets/img/yg.png"/>
                    <p>月份统计</p>
                </div>
            </div>
            <!--<div style="margin-top: 25px">

            </div>-->
            <div style="margin-top: 25px">

                <div class="module" style="margin-right: 25px" @click="changePassWord">
                    <img src="../../../src/assets/img/mm.png"/>
                    <p>修改密码</p>
                </div>
                <div class="module" @click="logout">
                    <img src="../../../src/assets/img/out.png"/>
                    <p>退出系统</p>
                </div>
            </div>
            <div style="margin-top: 25px">
                <div class="module" style="margin-right: 25px" @click="sortMonth">
                    <img src="../../../src/assets/img/ph.png"/>
                    <p>月度排行</p>
                </div>
                <div class="module" @click="sort">
                    <img src="../../../src/assets/img/mc.png"/>
                    <p>年度排行</p>
                </div>
            </div>
            <div style="margin-top: 25px">
                <div class="module" style="margin-right: 25px" @click="sortTotal">
                    <img src="../../../src/assets/img/dn.png"/>
                    <p>总排行榜</p>
                </div>
                <div class="module" @click="fishDayCount">
                    <img src="../../../src/assets/img/ts.png"/>
                    <p>天数统计</p>
                </div>
            </div>
            <div style="margin-top: 25px">
                <div class="module" style="margin-right: 25px" @click="fishShare">
                    <img src="../../../src/assets/img/fx.png"/>
                    <p>鱼获分享</p>
                </div>
                <div class="module" @click="addFisher">
                    <img src="../../../src/assets/img/zc.png"/>
                    <p>新增龟佬</p>
                </div>
            </div>
            <div style="margin-top: 25px">
                <div class="module" style="margin-right: 25px" @click="guiWang">
                    <img src="../../../src/assets/img/gw.png"/>
                    <p>月度龟王</p>
                </div>
                <div class="module" @click="guiWangYear">
                    <img src="../../../src/assets/img/ygw.png"/>
                    <p>年度龟王</p>
                </div>
            </div>
            <div style="margin-top: 25px">
                <div class="module" style="margin-right: 25px" @click="geti">
                    <img src="../../../src/assets/img/dym.png"/>
                    <p>个人纪录</p>
                </div>
                <div class="module" @click="max">
                    <img src="../../../src/assets/img/max.png"/>
                    <p>群友纪录</p>
                </div>
            </div>
            <div style="margin-top: 25px">
                <div class="module" style="margin-right: 25px" @click="spendPai">
                    <img src="../../../src/assets/img/money.png"/>
                    <p>花费排行</p>
                </div>
                <div class="module" @click="tui">
                    <img src="../../../src/assets/img/hw.png"/>
                    <p>好物推荐</p>
                </div>
            </div>
            <div style="margin-top: 25px">
                <div class="module" style="margin-right: 25px" @click="firstFish">
                    <img src="../../../src/assets/img/js.png"/>
                    <p>解锁鱼种</p>
                </div>
                <div class="module"  @click="waterLevelNew">
                    <img src="../../../src/assets/img/swn.png"/>
                    <p>水文水位</p>
                </div>
            </div>
        </div>
        </van-pull-refresh>

        <!--<van-popup v-model="show">
            <div>此系统你能打几分?</div>
            <div >
                <van-rate v-model="value" v-show="showRate" @click.native="rateChange"
                          icon="like" void-icon="like-o" size="40px"/>
            </div>


        </van-popup>-->
      <!--  <van-rate v-model="value" v-show="showRate"/>-->



    </div>
</template>

<script >
    import Vue from 'vue';
    import { ShareSheet } from 'vant';
    import { Toast } from 'vant';
    import { Dialog } from 'vant';
    import { Rate } from 'vant';
    import { ActionSheet } from 'vant';
    import { Popup } from 'vant';
    import { Icon  } from 'vant';
    import { CountDown } from 'vant';
    import { PullRefresh } from 'vant';
    import { Overlay } from 'vant';
    import axios from '../../config/axios'
    Vue.use(Overlay);
    Vue.use(PullRefresh);
    Vue.use(CountDown);
    import {location} from "../../assets/js/location";
    import {sendMsg,saveAdd} from '../../api/homework';
    import {myTask,taoList,orderList,mind,getTime,monthSpend} from "../../api/order";
    Vue.use(Popup);
    Vue.use(ActionSheet);
    Vue.use(Rate);
    Vue.use(ShareSheet);
    Vue.use(Icon );
    import AMapLoader from '@amap/amap-jsapi-loader';
    export default {
        name: "selectAction",
        data(){
            return{
                fes1: '',
                fes2: '',
                isLoading: false,
                count: 0,
                chuXi: 1619798401000-(new Date()).getTime(),
                time: 1614268801000-(new Date()).getTime(),
                value: 0,
                showRate: true,
                appId: '',
                indexData:[],
                row:null,
                showShare: false,
                user: '',
                options: [
                    { name: '微信', icon: 'wechat' },
                    { name: '微博', icon: 'weibo' },
                    { name: '复制链接', icon: 'link' },
                    { name: '分享海报', icon: 'poster' },
                    { name: '二维码', icon: 'qrcode' },
                ],
                show: false,
                num :localStorage.getItem("num"),
                city: '',
                lat: '',
                lng: '',
                jwd: '',
                myDis: 0,
                timer: null,
                pageTotal: '',
                pageTotalTo: '',
                orderNum: '',
                spendNum: '',
                showOver :false,
                gunDong: localStorage.getItem("address"),
                weather: '',
                userName: localStorage.getItem("username"),
                //count: 1
                weatherToday: ''
            }
        },
        //页面加载就开始查询按钮数据
        mounted() {

            this.getList();
            this.getTo();
            this.getOrderList();
            this.getSpendNum();
            this.getLocation();
            setInterval(this.getLocation(),5000);
            this.mind();
            this.getTime()
            this.user="当前登录账号:"+localStorage.getItem("username")


            /*if(this.num==1){
                Dialog.alert({
                    //title: '标题',
                    message: '欢迎各位骚棒大师！',
                    theme: 'round-button',
                }).then(() => {
                    this.show =true
                });
            }*/

                let time =1;
                this.timer=setInterval(()=>{
                    this.distanceCatCom();
                    time--;
                    if(time<0){
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                },6000)
        },
        methods:{
            buyLuck(){
                this.$router.push({name:'ssqRecord'});
            },
            goodLuck(){
                this.$router.push({name:'buySsq'});
            },
            remind(){
                this.$router.push({name:'remind'});
            },
            not(){
                this.showOver=true
            },
            address(){
                this.$router.push({name:'myAddress'});
            },
            toSign(){
                    this.$router.push({name:'create'});

            },
            // eslint-disable-next-line no-unused-vars
            toBusiness(info){
                this.$router.push({name:'taoBao'});
            },
            toRefund() {
                this.$router.push({name:'taoList'})
            },
            toSearch() {
                this.$router.push({name:'login'});
            },
            spend(){
                this.$router.push({name:'orderList'})
            },
            proState(){
                this.$router.push({name:'productState'});
            },
            homework(){
                this.$router.push({name:'addHomework'})
            },
            homeworkList(){
                this.$router.push({name:'homeworkList'});
            },
            monitor(){
                this.$router.push({name:'monitor'});
            },
            logout(){
                this.$router.push({name:'logout'});
            },
            fishData(){
                this.$router.push({name:'fishData'});
            },
            onSelect(option) {
                Toast(option.name+",暂未实现具体逻辑,敬请期待!");
                this.showShare = false;
            },
            rateChange(){
                if(this.value!=5){
                    localStorage.setItem("num",this.num+1);
                    this.show=false
                    const toast = Toast.loading({
                        duration: 0, // 持续展示 toast
                        forbidClick: true,
                        message: '不能爆五个?系统正在卸载!',
                    });

                    let second = 6;
                    const timer = setInterval(() => {
                        second--;
                        if (second) {
                            if(second==6){
                                toast.message = `正在卸载软件!`;
                            }
                            if(second==5){
                                toast.message = `正在破坏cpu!`;
                            }
                            if(second==4){
                                toast.message = `正在破坏内存!`;
                            }
                            if(second==3){
                                toast.message = `正在抹掉手机硬盘数据!`;
                            }
                            if(second==2){
                                toast.message = `正在启动手机爆炸程序!`;
                            }
                            if(second==1){
                                toast.message = `有缘再见!`;
                            }

                        } else {
                            clearInterval(timer);
                            // 手动清除 Toast
                            Toast.clear();
                            this.$router.push({name:'logout'});
                        }
                    }, 1000);
                }else {
                    localStorage.setItem("num",this.num+1);
                    this.show =false
                }
            },
            register(){
               /* Dialog.alert({
                    //title: '标题',
                    message: '不要点了 还没时间做!',
                    theme: 'round-button',
                }).then(() => {
                });*/
               //console.log(this.myDis)
               this.distanceCat()
            },
            housework(){
                if(this.userName!='admin'&&this.userName!='zmx'){
                    Dialog.alert({
                        message: '暂无权限,敬请期待!',
                        theme: 'round-button',
                    })
                }else{
                this.$router.push({name:'houseworkAdd'})};
            },
            myTask(){
                if(this.userName!='admin'&&this.userName!='zmx'){
                    Dialog.alert({
                        message: '暂无权限,敬请期待!',
                        theme: 'round-button',
                    })
                }else{
                this.$router.push({name:'myTask'})};
            },
            toTask(){
                if(this.userName!='admin'&&this.userName!='zmx'){
                    Dialog.alert({
                        message: '暂无权限,敬请期待!',
                        theme: 'round-button',
                    })
                }else{
                this.$router.push({name:'toTask'})};
            },
            myAdd(){
                window.location.href="http://m.amap.com/navi/?dest="+this.jwd+"&destName=%E6%88%91%E7%9A%84%E4%BD%8D%E7%BD%AE&hideRouteIcon=1&key=9138ad0023cb8e79ca816509aac42747"
            },
            getLocation() {
                console.log("获取地址")
                let _that = this;
                let geolocation = location.initMap("map-container"); //定位
                AMap.event.addListener(geolocation, "complete", result => {
                    console.log("result")
                    _that.lat = result.position.lat;
                    _that.lng = result.position.lng;
                    this.lat=result.position.lat;
                    this.lng = result.position.lng;
                    this.jwd=(result.position.lng)+","+(result.position.lat);
                    console.log(this.jwd)
                    this.getWeath(this.jwd)
                    _that.province = result.addressComponent.province;
                    _that.city = result.addressComponent.city;
                    _that.district = result.addressComponent.district;
                   this.city=result.addressComponent.district;
                    let params = {};
                    params.province=result.addressComponent.province;
                    params.city=result.addressComponent.city;
                    params.district=result.addressComponent.district;
                    params.lng=result.position.lng;
                    params.lat=result.position.lat;
                    params.user=this.user

                    localStorage.setItem("lng",result.position.lng)
                    localStorage.setItem("lat",result.position.lat)
                    localStorage.setItem("province",result.addressComponent.province)
                    localStorage.setItem("city",result.addressComponent.city)
                    localStorage.setItem("district",result.addressComponent.district)
                    //this.gunDong=this.user+" 经度: "+this.lng+" 纬度: "+this.lat+" 区域: "+this.city
                    AMap.plugin('AMap.Geocoder', function() {
                        var geocoder = new AMap.Geocoder({
                            city: '027'
                        })

                        var lnglat = [result.position.lng, result.position.lat]

                        geocoder.getAddress(lnglat, function(status, result) {
                            if (status === 'complete' && result.info === 'OK') {
                                //console.log(result)
                                //console.log(result.regeocode.formattedAddress)
                                params.address=result.regeocode.formattedAddress
                                localStorage.setItem("address",params.user+" 地址: "+result.regeocode.formattedAddress)
                                localStorage.setItem("add","自动获取定位："+result.regeocode.formattedAddress)
                                localStorage.setItem("addAll",result.regeocode.formattedAddress)
                                saveAdd(params);
                            }

                        })
                    })

                });
            },
            goHome(){
                window.location.href="http://m.amap.com/navi/?start="+this.jwd+"&dest=114.148418,30.485467&destName=回家路线&key=9138ad0023cb8e79ca816509aac42747"
            },
            distanceCat(){
                //var dis = ''
                var map = new AMap.Map('container', {
                    resizeEnable: true,
                    center: [116.397428, 39.90923], // 地图中心点
                    zoom: 13 // 地图显示的缩放级别
                })
                // 步行导航
                AMap.plugin(['AMap.Walking'], () => {
                    // 根据起终点坐标规划步行路线
                    new AMap.Walking({}).search(
                        [this.lng,this.lat],
                        [114.146769,30.484865],
                        function(status, result) {
                            //console.log(this.jwd)
                            if (status === 'complete') {
                                Dialog.alert({
                                    message: '离家的距离:'+result.routes[0].distance+"米",
                                    theme: 'round-button',
                                }).then(() => {
                                });
                            } else {
                                //console.log(result)
                            }

                        }
                    )
                })
            },
            distanceCatCom: async function(){
                //var dis = ''
                var map = new AMap.Map('container', {
                    resizeEnable: true,
                    center: [116.397428, 39.90923], // 地图中心点
                    zoom: 13 // 地图显示的缩放级别
                })
                // 步行导航
                AMap.plugin(['AMap.Walking'], () => {
                    //console.log(this.jwd)
                    // 根据起终点坐标规划步行路线
                    new AMap.Walking({}).search(
                        [this.lng,this.lat],
                        [114.26263,30.614824],//公司门口经纬度
                        async function(status, result) {
                            //console.log(result.routes[0].distance)
                            if(parseInt(result.routes[0].distance)>150&&result.routes[0].distance<500){
                              /*  Dialog.alert({
                                    message: '离开公司打卡提醒',
                                    theme: 'round-button',
                                }).then(() => {
                                });//离开公司100米触发*/
                                let params = {};
                                params.user = "吴思";
                                const result =await  sendMsg(params);

                                //clearInterval(this.timer);
                            }
                        }
                    )
                })
            },
            getList: async function(cp,c) {
                let params = {};
                params.type=1
                if(this.value1){
                    params.state=this.value1
                }

                const result = await myTask(params);
                this.$toast.clear();
                if (result.data.code == '20000') {

                    if(result.data.data.content.length > 0) {
                        this.pageTotal = result.data.data.totalElements;
                    }else {
                        this.list = [];
                    }
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            },
            getTo: async function() {
                let params = {};
                params.type=2
                const result = await myTask(params);
                this.$toast.clear();
                if (result.data.code == '20000') {
                    if(result.data.data.content.length > 0) {
                        //console.log(result)
                        this.pageTotalTo = result.data.data.totalElements;
                    }else {
                        this.list = [];
                    }
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            },
            getOrderList: async function() {
                let params = {};
                params.getFish =1
                const result = await taoList(params);
                this.$toast.clear();
                if (result.data.code == '20000') {
                    if(result.data.data.content.length >= 0) {
                        this.orderNum = result.data.data.totalElements;
                    }else {
                        this.list = [];
                    }
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            },
            getSpendNum: async function(cp,c) {
                const result = await monthSpend();
                if (result.data.code == '20000') {
                    if(result.data.data.length > 0) {
                        this.spendNum = "¥"+result.data.data;
                    }else {
                        this.list = [];
                    }
                }else {
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }
            },
            onRefresh() {
                setTimeout(() => {
                    Toast('刷新成功');
                    this.isLoading = false;
                }, 1000);
                this.getSpendNum()
                this.getLocation()
            },
            getWeath:async  function(jwd){
                //console.log(jwd+"DDFDFd")
                let res= await  fetch('https://geoapi.qweather.com/v2/city/lookup?location='+jwd+'&key=b941bbcd687b486aa07aab8586dc115e')
                //console.log(res)
                let result = await res.json()
                let res2= await  fetch('https://devapi.qweather.com/v7/weather/3d?location='+result.location[0].id+'&key=b941bbcd687b486aa07aab8586dc115e')
                let result2 = await res2.json()
                this.weather="天气情况："+result2.daily[0].fxDate+"日:"+result2.daily[0].tempMin+"度~"+result2.daily[0].tempMax+"度,"+result2.daily[0].textDay+","+result2.daily[1].fxDate+"日:"+result2.daily[1].tempMin+"度~"+result2.daily[1].tempMax+"度,"+result2.daily[1].textDay+","+result2.daily[2].fxDate+"日:"+result2.daily[2].tempMin+"度~"+result2.daily[2].tempMax+"度,"+result2.daily[2].textDay
                this.weatherToday="天气情况："+result2.daily[0].fxDate+"日:"+result2.daily[0].tempMin+"度~"+result2.daily[0].tempMax+"度,"+result2.daily[0].textDay;
            },
            ssq(){
                this.$router.push({name:'ssq'});
            },
            myOrder(){//daiMaiOrder
                this.$router.push({name:'daiMaiOrder'});
            },
            faQiDaiMai(){
                this.$router.push({name:'daiMai'});
            },
            checkUser(){
                if(this.userName!='admin'&&this.userName!='zmx'){
                    Dialog.alert({
                        message: '暂无权限,敬请期待!',
                        theme: 'round-button',
                    })
                }
            },
            changePassWord(){
                this.$router.push({name:'changePassWord'});
            },
            getOnlineNum(){
                this.$router.push({name:'getOnlineNum'});
            },
            history(){
                this.$router.push({name:'history'});
            },
            gaiLv(){
                this.$router.push({name:'gaiLv'});
            },
            blue(){
                this.$router.push({name:'blue'});
            },
            jjcc(){
                this.$router.push({name:'jjcc'});
            },
            homeworkOnline(){
                this.$router.push({name:'mathLog'});
            },
            dingDing(){
                this.$router.push({name:'dingDing'});
            },
            cuoTi(){
                this.$router.push({name:'cuoTi'});
            },
            homeworktotal(){
                this.$router.push({name:'homeworktotal'});
            },
            async mind(){
                let result = await mind();
                if(result.data.code=="20000"&&result.data.data!=null) {
                    if (this.num == 1) {
                        Dialog.alert({
                            title: '任务提醒',
                            message: result.data.data,
                        }).then(() => {
                            localStorage.setItem("num",this.num+1);
                            this.$router.push({name: 'myTask'})

                        });
                    }
                }
            },
            dayEnglish(){
                this.$router.push({name: 'english'})
            },
            du(){
                this.$router.push({name: 'du'})
            },
            zhuCe(){
                this.$router.push({name: 'register'})
            },
            myFish(){
                this.$router.push({name: 'myFish'})
            },
            async getTime(){
                let result = await getTime();
                //console.log(result.data[0].name)
                //console.log(result.status)
                if(result.status=="200") {
                    this.chuXi=result.data[0].time-(new Date()).getTime(),
                    this.fes1=result.data[0].name
                    this.time=(new Date()).getTime()-result.data[1].time,
                    this.fes2=result.data[1].name
                    //console.log(this.fes1)
                }
            },
            tiKindTwo(){
                this.$router.push({name: 'tiKindTwo'})
            },
            suggest(){
                this.$router.push({name: 'suggest'})
            },
            password(){
                this.$router.push({name: 'password'})
            },
            chengChu(){
                this.$router.push({name: 'chengChu'})
            },
            jiangLi(){
                this.$router.push({name: 'jiangLi'})
            },
            paiBan(){
                this.$router.push({name: 'paiBan'})
            },
            waterLevel(){
                this.$router.push({name: 'waterLevel'})
            },
            weatherRouter(){
                this.$router.push({name: 'weather'})
            }
            ,
            compare(){
                this.$router.push({name: 'biJiaoDaXiao'})
            },
            festival(){
            this.$router.push({name: 'festival'})
             },
            toFishVideo(){
                this.$router.push({name: 'fishVideo'})
            },
            locationLog(){
                this.$router.push({name: 'locationLog'})
            },
            fishCount(){
                this.$router.push({name: 'fishCount'})
            },
            monthCount(){
                this.$router.push({name: 'monthCount'})
            },dagui(){
                this.$router.push({name: 'dagui'})
            },getFishList(){
                this.$router.push({name: 'getFishList'})
            },yearData(){
                this.$router.push({name: 'yearData'})
            },geti(){
                this.$router.push({name: 'geti'})
            },sort(){
                this.$router.push({name: 'sort'})
            },sortMonth(){
                this.$router.push({name: 'sortMonth'})
            },sortTotal(){
                this.$router.push({name: 'sortTotal'})
            },fishShare(){
                this.$router.push({name: 'fishShare'})
            },addFisher(){
                this.$router.push({name: 'addFisher'})
            },fishDayCount(){
                this.$router.push({name: 'fishDayCount'})
            },guiWang(){
                this.$router.push({name: 'guiWang'})
            },guiWangYear(){
                this.$router.push({name: 'guiWangYear'})
            },spendPai(){
                this.$router.push({name: 'spendPai'})
            },max(){
                this.$router.push({name: 'max'})
            },tui(){
                this.$router.push({name: 'tui'})
            },firstFish(){
                this.$router.push({name: 'firstFish'})
            },biaodian(){
                this.$toast({
                    message: '还想看标点，想得美！',
                    icon: 'warning-o'
                });
            },waterLevelNew(){
                this.$router.push({name: 'waterLevelNew'})
            }
           /* getAddress(){
                AMap.plugin('AMap.Geocoder', function() {
                    var geocoder = new AMap.Geocoder({
                        // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                        city: '027'
                    })

                    var lnglat = [114.26461, 30.60261]

                    geocoder.getAddress(lnglat, function(status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                          console.log(result)
                        }
                    })
                })
            }*/

        }
    }
</script>

<style scoped>
    .box{
        width: 100%;
    }
    .box::before {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #ffffff;
    }
    .content {
        position: relative;
        text-align: center;
        margin: 25px 10px;
    }
    .module {
        background-color: #ffffff;
        box-shadow: 1px 1px 8px 1px #D2DDFF;
        border-radius: 8px;
        padding: 20px;
        width: 30%;
        display: inline-block;
    }
    .module img{
        width: 33px;
    }
    .module p{
       margin: 0;
    }
     .content {
         padding: 16px 16px 160px;
     }
    .colon {
        display: inline-block;
        margin: 0 4px;
        color: #ee0a24;
    }
    .block {
        display: inline-block;
        width: 22px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        background-color: #ee0a24;}
</style>