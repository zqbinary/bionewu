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
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJMAAAAiCAYAAABbc+vFAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFwmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOS0wNy0zMVQxNjowMToyNiswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wNy0zMVQxNjowMToyNiswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTktMDctMzFUMTY6MDE6MjYrMDg6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDQwNzI1ODYtYTFlMi0xMjQwLWFkNmEtZWQ0N2E2NzM5ZjdmIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NTUxNzZiMjEtOTMxOC0wOTRhLWI1YTktYjEz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);        background-position: center center;
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
