<template>
  <div class="jdb_alert">
    <div class="jdb_wrap">
      <a href="javascript:;" class="close_btn" @click="closeJdb"></a>
      <iframe :src="jdbUrl" sandbox="allow-scripts allow-top-navigation allow-same-origin"></iframe>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      jdbUrl: function() {
        if (!window.location.origin) {
          window.location.origin =
            window.location.protocol +
            "//" +
            window.location.hostname +
            (window.location.port ? ":" + window.location.port : "");
        }
        let jdbHost = "http://jd.ionewu.com/owdl/";
        // jdbHost = "http://localhost:8081/";
        jdbHost = "/jdb/";
        let url =
          jdbHost +
          "?domain=" +
          encodeURIComponent(window.location.origin) +
          "&parent=" +
          encodeURIComponent(window.location.origin) +
          "&pid=" +
          this.$store.state.user.pid +
          "&sn=" +
          this.$store.state.user.sn +
          "&uid=" +
          this.$store.state.user.uid +
          "&username=" +
          this.$store.state.user.name +
          "&icon=" +
          this.$store.state.user.avatar +
          "&owcode=" +
          encodeURIComponent(this.$store.state.user.owcode) +
          "&rkey=" +
          this.$store.state.user.rkey +
          "&name=";
        url = jdbHost;
        return url;
      }
    },
    methods: {
      closeJdb: function() {
        this.$store.state.isShowJdbAlert = false;
      }
    },
    mounted: function() {
      // 跨域通信
      let _that = this;
      window.addEventListener("message", function(event) {
        // console.log(event);
        if (event.data == "closeJdb") {
          _that.closeJdb();
        }
      });
    }
  };
</script>

<style lang="less" scoped>
  .jdb_alert {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
  }

  .jdb_wrap {
    width: 350px;
    height: 620px;
    position: absolute;
    left: 50%;
    margin-left: -175px;
    top: 50%;
    margin-top: -310px;
    box-shadow: 0px 0px 10px 4px #888888;

    .close_btn {
      position: absolute;
      top: 8px;
      right: 5px;
      width: 20px;
      height: 20px;
      /*background-image: url(../assets/alert_close_btn.png);*/
      background-repeat: no-repeat;
      background-size: 15px 15px;
      display: block;
    }
    .close_btn:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  }

  .jdb_wrap iframe {
    width: 100%;
    height: 100%;
  }
</style>
