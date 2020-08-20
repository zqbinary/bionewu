<template>
  <div class="alert_bg">
    <div class="alert_wrap">
      <div class="close_btn" @click="close"></div>
      <div class="toast_content">
        <div class="toast_icon toast_icon_error" v-if="$store.state.alertToast.type=='error'"></div>
        <div class="toast_icon toast_icon_success" v-if="$store.state.alertToast.type=='success'"></div>
        <div class="toast_text">{{$store.state.alertToast.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      close: function() {
        this.$store.state.alertToast.text = "";
      }
    },
    mounted: function() {
      let _that = this;
      setTimeout(function() {
        _that.$store.state.alertToast.text = "";
      }, _that.$store.state.alertToast.time);
    }
  };
</script>

<style lang="less" scoped>
  .alert_bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    .alert_wrap {
      width: 260px;
      margin-left: -130px;
      margin-top: -50px;
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
  }
</style>
