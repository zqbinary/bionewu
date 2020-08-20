<template>
  <div class="login_wrap" @click="close">
    <div class="login_body">
      <a href="javascript:;" class="login_close" @click="close" v-if="false"></a>
      <div class="login_title">微信扫码开启远程</div>
      <div class="login_qrcode">
        <iframe :src="$store.state.loginUrl" sandbox="allow-scripts allow-top-navigation"></iframe>
      </div>
      <div class="login_bottom">
        <div class="login_tips" style="margin-top: 15px;margin-bottom: 10px;"
             v-if="$route.query.host">
          <p>首次扫码登录即会绑定当前设备</p>
          <p>远程下载地址：yc.ionewu.com</p>
        </div>
        <div class="login_tips" style="margin-top: 5px;" v-else>
          <p>请登录开始远程下载</p>
          <p>
            首次绑定请到本地套件中心点
            <br/>玩物下载图标
          </p>
        </div>
        <div class="login_help_btn" @click="showHelp">操作指南</div>
      </div>
    </div>
    <LoginHelp @onClose="closeHelp" v-if="isShowHelp"></LoginHelp>
  </div>
</template>

<script>
  import LoginHelp from '@/components/LoginHelp.vue';
  import { mapActions } from 'vuex';

  export default {
    components: {
      LoginHelp
    },
    data: function () {
      return {
        isShowHelp: false,
        tips: ''
      };
    },
    mounted: function () {
    },
    methods: {
      ...mapActions(['sendUserLog']),
      close: function () {
        if (!this.$store.state.user.pid) {
          return;
        }
        this.$store.state.isShowLogin = false;
      },
      closeHelp: function () {
        let _that = this;
        _that.sendUserLog(['onLoginHelpClick']);
        _that.isShowHelp = false;
      },
      showHelp: function () {
        let _that = this;
        _that.sendUserLog(['onLoginHelpClose']);
        _that.isShowHelp = true;
      }
    }
  };
</script>

<style lang="less" scoped>
  .login_wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 6;
    background-color: rgba(0, 0, 0, 0.6);

    .login_body {
      width: 300px;
      height: 440px;
      text-align: center;
      background-color: #ffffff;
      position: relative;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 2px 2px 5px #666666;
      /*background-image: url(../assets/login_bg_top.jpg);*/
      background-position: center top;
      background-repeat: no-repeat;
      background-size: 100% auto;

      .login_close {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        /*background-image: url(../assets/alert_close_btn.png);*/
        background-repeat: no-repeat;
        background-size: 15px 15px;
        display: block;
      }

      .login_close:hover {
        opacity: 0.5;
        cursor: pointer;
      }

      .login_title {
        font-weight: bolder;
        font-size: 20px;
        color: #333333;
        margin: 0 auto;
        margin-top: 50px;
        margin-bottom: 40px;
        /*background-image: url(../assets/login_wechat.png);*/
        background-position: left center;
        background-repeat: no-repeat;
        background-size: 26px 23px;
        padding-left: 34px;
        display: inline-block;
      }

      .login_qrcode {
        width: 150px;
        height: 150px;
        overflow: hidden;
        margin: 0 auto;
        background-color: #fff;
        text-align: center;
        box-shadow: 0px 0px 8px #aaaaaa;
        border-radius: 4px;

        iframe {
          display: block;
          margin: auto;
          width: 290px;
          -webkit-transform: scale(0.55);
          transform: scale(0.55);
          height: 428px;
          position: relative;
          right: 70px;
          top: -124px;
        }
      }

      .login_bottom {
        /*background-image: url(../assets/login_bg_bottom.jpg);*/
        background-position: center top;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 150px;
        margin-top: 30px;
        padding-top: 1px;
      }

      .login_tips {
        width: 280px;

        color: #999999;
        font-size: 14px;
        overflow: hidden;
        text-align: left;
        margin-left: 40px;

        p {
          padding-left: 15px;
          line-height: 20px;
          /*background-image: url(../assets/login_q_icon.png);*/
          background-size: 6px 6px;
          background-repeat: no-repeat;
          background-position: left 7px;
          margin: 6px auto;
        }

        p:first-child {
          margin-top: 10px;
        }
      }

      .login_help_btn {
        width: 80px;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
        margin: 0 auto;
        margin-top: 5px;
        background-color: #06a8ff;
        color: #ffffff;
        border-radius: 4px;
      }

      .login_help_btn:hover {
        opacity: 0.8;
        cursor: pointer;
      }
    }
  }
</style>
