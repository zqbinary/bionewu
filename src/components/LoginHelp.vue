<template>
  <div class="help">
    <div class="help_wrap">
      <a href="javascript:;" class="login_close" @click="onClose"></a>
      <div class="help_content">
        <div class="help_title">玩物下载操作指南</div>
        <div class="help_item_wrap">
          <div class="help_item help_item_question">
            <div class="help_item_left">问：</div>
            <div class="help_item_right">新版本增加了哪些新功能？</div>
          </div>
          <div class="help_item help_item_answer">
            <div class="help_item_left">答：</div>
            <div class="help_item_right">新增了远程下载，可以在办公室控制家里的NAS进行下载。优化了下载速度，优化了稳定性和兼容性。</div>
          </div>

          <div class="help_item help_item_question">
            <div class="help_item_left">问：</div>
            <div class="help_item_right">为什么要扫二维码？</div>
          </div>
          <div class="help_item help_item_answer">
            <div class="help_item_left">答：</div>
            <div class="help_item_right">
              <p>1、微信扫码是从体验简便的角度考虑，玩物下载采用第三方微信帐号来绑定设备，绑定后即可随时随地的下载和查看任务，使用超级方便；</p>
              <p>2、后续还将会增加手机号或自定义帐号+密码的登录方式来绑定自已的NAS。同时也会增加其它第三方帐号，如：QQ帐号、迅雷帐号、百度云盘等。</p>
            </div>
          </div>
          <div class="help_item help_item_question">
            <div class="help_item_left">问：</div>
            <div class="help_item_right">绑定后怎么用远程下载？</div>
          </div>
          <div class="help_item help_item_answer">
            <div class="help_item_left">答：</div>
            <div class="help_item_right">
              <p>1、PC端：http://yc.ionewu.com 打开网页后，扫一扫登录，就可以远程下载资源到家里的NAS；</p>
              <p>2、手机端：关注微信公众号【玩物下载】,因为在微信内打开，免登录即可远程下载。(即将上线)</p>
            </div>
          </div>
          <div class="help_item help_item_question">
            <div class="help_item_left">问：</div>
            <div class="help_item_right">如何修改下载路径?</div>
          </div>
          <div class="help_item help_item_answer">
            <div class="help_item_left">答：</div>
            <div class="help_item_right">控制面板→共享文件夹→选中“OWDownload”→点击编辑→常规→所在位置→选择用于下载的磁盘。</div>
          </div>
          <div class="help_item help_item_question">
            <div class="help_item_left">问：</div>
            <div class="help_item_right">登录时提示设备已被绑定?</div>
          </div>
          <div class="help_item help_item_answer">
            <div class="help_item_left">答：</div>
            <div class="help_item_right">
              <p>① 套件中心：卸载玩物下载</p>
              <p>② 控制面板：共享文件夹，删除OWDownload文件夹</p>
              <p>③ 重启NAS</p>
              <p>④ 控制面板：网络→常规→改【自定义名称】</p>
              <p>⑤ 套件中心：重新安装2.3.5版本</p>
            </div>
          </div>
        </div>
        <div class="help_bottom">
          其它的问题，请加QQ群:
          <font>946330153</font>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      onClose: function() {
        this.$emit("onClose");
      }
    }
  };
</script>

<style lang="less" scoped>
  .help {
    position: absolute;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .help_wrap {
      width: 430px;
      height: 540px;
      background-color: #3867ac;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -215px;
      margin-top: -270px;
      border-radius: 8px;

      .login_close {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 20px;
        height: 20px;
        /*background-image: url(../assets/alert_close_btn.png);*/
        background-repeat: no-repeat;
        background-size: 15px 15px;
        display: block;
      }
      .login_close:hover {
        opacity: 0.5;
        cursor: pointer;
      }

      .help_content {
        background-color: #f6fbff;
        width: 410px;
        height: 520px;
        margin: 0 auto;
        margin-top: 10px;
        border-radius: 6px;
        padding-top: 1px;
        .help_title {
          font-size: 22px;
          font-weight: bolder;
          color: #707070;
          text-align: center;
          margin-top: 30px;
        }
        .help_item_wrap {
          max-height: 405px;
          overflow-y: scroll;
        }
        .help_item {
          text-align: center;
          line-height: 20px;
          .help_item_left {
            text-align: right;
            font-weight: bolder;
            display: inline-block;
            width: 28px;
            vertical-align: top;
            font-size: 14px;
          }
          .help_item_right {
            text-align: left;
            display: inline-block;
            width: 320px;
            vertical-align: top;
          }
        }
        .help_item_question {
          margin-top: 25px;
          .help_item_left {
            color: #e50d05;
          }
          .help_item_right {
            color: #707070;
            font-weight: bolder;
            font-size: 14px;
          }
        }
        .help_item_answer {
          margin-top: 5px;
          .help_item_left {
            color: #0597e5;
          }
          .help_item_right {
            color: #949494;
            font-size: 13px;
            line-height: 21px;
            p {
              margin-bottom: 4px;
            }
          }
        }
        .help_bottom {
          text-align: center;
          margin-top: 20px;
          color: #707070;
          font-size: 13px;
          font {
            color: #0597e5;
          }
        }
      }
    }
  }
</style>
