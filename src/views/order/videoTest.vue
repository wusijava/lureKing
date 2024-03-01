<template>
    <div class="small-videl-detail">
        <div class="van_swipe">
            <!--vant van-swipe 滑动组件 -->
            <van-swipe :autoplay="400000" :show-indicators="false" @change="onChange" vertical>
                <van-swipe-item v-for="(item, index) in videoList" :key="index" class="product_swiper">
                    <div class="video_container">
                        <!--video属性
                            webkit-playsinline ios 小窗播放，使视频不脱离文本流，安卓则无效
                            微信内置x5内核，
                            x5-video-player-type="h5" 启用H5播放器,是wechat安卓版特性，添加此属性，微信浏览器会自动将视频置为全屏
                            x5-video-player-fullscreen="true" 全屏设置，设置为 true 是防止横屏
                            x5-video-orientation 控制横竖屏 landscape 横屏，portrain竖屏； 默认portrain
                            x5-playsinline="" 使安卓实现h5同层播放，实现与ios同样效果，但兼容部分机型
                            poster：封面
                            src：播放地址
                          -->
                        <video class="video_box" width="10%" height="10%" webkit-playsinline="false" x5-playsinline=""
                               playsinline preload="auto" :poster="item.url" :src="item.cover" :playOrPause="playOrPause"
                               x-webkit-airplay="allow"  @click="pauseVideo" @ended="onPlayerEnded($event)"
                               loop="loop"  x5-video-player-type="h5" x5-video-player-fullscreen="false"  x5-video-orientation="portrain">
                        </video>
                        <!-- 封面 -->
                        <img v-show="isVideoShow" class="play" @click="playvideo" :src="item.url" />
                        <!-- 播放暂停按钮 -->
                        <van-icon name="pause-circle-o" color="white" v-show="iconPauseShow" size="90" class="icon_play" @click="pauseVideo"/>
                        <van-icon name="play-circle-o" color="white"  v-show="iconPlayShow" size="90" class="icon_play" @click="playvideo"/>
                    </div>
                </van-swipe-item>
            </van-swipe>
            <!--  右侧标签 -->
            <div class="right_tabs">
                <div>
                    <van-icon :name="likeName" color="#ee0a24"  size="40" badge="100+" @click="likeIt"/>
                    <p></p>
                    <van-icon name="chat" size="40" color="white"   badge="48" @click="show = true"/>
                    <p></p>
                    <van-icon name="share" color="white"  size="40" @click="share = true"/>
                </div>

            </div>



        </div>
        <!-- 评论面板 -->
        <van-action-sheet v-model:show="show" @select="onSelectPingLun" >
            <div class="pinglun_content" id="pinglun_content" ref="pinglun_content">
                <van-cell-group>
                    <van-cell title="热门评论" class="article-title">
                        <!-- 展示五条 -->
                        <template #label>
                            <van-cell title="徐女士"  >
                                <!-- 使用 icon 插槽来自定义左侧图标 -->
                                <template #icon>
                                    <div class="" style="margin-right: .23rem">
                                        <van-image
                                                width="2rem"
                                                height="2rem"
                                                fit="fill"
                                                round
                                                src="https://img.yzcdn.cn/vant/cat.jpeg"
                                        />
                                    </div>
                                </template>
                                <template #label>
                                    <div class="ping_lun_info">
                                        <div class="pin_lun_detail">
                                            这仅仅是规定，还是出台一个法律保护企业微妙，否则一旦出现问题，肯定第一就找企业。
                                        </div>
                                        <div class="ping_lun_other">
                                            <span class="pnglun_date">3天前-发布</span>
                                            <van-icon name="good-job-o" class="pinglun_label" size="1.2rem" badge="99+"  color="#ee0a24"/>
                                            <van-tag plain class="pinglun_label" round color="#7232dd"  @click="detailShow = true">评论 12</van-tag>
                                        </div>
                                    </div>
                                </template>
                            </van-cell>
                            <van-cell title="徐女士"  >
                                <!-- 使用 icon 插槽来自定义左侧图标 -->
                                <template #icon>
                                    <div class="" style="margin-right: .23rem">
                                        <van-image
                                                width="2rem"
                                                height="2rem"
                                                fit="fill"
                                                round
                                                src="https://img.yzcdn.cn/vant/cat.jpeg"
                                        />
                                    </div>
                                </template>
                                <template #label>
                                    <div class="ping_lun_info">
                                        <div class="pin_lun_detail">
                                            这仅仅是规定，还是出台一个法律保护企业微妙，否则一旦出现问题，肯定第一就找企业。
                                        </div>
                                        <div class="ping_lun_other">
                                            <span class="pnglun_date">3天前-发布</span>
                                            <van-icon name="good-job-o" class="pinglun_label" size="1.2rem" badge="99+"  color="#ee0a24"/>
                                            <van-tag plain class="pinglun_label" round color="#7232dd"  @click="detailShow = true">评论 12</van-tag>
                                        </div>
                                    </div>
                                </template>
                            </van-cell>
                            <van-cell title="徐女士"  >
                                <!-- 使用 icon 插槽来自定义左侧图标 -->
                                <template #icon>
                                    <div class="" style="margin-right: .23rem">
                                        <van-image
                                                width="2rem"
                                                height="2rem"
                                                fit="fill"
                                                round
                                                src="https://img.yzcdn.cn/vant/cat.jpeg"
                                        />
                                    </div>
                                </template>
                                <template #label>
                                    <div class="ping_lun_info">
                                        <div class="pin_lun_detail">
                                            这仅仅是规定，还是出台一个法律保护企业微妙，否则一旦出现问题，肯定第一就找企业。
                                        </div>
                                        <div class="ping_lun_other">
                                            <span class="pnglun_date">3天前-发布</span>
                                            <van-icon name="good-job-o" class="pinglun_label" size="1.2rem" badge="99+"  color="#ee0a24"/>
                                            <van-tag plain class="pinglun_label" round color="#7232dd"  @click="detailShow = true">评论 12</van-tag>
                                        </div>
                                    </div>
                                </template>
                            </van-cell>
                        </template>
                    </van-cell>
                    <van-cell title="最新评论" class="article-title">
                        <template #label>
                            <van-cell title="徐女士"  >
                                <!-- 使用 icon 插槽来自定义左侧图标 -->
                                <template #icon>
                                    <div class="" style="margin-right: .23rem">
                                        <van-image
                                                width="2rem"
                                                height="2rem"
                                                fit="fill"
                                                round
                                                src="https://img.yzcdn.cn/vant/cat.jpeg"
                                        />
                                    </div>
                                </template>
                                <template #label>
                                    <div class="ping_lun_info">
                                        <div class="pin_lun_detail">
                                            这仅仅是规定，还是出台一个法律保护企业微妙，否则一旦出现问题，肯定第一就找企业。
                                        </div>
                                        <div class="ping_lun_other">
                                            <span class="pnglun_date">3天前-发布</span>
                                            <van-icon name="good-job-o" class="pinglun_label" size="1.2rem" badge="99+"  color="#ee0a24"/>
                                            <van-tag plain class="pinglun_label" round color="#7232dd"  @click="detailShow = true">评论 12</van-tag>
                                        </div>
                                    </div>
                                </template>
                            </van-cell>
                            <van-cell title="徐女士"  >
                                <!-- 使用 icon 插槽来自定义左侧图标 -->
                                <template #icon>
                                    <div class="" style="margin-right: .23rem">
                                        <van-image
                                                width="2rem"
                                                height="2rem"
                                                fit="fill"
                                                round
                                                src="https://img.yzcdn.cn/vant/cat.jpeg"
                                        />
                                    </div>
                                </template>
                                <template #label>
                                    <div class="ping_lun_info">
                                        <div class="pin_lun_detail">
                                            这仅仅是规定，还是出台一个法律保护企业微妙，否则一旦出现问题，肯定第一就找企业。
                                        </div>
                                        <div class="ping_lun_other">
                                            <span class="pnglun_date">3天前-发布</span>
                                            <van-icon name="good-job-o" class="pinglun_label" size="1.2rem" badge="99+"  color="#ee0a24"/>
                                            <van-tag plain class="pinglun_label" round color="#7232dd"  @click="detailShow = true">评论 12</van-tag>
                                        </div>
                                    </div>
                                </template>
                            </van-cell>
                            <van-cell title="徐女士"  >
                                <!-- 使用 icon 插槽来自定义左侧图标 -->
                                <template #icon>
                                    <div class="" style="margin-right: .23rem">
                                        <van-image
                                                width="2rem"
                                                height="2rem"
                                                fit="fill"
                                                round
                                                src="https://img.yzcdn.cn/vant/cat.jpeg"
                                        />
                                    </div>
                                </template>
                                <template #label>
                                    <div class="ping_lun_info">
                                        <div class="pin_lun_detail">
                                            这仅仅是规定，还是出台一个法律保护企业微妙，否则一旦出现问题，肯定第一就找企业。
                                        </div>
                                        <div class="ping_lun_other">
                                            <span class="pnglun_date">3天前-发布</span>
                                            <van-icon name="good-job-o" class="pinglun_label" size="1.2rem" badge="99+"  color="#ee0a24"/>
                                            <van-tag plain class="pinglun_label" round color="#7232dd"  @click="detailShow = true">评论 12</van-tag>
                                        </div>
                                    </div>
                                </template>
                            </van-cell>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>
        </van-action-sheet>

        <!-- 评论框 -->
        <van-action-sheet v-model:show="detailShow" @select="onSelectPingLun" >
            <div class="content">
                <van-form @submit="onSubmit">
                    <van-cell-group inset>
                        <van-field
                                v-model="message"
                                rows="8"
                                size="large"
                                type="textarea"
                                maxlength="100"
                                placeholder="您的评论..."
                                show-word-limit
                        />
                    </van-cell-group>
                    <div style="margin: 16px;">
                        <van-button round block color="linear-gradient(to right, #7232dd, #ee0a24)" native-type="submit">
                            提交
                        </van-button>
                    </div>
                </van-form>
            </div>
        </van-action-sheet>

        <!-- 分享面板 -->
        <van-share-sheet
                v-model:show="share"
                title="立即分享给好友"
                :options="options"
                @select="onSelect"
        />
    </div>
