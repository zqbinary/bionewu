<template>
  <div class="alert_bg">
    <div class="alert_wrap">
      <div class="close_btn" @click="hideAdd"></div>
      <div class="add_title">添加下载链接</div>
      <textarea v-model="urlsString" class="add_urls" placeholder="添加多个下载链接时，请确保每行只有一个链接。"></textarea>
      <div class="add_btns">
        <div class="add_path">下载路径：OWDownload</div>
        <div class="add_bt" @click="$refs.upload_file.click()">添加BT任务</div>
      </div>
      <input ref="upload_file" id="upload_file" type="file" @change="onChange" accept=".torrent" />

      <div class="add_btn" @click="add">立即下载</div>
      <div class="add_tips">{{addTips}}</div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import async from "async";
  export default {
    data: function() {
      return {
        urlsString: "",
        addTips: ""
      };
    },
    watch: {
      addTips: function(newVal) {
        let _that = this;
        if (newVal) {
          setTimeout(function() {
            _that.addTips = "";
          }, 3000);
        }
      }
    },
    methods: {
      ...mapActions(["postTaskNew", "getTaskList", "uploadTorrent"]),
      onChange: function(e) {
        let _that = this;
        let file = e.target.files[0];
        let param = new FormData(); //创建form对象
        param.append("upload", file); //通过append向form对象添加数据
        // console.log(param.get("file")); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        _that.$store.state.isShowLoading = true;
        _that.uploadTorrent([
          param,
          function(err, data) {
            if (!err && !data.resp.rtn) {
              _that.urlsString = data.info.url;
              _that.add();
            } else {
              _that.$store.state.isShowLoading = false;
              _that.$store.state.alertToast.type = "error";
              _that.$store.state.alertToast.text = "BT文件解析失败";
            }
          }
        ]);
      },
      hideAdd: function() {
        this.$store.state.isShowAdd = false;
      },
      add: function() {
        let _that = this;
        let urls = _that.urlsString.split("\n");
        for (let index = urls.length - 1; index >= 0; index--) {
          let element = urls[index];
          // console.log(element);
          if (!element || element == " ") {
            urls.splice(index, 1);
          }
        }
        _that.urlsString = urls.join("\n");
        if (urls.length <= 0) {
          _that.$store.state.alertToast.type = "error";
          _that.$store.state.alertToast.text = "请输入下载链接";
          return;
        }
        // else if (urls.length > 10) {
        // 	_that.$store.state.alertToast.type = "error";
        // 	_that.$store.state.alertToast.text = "一次最多添加10个任务";
        // 	return;
        // }
        _that.$store.state.isShowLoading = true;
        _that.postTasks(urls, function(err, data) {
          _that.$store.state.isShowLoading = false;

          if (data && data.resp && data.taskRes.length == urls.length) {
            for (let index = 0; index < data.taskRes.length; index++) {
              let resTask = data.taskRes[index];
              if (!resTask.rtn) {
                urls.splice(index, 1);
              }
            }
            _that.urlsString = urls.join("\n");

            if (!data.resp.rtn) {
              _that.hideAdd();
              _that.getTaskList([0, 0, 20]);
            }
          }
          _that.showErrorToast(data.resp.rtn);
        });
      },
      postTasks: function(urls, tcb) {
        let _that = this;
        let rtn = 0;
        let doUrls = [];
        let rErr = null;
        let res = {
          resp: {
            rtn: 0
          },
          taskRes: []
        };
        let tIndex = urls.length;
        async.eachSeries(
          urls,
          function(url, cb) {
            doUrls.push(url);
            tIndex--;
            if (doUrls.length >= 5 || tIndex <= 0) {
              _that.postTaskNew([
                doUrls,
                function(err, data) {
                  if (err) {
                    rErr = err;
                    for (
                      let index = 0;
                      index < doUrls.length;
                      index++
                    ) {
                      const element = doUrls[index];
                      res.taskRes.push([
                        {
                          rtn: 1
                        }
                      ]);
                    }
                  } else {
                    if (data && data.resp && data.resp.rtn) {
                      res.resp.rtn = data.resp.rtn;
                    }
                    for (
                      let index = 0;
                      index < data.taskRes.length;
                      index++
                    ) {
                      const element = data.taskRes[index];
                      res.taskRes.push(element);
                    }
                  }
                  doUrls = [];
                  cb ? cb() : null;
                }
              ]);
            } else {
              cb ? cb() : null;
            }
          },
          function() {
            tcb ? tcb(rErr, res) : null;
          }
        );
      },
      showSuccessToast: function() {
        let _that = this;
        _that.$store.state.alertToast.type = "success";
        _that.$store.state.alertToast.text = "任务创建成功";
      },
      showErrorToast: function(rtn) {
        let _that = this;
        if (!rtn) {
          _that.showSuccessToast();
          return;
        }
        _that.$store.state.alertToast.type = "error";
        _that.$store.state.alertToast.text = "任务创建失败";
        switch (rtn) {
          case 601:
            _that.$store.state.alertToast.text = "无效的操作";
            break;
          case 602:
          case 604:
            _that.$store.state.alertToast.text = "请检查下载链接";
            break;
          case 311:
          case 609:
            _that.$store.state.alertToast.text = "任务创建失败";
            break;
          case 610:
            _that.$store.state.alertToast.text = "下载任务已满";
            break;
          case 612:
            _that.$store.state.alertToast.text = "任务重复";
            break;
          default:
            break;
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .alert_bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 8;
    .alert_wrap {
      width: 400px;
      margin-left: -200px;
      margin-top: -150px;
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
      .add_title {
        text-align: center;
        font-size: 14px;
        color: #000000;
      }

      .add_urls {
        width: 310px;
        height: 80px;
        margin: 20px auto 10px auto;
        display: block;
        border-radius: 4px;
        border: 1px solid #eeeeee;
        color: #666666;
        font-size: 12px;
        padding: 10px 15px;
      }

      .add_btns {
        text-align: right;
        width: 310px;
        margin: 0 auto;
        margin-bottom: 15px;
        .add_path {
          text-align: left;
          font-size: 12px;
          color: #666666;
          float: left;
          margin-top: 5px;
        }

        .add_bt {
          color: #666666;
          display: inline-block;
          font-size: 12px;
        }
        .add_bt:hover {
          color: #999999;
          cursor: pointer;
        }
      }

      #upload_file {
        opacity: 0;
        position: absolute;
        left: 0;
        top: -100px;
      }

      .add_btn {
        width: 340px;
        height: 40px;
        line-height: 40px;
        color: #ffffff;
        text-align: center;
        background-color: #06a8ff;
        border-radius: 5px;
        margin: 0 auto;
      }
      .add_btn:hover {
        background-color: #3f85ca;
        cursor: pointer;
      }

      .add_tips {
        width: 340px;
        margin: 0 auto;
        line-height: 24px;
        height: 24px;
        font-size: 12px;
        text-align: center;
        color: salmon;
        margin-bottom: -20px;
      }
    }
  }
</style>
