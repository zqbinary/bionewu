<template>
  <div class="home">
    <Top></Top>
    <Menu v-if="$store.state.isShowMenu"></Menu>
    <div class="home_body">
      <div class="nav">
        <div
          :class="{nav_item:true, nav_download:true, active:nav_type=='download'?true:false}"
          @click="changeNavType('download')"
        >
          正在下载
          <font
            v-if="$store.state.downloadTaskCount > 0">({{$store.state.downloadTaskCount}})</font>
        </div>
        <div
          :class="{nav_item:true, nav_done:true, active:nav_type=='done'?true:false}"
          @click="changeNavType('done')"
        >
          下载完成
          <font v-if="$store.state.doneTaskCount > 0">({{$store.state.doneTaskCount}})</font>
        </div>
        <div
          :class="{nav_item:true, nav_del:true, active:nav_type=='del'?true:false}"
          @click="changeNavType('del')"
        >
          垃圾箱
          <font v-if="$store.state.delTaskCount > 0">({{$store.state.delTaskCount}})</font>
        </div>
        <div class="nav_servie_alert" v-if="isShowUserService">
          <div class="nav_service_qrcode"></div>
          <div class="nav_service_tips">关注公众号，手机管理</div>
        </div>
        <div
          class="nav_jdb"
          v-if="$store.state.isLogin && !($store.state.user.cid == 101 && $store.state.user.did == 104)"
          @click="showJdb"
        >节点小宝
        </div>
        <div class="nav_service" @click="showUserService">
          手机版本
          <div class="nav_service_hot"></div>
        </div>
      </div>
      <div class="body_wrap">
        <div class="body_main">
          <List type="download" v-show="nav_type=='download'"></List>
          <List type="done" v-show="nav_type=='done'"></List>
          <List type="del" v-show="nav_type=='del'"></List>
          <div class="body_bottom">
            <div class="body_bottom_speed">{{$store.state.allSpeed}}/s</div>
            <div class="body_bottom_support">下载加速由迅雷提供技术支持</div>
          </div>
        </div>
      </div>
    </div>
    <Login
      v-if="!$store.state.isLogin && !$store.state.isShowNotice && !$store.state.alertError.text"
    ></Login>
    <Add v-if="$store.state.isShowAdd"></Add>
    <Setting v-if="$store.state.isShowSetting"></Setting>
    <Loading v-if="$store.state.isShowLoading"></Loading>
    <AlertToast v-if="$store.state.alertToast.text"></AlertToast>
    <AlertError v-if="$store.state.alertError.text"></AlertError>
    <AlertOffline v-if="$store.state.isShowOffline && !$store.state.isShowNotice"></AlertOffline>
    <Notice v-if="$store.state.isShowNotice"></Notice>
    <Notice type="only" v-if="$store.state.isShowNoticeOnly"></Notice>
  </div>
</template>

