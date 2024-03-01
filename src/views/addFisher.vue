<template>

    <div class="box">

        <van-notice-bar
                left-icon="volume-o"
                text="欢迎将此工具分享给你们爱好路亚的龟佬朋友们,将访问地址或APP分享，在此页面创建账号后，用创建的账号（手机号）即可登录，默认使用统一密码:123456"
        />

        <div class="content">
            <h3>龟佬注册</h3>
            <van-form @submit="" class="login" v-if="show">
                <van-field
                        v-model="phone"
                        name="手机号"
                        type="number"
                        placeholder="请输入手机号"
                        clearable
                />
                <div v-if="ifDisplay" style="margin-top: 50px">
                    <van-field
                            v-model="name"
                            type="text"
                            name="昵称或姓名"
                            placeholder="请输入昵称或姓名"
                            clearable
                    />
                    <!--<span class="eyes-open" @click="ifDisplay = !ifDisplay">
                        <img src="../../src/assets/img/btn_key_visible@2x.png"/>
                    </span>-->
                </div>
                <div style="margin: 25px 16px;">
                    <van-button round block type="info" @click="register" v-if="show">
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>

    </div>
</template>

<script>
    import Vue from "vue";
    import Verify from "../components/verifition/Verify";
    import {addFisher} from '../api/user'
    import { Dialog } from 'vant';
    export default {
        name: 'register',
        data() {
            return {
                name: '',
                phone: '',
                username: '',
                password: '',
                ifDisplay: true,
                infoShow: false,
                nickname: '',
                checkCode: '',
                show: true
            }
        },
        mounted() {

        },
        methods: {
             register: async function(){
                if(!this.name||!this.phone){
                    Dialog.alert({
                        message: '请填完整',
                        theme: 'round-button',
                    })
                }else{
                        let query = new Object();
                        query.phone=this.phone
                        query.name=this.name
                        const result= await  addFisher(query)
                        console.log(result)
                        if(result.data.code=='20000'){
                            this.$toast({
                                message: '新增成功',
                            })
                            this.$router.push({name:'selectAction'});

                        }else{
                            this.$toast({
                                message: result.data.msg,
                                icon: 'warning-o'
                            })
                        }
                }





            }
        }
    }
</script>

<style scoped>
    .box{
        width: 100%;
    }
    .box::before {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #ffffff;
    }
    .content{
        text-align: center;
        margin: 100px 40px;
    }
    .content h3{
        text-align: center;
        font-size: 21px;
        position: relative;
    }
    .login{
        margin-top: 80px;
    }
    .eyes-closed{
        position: absolute;
        top: 266px;
        right: 76px;
    }
    .eyes-closed img{
        height: 6px;
    }
    .eyes-open{
        position: absolute;
        top: 266px;
        right: 76px;
    }
    .eyes-open img{
        height: 12px;
    }
    .van-cell {
        padding-left: 0;
    }
    .van-cell:not(:last-child)::after{
        left: 0;
    }
</style>