</template>

<script>

    import { Toast } from 'vant';
    export default {
        name: 'fish-video',
        data() {
            return {
                message: '',
                share: false,
                show: false,
                detailShow: false,
                dianzhan: false,
                likeName: 'like',
                current: 0,
                options: [
                    [
                        { name: '微信', icon: 'wechat' },
                    ],
                    [
                        { name: '复制链接', icon: 'link' },
                        { name: '二维码', icon: 'qrcode' },
                    ],
                ],
                videoList: [{
                    url: "https://img.yzcdn.cn/vant/cat.jpeg",
                    cover: "http://www.picture.lureking.cn/42ba2ccd731d6a98c796f88950406862.mp4"
                },{
                    url: "https://img.yzcdn.cn/vant/cat.jpeg",
                    cover: "http://www.picture.lureking.cn/wx_camera_1648337654018.mp4"
                },{
                    url: "https://img.yzcdn.cn/vant/cat.jpeg",
                    cover: "http://www.picture.lureking.cn/3434.mp4"
                },{
                    url: "https://img.yzcdn.cn/vant/cat.jpeg",
                    cover: "http://www.picture.lureking.cn/4545.mp4"
                }],
                isVideoShow: true,
                playOrPause: true,
                video: null,
                iconPlayShow: true,
                iconPauseShow: false
            }
        },
        methods: {
            onSelect (option) {
                this.share = false;
            },
            likeIt(event) {
                if (this.dianzhan) {
                    Toast.success('点赞成功');
                    this.dianzhan = false;
                    this.likeName = 'like'
                }  else {
                    Toast.success('取消成功');
                    this.dianzhan = true;
                    this.likeName = 'like-o'
                }
            },
            onChange(index) {
                //改变的时候 暂停当前播放的视频
                let video = document.querySelectorAll('video')[this.current];
                video.pause();
                this.playOrPause = false;
                this.current = index;
                //重置显示封面。图标等
                this.isVideoShow = true;
                this.iconPlayShow = true
                this.iconPauseShow = false
            },
            playvideo(event) {
                let video = document.querySelectorAll('video')[this.current];
                console.log("playvideo：" + this.current);
                this.isVideoShow = false;
                this.iconPlayShow = false
                this.iconPauseShow = true
                video.play();
                this.displayBtn()
            },
            pauseVideo(event) { //暂停\播放
                let video = document.querySelectorAll('video')[this.current]
                console.log("pauseVideo" + this.current)
                if (this.playOrPause) {
                    video.pause()
                    this.iconPlayShow = true
                    this.iconPauseShow = false
                } else {
                    video.play()
                    this.iconPlayShow = false
                    this.iconPauseShow = true
                }
                this.playOrPause = !this.playOrPause
                this.displayBtn()
            },
            displayBtn() {
                const secounds = 1
                let num = 0
                const timer = setInterval(() => {
                    if(num < secounds) {
                        num++
                    }else {
                        clearInterval(timer)
                        this.iconPlayShow = false
                        this.iconPauseShow = false
                    }
                }, 1000)// 这里的时间不要忘记，否则没有效果
            },
            onPlayerEnded(player) { //视频结束
                this.isVideoShow = true
                this.current += this.current
            },
            onSubmit(){

            },
            onSelectPingLun(){

            }
        }
    }
