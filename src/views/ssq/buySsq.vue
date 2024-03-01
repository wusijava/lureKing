<template>
    <div style="margin-top: 50px">
        <h4 style="text-align: center;" >本期购买期号:{{this.ssqNum}}</h4>
        <h6 style="text-align: center;color: #ff6c6c">(期号接口自动计算,注意与实际比对)</h6>
        <van-form @submit="onSubmit" v-show="showFix">
        <van-field
                v-model="red1"
                name="红球一"
                label="红球一"
                placeholder="红球一"
                :rules="[{ required: true, message: '请填写红球一' }]"
        />
        <van-field
                v-model="red2"
                name="红球二"
                label="红球二"
                placeholder="红球二"
                :rules="[{ required: true, message: '请填写红球二' }]"
        />
        <van-field
                v-model="red3"
                name="红球三"
                label="红球三"
                placeholder="红球三"
                :rules="[{ required: true, message: '请填写红球三' }]"
        />
        <van-field
                v-model="red4"
                name="红球四"
                label="红球四"
                placeholder="红球四"
                :rules="[{ required: true, message: '请填写红球四' }]"
        />
        <van-field
                v-model="red5"
                name="红球五"
                label="红球五"
                placeholder="红球五"
                :rules="[{ required: true, message: '请填写红球五' }]"
        />
        <van-field
                v-model="red6"
                name="红球六"
                label="红球六"
                placeholder="红球六"
                :rules="[{ required: true, message: '请填写红球六' }]"
        />
        <van-field
                v-model="blue"
                name="蓝球"
                label="蓝球"
                placeholder="蓝球"
                :rules="[{ required: true, message: '请填写蓝球号码' }]"
        />
            <van-stepper v-model="value" integer style="margin-top: 10px;text-align: center" />
            <h6 style="text-align: center">加减购买注数</h6>

        <div style="margin-top: 20px">
            <van-button round block type="danger" native-type="submit">一键暴富</van-button>
        </div>
        </van-form>
        <div class="list" v-for="item in list" :key="item.id" style="text-align: center" v-show="showQuick" >
            <div>
            <van-button round type="danger" style="margin-left: 10px;margin-bottom: 5px" size="mini">{{item.red1}}</van-button>
                <van-button round type="danger" style="margin-left: 10px;margin-bottom: 5px" size="mini">{{item.red2}}</van-button>
                <van-button round type="danger" style="margin-left: 10px;margin-bottom: 5px" size="mini">{{item.red3}}</van-button>
                <van-button round type="danger" style="margin-left: 10px;margin-bottom: 5px" size="mini">{{item.red4}}</van-button>
                <van-button round type="danger" style="margin-left: 10px;margin-bottom: 5px" size="mini">{{item.red5}}</van-button>
                <van-button round type="danger" style="margin-left: 10px;margin-bottom: 5px" size="mini">{{item.red6}}</van-button>
                <van-button round type="info" style="margin-left: 10px;margin-bottom: 5px" size="mini">{{item.blue}}</van-button>
            <van-stepper v-model="value3" style="text-align: center" />
            <van-button round type="warning" style="text-align: center;margin-bottom: 20px;margin-top: 5px" size="mini" @click="toBuy(item)">购买</van-button>
            </div>
        </div>
        <div style="margin-top: 20px">
            <van-button round block type="info" @click="ssqQuick">我的幸运</van-button>
        </div>
        <div style="margin-top: 20px">
            <van-button round block type="warning" @click="choose" v-show="chooseMyself" >我要自选</van-button>
        </div>
        <div style="margin-top: 20px">
            <van-button round block type="warning" @click="getHistory"  >历史查询</van-button>
        </div>
        <div style="margin-top: 20px">
            <van-button round block type="info" @click="changeBlue">一键转运</van-button>
        </div>
        <div style="margin-top: 20px">
            <van-button round block type="primary" @click="back">返回首页</van-button>
        </div>

    </div>


</template>

