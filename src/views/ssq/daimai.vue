<template>
    <div>
        <h3 style="text-align: center">本期购买期号:{{this.ssqNum}}</h3>
        <h4 style="text-align: center;color: #ff6c6c">(请在彩票截止售卖前两小时下单)</h4>
        <van-form @submit="onSubmit">
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
            <van-stepper v-model="value2" min="20" max="50" style="margin-top: 10px;text-align: center" />
            <h6 style="text-align: center">佣金比例</h6>
            <p @click="userOpen" style="margin-left: 15px">任务指派给:{{this.user}}</p>
            <van-picker
                    title="任务指派给:"
                    show-toolbar
                    :columns="columns"
                    @confirm="onConfirm2"
                    @cancel="onCancel"
                    @change="onChange"
                    v-model="user"
                    v-if="userShow"
            />

        <div style="margin-top: 50px">
            <van-button round block type="danger" native-type="submit">一键下单</van-button>
        </div>
        </van-form>
        <div style="margin-top: 50px">
            <van-button round block type="warning" @click="suiJi">随机出号</van-button>
        </div>
        <div style="margin-top: 50px">
            <van-button round block type="info" @click="back">返回首页</van-button>
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
    import {getResult,faQiDaiMai,suiJi} from '../../api/homework'
    import { ContactEdit } from 'vant';
    Vue.use(ContactEdit);
    import { Stepper } from 'vant';
    Vue.use(Stepper);
    export default {
        name: "daiMai",
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
                value2: '',
                columns: ['吴思', '何浩', 'tomcat', '张皓'],
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
                params.buyer=this.user
                params.rate=this.value2
                params.type=2
                let result = await faQiDaiMai(params);
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
        onConfirm2(value, index) {
            console.log("confirm2")
            this.user=value
            this.userShow=false
            Toast(`已选择任务指派给：${value}`);
        },
        onChange(picker, value, index) {
            Toast(`当前值：${value}`);
        },
        onCancel() {
            Toast('取消选择');
            this.userShow=false
        },
        userOpen(){
            this.userShow=true
        },
            async suiJi(){
                let result = await suiJi();
                console.log(result)
                if (result.data.code == "20000") {
                    this.red1=result.data.data.red1
                    this.red2=result.data.data.red2
                    this.red3=result.data.data.red3
                    this.red4=result.data.data.red4
                    this.red5=result.data.data.red5
                    this.red6=result.data.data.red6
                    this.blue=result.data.data.blue
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
