<template>
    <div class="box" v-if="showForm===true">
        <van-notice-bar
                left-icon="volume-o"
                text="爱生活，爱路亚~路亚都是骗人的，不能吃鱼，只能锻炼身体！"
        />
        <van-cell-group>
            <van-cell
                    v-if="fishKind == '选择鱼种'"
                    title="选择鱼种"
                    is-link
                    :value="fishKind"
                    @click="showCashier">
            </van-cell>

            <van-field
                    v-else
                    title="选择鱼种"
                    is-link
                    :value="fishKind"
                    input-align="right"
                    label-width="110"
                    label="选择鱼种"
                    @click="showCashier"
            />
            <van-field
                    v-model.trim="weight"
                    clearable
                    :clickable="false"
                    placeholder="请填写重量"
                    input-align="right"
                    label-width="110"
                    label="重量(斤)"
                    type="number"
            >
            </van-field>
            <van-field
                    v-model.trim="length"
                    clearable
                    :clickable="false"
                    maxlength="11"
                    placeholder="请填写长度"
                    input-align="right"
                    label-width="110"
                    label="长度(cm)"
                    type="number"
            >
            </van-field>
            <van-cell
                    v-if="lure == '选择路亚饵'"
                    title="选择路亚饵"
                    is-link
                    :value="lure"
                    @click="showLure">
            </van-cell>

            <van-field
                    v-else
                    is-link
                    :value="lure"
                    input-align="right"
                    label-width="110"
                    label="选择路亚饵"
                    @click="showLure"
            />
           <!-- <van-field
                    readonly
                    clickable
                    name="datetimePicker"
                    :value="orderDate"
                    placeholder="请选择上鱼时间"
                    @click="showStartDate = true"
            />-->
            <van-cell
                    v-if="eatFish == '放油/放流'"
                    title="放油/放流"
                    is-link
                    :value="eatFish"
                    @click="showEatFishMethod">
            </van-cell>

            <van-field
                    v-else
                    is-link
                    :value="eatFish"
                    input-align="right"
                    label-width="110"
                    label="放油/放流"
                    @click="showEatFishMethod"
            />

            <van-field
                    v-model.trim="remark"
                    clearable
                    :clickable="false"
                    maxlength="11"
                    placeholder="请填写备注"
                    input-align="right"
                    label-width="110"
                    label="备注"
                    type="text"
            >
            </van-field>
            <van-stepper v-model="value" integer style="margin-top: 10px;text-align: center" />
            <h6 style="text-align: center">鱼获条数</h6>
            <van-popup v-model="showStartDate" position="bottom">
                <van-datetime-picker
                        title="选择时间"
                        type="date"
                        :min-date="minDate"
                        :max-date="maxDate"
                        @confirm="onConfirmDate"
                        @cancel="onCancelDate"
                />
            </van-popup>



            <van-popup
                    v-model="showPicker"
                    position="bottom"
            >
                <van-picker
                        v-model="cashier"
                        show-toolbar
                        :columns="cashierList"
                        value-key="name"
                        @cancel="showPicker = false"
                        @confirm="onConfirm"
                />

            </van-popup>
            <van-popup
                    v-model="showPickerLure"
                    position="bottom"
            >
                <van-picker
                        v-model="showPickerLure"
                        show-toolbar
                        :columns="lureList"
                        value-key="name"
                        @cancel="showPickerLure = false"
                        @confirm="onConfirmLure"
                />

            </van-popup>
            <van-popup
                    v-model="showEatFish"
                    position="bottom"
            >
                <van-picker
                        v-model="popup"
                        show-toolbar
                        :columns="eatFishList"
                        value-key="name"
                        @cancel="showEatFish = false"
                        @confirm="onConfirmEatFish"
                />

            </van-popup>
        </van-cell-group>

        <van-cell-group style="margin-top: 10px" v-if="openImgState == true">
            <van-row type="flex" justify="space-between">
                <van-col span="10" class="upload-left">
                    <p class="upload-title">鱼获图片上传</p>
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
        <van-cell style="color: #cf2d28;margin-top: 50px" v-if="this.province!=null"> {{this.province}}</van-cell>
        <van-cell style="color: #cf2d28;margin-top: 50px;size: 40px;" v-if="this.province==null"> 自动获取定位失败，无法存储位置信息!</van-cell>


        <div class="box2" style="margin: 15px">
            <van-button class="button" @click="submit" type="info" size="large" :loading="loading">确定新增鱼获</van-button>
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
    import {createSell,getFishList,getLureList,saveFish} from '../../api/trade'
    import {getUploadToken} from "../../api/upload";
    import {location} from "../../assets/js/location";
    export default {
        name: "taoBao",
        data() {
            return {
                value: '1',
                minDate: new Date(new Date().getTime()-(1000*60*60*24*5)),
                maxDate: new Date(),
                loading: false,
                showStartDate: false,
                showForm: true,
                detail: {},
                remark: '',
                orderDate: '',
                myOrderNo: '',
                buyMoney: '',
                sellMoney: '',
                product: '',
                myOrderNo: '',
                buyerName: '',
                customerCertNo: '',
                showPicker: false,
                cashier: '选择鱼种',
                lure: '选择路亚饵',
                cashierCode: '',
                url: '',
                cashierList:  [],
                lureList:  [],
                tradeNo: '',
                newDate: (new Date()).valueOf(),
                openImgState: true,
                signImg: [],
                date: '',
                beginDate: '',
                refund: '',
                showPickerLure: false,
                showEatFis: false,
                params: '',
                fishKind: '选择鱼种',
                length: '',
                weight: '',
                gunDong: localStorage.getItem("address"),
                province: localStorage.getItem("add"),
                eatFishList: [
                { name: '放油', value: '1' },
                { name: '放流', value: '2' },
            ],
                eatFish: '放油/放流',
                showEatFish: false,
                eatFishCode: ''
            }
        },
        mounted() {
            this.detail = JSON.parse(localStorage.getItem('info'))
            this.getFishList();
            this.getLureList();
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
                this.showStartDate = false;
                this.beginDate = moment(startDate).format('YYYY-MM-DD');
                this.orderDate = this.beginDate
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
                console.log("进入选择鱼方法")
                this.showPicker = true
            }, showLure() {
                console.log("进入选择路亚饵方法")
                this.showPickerLure = true
            },
         showEatFishMethod() {
            console.log("进入选择路亚饵方法")
            this.showEatFish = true
        },
            onConfirm(value) {
                this.fishKind = value.name;
                this.myOrderNo = value.name;
                this.showPicker = false;
            },
            onConfirmLure(value) {
                this.lure = value.name;
                this.myOrderNo = value.name;
                this.showPickerLure = false;
            },
            onConfirmEatFish(value) {
                this.eatFish=value.name
                this.eatFishCode=value.value
                this.showEatFish = false;
            },
            async submit() {
                let params = {};
                if(this.openImgState == true) {
                    if(this.signImg == '' || this.signImg == null) {
                        this.$toast({
                            message: '请上传图片',
                            icon: 'warning-o'
                        });
                        return;
                    }
                    params.url = this.signImg
                }
                if(this.fishKind=='选择鱼种'){
                    this.$toast({
                        message: '请选择鱼种',
                        icon: 'warning-o'
                    });
                    return ;
                }else{
                    params.fishKind=this.fishKind
                }
                params.remark=this.remark
                if(!this.weight){
                    this.$toast({
                        message: '请输入重量',
                        icon: 'warning-o'
                    });
                    return ;
                }else{
                    params.weight = this.weight
                }
                if(!this.length){
                    this.$toast({
                        message: '请输入长度',
                        icon: 'warning-o'
                    });
                    return ;
                }else{
                    params.length = this.length
                }
                if(this.lure=='选择路亚饵'){
                    this.$toast({
                        message: '请选择路亚饵',
                        icon: 'warning-o'
                    });
                    return ;
                }else{
                    params.lure = this.lure
                }
                if(!this.eatFishCode){
                    this.$toast({
                        message: '请选择放油或放流',
                        icon: 'warning-o'
                    });
                    return ;
                }else{
                    params.eatFish=this.eatFishCode
                }

                params.lng = localStorage.getItem("lng")
                params.lat = localStorage.getItem("lat")
                params.province = localStorage.getItem("province")
                params.city = localStorage.getItem("city")
                params.district = localStorage.getItem("district")
                params.address=localStorage.getItem("addAll")
                params.orderDate=this.orderDate;
                params.num=this.value
                if(!localStorage.getItem("lng")){
                    params.province='';
                    params.lng='';
                    params.lat='';
                    params.city='';
                    params.district='';
                    params.address='';
                }
                const result = await saveFish(params)
                if(result.data.code == '20000') {
                    this.$router.push({name:'taoList'});
                }else{
                    this.$toast({
                        message: result.data.msg,
                        icon: 'warning-o'
                    });
                }

            },
            async getFishList(){
                const result = await getFishList()
                console.log(result)
                if(result.data.code == '20000') {
                    this.cashierList=result.data.data
                }
            },
            async getLureList(){
                const result = await getLureList()
                if(result.data.code == '20000') {
                    this.lureList=result.data.data
                }
            },
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
