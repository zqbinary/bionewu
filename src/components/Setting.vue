<template>
  <div class="setting_wrap" @mousemove="onMouseMove" @mouseup="onMouseUp">
    <div class="setting_wrap_body">
      <div class="setting_title">
        设置中心
        <a class="setting_close" href="javascript:;" title="关闭" @click="onClose"></a>
      </div>
      <div class="setting_body">
        <div class="setting_body_left">
          <a
            :class="{setting_nav_item:true, active: !$store.state.settingType  || $store.state.settingType =='user'?true:false}"
            href="javascript:;"
            data-class="setting_protocol"
            @click="changeType('user')"
          >用户协议</a>
          <a
            :class="{setting_nav_item:true, active: $store.state.settingType =='notice'?true:false}"
            href="javascript:;"
            data-class="setting_privacy"
            @click="changeType('notice')"
          >隐私声明</a>
          <a
            :class="{setting_nav_item:true, active: $store.state.settingType =='setting'?true:false}"
            href="javascript:;"
            data-class="setting_download"
            @click="changeType('setting')"
          >下载设置</a>
          <a
            :class="{setting_nav_item:true, active: $store.state.settingType =='service'?true:false}"
            href="javascript:;"
            data-class="setting_service"
            @click="changeType('service')"
          >客服中心</a>
          <!-- <a class="setting_nav_item" href="javascript:;" data-class="setting_about">关于玩物</a> -->
        </div>
        <div
          class="setting_body_right setting_protocol"
          v-if="!$store.state.settingType || $store.state.settingType =='user'"
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.ionewu.com/priv/UProtocol.html?contentSize=12px&titleSize=18px"
          ></iframe>
        </div>
        <div class="setting_body_right setting_privacy" v-if="$store.state.settingType =='notice'">
          <iframe
            width="100%"
            height="100%"
            src="https://www.ionewu.com/priv/Privacy.html?contentSize=12px&titleSize=18px"
          ></iframe>
        </div>
        <!-- <div class="setting_body_right setting_about" style="display: none;">
                    <iframe width="100%" height="100%" src="https://www.ionewu.com"></iframe>
        </div>-->
        <div class="setting_body_right setting_download" v-if="$store.state.settingType =='setting'">
          <div class="setting_download_item">
            <span class="setting_download_item_key">支持下载协议：</span>
          </div>
          <div class="setting_download_item_list">
            <img :src="selectImg" />
            <span>传统下载</span>
            <img :src="selectImg" />
            <span>BT下载</span>
            <img :src="selectImg" />
            <span>磁力链下载</span>
            <br />
            <img :src="selectImg" />
            <span>迅雷下载</span>
            <img :src="unselectImg" />
            <span>百度网盘</span>
            <img :src="unselectImg" />
            <span>115网盘</span>
          </div>
          <div class="setting_download_item">
            <span class="setting_download_item_key">兼容浏览器：</span>
          </div>
          <div class="setting_download_item_list">
            <img :src="selectImg" />
            <span>Edge浏览器</span>
            <img :src="selectImg" />
            <span>360浏览器</span>
            <img :src="selectImg" />
            <span>IE浏览器</span>
            <br />
            <img :src="selectImg" />
            <span>Firefox</span>
            <img :src="selectImg" />
            <span>Chrome</span>
            <img :src="selectImg" />
            <span>QQ浏览器</span>
          </div>
          <div class="setting_download_item">
            <span class="setting_download_item_key">下载模式：</span>
          </div>
          <div class="setting_download_item_list setting_download_type_list">
            <input
              type="checkbox"
              data-type="all"
              class="setting_download_type"
              v-model="isUnlimit"
              @click="onUnlimitClick"
            />
            <span class="setting_download_type_text">全速下载</span>
            <input
              type="checkbox"
              data-type="limit"
              class="setting_download_type"
              v-model="isLimit"
              @click="onLimitClick"
            />
            <span class="setting_download_type_text">限速下载</span>
            <div class="setting_download_limit_btn">
              <a href="javascript:;" title="修改配置" @click="showSpeedSetting" v-if="isLimit">修改配置</a>
            </div>
          </div>
          <div class="setting_debug_wrap" style="display: none;">
            <div class="setting_download_item">
              <span class="setting_download_item_key">调试模式：</span>
              <span class="setting_download_item_key_tips">（用户体验改进和反馈下载错误）</span>
            </div>
            <div class="setting_download_item_list">
              <input type="checkbox" data-type="all" class="setting_debug_type" />
              <span class="setting_debug_type_text">开启</span>
              <a
                href="http://www.ionewu.com/pro_wwxz_feedback.html"
                target="_blank"
                class="setting_debug_link"
                title="我要反馈问题"
              >我要反馈问题</a>
            </div>
          </div>
          <div class="setting_download_submit_btn">
            <a href="javascript:;" title="确定" @click="saveSpeedSetting">确定</a>
          </div>
        </div>
        <div class="setting_body_right setting_service" v-if="$store.state.settingType =='service'">
          <div class="setting_service_tips">扫码反馈意见</div>
          <div class="setting_service_qrcode">
            <img :src="qrcodeImg" />
          </div>
          <div class="setting_service_bottom setting_service_bottom_company">深圳市玩物科技有限公司</div>
          <div class="setting_service_bottom">迅雷下载授权合作伙伴</div>
          <div class="setting_service_bottom">www.ionewu.com</div>
        </div>
      </div>
      <div class="setting_speed_wrap" v-if="isShowSpeedSetting">
        <div class="setting_speed_wrap_body">
          <div class="setting_speed_title">
            限速设置
            <a class="setting_speed_close" href="javascript:;" title="关闭" @click="hideSpeedSetting"></a>
          </div>
          <div class="setting_speed_body">
            <div class="setting_speed_item">
              <div class="setting_speed_item_title">最大上传速度</div>
              <div class="setting_speed_item_body setting_speed_item_up">
                <div class="setting_speed_item_body_left">
                  <div class="setting_speed_item_bg_hr"></div>
                  <div class="setting_speed_item_fg_hr" :style="{width:upSpeedPointWidth+'px'}"></div>
                  <div class="setting_speed_item_fg_click"></div>
                  <div
                    class="setting_speed_item_point"
                    @mousedown="onUpSpeedPointMouseDown"
                    @mouseup="onUpSpeedPointMouseUp"
                    :style="{left:upSpeedPointWidth+'px'}"
                  ></div>
                  <div class="setting_speed_item_x setting_speed_item_x1"></div>
                  <div
                    class="setting_speed_item_x_text setting_speed_item_x1_text"
                    @click="updateUpSpeedPointWidth(maxPointWidth/4*0)"
                  >100KB</div>
                  <div class="setting_speed_item_x setting_speed_item_x2"></div>
                  <div
                    class="setting_speed_item_x_text setting_speed_item_x2_text"
                    @click="updateUpSpeedPointWidth(maxPointWidth/4*1)"
                  >500KB</div>
                  <div class="setting_speed_item_x setting_speed_item_x3"></div>
                  <div
                    class="setting_speed_item_x_text setting_speed_item_x3_text"
                    @click="updateUpSpeedPointWidth(maxPointWidth/4*2)"
                  >1MB</div>
                  <div class="setting_speed_item_x setting_speed_item_x4"></div>
                  <div
                    class="setting_speed_item_x_text setting_speed_item_x4_text"
                    @click="updateUpSpeedPointWidth(maxPointWidth/4*3)"
                  >2MB</div>
                  <div class="setting_speed_item_x setting_speed_item_x5"></div>
                  <div
                    class="setting_speed_item_x_text setting_speed_item_x5_text"
                    @click="updateUpSpeedPointWidth(maxPointWidth/4*4)"
                  >4MB</div>
                </div>
                <div class="setting_speed_item_body_right">
                  <span id="setting_up_speed">{{parseInt(userUpSpeed/1024*100)/100}}</span> MB/s
                </div>
              </div>
            </div>
            <div class="setting_speed_tips">下载限速暂不支持</div>
            <div class="setting_speed_item">
              <div class="setting_speed_item_title">磁盘缓存</div>
              <div class="setting_speed_item_body setting_speed_item_size">
                <div class="setting_speed_item_body_left">
                  <div class="setting_speed_item_bg_hr"></div>
                  <div class="setting_speed_item_fg_hr" :style="{width:cacheSizePointWidth+'px'}"></div>
                  <div class="setting_speed_item_fg_click"></div>
                  <div
                    class="setting_speed_item_point"
                    :style="{left:cacheSizePointWidth+'px'}"
                    @mousedown="onCacheSizePointMouseDown"
                    @mouseup="onCacheSizePointMouseUp"
                  ></div>
                  <div class="setting_speed_item_x setting_speed_item_x1"></div>
                  <div
                    class="setting_speed_item_x_text setting_speed_item_x1_text"
                    @click="updateCacheSizePointWidth(maxPointWidth/4*0)"
                  >10G</div>
                  <div class="setting_speed_item_x setting_speed_item_x2"></div>
                  <div
                    class="setting_speed_item_x_text setting_speed_item_x2_text"
                    @click="updateCacheSizePointWidth(maxPointWidth/4*1)"
                  >50G</div>
                  <div class="setting_speed_item_x setting_speed_item_x3"></div>
                  <div
                    class="setting_speed_item_x_text setting_speed_item_x3_text"
                    @click="updateCacheSizePointWidth(maxPointWidth/4*2)"
                  >100G</div>
                  <div class="setting_speed_item_x setting_speed_item_x4"></div>
                  <div
                    class="setting_speed_item_x_text setting_speed_item_x4_text"
                    @click="updateCacheSizePointWidth(maxPointWidth/4*3)"
                  >150G</div>
                  <div class="setting_speed_item_x setting_speed_item_x5"></div>
                  <div
                    class="setting_speed_item_x_text setting_speed_item_x5_text"
                    @click="updateCacheSizePointWidth(maxPointWidth/4*4)"
                  >200G</div>
                </div>
                <div class="setting_speed_item_body_right">
                  <span id="setting_cache_size">{{cacheSize}}</span> G
                </div>
              </div>
            </div>
            <div class="setting_speed_tips">磁盘缓存越大，下载速度越快，利用P2P技术进行用户间加速</div>
            <div class="setting_speed_btn">
              <a href="javascript:;" title="确定" @click="hideSpeedSetting">确定</a>
            </div>
          </div>
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
        isUnlimit: true,
        isLimit: false,
        isShowSpeedSetting: false,
        selectImg: require("../assets/checkbox_select.png"),
        unselectImg: require("../assets/checkbox_unselect.png"),
        qrcodeImg: require("../assets/owdl_qrcode.jpg"),
        userMaxUpSpeed: 4096,
        userMinUpSpeed: 102.4,
        userUpSpeed: this.userMaxUpSpeed,
        maxUpSpeed: 20000,
        minUpSpeed: this.maxUpSpeed * 0.05,
        upSpeed: this.maxUpSpeed,
        upMode: 1,
        maxCacheSize: 200,
        minCacheSize: 10,
        cacheSize: this.maxCacheSize,
        maxPointWidth: 230,
        upSpeedPointWidth: 230,
        cacheSizePointWidth: 230,
        upSpeedPageX: 0,
        cacheSizePageX: 0
      };
    },
    watch: {
      userUpSpeed: function(newVal) {
        let _that = this;
        let percent =
          (newVal - _that.userMinUpSpeed) /
          (_that.userMaxUpSpeed - _that.userMinUpSpeed);
        // console.log(percent);
        if (percent <= 0) {
          _that.upSpeed = _that.maxUpSpeed * 0.05;
        } else if (percent < 0.2) {
          _that.upSpeed = _that.maxUpSpeed * 0.2;
        } else if (percent < 0.5) {
          _that.upSpeed = _that.maxUpSpeed * 0.5;
        } else if (percent < 0.8) {
          _that.upSpeed = _that.maxUpSpeed * 0.8;
        } else {
          _that.upSpeed = _that.maxUpSpeed;
        }
        // console.log(_that.upSpeed);
      },
      upSpeedPointWidth: function(left) {
        let _that = this;
        var percent = left / _that.maxPointWidth;
        var speed = percent * (_that.userMaxUpSpeed - _that.userMinUpSpeed);
        if (percent <= 0.25) {
          speed =
            (percent / 0.25) * (512 - _that.userMinUpSpeed) +
            _that.userMinUpSpeed;
        } else if (percent <= 0.5) {
          speed = ((percent - 0.25) / 0.25) * (1024 - 512) + 512;
        } else if (percent <= 0.75) {
          speed = ((percent - 0.5) / 0.25) * (2048 - 1024) + 1024;
        } else {
          speed =
            ((percent - 0.75) / 0.25) * (_that.userMaxUpSpeed - 2048) +
            2048;
        }
        _that.userUpSpeed = parseInt(speed * 100) / 100;
      },
      cacheSizePointWidth: function(left) {
        let _that = this;
        // console.log("cacheSizePointWidth left:", left);
        var percent = left / _that.maxPointWidth;
        var speed = percent * (_that.maxCacheSize - _that.minCacheSize);
        if (percent <= 0.25) {
          speed =
            (percent / 0.25) * (50 - _that.minCacheSize) +
            _that.minCacheSize;
        } else if (percent <= 0.5) {
          speed = ((percent - 0.25) / 0.25) * (100 - 50) + 50;
        } else if (percent <= 0.75) {
          speed = ((percent - 0.5) / 0.25) * (150 - 100) + 100;
        } else {
          speed =
            ((percent - 0.75) / 0.25) * (_that.maxCacheSize - 150) +
            150;
        }
        _that.cacheSize = parseInt(speed * 100) / 100;
      }
    },
    methods: {
      ...mapActions([
        "getXyappSlimit",
        "getXyappSpace",
        "getDevLimit",
        "setDevLimit"
      ]),
      onMouseMove: function(e) {
        // console.log(e);
        let _that = this;
        if (_that.upSpeedPageX) {
          _that.upSpeedPointWidth =
            _that.upSpeedPointWidth + (e.pageX - _that.upSpeedPageX);
          _that.upSpeedPageX = e.pageX;
          // console.log(_that.upSpeedPointWidth);
          if (_that.upSpeedPointWidth > _that.maxPointWidth) {
            _that.upSpeedPointWidth = _that.maxPointWidth;
          } else if (_that.upSpeedPointWidth < 0) {
            _that.upSpeedPointWidth = 0;
          }
        }
        if (_that.cacheSizePageX) {
          _that.cacheSizePointWidth =
            _that.cacheSizePointWidth +
            (e.pageX - _that.cacheSizePageX);
          _that.cacheSizePageX = e.pageX;
          // console.log(_that.cacheSizePointWidth);
          if (_that.cacheSizePointWidth > _that.maxPointWidth) {
            _that.cacheSizePointWidth = _that.maxPointWidth;
          } else if (_that.cacheSizePointWidth < 0) {
            _that.cacheSizePointWidth = 0;
          }
        }
      },
      onMouseUp: function(e) {
        let _that = this;
        _that.cacheSizePageX = 0;
        _that.upSpeedPageX = 0;
      },
      onUpSpeedPointMouseDown: function(e) {
        // console.log(e);
        let _that = this;
        _that.upSpeedPageX = e.pageX;
      },
      onUpSpeedPointMouseUp: function(e) {
        // console.log(e);
        let _that = this;
        _that.upSpeedPageX = 0;
      },
      onCacheSizePointMouseDown: function(e) {
        // console.log(e);
        let _that = this;
        _that.cacheSizePageX = e.pageX;
      },
      onCacheSizePointMouseUp: function(e) {
        // console.log(e);
        let _that = this;
        _that.cacheSizePageX = 0;
      },
      updateUserUpSpeed: function(value) {
        let _that = this;
        _that.userUpSpeed = value;
      },
      updateCacheSize: function(value) {
        let _that = this;
        _that.cacheSize = value;
      },
      updateUpSpeedPointWidth: function(value) {
        let _that = this;
        _that.upSpeedPointWidth = value;
      },
      updateCacheSizePointWidth: function(value) {
        let _that = this;
        // console.log("updateCacheSizePointWidth", value);
        _that.cacheSizePointWidth = value;
      },
      onLimitClick: function() {
        // console.log(this.isLimit);
        this.isUnlimit = this.isLimit;
      },
      onUnlimitClick: function() {
        // console.log(this.isUnlimit);
        this.isLimit = this.isUnlimit;
      },
      changeType: function(type) {
        this.$store.state.settingType = type;
      },
      onClose: function() {
        this.$store.state.isShowSetting = false;
      },
      onSaveClick: function() {
        this.$store.state.isShowSetting = false;
      },
      showSpeedSetting: function() {
        this.isShowSpeedSetting = true;
      },
      hideSpeedSetting: function() {
        this.isShowSpeedSetting = false;
      },
      saveSpeedSetting: function() {
        let _that = this;
        let userUpSpeed = parseInt(_that.userUpSpeed * 1024 * 1024);
        let cacheSize = parseInt(_that.cacheSize * 1024 * 1024 * 1024);
        if (_that.isUnlimit) {
          userUpSpeed = 0;
          cacheSize = 0;
        }
        _that.setDevLimit([
          userUpSpeed,
          cacheSize,
          function(err, data) {
            console.log(data);
            _that.hideSpeedSetting();
            _that.onSaveClick();
          }
        ]);
      }
    },
    mounted: function() {
      let _that = this;
      _that.getDevLimit([
        function(err, data) {
          // err = null;
          // data = {
          // 	upspeed: 2048,
          // 	userupdata: 1024
          // };
          if (!err) {
            // console.log(data);
            if (
              !data.uploadspeed ||
              !data.diskcache ||
              (data.diskcache ==
                _that.maxCacheSize * 1024 * 1024 * 1024 &&
                data.uploadspeed ==
                _that.userMaxUpSpeed * 1024 * 1024)
            ) {
              _that.isLimit = false;
              _that.isUnlimit = true;
              _that.userUpSpeed = _that.userMaxUpSpeed;
              _that.cacheSize = _that.maxCacheSize;
            } else {
              _that.isLimit = true;
              _that.isUnlimit = false;
              _that.userUpSpeed = parseInt(
                data.uploadspeed / (1024 * 1024)
              );
              _that.cacheSize = parseInt(
                data.diskcache / (1024 * 1024 * 1024)
              );
            }

            let left =
              (_that.userUpSpeed / _that.userMaxUpSpeed) *
              _that.maxPointWidth;
            if (_that.userUpSpeed < 512) {
              left =
                ((_that.userUpSpeed - _that.userMinUpSpeed) /
                  (512 - _that.userMinUpSpeed)) *
                (_that.maxPointWidth / 4);
            } else if (_that.userUpSpeed < 1024) {
              left =
                ((_that.userUpSpeed - 512) / (1024 - 512)) *
                (_that.maxPointWidth / 4) +
                0.25 * _that.maxPointWidth;
            } else if (_that.userUpSpeed < 2048) {
              // console.log("_that.userUpSpeed", _that.userUpSpeed);
              left =
                ((_that.userUpSpeed - 1024) / (2048 - 1024)) *
                (_that.maxPointWidth / 4) +
                0.5 * _that.maxPointWidth;
            } else {
              left =
                ((_that.userUpSpeed - 2048) /
                  (_that.userMaxUpSpeed - 2048)) *
                (_that.maxPointWidth / 4) +
                0.75 * _that.maxPointWidth;
            }
            // console.log("left:", left);
            _that.updateUpSpeedPointWidth(left);

            console.log("cacheSize:", _that.cacheSize);
            console.log("maxPointWidth:", _that.maxPointWidth);

            let cacheleft =
              (_that.cacheSize / _that.maxCacheSize) *
              _that.maxPointWidth;
            if (_that.cacheSize < 50) {
              cacheleft =
                ((_that.cacheSize - _that.minCacheSize) /
                  (50 - _that.minCacheSize)) *
                (_that.maxPointWidth / 4);
            } else if (_that.cacheSize < 100) {
              cacheleft =
                ((_that.cacheSize - 50) / (100 - 50)) *
                (_that.maxPointWidth / 4) +
                0.25 * _that.maxPointWidth;
            } else if (_that.cacheSize < 150) {
              // console.log("_that.userUpSpeed", _that.userUpSpeed);
              cacheleft =
                ((_that.cacheSize - 100) / (150 - 100)) *
                (_that.maxPointWidth / 4) +
                0.5 * _that.maxPointWidth;
            } else {
              console.log("cacheSize:", _that.cacheSize);
              cacheleft =
                ((_that.cacheSize - 150) /
                  (_that.maxCacheSize - 150)) *
                (_that.maxPointWidth / 4) +
                0.75 * _that.maxPointWidth;
            }
            console.log("cacheleft:", cacheleft);
            _that.updateCacheSizePointWidth(cacheleft);
          } else {
            _that.userUpSpeed = _that.userMaxUpSpeed;
            _that.updateUpSpeedPointWidth(_that.maxPointWidth);
            _that.cacheSize = _that.maxCacheSize;
            _that.updateCacheSizePointWidth(_that.maxPointWidth);
          }
        }
      ]);
    }
  };
