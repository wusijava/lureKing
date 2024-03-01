<template>
    <div class="box" v-if="showForm===true">
        <van-notice-bar
                left-icon="volume-o"
                text="如果您对此APP有任何意见或需求,请在下方给开发人员留言,工作人员会及时跟进处理~"
        />
        <van-cell-group style="margin-top: 10px">
            <van-field
                    v-model="message"
                    rows="4"
                    autosize
                    label="留言"
                    type="textarea"
                    maxlength="100"
                    placeholder="请留下您的建议或需求..."
                    show-word-limit
                    clearable
                    right-icon="http://www.photo.wearelie.com/temp/1/c6qg8n.jpg"
                    autofocus
            />
        </van-cell-group>
        <van-steps direction="vertical" :active="3">
            <van-step>
                <h3>新需求-评估</h3>
                <p>2021-04-01 12:40</p>
            </van-step>
            <van-step>
                <h3>产品设计-UI设计等</h3>
                <p>2021-04-02 11:35</p>
            </van-step>
            <van-step>
                <h3>开发人员开发-测试-上线</h3>
                <p>2021-04-05 09:35</p>
            </van-step>
            <van-step>
                <h3>放假去钓鱼,钓大鱼</h3>
                <p>2021-04-11 05:35</p>
            </van-step>
        </van-steps>

        <div class="box2" style="margin: 15px">
            <van-button class="button" @click="submit" type="info" size="large" :loading="loading">确定留言</van-button>
        </div>
    </div>

    <div v-else-if="showForm === false">

    </div>
    <div v-else style="margin-top: 40%">
        <van-loading type="spinner" color="#1989fa"/>
    </div>
</template>

<script>
    import * as qiniu from 'qiniu-js';
    import moment from 'moment';
    import Vue from "vue";
    import {ImagePreview} from "vant";
    Vue.use(ImagePreview);
    import {dingDing} from '../../api/homework'
    import { Step, Steps } from 'vant';
    import { Dialog } from 'vant';
    Vue.use(Step);
    Vue.use(Steps);
    export default {
        name: "suggest",
        data() {
            return {
                minDate: new Date(),
                maxDate: new Date(2025, 10, 1),
                loading: false,
                showStartDate: false,
                showForm: true,
                detail: {},
                remark: '',
                content: '',
                timeConsuming: '',
                evaluate: '',
                subject: '',
                customerPhone: '',
                customerCertNo: '',
                showPicker: false,
                cashierCode: '',
                url: '',
                newDate: (new Date()).valueOf(),
                content: '',
                message: ''
            }
        },
        mounted() {
            this.detail = JSON.parse(localStorage.getItem('info'))
            //this.getOpenImgState()
            this.date=moment(new Date()).format('YYYY-MM-DD');
        },
        methods: {
            async submit() {
                let params = {};
                params.content=this.message
                if(params.content==''||params.content==null){
                    Dialog.alert({
                        message: '留言为空,想我打断你的腿?!',
                        theme: 'round-button',
                    }).then(() => {
                        return
                    });
                    return
                }
                const result = await dingDing(params)
                if(result.data.code == '20000') {
                    this.$toast({
                        message: result.data.data,
                    });
                    this.content=''
                }else{
                    Dialog.alert({
                        message: result.data.msg,
                        theme: 'round-button',
                    }).then(() => {
                        return
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