</script>
<style scoped>
    .botton_tabs {
        margin-left: .6rem;
        position: absolute;
        bottom: 5%;
        left: 0%;
        width: 83%;
        z-index: 999;
    }
    .botton_tabs .video_info_title {
        font-size: 1.03rem;
        font-weight: 600;
        color: white;
    }
    .botton_tabs .video_info_content {
        color: white;
        font-size: .8rem;
    }

    /*    /deep/.van-cell-group {
            background-color: transparent;
        }
        /deep/.van-cell-group .van-cell {
            background-color: transparent;
        }
        /deep/.van-cell__title span {
            font-size: 1.03rem;
            font-weight: 600;
            color: white;
        }
        /deep/.van-cell__title .van-cell__label {
            color: white;
            font-weight: 600;
        }*/
    .hide {
        display: none;
    }
    .show{
        display: block;
    }

    .video-player {
        height: 100vh;
        width: 100vw;
    }

    .product_swiper{
        width: 100vw;
        height: 100vh;
    }

    .van_swipe {
        width: 100vw;
        height: 100vh;
    }

    .van-swipe {
        width: 100%;
        height: 100%;
    }

    .container_box {
        width: 100vw;
        height: 100vh;
    }

    .video_box {
        object-fit: fill !important;
        z-index: 999;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        overflow: hidden;
    }

    video {
        object-position: 0 0;
    }

    .icon_play {
        position: absolute;
        top: 44%;
        right: 40%;
        z-index: 999;
    }

    .right_tabs {
        position: absolute;
        top: 62%;
        right: 6%;
        z-index: 999;
    }
    .play,
    .platStart {
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
    }
    /*评论*/
    .ping_lun_info {

    }
    .article-other {
        margin-top: .75rem;
    }
    .ping_lun_info .ping_lun_other {
        margin-top: .5rem;
    }
    .ping_lun_info .ping_lun_other .pnglun_date {
        font-weight: 600;
    }
    .ping_lun_info .ping_lun_other .pinglun_label {
        margin-left: 1.5rem;
    }
