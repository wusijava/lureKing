<template>
    <div>
        <h2 style="text-align: center">修改假期</h2>
        <van-form @submit="onSubmit">
            <van-field
                    v-model="content"
                    name="假期名称"
                    label="假期名称"
                    placeholder="假期名称"
                    :rules="[{ required: true, message: '请填假期名称' }]"
            />
            <van-cell title="选择假期开始时间" :value="date" @click="show = true" style="margin-top: 20px"/>
            <van-calendar v-model="show" @confirm="onConfirm1" />
            <div style="margin-top: 50px">
                <van-button round block type="primary" native-type="submit">确认提交</van-button>
            </div>

        </van-form>
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
    import {changeFestival} from '../../api/homework'
    import { ContactEdit } from 'vant';
    Vue.use(ContactEdit);
    export default {
        name: "festival",
        data() {
            return {
                columns: ['吴思', '张明霞', '吴艺橙', '小力'],
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
                userShow: false
            }
        },
        mounted() {

        },
        methods: {
            formatDate(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            },
            onConfirm1(date) {
                this.show = false;
                this.date = this.formatDate(date);
            },
            async onSubmit(values) {
                let params = {}
                params.content=this.content
                params.date=this.date
                let result = await changeFestival(params);
                let data = result.data;
                if (data.code == "20000") {
                    Notify(result.data.data);
                    this.content=''
                    this.date=''
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