<script>
    import moment from 'moment';
    import Vue from "vue";
    import { Switch } from 'vant';
    Vue.use(Switch);
    import { Toast } from 'vant';
    import { Calendar } from 'vant';
    Vue.use(Calendar);
    import { Field } from 'vant';
    Vue.use(Field);
    import { Picker } from 'vant';
    Vue.use(Picker);
    import { Notify } from 'vant';
    import {getResult,addSsq,ssqQuick,getHistory,changeBlue} from '../../api/homework'
    import { ContactEdit } from 'vant';
    Vue.use(ContactEdit);
    import { Stepper } from 'vant';
    Vue.use(Stepper);
    export default {
        name: "buySsq",
        data() {
            return {
                red1: '',
                red2: '',
                red3: '',
                red4: '',
                red5: '',
                red6: '',
                blue: '',
                value: '1',
                ssqNum:'',
                content: '',
                remark: '',
                tel: '',
                text: '',
                digit: '',
                number: '',
                password: '',
                date: '',
                show: false,
                checked: false,
                user: '',
                userShow: false,
                ssqNum: '',
                showFix: true,
                showQuick: false,
                list: [],
                chooseMyself: false,
                value3: '1'
            }
        },
        mounted() {
            this.getResult()
        },
        methods: {
            getResult: async function(){
                let result = await getResult();
                this.ssqNum=result.data.data

            },
            formatDate(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            },
            onConfirm1(date) {
                this.show = false;
                this.date = this.formatDate(date);
            },
            async onSubmit(values) {
                let params = {}
                params.red1=this.red1
                params.red2=this.red2
                params.red3=this.red3
                params.red4=this.red4
                params.red5=this.red5
                params.red6=this.red6
                params.blue=this.blue
                params.term=this.ssqNum
                params.num=this.value
                let result = await addSsq(params);
                let data = result.data;
                if (data.code == "20000") {
                    Notify(result.data.data);
                    this.content=''
                    this.remark=''
                    this.checked=''
                    this.date=''
                    this.user=''
                    this.$router.push({name:'ssqRecord'});
                } else {
                    Notify({
                        message: data.msg,
                        duration: 5000,
                    });
                }

            },
            back(){
                this.$router.push({name:'selectAction'});
            },
            async ssqQuick(){
                this.showQuick=true
                this.showFix=false
                this.chooseMyself=true
                let result = await ssqQuick();
                if (result.data.code == "20000") {
                    this.list=result.data.data
                } else {
                    Notify({
                        message: result.data.data.msg,
                        duration: 5000,
                    });
                }
            },
            choose(){
                if(this.showQuick==true){
                    this.showQuick=false
                }else{
                    this.showQuick=true
                }
                this.showFix=true
                this.chooseMyself=false
            },
            chooseByMyself(){
                this.showQuick=false
            },
            async toBuy(item){
                console.log(item)
                let params = {}
                params.red1=item.red1
                params.red2=item.red2
                params.red3=item.red3
                params.red4=item.red4
                params.red5=item.red5
                params.red6=item.red6
                params.blue=item.blue
                params.term=this.ssqNum
                params.num=this.value3
                let result = await addSsq(params);
                let data = result.data;
                if (data.code == "20000") {
                    Notify(result.data.data);
                } else {
                    Notify({
                        message: data.msg,
                        duration: 5000,
                    });
                }
            },
            async getHistory(){
                let params = {}
                params.red1=this.red1
                params.red2=this.red2
                params.red3=this.red3
                params.red4=this.red4
                params.red5=this.red5
                params.red6=this.red6
                params.blue=this.blue
                let result = await getHistory(params);
                let data = result.data;
                if (data.code == "20000") {
                    Notify({
                        message:  result.data.data,
                            duration: 3000
                    }
                       );
                } else {
                    Notify({
                        message: data.msg,
                        duration: 5000,
                    });
                }
            },
            async changeBlue(){
                let result = await changeBlue();
                //console.log(result)
                if (result.data.code == "20000") {
                    Notify({
                            message:  result.data.data,
                            duration: 3000
                        }
                    );
                    this.ssqQuick()
                } else {
                    Notify({
                        message: result.msg,
                        duration: 5000,
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .box2 {
        margin-top: 10px;
    }
    .box::before {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #F2F5FA;
    }
    .button {
        border-radius: 6px;
    }
    .title {
        font-size: 1.125rem;
    }
    .upload-left {
        padding: 10px 16px;
    }
    .upload-left .upload-title {
        font-size: 14px;
        color: #646566;
        text-align: left;
    }
    .upload-left .upload-label {
        font-size: 12px;
        color: #3385ff;
        text-align: left;
    }
    .upload-right {
        padding: 20px 20px 10px 20px;
    }
    .img-upload {
        float: right;
        border:1px dashed #bbbbbb;
        width: 80px;
        height: 80px;
        color: #8a8a8a;
        background-color: #ffffff;
    }
    .sign-img {
        width: 80px;
        height: 80px;
        float: right;
    }
    .sign-img img {
        width:80px;
        height:80px;
        float: right;
    }
    .sign-img img[src='']{
        border: none;
    }
    .mini-font {
        font-size: 12px;
        text-align: right;
        margin-top: 0;
        margin-right: 20px;
        color: #969799;
    }
</style>
