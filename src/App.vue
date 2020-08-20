<template>
  <div
    id="app"
    :class="{app_local:$store.state.localApiHost && (!$store.state.user.pid || $store.state.user.pid == $store.state.user.localPid)?true:false}"
  >
    <div class="router_view">
      <router-view />
    </div>
    <div class="foot">
      <font>@2020 版权所有 深圳市玩物科技有限公司</font>
      <a
        class="beian"
        href="http://www.beian.miit.gov.cn"
        target="_blank"
        title="粤ICP备18147482号-1"
      >粤ICP备18147482号-1</a>
      <a
        class="gongan"
        target="_blank"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502004455"
      >粤公网安备 44030502004455号</a>
    </div>
    <Notice v-if="isShowNotice" :onAgree="onNoticeAgree"></Notice>
    <Jdb v-if="$store.state.isShowJdbAlert"></Jdb>
  </div>
</template>

<script>
  import Jdb from "@/components/Jdb.vue";
  import Req from "./req";
  import { mapActions } from "vuex";
  export default {
    data: function() {
      return {
        isShowNotice: false
      };
    },
    components: {
      Jdb
    },
    methods: {
      ...mapActions([
        "getLogin",
        "checkLogin",
        "getBoxList",
        "getLanDevices",
        "postBoxBind",
        "postUserDevices",
        "updateLocalApiHost",
        "getSysInfo",
        "hideLoading",
        "getRptAgree",
        "getRptAgreeWithPid",
        "sendUserLog",
        "getDevStatus"
      ]),
      initRouter: function() {
        let _that = this;
        _that.sendUserLog(["open", window.location.href]);
        let code = _that.$route.query.code;
        if (code) {
          _that.$store.state.isShowLoading = true;
          let buid = localStorage.getItem("buid");
          buid = buid ? buid : "";
          let tuid = buid;
          let appid = localStorage.getItem("appid");
          appid = appid ? appid : "";
          let chanid = localStorage.getItem("chanid");
          chanid = chanid ? chanid : "";
          let refuid = localStorage.getItem("refuid");
          refuid = refuid ? refuid : "";
          _that.getLogin([
            code,
            tuid,
            buid,
            appid,
            chanid,
            refuid,
            function(err, data) {
              // console.log("login");
              // console.log(data);
              _that.$store.state.isShowLoading = false;
              // if (_that.$store.state.user.pid) {
              // 	_that.postUserDevices([
              // 		_that.$store.state.user.pid,
              // 		function(err, data) {
              // 			if (!err && !data.rtn) {
              // 				window.location.reload();
              // 			} else {
              // 				_that.$store.state.alertError.text =
              // 					"该设备已被其他用户绑定";
              // 			}
              // 		}
              // 	]);
              // }

              if (err || data.rtn) {
                _that.$store.state.alertToast.type = "error";
                _that.$store.state.alertToast.text =
                  "登陆失败，请重试";
              }

              window.location.replace(
                window.location.href.split("?")[0]
              );
            }
          ]);
        }
        // let pid = _that.$route.query.pid
        // 	? _that.$route.query.pid
        // 	: localStorage.getItem("owdl-pid");

        let ip = _that.$route.query.ip;
        if (ip) {
          _that.$route.query.host = encodeURIComponent(
            "http://" + ip + ":8283"
          );
        }
        let host = _that.$route.query.host
          ? _that.$route.query.host
          : localStorage.getItem("owdl-host");
        if (host) {
          host = decodeURIComponent(host);
          // _that.$store.state.user.pid = pid;
          _that.updateLocalApiHost([host]);
          _that.$store.state.mode = "local";
          // localStorage.setItem("owdl-pid", pid);
          localStorage.setItem("owdl-host", host);
        }

        let from = _that.$route.query.from
          ? _that.$route.query.from
          : localStorage.getItem("owdl-from");
        if (from) {
          _that.$store.state.user.from = from;
          localStorage.setItem("owdl-from", from);
        }
      },
      initPid: function() {
        let _that = this;

        if (
          _that.$store.state.isLogin &&
          !_that.$store.state.user.pid &&
          !_that.$store.state.localApiHost
        ) {
          // console.log("----------1---------");
          _that.getBoxList([
            function(err, data) {
              // console.log("----------11---------");
              if (!err && data.info.length > 0) {
                // console.log("----------111---------");

                _that.$store.state.user.pid = data.info[0].pid;
                _that.$store.state.user.devStatus =
                  data.info[0].status;
                _that.$store.state.user.devName = data.info[0].name;
                _that.$store.state.user.devAddr =
                  data.info[0].waddr;
                if (
                  data.info[0].partitions &&
                  data.info[0].partitions.length > 0
                ) {
                  _that.$store.state.user.uuid =
                    data.info[0].partitions[0].uuid;
                }

                // 即使已绑定也要检查是否同意
                _that.checkNoticeOnly(_that.$store.state.user.pid);

                _that.getDevStatus([
                  _that.$store.state.user.pid,
                  function(err, data) {
                    // console.log(data);
                    if (!err && data) {
                      _that.$store.state.user.owappStatus =
                        data.status;
                    }
                    if (
                      _that.$store.state.user.devStatus ==
                      "off" &&
                      _that.$store.state.user.owappStatus ==
                      "off"
                    ) {
                      _that.$store.state.isShowOffline = true;
                      _that.$store.state.isOffline = true;
                    } else {
                      _that.$store.state.mode = "remote";
                    }
                  }
                ]);
              }
              // console.log(_that.$store.state.user);
              localStorage.setItem("owdl-host", "");
              _that.checkMode();
            }
          ]);
        } else if (_that.$store.state.localApiHost) {
          // console.log("=========getSysInfo==========");
          _that.getLocalPid(function(err, data) {
            if (!err) {
              _that.$store.state.user.localDevName = data.dn
                ? data.dn
                : "";
              _that.$store.state.user.localDevAddr = _that.$store.state.localApiHost.split(
                "//"
              )[1];
              if (_that.$store.state.isLogin) {
                // console.log("isLogin");
                _that.getBoxList([
                  function(err, data) {
                    if (err) {
                      return;
                    }

                    let isBind = false;

                    for (
                      let index = 0;
                      index < data.info.length;
                      index++
                    ) {
                      let item = data.info[index];
                      if (
                        item.pid ==
                        _that.$store.state.user.pid
                      ) {
                        isBind = true;
                        break;
                      }
                    }

                    if (!isBind && data.info.length <= 0) {
                      _that.checkNotice();
                    } else {
                      if (!isBind && data.info.length > 0) {
                        _that.$store.state.alertToast.type =
                          "error";
                        _that.$store.state.alertToast.text =
                          "您已经绑定了一台设备";
                      }
                      if (data.info.length > 0) {
                        localStorage.setItem(
                          "owdl-host",
                          ""
                        );
                        _that.$store.state.user.pid =
                          data.info[0].pid;
                        _that.$store.state.user.devStatus =
                          data.info[0].status;
                        _that.$store.state.user.devName =
                          data.info[0].name;
                        _that.$store.state.user.devAddr =
                          data.info[0].waddr;
                        if (
                          data.info[0].partitions &&
                          data.info[0].partitions.length >
                          0
                        ) {
                          _that.$store.state.user.uuid =
                            data.info[0].partitions[0].uuid;
                        }

                        // 即使已绑定也要检查是否同意
                        _that.checkNoticeOnly(
                          _that.$store.state.user.pid
                        );

                        _that.getDevStatus([
                          _that.$store.state.user.pid,
                          function(err, data) {
                            // console.log(data);
                            if (!err && data) {
                              _that.$store.state.user.owappStatus =
                                data.status;
                            }
                            if (
                              _that.$store.state.user
                                .devStatus ==
                              "off" &&
                              _that.$store.state.user
                                .owappStatus ==
                              "off"
                            ) {
                              _that.$store.state.isShowOffline = true;
                              _that.$store.state.isOffline = true;
                              if (
                                _that.$store.state
                                  .user
                                  .localPid &&
                                _that.$store.state
                                  .user.pid !=
                                _that.$store
                                  .state.user
                                  .localPid
                              ) {
                                _that.checkNoticeOnly(
                                  _that.$store
                                    .state.user
                                    .localPid
                                );
                              }
                            } else {
                              _that.$store.state.mode =
                                "remote";
                            }
                          }
                        ]);
                      }
                    }
                  }
                ]);
              } else {
                // console.log("=========checkNoticeOnly========");
                _that.checkNotice();
              }
            } else {
              // console.log("========getSysInfo error=========");
              _that.sendUserLog(["getSysInfo", JSON.stringify(err)]);
              localStorage.setItem("owdl-host", "");
              // _that.$store.state.alertError.text = "下载程序错误，请您尝试重启或重装套件";
              // _that.checkMode();
              // return;
              window.location.replace("/");
            }
          });
        } else {
          _that.checkMode();
        }
      },
      checkMode: function() {
        // console.log("--------2------");
        let _that = this;
        if (_that.$store.state.user.pid) {
          return;
        }
        // console.log("--------22------");
        if (_that.$store.state.isLogin) {
          _that.$store.state.alertError.text =
            "首次绑定，请到本地套件中心打开玩物下载";
        } else {
          _that.$store.state.isShowLogin = true;
        }

        // _that.getLanDevices([
        // 	function(err, data) {
        // 		// console.log(data);
        // 		// data.data = [];
        // 		let locPids = data.data;

        // 		let pids = [];
        // 		for (let index = 0; index < locPids.length; index++) {
        // 			let item = locPids[index];
        // 			if (item.pid && item.lanip.indexOf("8283") > -1) {
        // 				pids.push(item);
        // 			}
        // 		}

        // 		if (_that.$store.state.user.pid) {
        // 			let isLocalPid = false;
        // 			for (let index = 0; index < pids.length; index++) {
        // 				let item = pids[index];
        // 				if (_that.$store.state.user.pid == item.pid) {
        // 					isLocalPid = true;
        // 					_that.updateLocalApiHost([
        // 						"http://" + item.lanip
        // 					]);
        // 					break;
        // 				}
        // 			}
        // 			if (isLocalPid) {
        // 				_that.$store.state.mode = "local";
        // 			} else {
        // 				console.log("==================");
        // 				if (_that.$store.state.user.devStatus == "off") {
        // 					_that.$store.state.alertError.text =
        // 						"设备离线，请尝试重启套件";
        // 				} else {
        // 					_that.$store.state.mode = "remote";
        // 				}
        // 			}
        // 		} else {
        // 			if (pids.length > 0) {
        // 				if (_that.$store.state.isLogin) {
        // 					_that.$store.state.user.pid = pids[0].pid;
        // 					_that.checkNotice();
        // 					// _that.postUserDevices([
        // 					// 	pids[0].pid,
        // 					// 	function(err, data) {
        // 					// 		if (!err && !data.rtn) {
        // 					// 			window.location.reload();
        // 					// 		} else {
        // 					// 			_that.$store.state.alertError.text =
        // 					// 				"该设备已被其他用户绑定";
        // 					// 		}
        // 					// 	}
        // 					// ]);
        // 				} else {
        // 					_that.$store.state.mode = "local";
        // 					_that.updateLocalApiHost([
        // 						"http://" + pids[0].lanip
        // 					]);
        // 					_that.$store.state.user.pid = pids[0].pid;
        // 				}
        // 			} else {
        // 				if (_that.$store.state.isLogin) {
        // 					_that.$store.state.alertError.text =
        // 						"首次绑定，请到本地套件中心打开玩物下载";
        // 				} else {
        // 					_that.$store.state.isShowLogin = true;
        // 				}
        // 			}
        // 		}
        // 	}
        // ]);
      },
      getLocalPid: function(cb) {
        let _that = this;
        _that.$store.state.isShowLoading = true;
        _that.getSysInfo([
          function(err, data) {
            // err = true;
            if (err) {
              // 访问不了清除host
              localStorage.setItem("owdl-host", "");

              _that.sendUserLog(["getSysInfo", JSON.stringify(err)]);
              _that.getLanDevices([
                function(err, data) {
                  _that.$store.state.isShowLoading = false;
                  _that.sendUserLog([
                    "getLanDevices",
                    JSON.stringify(data)
                  ]);
                  if (!err && data.data) {
                    let locPids = data.data;
                    let pid = "";
                    let pids = [];
                    for (
                      let index = 0;
                      index < locPids.length;
                      index++
                    ) {
                      let item = locPids[index];
                      if (
                        item.pid &&
                        item.lanip.indexOf("8283") > -1
                      ) {
                        pids.push(item.pid);
                        if (
                          _that.$store.state.localApiHost.indexOf(
                            item.lanip
                          ) > -1
                        ) {
                          pid = item.pid;
                          break;
                        }
                      }
                    }
                    if (!pid && pids.length > 0) {
                      pid = pids[0];
                    }
                    // console.log("*******", pid);
                    _that.$store.state.user.pid = pid;
                    _that.$store.state.user.localPid = pid;
                    _that.sendUserLog(["getLanDevices", pid]);
                    if (pid) {
                      cb ? cb(null, { pid: pid }) : null;
                    } else {
                      cb ? cb(true, null) : null;
                    }
                  } else {
                    cb ? cb(true, null) : null;
                  }
                }
              ]);
            } else {
              _that.$store.state.isShowLoading = false;
              _that.sendUserLog(["getSysInfo", JSON.stringify(data)]);
              cb ? cb(err, data) : null;
            }
          }
        ]);
      },
      showNoticeOnly: function() {
        this.$store.state.isShowNoticeOnly = true;
      },
      hideNoticeOnly: function() {
        this.$store.state.isShowNoticeOnly = false;
      },
      checkNoticeOnly: function(pid) {
        let _that = this;
        if (!pid) {
          return;
        }
        _that.getRptAgreeWithPid([
          pid,
          function(err, data) {
            _that.hideLoading();
            if (!err) {
              // console.log(data);
              if (data.rtn == 0) {
                if (data.Agree) {
                  _that.hideNoticeOnly();
                } else {
                  _that.showNoticeOnly();
                }
              }
            }
          }
        ]);
      },
      onNoticeAgree: function() {},
      showNotice: function() {
        this.$store.state.isShowNotice = true;
      },
      hideNotice: function() {
        this.$store.state.isShowNotice = false;
      },
      checkNotice: function(cb) {
        let _that = this;
        if (!_that.$store.state.user.pid) {
          return;
        }
        _that.getRptAgree([
          function(err, data) {
            _that.hideLoading();
            if (!err) {
              // console.log(data);
              if (data.rtn == 0) {
                if (data.Agree) {
                  _that.hideNotice();
                  if (_that.$store.state.isLogin) {
                    _that.postUserDevices([
                      _that.$store.state.user.pid,
                      function(err, data) {
                        if (!err && !data.rtn) {
                          _that.$store.state.alertToast.type =
                            "success";
                          _that.$store.state.alertToast.text =
                            "设备绑定成功";
                        } else if (
                          !err &&
                          data.rtn == 10115
                        ) {
                          _that.$store.state.alertError.text =
                            "首次绑定，请到本地套件中心打开玩物下载";
                        } else if (
                          !err &&
                          data.rtn == 311
                        ) {
                          _that.$store.state.alertError.text =
                            "绑定失败，设备不在线";
                        } else {
                          _that.$store.state.alertError.text =
                            "该设备已被其他用户绑定";
                        }

                        localStorage.setItem(
                          "owdl-host",
                          ""
                        );
                      }
                    ]);
                  }
                } else {
                  _that.showNotice();
                }
              }
            }
          }
        ]);
      }
    },
    beforeMount: function() {},
    mounted: function() {
      let _that = this;
      _that.checkLogin([function() {}]);
      _that.initRouter();
      _that.initPid();
    }
  };
</script>

<style lang="less">
  * {
    margin: 0;
    padding: 0;
    border: 0;
  }

  html {
    font-family: Microsoft YaHei, Arial, sans-serif;
  }

  body {
    -webkit-text-size-adjust: none !important;
  }

  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  #app {
    /*background-image: url(./assets/index_bg.jpg);*/
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  #app.app_local {
    /*background-image: url(./assets/index_local_bg.jpg);*/
  }

  a {
    text-decoration: none;
  }

  .router_view {
    width: 80%;
    max-width: 1200px;
    height: 80%;
    margin: 0 auto;
    margin-top: 5%;
    position: relative;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    overflow: hidden;
  }

  .foot {
    position: absolute;
    bottom: 20px;
    color: #ffffff;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 100%;
    font-size: 12px;
    font {
      margin-right: 10px;
    }
    a {
      color: #ffffff;
      margin-right: 10px;
    }
    .gongan {
      /*background-image: url(./assets/ga_icon.png);*/
      background-position: left center;
      background-repeat: no-repeat;
      background-size: 14px 15px;
      padding-left: 20px;
    }
  }
</style>