</script>

<style lang="less" scoped>
  .setting_wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }

  .setting_wrap_body {
    width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -200px;
    background-color: #ffffff;
    border: 1px solid #dddddd;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    color: #333333;
    font-size: 0;
    overflow: hidden;
  }

  .setting_title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    border-bottom: 1px solid #eeeeee;
    background-color: #f7f9ff;
  }

  .setting_close {
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    height: 40px;
    /*background-image: url(../assets/alert_close_btn.png);*/
    background-repeat: no-repeat;
    background-size: 15px;
    background-position: center center;
    display: inline-block;
  }

  .setting_close:hover {
    opacity: 0.5;
  }

  // @keyframes hover-rotate {
  // 	0% {
  // 		transform: rotate(180deg);
  // 	}

  // 	100% {
  // 		transform: rotate(360deg);
  // 	}
  // }

  .setting_body_left {
    display: inline-block;
    width: 100px;
    /* border-right: 1px solid #eeeeee; */
    vertical-align: top;
  }

  .setting_body_left a {
    display: block;
    color: #777777;
    text-decoration: none;
    text-align: center;
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #eeeeee;
    font-size: 14px;
  }

  .setting_body_left a.active {
    color: #ffffff;
    background-color: #1999fa;
  }

  .setting_body_left a:hover:not(.active) {
    color: #1999fa;
  }

  ::-webkit-scrollbar {
    background-color: #281b80;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #281b80;
  }

  .setting_body_right {
    display: inline-block;
    width: 398px;
    vertical-align: top;
    border-left: 1px solid #eeeeee;
    min-height: 350px;
  }

  .setting_body_right iframe {
    width: 100%;
    height: 350px;
  }

  .setting_download_item {
    font-size: 14px;
    margin: 20px 20px 20px 20px;
    color: #666666;
  }

  .setting_download_item_list {
    margin: -10px 20px 25px 20px;
    color: #666666;
    font-size: 12px;
  }

  .setting_download_item_list input {
    margin-right: 5px;
    vertical-align: middle;
  }

  .setting_download_item_list img {
    width: 14px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .setting_download_item_list span {
    width: 90px;
    display: inline-block;
    vertical-align: middle;
    line-height: 24px;
  }

  .setting_download_item_list .setting_download_type_text {
    cursor: pointer;
  }

  .setting_download_limit_btn {
    margin-left: -10px;
    width: 70px;
    height: 30px;
    display: inline-block;
    vertical-align: middle;
  }

  .setting_download_limit_btn a {
    width: 70px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    border-radius: 4px;
    font-size: 12px;
    background-color: #1999fa;
    color: #ffffff;
  }

  .setting_download_limit_btn a:hover {
    background-color: #157dcc;
  }

  .setting_download_item_key {
    display: inline-block;
    color: #444444;
  }

  .setting_download_item_key_tips {
    font-size: 12px;
    color: #666666;
  }

  .setting_download_submit_btn {
    font-size: 14px;
    text-align: center;
    margin-bottom: 20px;
  }

  .setting_debug_link {
    color: #1999fa;
    line-height: 24px;
    display: inline-block;
    height: 24px;
    vertical-align: middle;
  }

  .setting_download_submit_btn a {
    width: 80px;
    height: 34px;
    line-height: 34px;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    border-radius: 4px;
    font-size: 14px;
    background-color: #1999fa;
    color: #ffffff;
  }

  .setting_download_submit_btn a:hover {
    background-color: #157dcc;
  }

  .setting_service_tips {
    font-size: 14px;
    text-align: center;
    color: #666666;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .setting_service_qrcode {
    text-align: center;
  }

  .setting_service_qrcode img {
    width: 195px;
  }

  .setting_service_bottom_company {
    margin-top: 20px;
  }

  .setting_service_bottom {
    font-size: 10px;
    color: #aaaaaa;
    text-align: center;
    line-height: 20px;
  }

  .setting_speed_wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }

  .setting_speed_wrap_body {
    width: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -180px;
    background-color: #ffffff;
    border: 1px solid #dddddd;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    color: #333333;
    font-size: 0;
  }

  .setting_speed_title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    border-bottom: 1px solid #eeeeee;
  }

  .setting_speed_close {
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    height: 40px;
    /*background-image: url(../assets/alert_close_btn.png);*/
    background-repeat: no-repeat;
    background-size: 15px;
    background-position: center center;
    display: inline-block;
  }

  .setting_speed_close:hover {
    animation: hover-rotate 1s;
  }

  .setting_speed_body {
    height: 320px;
  }

  .setting_speed_item {
    color: #666666;
    padding: 20px 0px 0px 40px;
  }

  .setting_speed_item_title {
    font-size: 14px;
  }

  .setting_speed_item_body {
    height: 30px;
    margin-top: 5px;
  }

  .setting_speed_item_body_left {
    display: inline-block;
    width: 230px;
    position: relative;
    height: 30px;
    vertical-align: top;
  }

  .setting_speed_item_bg_hr {
    width: 100%;
    height: 2px;
    background-color: #cccccc;
    position: absolute;
    top: 14px;
    left: 0px;
    border-radius: 1px;
    cursor: pointer;
    z-index: 99;
  }

  .setting_speed_item_fg_hr {
    width: 230px;
    height: 2px;
    background-color: #1999fa;
    position: absolute;
    top: 14px;
    left: 0px;
    border-radius: 1px;
    cursor: pointer;
    z-index: 100;
  }

  .setting_speed_item_fg_click {
    width: 230px;
    height: 18px;
    position: absolute;
    top: 6px;
    left: 0px;
    border-radius: 1px;
    cursor: pointer;
    z-index: 100;
  }

  .setting_speed_item_x {
    width: 2px;
    height: 6px;
    background: #cccccc;
    position: absolute;
    top: 12px;
    left: 0px;
    z-index: 99;
  }

  .setting_speed_item_x2 {
    left: 56px;
  }

  .setting_speed_item_x3 {
    left: 114px;
  }

  .setting_speed_item_x4 {
    left: 170px;
  }

  .setting_speed_item_x5 {
    left: 228px;
  }

  .setting_speed_item_x_text {
    font-size: 10px;
    color: #999999;
    position: absolute;
    top: 22px;
    left: -15px;
    user-select: none;
    cursor: pointer;
  }

  .setting_speed_item_x2_text {
    left: 40px;
  }

  .setting_speed_item_x3_text {
    left: 102px;
  }

  .setting_speed_item_x4_text {
    left: 160px;
  }

  .setting_speed_item_x5_text {
    left: 217px;
  }

  .setting_speed_item_point {
    position: absolute;
    left: 230px;
    top: 8px;
    width: 14px;
    height: 14px;
    border-radius: 7px;
    margin-left: -7px;
    background-color: #1999fa;
    cursor: pointer;
    z-index: 101;
  }

  .setting_speed_item_body_right {
    display: inline-block;
    width: 110px;
    font-size: 13px;
    line-height: 30px;
    text-align: center;
    height: 30px;
    vertical-align: top;
    user-select: none;
  }

  .setting_speed_tips {
    margin: 0 40px;
    margin-right: 0px;
    margin-top: 25px;
    font-size: 12px;
    color: #aaaaaa;
  }

  .setting_speed_btn {
    text-align: center;
    margin-top: 20px;
  }

  .setting_speed_btn a {
    width: 80px;
    height: 34px;
    line-height: 34px;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    border-radius: 4px;
    font-size: 14px;
    background-color: #1999fa;
    color: #ffffff;
  }

  .setting_speed_btn a:hover {
    background-color: #157dcc;
  }
</style>