<script>
  import Top from '@/components/Top.vue';
  import List from '@/components/List.vue';
  import Menu from '@/components/Menu.vue';
  import Login from '@/components/Login.vue';
  import Add from '@/components/Add.vue';
  import Notice from '@/components/Notice.vue';
  import Setting from '@/components/Setting.vue';
  import AlertToast from '@/components/AlertToast.vue';
  import AlertError from '@/components/AlertError.vue';
  import AlertOffline from '@/components/AlertOffline.vue';
  import Loading from '@/components/Loading.vue';

  import { mapActions } from 'vuex';
  import common from '@/common';

  export default {
    name: 'Home',
    data: function () {
      return {
        nav_type: 'download',
        is_load_done_list: false,
        is_load_del_list: false,
        isShowUserService: false
      };
    },
    components: {
      Top,
      List,
      Menu,
      Login,
      Add,
      Notice,
      Setting,
      AlertToast,
      AlertError,
      AlertOffline,
      Loading
    },
    watch: {
      '$store.state.user.pid': function (newVal) {
        if (newVal) {
          if (this.$store.state.isLogin && this.$store.state.user.pid) {
            this.init();
          }
          let pidInfo = this.getInfoFromPid(this.$store.state.user.pid);
          // console.log(pidInfo);
          this.$store.state.user.cid = pidInfo.cid;
          this.$store.state.user.did = pidInfo.did;
        }
      },
      '$store.state.isLogin': function (newVal) {
        if (newVal && this.$store.state.user.pid) {
          this.init();
        }
      },
      '$store.state.alertToast.text': function (newVal) {
        if (newVal == '设备绑定成功') {
          if (this.$store.state.isLogin && this.$store.state.user.pid) {
            this.init();
          }
        }
      }
      // "$store.state.localApiHost": function(newVal) {
      // 	if (newVal) {
      // 		this.init();
      // 	}
      // }
    },
    methods: {
      ...mapActions([
        'getTaskList',
        'syncTaskProgress',
        'getRptAgree',
        'showLoading',
        'hideLoading',
        'getJdbConfig',
        'sendUserLog',
        'cleanList'
      ]),
      getInfoFromPid: function (pid) {
        let data = {
          cid: null,
          did: null
        };
        if (pid.length > 6) {
          data.cid = parseInt(pid.substr(-6, 2), 16);
          data.did = parseInt(pid.substr(-4, 2), 16);
        }
        return data;
      },
      changeNavType: function (type) {
        let _that = this;
        _that.nav_type = type;
        if (type == 'done' && !_that.is_load_done_list) {
          _that.is_load_done_list = true;
          _that.getTaskList([1, 0, 20]);
        } else if (type == 'del' && !_that.is_load_del_list) {
          _that.is_load_del_list = true;
          _that.getTaskList([2, 0, 20]);
        }
      },
      showUserService: function () {
        let _that = this;
        _that.isShowUserService = !this.isShowUserService;
        _that.sendUserLog(['showUserService', '']);
      },
      showMenu: function () {
        let _that = this;
        _that.$store.state.isShowMenu = true;
        _that.sendUserLog(['showMenu', '']);
      },
      showJdb: function () {
        let _that = this;
        _that.$store.state.isShowJdbAlert = true;
        _that.sendUserLog(['showJdb', '']);
      },
      init: function () {
        let _that = this;
        _that.$store.state.isShowLoading = true;
        _that.cleanList();
        _that.getTaskList([
          0,
          0,
          20,
          function (err, data) {
            _that.sendUserLog([
              'getTaskListDownload',
              JSON.stringify(data)
            ]);
            _that.$store.state.isShowLoading = false;
          }
        ]);
        _that.getTaskList([
          1,
          0,
          20,
          function (err, data) {
            _that.sendUserLog([
              'getTaskListDone',
              JSON.stringify(data)
            ]);
          }
        ]);
        _that.getTaskList([
          2,
          0,
          20,
          function (err, data) {
            _that.sendUserLog(['getTaskListDel', JSON.stringify(data)]);
          }
        ]);
        _that.getJdbConfig([]);
        // _that.checkNotice();
      },
      showNotice: function () {
        let _that = this;
        _that.$store.state.isShowNotice = true;
        _that.sendUserLog(['showMenu', '']);
      },
      hideNotice: function () {
        this.$store.state.isShowNotice = false;
      },
      checkNotice: function () {
        let _that = this;
        if (!_that.$store.state.user.pid) {
          return;
        }
        _that.getRptAgree([
          function (err, data) {
            _that.hideLoading();
            if (!err) {
              // console.log(data);
              if (data.rtn == 0) {
                if (data.Agree) {
                  _that.hideNotice();
                } else {
                  _that.showNotice();
                }
              }
            }
          }
        ]);
      }
    },
    mounted: function () {
      let _that = this;
      _that.$store.state.isShowLoading = false;
      // _that.init();
      setInterval(function () {
        _that.syncTaskProgress();
      }, 3000);
      setInterval(function () {
        if (_that.$store.state.user.pid) {
          _that.getTaskList([0, 0, 20]);
        }
      }, 5000);
      setInterval(function () {
        if (_that.$store.state.user.pid) {
          _that.getTaskList([1, 0, 20]);
        }
      }, 30000);
      setInterval(function () {
        if (_that.$store.state.user.pid) {
          _that.getTaskList([2, 0, 20]);
        }
      }, 60000);
    }
  };
</script>

