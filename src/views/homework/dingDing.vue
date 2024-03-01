<template>
    <div class="box" v-if="showForm===true">
        <van-notice-bar
                left-icon="volume-o"
                text="通过钉钉机器人群发群消息~通过钉钉机器人群发群消息~通过钉钉机器人群发群消息~"
        />
        <van-cell-group style="margin-top: 100px">


            <van-field
                    v-model.trim="content"
                    clearable
                    :clickable="false"
                    type="textarea"
                    maxlength="200"
                    placeholder="请填写群发内容"
                    input-align="right"
                    label-width="110"
                    label="内容"
            style="height: 280px">
            </van-field>
        </van-cell-group>


        <div class="box2" style="margin: 15px">
            <van-button class="button" @click="submit" type="info" size="large" :loading="loading">确定群发钉钉消息</van-button>
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
    import {addHomework,dingDing} from '../../api/homework'
    import {getUploadToken} from "../../api/upload";

    export default {
        name: "addHomework",
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
                cashier: '选择学科',
                cashierCode: '',
                url: '',
                cashierList:  [{id: 1, name: "语文"}, {id: 2, name: "数学"}, {id: 3, name: "英语"}, {id: 4, name: "舞蹈"}, {id: 5, name: "其他"}],
                tradeNo: '',
                newDate: (new Date()).valueOf(),
                openImgState: true,
                signImg: [],
                date: '',
                beginDate: '',
                content: ''
            }
        },
        mounted() {
            this.detail = JSON.parse(localStorage.getItem('info'))
            //this.getOpenImgState()
            this.date=moment(new Date()).format('YYYY-MM-DD');
        },
        methods: {
            //校验文件大小是否超出限制
            onOversize(file){
                this.$toast({
                    message: '文件大小不能超过3M',
                    icon: 'warning-o'
                });
            },
            onConfirmDate(startDate) {
                console.log(startDate)
                this.showStartDate = false;
                this.beginDate = moment(startDate).format('YYYY-MM-DD');
                console.log(this.beginDate )
                this.date = this.beginDate
                //this.onEndDate();
            }
        ,
        onCancelDate() {
            this.date = ''
            this.showStartDate = false;
        },
            //图片上传之前校验
            beforeUploadImg(param) {
                const imgSize = param.size / 1024 / 1024;
                //图片压缩
                if(imgSize > 3) {
                    const _this = this;
                    return new Promise(resolve => {
                        const reader = new FileReader();
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        const image = new Image();
                        image.onload = (imageEvent) => {
                            const width = image.width;
                            const height = image.height;
                            canvas.width = width;
                            canvas.height = height;
                            context.clearRect(0,0,width,height);
                            context.drawImage(image,0,0,width,height);
                            const dataUrl = canvas.toDataURL(param.type, 0.92);
                            const blobData = _this.dataURLtoBlob(dataUrl,param.type);
                            resolve(blobData);
                        }
                        reader.onload = (e => {
                            image.src = e.target.result;
                        })
                        reader.readAsDataURL(param);
                    })
                }
                return true;
            },
            dataURLtoBlob(dataURI) { // 将base64转换为file文件
                const arr = dataURI.split(',')
                const mime = arr[0].match(/:(.*?);/)[1]
                const bstr = atob(arr[1])
                let n = bstr.length
                const u8arr = new Uint8Array(n)
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n)
                }
                return new Blob([u8arr],  { type: mime })
            },
            async getUploadToken(type) {
                let result = await getUploadToken({outOrderNo:"123", type: 1});
                let data = result.data;
                if (data.code == "20000") {
                    return data.data;
                } else {
                    this.$dialog.alert({
                        message: data.msg,
                    });
                }
            },
            async uploadToQiniu(file, token, key, url, type) {
                let config = {
                    useCdnDomain: true,   //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
                    region: qiniu.region.z2     // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
                };
                let putExtra = {
                    fname: file.name,  //文件原文件名
                    params: {}, //用来放置自定义变量
                    mimeType: null  //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
                };
                let observable = qiniu.upload(file, key, token, putExtra, config);

                observable.subscribe({
                    next: (result) => {
                        // 主要用来展示进度
                        console.log(result)
                    },
                    error: (errResult) => {
                        // 失败报错信息
                        console.log(errResult)
                        this.$dialog.alert({
                            message: '上传失败，请重试',
                        });
                    },
                    complete: (result) => {
                        // 接收成功后返回的信息
                        this.signImg = url;
                        console.log(url)
                    }
                })
            },
            //上传图片
            async uploadImg(files) {
                let formData = new FormData();
                formData.append('file',files.file);
                let file = files.file;
                let data = await this.getUploadToken("alipays");
                if (data) {
                    let url = data.host + data.key;
                    this.uploadToQiniu(file, data.token, data.key, url, "alipays");
                }
            },
            //预览图片
            preview(images,index) {
                let arr = new Array()
                arr.push(images)
                ImagePreview({
                    images: arr,
                    showIndex:false,
                    loop:false, //是否循环播放
                    startPosition:index
                })
            },
            showCashier() {
                this.showPicker = true
            },
            onConfirm(value) {
                this.cashier = value.name;
                this.subject = value.name;
                this.showPicker = false;
            },
            async submit() {
                let params = {};
                params.content=this.content
                const result = await dingDing(params)
                console.log(result)
                if(result.data.code == '20000') {
                    this.$toast({
                        message: result.data.data,
                    });
                    this.content=''
                }else{
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
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
