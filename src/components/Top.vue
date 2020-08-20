<template>
  <div class="top">
    <div class="logo">
      <div class="logo_img"></div>
      <div class="logo_text">玩物下载</div>
      <div class="logo_slogan">
        <div class="logo_url">yc.ionewu.com</div>
      </div>
    </div>
    <div class="user">
      <div
        class="device_icon device_icon_local"
        v-if="$store.state.localApiHost && (
					!$store.state.user.pid ||
								$store.state.user.pid ==
									$store.state.user.localPid)"
      ></div>
      <div class="device_icon device_icon_offline" v-else-if="$store.state.isOffline"></div>
      <div class="device_icon device_icon_remote" v-else></div>
      <div class="device_info">
        <div class="device_name">
          {{$store.state.localApiHost &&(
          !$store.state.user.pid ||
          $store.state.user.pid ==
          $store.state.user.localPid)? $store.state.user.localDevName: $store.state.user.devName}}
        </div>
        <div class="device_ip"
             v-if="!($store.state.user.cid == 101 && $store.state.user.did == 104)">
          {{$store.state.localApiHost &&(
          !$store.state.user.pid ||
          $store.state.user.pid ==
          $store.state.user.localPid)?
          $store.state.user.localDevAddr.split(':')[0]:$store.state.user.devAddr.split(':')[0]}}
        </div>
      </div>
      <div class="user_line"></div>
      <div class="user_avatar">
        <img :src="$store.state.user.avatar" v-if="$store.state.isLogin"/>
      </div>
      <div class="user_name user_login" @click="login" v-if="!$store.state.isLogin">请登录</div>
      <div class="user_name" v-else>
        <p class="user_name_id">ID:{{$store.state.user.uid}}</p>
        <p class="user_name_text">{{$store.state.user.name}}</p>
      </div>
      <div class="user_menu" @click="showMenu"></div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      showMenu: function () {
        this.$store.state.isShowMenu = true;
      },
      login: function () {
        this.$store.state.isShowLogin = true;
      }
    }
  };
</script>

<style lang="less" scoped>
  .top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    padding-top: 1px;

    .logo {
      margin-top: 12px;
      margin-left: 30px;

      .logo_img {
        width: 47px;
        height: 23px;
        display: inline-block;
        background-image: url(../assets/logo.png);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        vertical-align: middle;
      }

      .logo_text {
        line-height: 23px;
        display: inline-block;
        font-size: 16px;
        color: #e9e9e9;
        vertical-align: middle;
        margin-left: 10px;
        width: 94px;
      }

      .logo_slogan {
        width: 147px;
        height: 34px;
        vertical-align: middle;
        display: inline-block;
        /*background-image: url(../assets/logo_slogan.png);*/
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;

        .logo_url {
          position: absolute;
          top: 20px;
          left: 76px;
          color: #ffffff;
          font-size: 12px;
          transform: scale(0.9);
          opacity: 0.8;
        }
      }
    }

    .user {
      position: absolute;
      top: 0;
      right: 0;
      height: 60px;

      .user_avatar {
        display: inline-block;
        vertical-align: top;
        height: 30px;
        width: 30px;
        border-radius: 15px;
        overflow: hidden;
        background-color: #cccccc;
        /*background-image: url(../assets/default_avatar.png);*/
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 15px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .user_name {
        display: inline-block;
        vertical-align: top;
        margin-top: 0px;
        height: 60px;
        line-height: 60px;
        color: #ffffff;
        font-size: 12px;
        margin-left: 10px;
        margin-right: 20px;

        .user_name_text {
          font-size: 12px;
          line-height: 16px;
          white-space: nowrap;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user_name_id {
          font-size: 12px;
          line-height: 16px;
          margin-top: 14px;
          transform: scale(0.9);
          transform-origin: left;
          color: #dddddd;
        }
      }

      .user_login:hover {
        cursor: pointer;
        text-decoration: underline;
      }

      .user_menu {
        display: inline-block;
        vertical-align: top;
        height: 10px;
        width: 11px;
        /*background-image: url(../assets/top_menu_btn.png);*/
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-right: 10px;
        margin-top: 26px;
      }

      .user_menu:hover {
        opacity: 0.5;
        cursor: pointer;
      }

      .user_line {
        width: 1px;
        height: 40px;
        background: linear-gradient(to bottom, #3d84ce, #aabee2, #3d84ce);
        display: inline-block;
        vertical-align: top;
        margin-top: 10px;
        margin-right: 15px;
        margin-left: 15px;
      }

      .device_info {
        display: inline-block;
        vertical-align: top;
        margin-top: 13px;

        .device_name {
          color: #fff2ce;
          font-size: 13px;
        }

        .device_ip {
          color: #a4b6cb;
          font-size: 12px;
          transform: scale(0.9);
          transform-origin: left;
        }
      }

      .device_icon {
        display: inline-block;
        vertical-align: top;
        margin-top: 15px;
        margin-right: 10px;
        width: 38px;
        height: 30px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .device_icon_remote {
        width: 47px;
        height: 38px;
        /*background-image: url(../assets/device_icon_remote.png);*/
      }

      .device_icon_offline {
        width: 47px;
        height: 38px;
        /*background-image: url(../assets/device_icon_offline.png);*/
      }

      .device_icon_local {
        width: 29px;
        height: 29px;
        /*background-image: url(../assets/device_icon_local.png);*/
      }
    }
  }
</style>
