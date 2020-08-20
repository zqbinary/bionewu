<template>
  <div class="menu" @click="hideMenu">
    <div class="menu_wrap">
      <div class="menu_item" @click="goOnewu">关于玩物</div>
      <div class="menu_item" @click="showUser">用户协议</div>
      <div class="menu_item" @click="showNotice">隐私声明</div>
      <div class="menu_item" @click="showSetting" v-if="$store.state.user.pid">下载设置</div>
      <div class="menu_item logout_btn" @click="logout" v-if="$store.state.isLogin">退 出</div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    methods: {
      ...mapActions(["logout", "sendUserLog"]),
      hideMenu: function() {
        this.$store.state.isShowMenu = false;
      },
      goOnewu: function() {
        let _that = this;
        window.open("https://www.ionewu.com");
        _that.hideMenu();
        _that.sendUserLog(["goOnewu", ""]);
      },
      showUser: function() {
        let _that = this;
        _that.$store.state.settingType = "user";
        _that.$store.state.isShowSetting = true;
        _that.sendUserLog(["showUserAgreement", ""]);
      },
      showNotice: function() {
        let _that = this;
        _that.$store.state.settingType = "notice";
        _that.$store.state.isShowSetting = true;
        _that.sendUserLog(["showPrivacyStatement", ""]);
      },
      showSetting: function() {
        let _that = this;
        _that.$store.state.settingType = "setting";
        _that.$store.state.isShowSetting = true;
        _that.sendUserLog(["showSetting", ""]);
      }
    }
  };
</script>

<style lang="less" scoped>
  .menu {
    z-index: 9;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .menu_wrap {
      position: absolute;
      top: 40px;
      right: 8px;
      background-color: #ffffff;
      box-shadow: 2px 2px 5px #666666;
      width: 90px;
      border-radius: 4px;
      overflow: hidden;
      .menu_item {
        height: 35px;
        line-height: 35px;
        text-align: center;
        color: #333333;
        font-size: 12px;
        border-bottom: 1px solid #f2f2f2;
      }
      .menu_item:hover {
        cursor: pointer;
        color: #0793dd;
        background-color: #fffcf5;
      }
      .logout_btn {
        /*background-image: url(../assets/menu_logout_btn.png);*/
        background-position: 20px center;
        background-repeat: no-repeat;
        background-size: 11px 12px;
        padding-left: 12px;
      }
      .logout_btn:hover {
        /*background-image: url(../assets/menu_logout_active.png);*/
      }
    }
  }
</style>
