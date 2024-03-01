<template>
    <div>
        <van-notice-bar
                left-icon="volume-o"
                text=从百度及其他网页实时爬取开奖号码,从百度及其他网页实时爬取开奖号码~~~~
        />
        <h3 style="text-align: center">本期购买期号:{{this.thisNum}}</h3>
        <div style="font-size: 20px;margin-top: 20px">百度:{{this.term}}&nbsp;红:<span style="color: #ee0a24">{{this.red1}}&nbsp;{{this.red2}}&nbsp;{{this.red3}}&nbsp;{{this.red4}}&nbsp;{{this.red5}}&nbsp;{{this.red6}}</span>&nbsp;<span style="color: #007aff">蓝:{{this.blue}}&nbsp;</span></div>
        <div style="font-size: 20px;margin-top: 20px">彩经:{{this.term2}}&nbsp;红:<span style="color: #ee0a24">{{this.red7}}&nbsp;{{this.red8}}&nbsp;{{this.red9}}&nbsp;{{this.red10}}&nbsp;{{this.red11}}&nbsp;{{this.red12}}</span>&nbsp;<span style="color: #007aff">蓝:{{this.blue2}}</span>&nbsp;</div>



        <div style="margin-top: 50px">
            <van-button round block type="info" @click="shouDong">手动核奖</van-button>
        </div>
        <div style="margin-top: 50px">
            <van-button round block type="info" @click="back">返回首页</van-button>
        </div>
        <van-cell-group style="margin-top: 10px" v-if="openImgState == true">
            <van-row type="flex" justify="space-between">
                <van-col span="10" class="upload-left">
                    <p class="upload-title">百万大奖上传</p>
                    <van-uploader v-if="signImg != ''"
                                  :before-read="beforeUploadImg"
                                  :after-read="uploadImg"
                                  :max-size="3 * 1024 * 1024"
                                  @oversize="onOversize"
                    >
                        <p class="upload-label">重新上传</p>
                    </van-uploader>
                </van-col>
                <van-col span="14" class="upload-right">
                    <van-uploader style="float: right"
                                  v-if="signImg == ''"
                                  :before-read="beforeUploadImg"
                                  :after-read="uploadImg"
                                  :max-size="3 * 1024 * 1024"
                                  @oversize="onOversize"
                    >
                        <van-button icon="plus" class="img-upload"></van-button>
                    </van-uploader>
                    <div class="sign-img" v-if="signImg != ''" >
                        <img :src="signImg" @click="preview(signImg,0)"/>
                    </div>
                </van-col>
            </van-row>
            <van-row>
                <van-col offset="12" span="12">
                    <p class="mini-font">文件大小3M以内</p>
                </van-col>
            </van-row>
        </van-cell-group>
        <div style="margin-top: 50px">
            <van-button round block type="warning" @click="saveImg">上传照片</van-button>
        </div>

    </div>


</template>

<script>
    import * as qiniu from 'qiniu-js';
    import moment from 'moment';
    import Vue from "vue";
    import { Switch } from 'vant';
    Vue.use(Switch);
    import {ImagePreview} from "vant";
    import { Toast } from 'vant';
    import { Calendar } from 'vant';
    Vue.use(Calendar);
    import { Field } from 'vant';
    Vue.use(Field);
    import { Picker } from 'vant';
    Vue.use(Picker);
    import { Notify } from 'vant';
    import {getOnlineNum,faQiDaiMai,suiJi,getResult,shouDong,saveImg} from '../../api/homework'
    import { ContactEdit } from 'vant';
    Vue.use(ContactEdit);
    import { Stepper } from 'vant';
    Vue.use(Stepper);

    import {getUploadToken} from "../../api/upload";
    export default {
        name: "getOnlineNum",
        data() {
            return {
                signImg: [],
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
                thisNum: '',
                value2: '',
                term: '',
                red7: '',
                red8: '',
                red9: '',
                red10: '',
                red11: '',
                red12: '',
                blue2: '',
                term2: '',
                openImgState: true,
                url: ''
            }
        },
        mounted() {
            this.getResult()
            this.getOnlineNum(1)
            this.getOnlineNum(2)
        },
        methods: {
            getOnlineNum: async function(type){
                let query=new Object();
                query.type=type
                let result = await getOnlineNum(query);
                this.ssqNum=result.data.data
                if (result.data.code == "20000") {
                    if(type==1){
                        this.red1=result.data.data.red1
                        this.red2=result.data.data.red2
                        this.red3=result.data.data.red3
                        this.red4=result.data.data.red4
                        this.red5=result.data.data.red5
                        this.red6=result.data.data.red6
                        this.blue=result.data.data.blue
                        this.term=result.data.data.term
                    }else{
                        this.red7=result.data.data.red1
                        this.red8=result.data.data.red2
                        this.red9=result.data.data.red3
                        this.red10=result.data.data.red4
                        this.red11=result.data.data.red5
                        this.red12=result.data.data.red6
                        this.blue2=result.data.data.blue
                        this.term2=result.data.data.term
                    }

                }

            },
            getResult: async function(){
                let result = await getResult();
                this.thisNum=result.data.data

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

            },
            async shouDong(){
                let result = await shouDong();
                Notify("手动成功!");
            },
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
            //校验文件大小是否超出限制
            onOversize(file){
                console.log("太大了")
                this.$toast({
                    message: '文件大小不能超过3M',
                    icon: 'warning-o'
                });
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
            async saveImg() {
                let params = {}
                params.term=this.thisNum
                params.url=this.signImg
                let result = await saveImg(params);
                console.log(result.data)
                if(result.data.code=="20000"){
                    Toast(result.data.data);
                    this.signImg=''
                }else{
                    Toast(result.data.msg);
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