</style>

<style scoped>
    html,
    body {
        width: 100%;
        height: 100%;
    }
    .box{
        display:flex; /*父元素的定义为flex布局*/
        width:100%;
        height: calc(100vh - 0px); /* 高度自适应*/
        flex-direction: column; /*定义排列方向为竖排*/
        background: #F3F3F5;
    }
    .box .header{
        height: 35px;
        margin: 5px 12px;
    }
    .box .content{
        flex:1; /*中间分配剩下的所有空间*/
        overflow:auto;
        margin: 0 12px;
    }
    .content .list{
        background: #ffffff;
        border-radius: 3px;
        padding: 8px;
        margin-bottom: 8px;
    }
    .content .list p {
        font-size: 0.75em;
        margin: 0;
        line-height: 16px;
    }
    .content .list h4 {
        font-size: 1rem;
        margin: 0;
        color: #121212;
        line-height: 24px;
    }
    .filter-head{
        background: #ffffff;
        color: #121212;
        border: 0;
    }
    .box .footer{
        height: 65px;
    }
    .van-pagination {
        line-height: 60px;
    }
    .box .footer >>>.van-pagination__item {
        height: 65px;
    }
    .van-button{
        border-radius: 3px;
    }
    .btn-small{
        height:24px;
        min-width: 50px;
        line-height: 24px;
        font-size: 0.75em;
    }
    .color-1{
        color: #2873FF;
    }
    .color-2{
        color: #269B26;
    }
    .color-3{
        color: #FF8400;
    }
    .color-4{
        color: #9C00FF;
    }
    .filter{
        margin: 15px;
    }
    .van-cell {
        background-color: #F3F3F5;
        border-radius: 3px;
        line-height: 22px;
        font-size: 11px;
        margin-bottom: 8px;
    }
    .radio{
        margin-bottom: 20px;
    }
    .radio p{
        font-size: 0.75em;
    }
    .radio span{
        font-size: 0.75em;
        background: #F3F3F5;
        border: 1px solid #F3F3F5;
        border-radius: 5px;
        padding: 5px 8px;
        margin-right: 8px;
    }
    .search{
        margin-top: 45px;
    }
    .search .btn-cancel{
        width: 90%;
    }
    .search .btn-search{
        width: 100%;
    }
    .radio-label,
    .radio-check {
        display: inline-block;
        position: relative;
        margin-right: 5px;
        margin-top: 6px;
    }
    .radio-check input[type="radio"] {
        appearance: none; /*清楚默认样式*/
        -webkit-appearance: none;
        /* opacity: 0; */
        outline: none;
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 50%;
        background: #b4b4b4;
    }
    .radio-check input[type="radio"] {
        opacity: 0;
    }
    .radio-check label {
        display: inline-block;
        /* min-width: 50px; */
        height: 24px;
        font-size: 0.75em;
        line-height: 24px;
        text-align: center;
        padding-right: 10px;
        border: 1px solid #F3F3F5;
        background-color: #F3F3F5;
        border-radius: 5px;
        padding-left: 10px;
        cursor: pointer;
    }
    .radio-check input[type="radio"]:checked + label + span {
        background-color: #EFF3FF;
        color: #2873FF;
        opacity: 1;
    }
    .activeClass{
        color: #2873FF;
        border: 1px solid #2873FF;
        background-color: #EFF3FF;
        border-radius: 5px;
    }
    .detail{
        width: 90%;
        height: 90%;
        border-radius: 3px;
    }
    .detail h4{
        font-size: 1em;
        text-align: center;
    }
    .detail .detail-main{
        padding: 0 10px 10px 10px;
        font-size: 0.75em;
    }
    .detail .detail-main .left{
        text-align: left;
        color: #555555;
    }
    .detail .detail-main .right{
        text-align: right;
    }
    .overflow-hide{
        height: 32px;
        line-height: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .input-overlay{
        background-color: black;
        opacity: 0.2;
        width: 90%;
        height:40px;
        z-index: 999;
    }
</style>
