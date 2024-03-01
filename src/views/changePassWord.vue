<template>
    <div class="box">
        <van-notice-bar
                left-icon="volume-o"
                text="修改密码"
        />
        <div class="content">
            <h3>修改密码</h3>
            <van-form @submit="changePassWord" class="login">
                <van-field
                        v-model="oldPassword"
                        type="password"
                        name="密码"
                        placeholder="请输入旧密码"
                        clearable
                />
                <div >
                    <van-field
                            v-model="newPassword"
                            type="password"
                            name="密码"
                            placeholder="请输入新密码"
                            clearable
                    />
                </div>
                <div >
                    <van-field
                            v-model="newPasswordAgain"
                            type="password"
                            name="密码"
                            placeholder="请再次输入新密码"
                            clearable
                    />
                </div>
                <div style="margin: 25px 16px;">
                    <van-button round block type="info" native-type="submit">
                        确认修改
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
    import {changePassWord} from '../api/user'
    import { Dialog } from 'vant';
    export default {
        name: 'changePassWord',
        data() {
            return {
                oldPassword: '',
                newPassword: '',
                newPasswordAgain: '',
            }
        },
        mounted() {


        },
        methods: {
            async changePassWord(){
                if(!this.oldPassword||!this.newPassword||!this.newPasswordAgain){
                    Dialog.alert({
                        message: '请填完整',
                        theme: 'round-button',
                    })
                }else{
                    if(this.newPassword!=this.newPasswordAgain){
                        Dialog.alert({
                            message: '两次新密码不一致',
                            theme: 'round-button',
                        })
                    }else{
                        let query = new Object();
                        query.oldPassword=this.oldPassword
                        query.newPassword=this.newPassword
                        let result= await  changePassWord(query)
                        //console.log(result)
                        if(result.code='20000'){
                            localStorage.removeItem("login_token")
                            this.$toast({
                                message: result.data.data,
                                icon: 'warning-o'
                            });
                            this.$router.push({name:'login'});

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
