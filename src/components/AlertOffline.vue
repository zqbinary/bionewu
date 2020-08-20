<template>
  <div class="alert_bg">
    <div
      class="alert_wrap alert_wrap_no_bind"
      v-if="$store.state.user.localPid && $store.state.user.pid != $store.state.user.localPid"
    >
      <div class="close_btn" @click="close"></div>

      <div class="toast_content toast_no_bind_content" v-if="isNoUnbind">
        <div class="toast_icon toast_icon_error"></div>
        <div class="toast_text">
          已绑定设备不在线，
          <span class="unbind_text" @click="onUnbindClicked">绑当前设备</span>
        </div>
      </div>
      <div class="toast_content toast_no_bind_content" v-else>
        <div class="toast_icon toast_icon_error"></div>
        <div class="toast_text">是否绑定当前设备</div>
        <div class="bind_btns">
          <div class="bind_btn bind_yes" @click="onUnbindClicked">确定</div>
          <div class="bind_btn bind_no" @click="onNoUnbindClicked">取消</div>
        </div>
      </div>
    </div>
    <div class="alert_wrap alert_wrap_no_bind" v-else>
      <div class="close_btn" @click="close"></div>
      <div class="toast_content toast_no_bind_content">
        <div class="toast_icon toast_icon_error"></div>
        <div class="toast_text">
          <p>设备不在线</p>
          <p>请到本地套件中心打开玩物下载</p>
          <p>如设备在线，请修改DNS为223.6.6.6</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    data: function() {
      return {
        isNoUnbind: false
      };
    },
    methods: {
      ...mapActions(["cleanUserBind", "postUserDevices", "getBoxList"]),
      close: function() {
        this.$store.state.isShowOffline = false;
      },
      onNoUnbindClicked: function() {
        this.isNoUnbind = true;
      },
      onUnbindClicked: function() {
        let _that = this;
        _that.cleanUserBind([
          function(err, data) {
            if (!err) {
              _that.postUserDevices([
                _that.$store.state.user.localPid,
                function(err, data) {
                  if (!err && !data.rtn) {
                    _that.$store.state.alertToast.type =
                      "success";
                    _that.$store.state.alertToast.text =
                      "设备绑定成功";
                    _that.close();
                    _that.updateBox();
                  } else if (!err && data.rtn == 10115) {
                    _that.$store.state.alertError.text =
                      "首次绑定，请到本地套件中心打开玩物下载";
                  } else if (!err && data.rtn == 311) {
                    _that.$store.state.alertError.text =
                      "绑定失败，设备不在线";
                  } else {
                    _that.$store.state.alertError.text =
                      "该设备已被其他用户绑定";
                  }

                  localStorage.setItem("owdl-host", "");
                }
              ]);
            }
          }
        ]);
      },
      updateBox: function() {
        let _that = this;
        _that.getBoxList([
          function(err, data) {
            if (!err && data.info.length > 0) {
              _that.$store.state.user.pid = data.info[0].pid;
              _that.$store.state.user.devStatus = data.info[0].status;
              if (
                data.info[0].partitions &&
                data.info[0].partitions.length > 0
              ) {
                _that.$store.state.user.uuid =
                  data.info[0].partitions[0].uuid;
              }
            }
          }
        ]);
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
      width: 280px;
      margin-left: -140px;
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
        .unbind_text {
          cursor: pointer;
          color: #3cacee;
        }
        .unbind_text:hover {
          text-decoration: underline;
        }
        .bind_btns {
          text-align: center;
          .bind_btn {
            display: inline-block;
            width: 60px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin: 0 10px;
            border-radius: 4px;
            margin-top: 15px;
            background-color: #3cacee;
            color: #ffffff;
          }

          .bind_btn:hover {
            opacity: 0.8;
            cursor: pointer;
          }

          .bind_no {
            background-color: #ffffff;
            color: #3cacee;
            border: 1px solid #3cacee;
          }
        }
      }
    }
  }
</style>
