<template>
    <div>
    <van-cell-group :title="this.source">
        <van-cell title="英文" :value="this.eng" />
    </van-cell-group>
        <audio :src="this.mp3" controls="controls" style="margin-left: 40px"></audio>
    <div>
        <van-image :src="this.url"
        />
    </div>
        <div style="margin-top: 20px">
            <van-button round block type="info" @click="back">返回首页</van-button>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import {ImagePreview} from "vant";
    Vue.use(ImagePreview);
    import { Image as VanImage } from 'vant';

    Vue.use(VanImage);
    import {english} from '../../api/homework'

    export default {
        name: "english",
        data() {
            return {
                eng: '',
                chi: '',
                mp3: '',
                source: '',
                url: ''
            }
        },
        mounted() {
            this.english();
        },
        methods: {
            async english(){
                let result = await english();
                console.log(result.data.newslist)
                console.log(result.data)
                if(result.data.code=="200"){
                    this.eng=result.data.newslist[0].content
                    this.mp3=result.data.newslist[0].tts
                    this.source=result.data.newslist[0].date
                    this.url=result.data.newslist[0].imgurl

                    console.log(this.url)
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
