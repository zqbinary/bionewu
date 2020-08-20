<template>
  <div class="notice_wrap">
    <div class="notice_body">
      <div class="notice_title">欢迎使用玩物下载</div>
      <div class="notice_content" v-if="$store.state.user.cid == 110">
        <p>1、玩物下载套件支持迅雷下载技术；</p>
        <p>2、玩物下载套件会将您的设备作为网络加速节点，会使用硬盘空间、带宽资源。同时根据使用情况用户可获得奖励。本套件不会接触您的任何个人数据；</p>
        <p>3、如不希望作为网络加速节点，您卸载或停用本套件即可。</p>
      </div>
      <div class="notice_content" v-else>
        <p>1、玩物下载应用支持迅雷下载技术；</p>
        <p>2、您了解并知晓：在您使用玩物下载的过程中，需遵守中国法律法规；</p>
        <p>3、本应用不会接触您的任何个人数据。</p>
      </div>
      <div class="notice_check">
        <input type="checkbox" checked="checked" v-model="isAgree" />
        <span>
					同意"
					<a href="https://www.ionewu.com/priv/UProtocol.html" target="_blank" title="用户协议">用户协议</a>"和"
					<a href="https://www.ionewu.com/priv/Privacy.html" target="_blank" title="隐私权相关政策">隐私权相关政策</a>"
				</span>
      </div>
      <div class="notice_btn_wrap">
        <a href="javascript:;" title="取消" class="notice_cancel_btn" @click="disAgree">不同意</a>
        <a href="javascript:;" title="确定" class="notice_submit_btn" @click="agree">同意</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    data: function() {
      return {
        isAgree: true
      };
    },
    props: ["type"],
    methods: {
      ...mapActions([
        "setRptAgree",
        "getTaskList",
        "postUserDevices",
        "sendUserLog"
      ]),
      hideNotice: function() {
        this.$store.state.isShowNotice = false;
      },
      hideNoticeOnly: function() {
        this.$store.state.isShowNoticeOnly = false;
      },
      disAgree: function() {
        let _that = this;
        _that.$store.state.alertToast.type = "error";
        _that.$store.state.alertToast.text =
          "同意《用户协议》和《隐私条款》才能使用玩物下载";
      },
      agree: function() {
        let _that = this;
        if (!_that.isAgree) {
          _that.$store.state.alertToast.type = "error";
          _that.$store.state.alertToast.text =
            "请勾选同意《用户协议》和《隐私条款》";
          return;
        }
        _that.setRptAgree([
          function(err, data) {
            if (!err) {
              _that.hideNotice();
              _that.getTaskList([0, 0, 20]);
              if (_that.type && _that.type == "only") {
                _that.hideNoticeOnly();
                return;
              }
              if (
                _that.$store.state.isLogin &&
                !(
                  _that.$store.state.user.localPid &&
                  _that.$store.state.user.pid !=
                  _that.$store.state.user.localPid
                )
              ) {
                _that.postUserDevices([
                  _that.$store.state.user.pid,
                  function(err, data) {
                    if (!err && !data.rtn) {
                      _that.$store.state.alertToast.type =
                        "success";
                      _that.$store.state.alertToast.text =
                        "设备绑定成功";
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
          }
        ]);
      }
    },
    mounted: function() {
      let _that = this;
      _that.sendUserLog(["showNotice", _that.type]);
    }
  };
</script>

<style lang="less" scoped>
  .notice_wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 8;
    background-color: rgba(55, 55, 55, 0.8);
  }

  .notice_body {
    position: absolute;
    width: 340px;
    background-color: #ffffff;
    top: 50%;
    left: 50%;
    margin-left: -170px;
    margin-top: -170px;
    border: 1px solid #dddddd;
    box-shadow: 0px 0px 5px #333333;
    border-radius: 5px;
  }

  .notice_title {
    padding-top: 25px;
    text-align: center;
    font-size: 18px;
    /* font-weight: bolder; */
    padding-bottom: 15px;
    color: #333333;
  }

  .notice_content {
    margin: 0 40px;
    font-size: 13px;
    color: #888888;
    line-height: 24px;
  }

  .notice_check {
    color: #888888;
    font-size: 13px;
    margin: 20px 30px;
    margin-left: 38px;
    text-align: center;
  }

  .notice_check input {
    vertical-align: middle;
  }

  .notice_check span {
    vertical-align: middle;
  }

  .notice_check a {
    color: #6899ff;
    text-decoration: none;
  }

  .notice_btn_wrap {
    margin: 30px 35px;
    font-size: 0;
    text-align: center;
  }

  .notice_btn_wrap a {
    width: 100px;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    border-radius: 4px;
    font-size: 14px;
  }

  .notice_submit_btn {
    background-color: #1999fa;
    color: #ffffff;
  }

  .notice_submit_btn:hover {
    background-color: #157dcc;
  }

  .notice_submit_btn.disable {
    background-color: #aaaaaa;
  }

  .notice_cancel_btn {
    border: 1px solid #aaaaaa;
    color: #aaaaaa;
    margin-right: 30px;
  }

  .notice_cancel_btn:hover {
    background-color: #eeeeee;
  }
</style>
