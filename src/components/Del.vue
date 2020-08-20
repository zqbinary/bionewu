<template>
  <div class="alert_bg">
    <div class="alert_wrap">
      <div class="close_btn" @click="onCancel"></div>
      <div class="body">
        <div class="body_title" v-if="type=='clean'">确定清空垃圾箱？</div>
        <div class="body_title" v-else-if="type=='bin'">您确定要彻底删除此任务吗？</div>
        <div class="body_title" v-else>您确定要删除此任务吗？</div>
        <div class="body_tips">
          <input
            id="del_task"
            v-model="isDelTask"
            type="checkbox"
            v-if="type != 'bin' && type != 'clean'"
          />
          <font for="del_task" v-if="type != 'bin' && type != 'clean'">彻底删除任务</font>
          <input v-model="isDelFile" type="checkbox" v-if="isDelTask" />
          <font v-if="isDelTask">同时删除文件</font>
        </div>
      </div>
      <div class="btns">
        <div class="btn_submit" @click="onSubmit">确定</div>
        <div class="btn_cancel" @click="onCancel">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        isDelTask: false,
        isDelFile: false
      };
    },
    props: ["type"],
    watch: {
      isDelTask: function(newVal) {
        if (!newVal) {
          this.isDelFile = false;
        }
      }
    },
    methods: {
      onSubmit: function() {
        this.$emit("onDelSubmit", !this.isDelTask, this.isDelFile);
      },
      onCancel: function() {
        this.$emit("onDelCancel", !this.isDelTask, this.isDelFile);
      }
    },
    mounted: function() {
      let _that = this;
      if (_that.type == "bin" || _that.type == "clean") {
        _that.isDelTask = true;
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
      .body {
        width: 290px;
        padding-left: 50px;
        /*background-image: url(../assets/alert_toast_error.png);*/
        background-position: left top;
        background-repeat: no-repeat;
        background-size: 35px 35px;
        margin: 0 auto;
        text-align: left;
        .body_title {
          color: #000000;
          font-size: 16px;
        }
        .body_tips {
          color: #999999;
          font-size: 12px;
          margin-top: 5px;
          input {
            margin-right: 5px;
            vertical-align: middle;
            cursor: pointer;
          }
          font {
            margin-right: 15px;
            vertical-align: middle;
          }
        }
      }
      .btns {
        height: 30px;
        width: 340px;
        margin: 0 auto;
        margin-top: 20px;
        .btn_submit {
          text-align: center;
          width: 160px;
          height: 30px;
          line-height: 30px;
          float: left;
          color: #ffffff;
          background-color: #0592dd;
          border-radius: 4px;
        }
        .btn_submit:hover {
          cursor: pointer;
          background-color: #3f85ca;
        }
        .btn_cancel {
          text-align: center;
          width: 160px;
          height: 30px;
          line-height: 30px;
          float: right;
          color: #060606;
          background-color: #f0f3fa;
          border-radius: 4px;
        }
        .btn_cancel:hover {
          cursor: pointer;
          background-color: #eeeeee;
        }
      }
    }
  }
</style>
