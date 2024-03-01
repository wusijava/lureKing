<template>
    <div>
        <div style="margin-top: 8px">
            <van-button type="default" style="margin-left: 22px" @click="getSize(20)">简单</van-button>
            <van-button type="default" style="margin-left: 20px" @click="getSize(30)">一般</van-button>
            <van-button type="default" style="margin-left: 20px" @click="getSize(50)">较难</van-button>
            <van-button type="default" style="margin-left: 20px" @click="getSize(100)">最难</van-button>
        </div>
        <H3 style="text-align: center">当前难度等级:{{this.level}}</H3>
        <H3 style="text-align: center;color: red" v-if="this.num!=null">今日任务剩余:{{this.num}}题!</H3>
        <div style="margin-top: 50px">
            <div style="text-align: center;margin-top: 50px" >
                <span style="font-size: 35px;text-align: center;">{{this.numOne}}{{this.symbolOne}}{{this.numTwo}}
                =<input type="number" v-model="phone" placeholder="" class="input" style="font-size: 40px;width: 80px;margin-top: 20px" >
                </span></div>
            <div>

            </div>
            <van-button round block type="warning" @click="checkTi" style="margin-top: 100px">确认提交</van-button>
        </div>
        <div style="margin-top: 20px;margin-top: 120px">
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
    import {getchengChuTi,checkChengChu} from '../../api/homework'
    import { ContactEdit } from 'vant';
    Vue.use(ContactEdit);
    import { Stepper } from 'vant';
    Vue.use(Stepper);
    export default {
        name: "chengChu",
        data() {
            return {
                numOne: '',
                symbolOne: '',
                numTwo: '',
                symbolTwo: '',
                numThree: '',
                red1: '',
                red2: '',
                red3: '',
                red4: '',
                red5: '',
                red6: '',
                blue: '',
                values: '',
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
                phone: '',
                num: '',
                level: '简单',
                size: 5
            }
        },
        mounted() {
            this.getResult()
        },
        methods: {
            checkTi: async function(){
                let params = {}
                params.numOne=this.numOne
                params.symbolOne=this.symbolOne
                params.numTwo=this.numTwo
                params.result=this.phone
                let result = await checkChengChu(params);
                //console.log(result.data)
                if (result.data.code == "20000") {
                    if(result.data.data=='答对了,小柠檬不错哦~'){
                        this.phone=''
                        this.getResult()
                    }else{
                        this.getResult()
                    }
                    Notify({
                        message: result.data.data,
                        duration: 2000,
                    });
                }else{
                    Notify({
                        message: result.data.msg,
                        duration: 2000,
                    });
                }

            },
            getResult: async function(){
                let params = {}
                params.size=this.size
                let result = await getchengChuTi(params);
                if(result.data.code=="20000"){
                    this.numOne=result.data.data.numOne
                    this.symbolOne=result.data.data.symbolOne
                    this.numTwo=result.data.data.numTwo

                    this.num=result.data.data.num
                }
                if(result.data.code=="99999"){
                    Notify({
                        message: result.data.msg,
                        duration: 2000,
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
            next(){
               /* this.getResult()*/
                this.phone=''

            },
            getSize(size){
                this.size=size
                if(size==20){
                   this.level='简单'
                }else if(size==30){
                    this.level='一般'
                }else if(size==50){
                    this.level='较难'
                }else{
                    this.level='最难'
                }
                this.phone=''
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