<style lang="less" scoped>
  .home {
    padding-top: 60px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    background: linear-gradient(45deg, #3cacee, #3f5daf, #3f5daf, #3cacee);
    /*background-image: url(../assets/bg.png);*/
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 101% 100%;

    .home_body {
      position: relative;
      height: 100%;
      width: 100%;

      .nav {
        width: 180px;
        height: 100%;
        overflow-x: hidden;
        padding-top: 40px;
        position: absolute;
        left: 0;
        top: 0;
        box-sizing: border-box;

        .nav_item {
          height: 50px;
          line-height: 50px;
          color: #ffffff;
          font-size: 14px;
          padding-left: 52px;
          border-left: 4px solid rgba(0, 0, 0, 0);
          background-position: 27px center;
          background-repeat: no-repeat;
          background-size: 14px 14px;
        }

        .nav_item.active,
        .nav_item:hover {
          background-color: #ffffff;
          color: #0793dd;
          border-left: 4px solid #f9c03c;
          cursor: pointer;
        }

        .nav_item:hover {
          // background-color: rgba(255, 255, 255, 0.5);
          background-color: #f6f6f6;
          border-left: 4px solid #06a8ff;
        }

        .nav_download {
          /*background-image: url(../assets/nav_download.png);*/
        }

        .nav_download.active,
        .nav_download:hover {
          /*background-image: url(../assets/nav_download_active.png);*/
        }

        .nav_done {
          /*background-image: url(../assets/nav_done.png);*/
        }

        .nav_done.active,
        .nav_done:hover {
          /*background-image: url(../assets/nav_done_active.png);*/
        }

        .nav_del {
          /*background-image: url(../assets/nav_del.png);*/
        }

        .nav_del.active,
        .nav_del:hover {
          /*background-image: url(../assets/nav_del_active.png);*/
        }

        .nav_jdb {
          position: absolute;
          width: 80px;
          bottom: 60px;
          left: 50px;
          color: #ffffff;
          font-size: 12px;
          padding-left: 20px;
          /*background-image: url(../assets/jdb_icon.png);*/
          background-size: 14px 16px;
          background-position: left center;
          background-repeat: no-repeat;
        }

        .nav_jdb:hover {
          opacity: 0.8;
          cursor: pointer;
        }

        .nav_service {
          position: absolute;
          width: 80px;
          bottom: 30px;
          left: 50px;
          color: #ffffff;
          font-size: 12px;
          padding-left: 20px;
          // background-image: url(../assets/user_service_icon.png);
          /*background-image: url(../assets/phone_icon.png);*/
          background-size: 11px 16px;
          background-position: left center;
          background-repeat: no-repeat;
          z-index: 7;

          .nav_service_hot {
            position: absolute;
            right: 0px;
            top: -5px;
            width: 28px;
            height: 14px;
            /*background-image: url(../assets/phone_hot_icon.png);*/
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }
        }

        .nav_service:hover {
          opacity: 0.8;
          cursor: pointer;
        }

        .nav_servie_alert {
          width: 130px;
          position: absolute;
          left: 15px;
          bottom: 60px;
          padding: 20px 10px;
          text-align: center;
          background-color: #ffffff;
          box-shadow: 0px 0px 5px #666666;
          border-radius: 5px;
          z-index: 7;

          .nav_service_qrcode {
            width: 100px;
            height: 100px;
            background-color: #eeeeee;
            margin: 0 auto;
            background-image: url(../assets/owdl_qrcode.jpg);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center center;
          }

          .nav_service_tips {
            text-align: center;
            color: #333333;
            font-size: 12px;
            margin-top: 10px;
          }
        }
      }

      .body_wrap {
        padding-left: 180px;
        padding-right: 10px;
        padding-bottom: 10px;
        width: 100%;
        height: 100%;
        box-sizing: border-box;

        .body_main {
          background-color: #ffffff;
          width: 100%;
          height: 100%;
          position: relative;

          .body_bottom {
            width: 100%;
            height: 30px;
            background-color: #f7f9ff;
            position: absolute;
            left: 0;
            bottom: 0;

            .body_bottom_speed {
              color: #999999;
              font-size: 12px;
              height: 30px;
              line-height: 30px;
              margin-left: 10px;
              padding-left: 20px;
              /*background-image: url(../assets/bottom_speed_icon.png);*/
              background-position: left center;
              background-repeat: no-repeat;
              background-size: 14px 12px;
              float: left;
            }

            .body_bottom_support {
              color: #888888;
              font-size: 12px;
              height: 30px;
              line-height: 30px;
              padding-left: 20px;
              /*background-image: url(../assets/xunlei_logo.png);*/
              background-position: left 10px;
              background-repeat: no-repeat;
              background-size: 14px 12px;
              float: right;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
</style>
