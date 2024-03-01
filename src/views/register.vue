<template>

    <div class="box">

        <van-notice-bar
                left-icon="volume-o"
                text="使用过程中,遇到任何问题,请联系开发人员:吴思,联系电话:18602702325"
        />

        <div class="content">
           <!-- <van-dialog v-model="show" title="标题" show-cancel-button>
                <img src="https://img01.yzcdn.cn/vant/apple-3.jpg" />
            </van-dialog>-->
            <div>
                <Verify
                        @success='success'
                        :mode="'pop'"
                        :captchaType="'blockPuzzle'"
                        :imgSize="{ width: '330px', height: '155px' }"
                        ref="verify"
                ></Verify>

                <van-button @click="useVerify">点击调用验证组件再注册</van-button>
            </div>
            <h3>用户注册</h3>
            <van-form @submit="" class="login" v-if="show">
                <van-field
                        v-model="username"
                        name="手机号"
                        placeholder="手机号"
                        clearable
                />
                <h6>发送验证码</h6>

                <div v-if="ifDisplay">
                    <van-field
                            v-model="password"
                            type="text"
                            name="密码"
                            placeholder="请输入密码"
                            clearable
                    />
                    <span class="eyes-open" @click="ifDisplay = !ifDisplay">
                        <img src="../../src/assets/img/btn_key_visible@2x.png"/>
                    </span>
                </div>
                <div v-else>
                    <van-field
                            v-model="password"
                            type="password"
                            name="密码"
                            placeholder="请输入密码"
                            clearable
                    />
                    <span class="eyes-closed" @click="ifDisplay = !ifDisplay">
                        <img src="../../src/assets/img/btn_key_disvisible@2x.png"/>
                    </span>
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
    Vue.use(Verify)
    import {login} from '../api/user'
    import { Dialog } from 'vant';
    export default {
        name: 'register',
        components: {
            Verify
        },
        data() {
            return {
                username: '',
                password: '',
                ifDisplay: false,
                infoShow: false,
                nickname: '',
                checkCode: '',
                show: false
            }
        },
        mounted() {

        },
        methods: {
            success(params){
                this.show=true
                this.show=true
                // params 返回的二次验证参数, 和登录参数一起回传给登录接口，方便后台进行二次验证
            },
            useVerify(){
                this.$refs.verify.show()
            },
            register(){
                Dialog.alert({
                    title: '小柠檬',
                    message: '暂未开放注册,敬请期待~',
                    theme: 'round-button',
                }).then(() => {
                    this.show=false
                });

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
