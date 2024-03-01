<template>
    <div class="box">
        <van-notice-bar
                left-icon="volume-o"
                text="使用过程中,遇到任何问题,请联系开发人员:吴思,联系电话:18602702325"
        />
        <div class="content">
            <h3>卤鸭大王</h3>
            <van-form @submit="toLogin" class="login">
                <van-field
                        v-model="username"
                        name="账号"
                        placeholder="请输入账号(默认使用手机号)"
                        clearable
                />
                <div v-if="ifDisplay">
                    <van-field
                            v-model="password"
                            type="text"
                            name="密码"
                            placeholder="请输入密码(默认密码:123456)"
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
                            placeholder="请输入密码(默认密码:123456)"
                            clearable
                    />
                    <span class="eyes-closed" @click="ifDisplay = !ifDisplay">
                        <img src="../../src/assets/img/btn_key_disvisible@2x.png"/>
                    </span>
                </div>
                <div style="margin: 25px 16px;">
                    <van-button round block type="info" native-type="submit">
                        登录
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
    import {login} from '../api/user'
    import { Dialog } from 'vant';
    export default {
        name: 'login',
        data() {
            return {
                username: '',
                password: '',
                ifDisplay: false,
                infoShow: false,
                nickname: ''
            }
        },
        mounted() {

            let token = localStorage.getItem('login_token');
            if(token){
                this.$router.push({name:'selectAction'})

            }
        },
        methods: {
            toLogin() {
                if(this.username == '' || this.password == '') {
                    this.infoShow = true
                    this.$dialog.alert({
                        message:'用户名密码不能为空',
                    })
                } else{
                    let query = new Object()
                    query.username = this.username
                    query.password = this.password
                    login(query).then(json =>{
                        if(json.data.code === '20000') {
                            localStorage.setItem('login_token', json.headers.authorization);
                            localStorage.setItem('username', json.data.data.username);
                            localStorage.setItem("num",1);
                            this.$router.push({name:'selectAction'})
                        }else {
                            this.infoShow = true
                            this.$dialog.alert({
                                message:json.data.msg,
                            })
                        }
                    })
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
