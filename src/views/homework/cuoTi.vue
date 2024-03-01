<template>
    <div>
        <H3 style="text-align: center;margin-top: 40px">当前做的是错题回顾</H3>
        <H3 style="text-align: center;color: red" v-if="this.title!=''">{{this.title}}</H3>
        <H3 style="text-align: center;color: red">{{this.source}}</H3>
        <H3 style="text-align: center;color: red" v-if="this.num!=null">今日任务剩余:{{this.num}}题!</H3>
        <div style="margin-top: 50px">
            <div style="text-align: center;margin-top: 50px" v-if="this.numOne!=null">
                <span style="font-size: 35px;text-align: center;">{{this.numOne}}{{this.symbolOne}}{{this.numTwo}}{{this.symbolTwo}}{{this.numThree}}
                =
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
    import {cuoTi,faQiDaiMai,suiJi,checkTi} from '../../api/homework'
    import { ContactEdit } from 'vant';
    Vue.use(ContactEdit);
    import { Stepper } from 'vant';
    Vue.use(Stepper);
    export default {
        name: "cuoTi",
        data() {
            return {
                source: '',
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
                columns: ['吴思', '何浩', 'tomcat', '张皓'],
                size: '20',
                phone: '',
                rowId: '',
                title: '',
                num: ''
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
                params.symbolTwo=this.symbolTwo
                params.numThree=this.numThree
                params.result=this.phone
                params.type=1
                if(this.rowId){
                    params.rowId=this.rowId
                }
                let result = await checkTi(params);
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
                }

            },
            getResult: async function(){
                let result = await cuoTi();
                console.log(result.data)
                if(result.data.code=="20000"){
                    if(result.data.data!=''&&result.data.data!=null){
                        this.numOne=result.data.data.numOne
                        this.symbolOne=result.data.data.symbolOne
                        this.numTwo=result.data.data.numTwo
                        this.symbolTwo=result.data.data.symbolTwo
                        this.numThree=result.data.data.numThree
                        this.source=result.data.data.source
                        this.rowId=result.data.data.rowId
                        this.num=result.data.data.num
                    }else{
                        this.title="暂无错题!"
                        console.log(this.title)
                    }

                }
                if(result.data.code=="99999"){
                    Notify({
                        message: result.data.msg,
                        duration: 2000,
                    });
                }



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
            },
            next(){
               /* this.getResult()*/
                this.phone=''

            },
            getSize(size){
                this.size=size
               /* this.getResult()*/
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
