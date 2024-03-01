<template>
    <div>
        <H3 style="text-align: center;margin-top: 50px">当前做的是混合运算变形题</H3>
        <H3 style="text-align: center;color: red" v-if="this.num!=null">今日任务剩余:{{this.num}}题!</H3>
        <div style="margin-top: 50px">
            <div style="text-align: center;margin-top: 50px" v-if="this.numOne">
                <span style="font-size: 35px;text-align: center;">{{this.numOne}}{{this.symbolOne}}{{this.numTwo}}{{this.symbolTwo}}{{this.numThree}}
                ={{this.result}}
                </span></div>
            <div>
                <input type="number" v-model="phone" placeholder="" class="input" style="margin-left: 120px;font-size: 40px;width: 180px;margin-top: 20px" >
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
    import {getTiKindTwo,checkTiKindTwo} from '../../api/homework'
    import { ContactEdit } from 'vant';
    Vue.use(ContactEdit);
    import { Stepper } from 'vant';
    Vue.use(Stepper);
    export default {
        name: "tiKindTwo",
        data() {
            return {
                numOne: '',
                symbolOne: '',
                numTwo: '',
                symbolTwo: '',
                numThree: '',
                phone: '',
                result: '',
                num: '',
                index: ''
            }
        },
        mounted() {
            this.getResult()
        },
        methods: {
            checkTi: async function(){
                let params = {}
                if(this.numOne=='( )'){
                        params.numOne=this.phone
                }else{
                    params.numOne=this.numOne
                }
                params.symbolOne=this.symbolOne
                if(this.numTwo=='( )'){
                    params.numTwo=this.phone
                }else{
                    params.numTwo=this.numTwo
                }
                params.symbolTwo=this.symbolTwo
                if(this.numThree=='( )') {
                    params.numThree = this.phone
                    params.result = this.result
                }else{
                    params.numThree=this.numThree
                }
                params.result=this.result
                params.index=this.index
                let result = await checkTiKindTwo(params);
                if (result.data.code == "20000") {
                    if(result.data.data=='答对了,小柠檬不错哦~'){
                        this.phone=''
                    }
                    this.getResult()
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
                let result = await getTiKindTwo();
                if(result.data.code=="20000"){
                    if(result.data.data.numOne==null){
                        this.numOne='( )'
                    }else{
                        this.numOne=result.data.data.numOne
                    }
                    this.symbolOne=result.data.data.symbolOne
                    if(result.data.data.numTwo==null){
                        this.numTwo='( )'
                    }else{
                        this.numTwo=result.data.data.numTwo
                    }
                    this.symbolTwo=result.data.data.symbolTwo
                    if(result.data.data.numThree==null){
                        this.numThree='( )'
                    }else{
                        this.numThree=result.data.data.numThree
                    }
                    this.result=result.data.data.result
                    this.num=result.data.data.num
                    this.index=result.data.data.index
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
