<template>
  <div class="alert_bg">
    <div class="alert_wrap alert_wrap_no_bind">
      <div
        class="toast_content toast_no_bind_content"
        v-if="$store.state.alertError.text=='首次绑定，请到本地套件中心打开玩物下载'"
      >
        <div class="toast_icon toast_icon_error"></div>
        <div class="toast_text">
          首次绑定
          <br />请到本地套件中心打开玩物下载
        </div>
        <div class="logout_btn" @click="logout">退出登陆</div>
      </div>
      <div
        class="toast_content toast_no_bind_content"
        v-else-if="$store.state.alertError.text=='该设备已被其他用户绑定'"
      >
        <div class="toast_icon toast_icon_error"></div>
        <div class="toast_text">该设备已被其他用户绑定</div>
        <div class="logout_btn" @click="logout">退出登陆</div>
      </div>
      <div class="toast_content" v-else>
        <div class="toast_icon toast_icon_error"></div>
        <div class="toast_text">{{$store.state.alertError.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    methods: {
      ...mapActions(["logout"]),
      close: function() {
        this.$store.state.alertError.text = "";
      }
    },
    mounted: function() {}
  };
</script>

<style lang="less" scoped>
  .alert_bg {
    position: absolute;
    left: 0;
    top: 60px;
    width: 100%;
    height: 100%;
    // background-color: rgba(0, 0, 0, 0.5);
    z-index: 8;
    .alert_wrap {
      width: 260px;
      margin-left: -130px;
      margin-top: -110px;
      top: 50%;
      left: 50%;
      position: absolute;
      background-color: #ffffff;
      padding: 30px 0;
      border-radius: 6px;
      box-shadow: 2px 2px 8px #666666;
      text-align: center;

      .close_btn {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        /*background-image: url(../assets/alert_close_btn.png);*/
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 15px 15px;
      }
      .close_btn:hover {
        opacity: 0.5;
        cursor: pointer;
      }
      .toast_content {
        text-align: center;
        font-size: 14px;
        color: #666666;

        .toast_icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          margin-right: 10px;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 100% 100%;
          vertical-align: middle;
        }
        .toast_icon_success {
          /*background-image: url(../assets/alert_toast_success.png);*/
        }
        .toast_icon_error {
          /*background-image: url(../assets/alert_toast_error.png);*/
        }

        .toast_text {
          display: inline-block;
          vertical-align: middle;
          text-align: left;
          max-width: 180px;
        }
      }
    }

    .alert_wrap_no_bind {
      margin-top: -140px;
      .toast_no_bind_content {
        text-align: center;
        .toast_icon {
          margin: 0;
        }
        .toast_text {
          display: block;
          text-align: center;
          width: 100%;
          max-width: 100%;
          margin-top: 10px;
          line-height: 24px;
        }
        .logout_btn {
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin: 0 auto;
          border-radius: 4px;
          margin-top: 15px;
          background-color: #3cacee;
          color: #ffffff;
        }
        .logout_btn:hover {
          opacity: 0.8;
          cursor: pointer;
        }
      }
    }
  }
</style>
