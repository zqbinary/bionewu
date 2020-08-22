<template>
  <div class="list">
    <div class="list_wrap" v-if="!type || type=='download'" @scroll="onScroll">
      <div class="list_top">
        <a href="javascript:;" class="add_btn" @click="showAdd">添加下载链接</a>
        <a href="javascript:;" class="top_btn pause_btn" @click="pauseAllTask">全部暂停</a>
        <!-- <a href="javascript:;" class="top_btn del_btn">删除</a> -->
      </div>
      <div class="list_item" :key="item.taskid" v-for="item in $store.state.downloadTaskInfoList">
        <div class="task_type">
          <img :src="bt_icon"/>
        </div>
        <div class="task_file">
          <div class="task_name" :title="item.name?item.name:item.url">
            {{item.name?item.name:item.url}}
          </div>
          <div class="task_size">{{$common.formatSize(item.dlSize)}} /
            {{$common.formatSize(item.size)}}
          </div>
        </div>
        <div class="task_time">{{$common.formatTime(item.downTime)}}</div>
        <div class="task_progress">
          <div class="task_progress_wrap">
            <div
              class="task_progress_percent"
              :style="{width:getDownloadPercent(item.dlSize,item.size,item.state)}"
            ></div>
          </div>
          <div class="task_speed"
               v-html="getDownloadSpeed(item.dlSpeed,item.state,item.failCode)"></div>
        </div>
        <div class="task_btns">
          <a
            href="javascript:;"
            class="task_btn task_pause_btn"
            title="暂停"
            @click="pauseTask(item.taskid)"
            v-if="item.state == 1"
          ></a>
          <a
            href="javascript:;"
            class="task_btn task_start_btn"
            title="开始"
            @click="startTask(item.taskid)"
            v-else
          ></a>
          <a href="javascript:;" class="task_btn task_del_btn" title="删除"
             @click="showDel(item)"></a>
        </div>
      </div>
      <div class="list_empty" v-if="$store.state.downloadTaskInfoList.length == 0">
        <div class="list_empty_body list_empty_download">当前没有下载任务</div>
      </div>
    </div>
    <div class="list_wrap" v-if="type=='done'" @scroll="onScroll">
      <div class="list_top">
        <a href="javascript:;" class="add_btn" @click="showAdd">添加下载链接</a>
      </div>
      <div class="list_item" :key="item.taskid" v-for="item in $store.state.doneTaskInfoList">
        <div class="task_type">
          <img :src="bt_icon"/>
        </div>
        <div class="task_file">
          <div class="task_name" :title="item.name?item.name:item.url">
            {{item.name?item.name:item.url}}
          </div>
          <div class="task_size">{{$common.formatSize(item.dlSize)}} /
            {{$common.formatSize(item.size)}}
          </div>
        </div>
        <div class="task_time" v-if="false">{{$common.formatTime(item.downTime)}}</div>
        <div class="task_progress" v-if="false">
          <div class="task_progress_wrap">
            <div
              class="task_progress_percent"
              :style="{width:getDownloadPercent(item.dlSize,item.size,item.state)}"
            ></div>
          </div>
          <div class="task_speed">{{getDownloadSpeed(item.dlSpeed,item.state)}}</div>
        </div>
        <div class="task_done">下载完成</div>
        <div class="task_btns">
          <a href="javascript:;" class="task_btn task_del_btn" title="删除"
             @click="showDel(item)"></a>
        </div>
      </div>
      <div class="list_empty" v-if="$store.state.doneTaskInfoList.length == 0">
        <div class="list_empty_body list_empty_done">暂无完成任务</div>
      </div>
    </div>
    <div class="list_wrap" v-if="type=='del'" @scroll="onScroll">
      <div class="list_top">
        <a href="javascript:;" class="add_btn" @click="showAdd">添加下载链接</a>
        <a href="javascript:;" class="top_btn clean_btn" @click="showClean">清空垃圾站</a>
        <!-- <a href="javascript:;" class="top_btn del_btn">删除</a> -->
      </div>
      <div class="list_item" :key="item.taskid" v-for="item in $store.state.delTaskInfoList">
        <div class="task_type">
          <img :src="bt_icon"/>
        </div>
        <div class="task_file">
          <div class="task_name" :title="item.name?item.name:item.url">
            {{item.name?item.name:item.url}}
          </div>
          <div class="task_size">{{$common.formatSize(item.dlSize)}} /
            {{$common.formatSize(item.size)}}
          </div>
        </div>
        <div class="task_time task_create_time">{{$common.formatDate(item.createTime*1000)}}</div>
        <div class="task_progress" v-if="false">
          <div class="task_progress_wrap">
            <div
              class="task_progress_percent"
              :style="{width:getDownloadPercent(item.dlSize,item.size,item.state)}"
            ></div>
          </div>
          <div class="task_speed">{{getDownloadSpeed(item.dlSpeed,item.state)}}</div>
        </div>
        <div class="task_btns">
          <a
            href="javascript:;"
            class="task_btn task_restore_btn"
            title="还原"
            @click="restoreTask(item.taskid,item.state)"
          ></a>
          <a href="javascript:;" class="task_btn task_del_btn" title="删除"
             @click="showBinDel(item)"></a>
        </div>
      </div>
      <div class="list_empty" v-if="$store.state.delTaskInfoList.length == 0">
        <div class="list_empty_body list_empty_del">垃圾箱很干净</div>
      </div>
    </div>
    <Del @onDelSubmit="onDelSubmit" @onDelCancel="onDelCancel" v-if="isShowDel"></Del>
    <Del type="bin" @onDelSubmit="onBinDelSubmit" @onDelCancel="onBinDelCancel"
         v-if="isShowBinDel"></Del>
    <Del type="clean" @onDelSubmit="onCleanSubmit" @onDelCancel="onCleanCancel"
         v-if="isShowClean"></Del>
  </div>
</template>

<script>
  import Del from './Del';
  import { mapActions } from 'vuex';

  export default {
    components: {
      Del
    },
    data: function () {
      return {
        isShowDel: false,
        isShowBinDel: false,
        isShowClean: false,
        delTaskItem: null,
        isRefreshIng: false,
        bt_icon: require('../assets/task_type_bt.png')
      };
    },
    props: ['type'],
    methods: {
      ...mapActions([
        'postTaskDel',
        'postTaskClean',
        'postTaskPause',
        'postTaskPauseAll',
        'postTaskStart',
        'postTaskRestore',
        'getTaskList'
      ]),
      onScroll: function (e) {
        let _that = this;
        // console.log(e.target.scrollTop);
        // console.log(e.target.clientHeight);
        // console.log(e.target.scrollHeight);
        if (
          e.target.scrollHeight - e.target.scrollTop <
          e.target.clientHeight + 100
        ) {
          _that.refreshList();
        }
      },
      refreshList: function () {
        // console.log("refreshList");
        let _that = this;
        if (_that.isRefreshIng) {
          return;
        }
        _that.isRefreshIng = true;
        let listType = 0;
        let pos = 0;
        switch (_that.type) {
          case 'download':
            listType = 0;
            pos = _that.$store.state.downloadTaskidList.length;
            break;
          case 'done':
            listType = 1;
            pos = _that.$store.state.doneTaskidList.length;
            break;
          case 'del':
            listType = 2;
            pos = _that.$store.state.delTaskidList.length;
            break;
          default:
            break;
        }
        _that.getTaskList([
          listType,
          pos,
          20,
          function (err, data) {
            setTimeout(function () {
              _that.isRefreshIng = false;
            }, 1000);
          }
        ]);
      },
      getDownloadSpeed: function (speed, state, failCode) {
        let _that = this;
        let tips = '等待下载';
        switch (state) {
          case 0:
            tips = '等待下载';
            break;
          case 1:
            tips = _that.$common.formatSize(speed) + '/s';
            break;
          case 2:
            tips = '已暂停';
            break;
          case 3:
            tips = '已完成';
            break;
          case 4: {
            if (failCode == 4225) {
              tips =
                '<font style=\'color: #b12020;\'>链接非法或版权限制</font>';
            } else {
              tips =
                '<font style=\'color: #b12020;\'>下载失败</font>';
            }
          }
            break;
          case 5:
            tips = '已删除';
            break;
          default:
            break;
        }
        return tips;
      },
      getDownloadPercent: function (dlSize, size, state) {
        let percent = dlSize / size;
        if (state != 3 && percent == 1) {
          percent = 0.9999;
        }
        return percent * 100 + '%';
      },
      delTask: function (uuid, id, state, isRecycled, isDelFile) {
        let _that = this;
        _that.postTaskDel([
          _that.type,
          uuid,
          id,
          state,
          isRecycled,
          isDelFile
        ]);
      },
      showDel: function (item) {
        this.delTaskItem = item;
        this.isShowDel = true;
      },
      hideDel: function () {
        this.isShowDel = false;
      },
      showBinDel: function (item) {
        this.delTaskItem = item;
        this.isShowBinDel = true;
      },
      hideBinDel: function () {
        this.isShowBinDel = false;
      },
      showClean: function () {
        this.isShowClean = true;
      },
      hideClean: function () {
        this.isShowClean = false;
      },
      pauseTask: function (id) {
        let _that = this;
        _that.postTaskPause([id]);
      },
      pauseAllTask: function () {
        let _that = this;
        _that.postTaskPauseAll([]);
      },
      startTask: function (id) {
        let _that = this;
        _that.postTaskStart([id]);
      },
      restoreTask: function (id, state) {
        let _that = this;
        _that.postTaskRestore([id, state]);
      },
      showAdd: function () {
        this.$store.state.isShowAdd = true;
      },
      onDelSubmit: function (isDelTask, isDelFile) {
        let _that = this;
        _that.hideDel();
        _that.delTask(
          _that.delTaskItem.uuid,
          _that.delTaskItem.taskid,
          _that.delTaskItem.state,
          isDelTask,
          isDelFile
        );
      },
      onDelCancel: function (isDelTask, isDelFile) {
        // console.log("isDelFile", isDelFile);
        let _that = this;
        _that.hideDel();
      },
      onBinDelSubmit: function (isDelTask, isDelFile) {
        let _that = this;
        _that.hideBinDel();
        _that.delTask(
          _that.delTaskItem.uuid,
          _that.delTaskItem.taskid,
          _that.delTaskItem.state,
          isDelTask,
          isDelFile
        );
      },
      onBinDelCancel: function (isDelTask, isDelFile) {
        // console.log("isDelFile", isDelFile);
        let _that = this;
        _that.hideBinDel();
      },
      onCleanSubmit: function (isDelTask, isDelFile) {
        let _that = this;
        _that.hideClean();
        _that.postTaskClean([isDelTask, isDelFile]);
      },
      onCleanCancel: function (isDelTask, isDelFile) {
        let _that = this;
        _that.hideClean();
      }
    },
    mounted: function () {
    }
  };
</script>

<style lang="less" scoped>
  .list {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .list_wrap {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      padding-bottom: 30px;
      box-sizing: border-box;
      padding-top: 50px;

      .list_top {
        height: 50px;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(to bottom, #eaf1ff, #eaf1ff, #ffffff);
        z-index: 5;

        .add_btn {
          background-color: #06a8ff;
          width: 115px;
          height: 30px;
          padding-left: 15px;
          text-align: center;
          display: inline-block;
          vertical-align: middle;
          color: #ffffff;
          font-size: 12px;
          line-height: 30px;
          /*background-image: url(../assets/add_btn_icon.png);*/
          background-position: 10px center;
          background-repeat: no-repeat;
          background-size: 12px 12px;
          margin-left: 20px;
          margin-top: 10px;
          border-radius: 2px;
          box-sizing: border-box;
        }

        .add_btn:hover {
          background-color: #3f85ca;
        }

        .top_btn {
          margin-left: 20px;
          margin-top: 10px;
          height: 28px;
          line-height: 28px;
          border: 1px solid #c3eaff;
          padding-left: 30px;
          padding-right: 12px;
          display: inline-block;
          vertical-align: middle;
          color: #0793dd;
          font-size: 12px;
          background-color: #ffffff;
          border-radius: 2px;
          background-repeat: no-repeat;
          background-position: 12px center;
        }

        .top_btn:hover {
          background-color: #f7faff;
        }

        .pause_btn {
          /*background-image: url(../assets/top_pause_btn.png);*/
          background-size: 8px 12px;
        }

        .del_btn {
          /*background-image: url(../assets/top_del_btn.png);*/
          background-size: 12px 12px;
        }

        .clean_btn {
          /*background-image: url(../assets/top_clean_btn.png);*/
          background-size: 12px 12px;
        }
      }
    }

    .list_item {
      height: 55px;
      border-bottom: 1px solid #e3e3e3;
      position: relative;

      .task_type {
        width: 23px;
        height: 23px;
        display: inline-block;
        vertical-align: top;
        margin-left: 20px;
        margin-top: 12px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .task_file {
        display: inline-block;
        vertical-align: top;
        margin-left: 12px;
        margin-top: 10px;
        width: 40%;
        overflow-x: hidden;

        .task_name {
          color: #555555;
          font-size: 12px;
          display: inline-block;
          white-space: nowrap;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .task_size {
          color: #aaaaaa;
          font-size: 12px;
          margin-top: 4px;
          transform: scale(0.9);
          transform-origin: left;
        }
      }

      .task_btns {
        position: absolute;
        top: 24px;
        right: 27px;
        display: none;

        .task_btn {
          display: inline-block;
          vertical-align: top;
          /*background-image: url(../assets/list_pause_btn.png);*/
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }

        .task_btn:hover {
          opacity: 0.5;
        }

        .task_pause_btn {
          width: 8px;
          height: 12px;
          /*background-image: url(../assets/list_pause_btn.png);*/
          margin-right: 25px;
        }

        .task_del_btn {
          width: 12px;
          height: 12px;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABRUlEQVRIS62VvU7DMBRGj/MALDAgITYQExIbS4kqBjZQHwBKHw2JB2jKhIqEELAws7AhMTCVhQewkUMaqYl/rptkvHHOke3v3qiT8exFwYE25vz1dvRGD08+KQ7R3IP5UPm4+AJ2gV9tOOsqGU6mR1qrB2AL+FaV7bEqdJIMrorjTDEHNoAFGafKnkgfEhf8+Wb0Xgq6Snxwy60F60pC8JYgVRKDOwVSiQTuFcQkUnhQ4JPYejOKNi2+/ly5ZNeiZoSrNXXOQ/DoDjwRtuWyiWJwsaBx5vY7ccdHj6h1of/bsnNGJAkKXGkp8Rrx7PIKQlFMmV1OgSTnUklLIIGnDMgVQQpcKqkF68AlklLQBR6TqD7gDYn9ZW4v+8T+9BfAZkr7+wabrQ8vZ3s6M0/ADvCj8uvpHKP2ybiQzJYQfPmuktwBn39GATOVn52iBwAAAABJRU5ErkJggg==)        }

        .task_start_btn {
          width: 12px;
          height: 15px;
          margin-right: 25px;
          margin-top: -2px;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABZElEQVRIS7XVLUgDYRwG8Od55xdiMggW45LVNI85xGCQcQimmwOLBsstiAoy4bJgXrttIAhTZ7GIbm5gkGUxmDWsCBY/uL+csKGyuc/36gvPD/7vvc+f0Pzxb74Rz4cC7+qhcLRU7Yf9C5i1TueU4rUfTNB5HXl2Kqn1j16gxoDIHcgZQG4JOMW0edEt0hDwPIkoqnlQEgBGQR4MDb85l6mVl06hpkA5axbC1pkhCjYAE8C9UPZKrpnrBPkXqAUZsfwGKT4UhDAl8rlfyi4/tQO1BfhBhpWbpFK7ADchqBKSKGbMTCukbaAWFLbyC6JkB0AE4MkAva0r13xsBnUM1McWP7Mp2AYwISJ2KWMeNkK6BvywUOx4KsDBJMA1CEqeErvsmpWfUE9AfWyr54sCL0lwrJiOTmsDQI7fuNFg3wCtIzJ0XbK231TrQ9NWFVrLTmtdQ/fC0bYyv2tZ59Jv1e3dnH8B8JkyKAk1Pn4AAAAASUVORK5CYII=)
        }

        .task_restore_btn {
          width: 12px;
          height: 12px;
          margin-right: 25px;
          /*background-image: url(../assets/list_restore_btn.png);*/
        }
      }

      .task_time {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        color: #999999;
        font-size: 12px;
        width: 120px;
        text-align: right;
        margin-right: 30px;
        word-break: break-all;
      }

      .task_create_time {
        margin-top: 20px;
        width: 240px;
      }

      .task_done {
        display: inline-block;
        vertical-align: top;
        color: #999999;
        font-size: 12px;
        margin-top: 20px;
        padding-left: 20px;
        /*background-image: url(../assets/list_done_icon.png);*/
        background-size: 12px 12px;
        background-position: left center;
        background-repeat: no-repeat;
        margin-left: 200px;
      }

      .task_progress {
        display: inline-block;
        vertical-align: top;
        margin-top: 18px;

        .task_progress_wrap {
          width: 150px;
          height: 4px;
          background-color: #e5e6ea;

          .task_progress_percent {
            height: 4px;
            width: 0%;
            background-color: #0ea2f1;
            display: inline-block;
            vertical-align: top;
          }
        }

        .task_speed {
          color: #999999;
          font-size: 12px;
          margin-top: 5px;
        }
      }
    }

    .list_item:hover {
      background-color: #fefaeb;

      .task_btns {
        display: block;
      }
    }

    .list_empty {
      width: 100%;
      height: 100%;
      position: relative;

      .list_empty_body {
        width: 150px;
        margin-left: -75px;
        margin-top: -150px;
        padding-top: 170px;
        height: 30px;
        position: absolute;
        left: 50%;
        top: 50%;
        background-repeat: no-repeat;
        background-position: center top;
        background-size: 100% auto;
        text-align: center;
        color: #c0c0c0;
        font-size: 14px;
      }

      .list_empty_download {
        /*background-image: url(../assets/list_download_empty.png);*/
      }

      .list_empty_del {
        /*background-image: url(../assets/list_del_empty.png);*/
      }

      .list_empty_done {
        /*background-image: url(../assets/list_done_empty.png);*/
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .list {
      .list_item {
        .task_time {
          width: 70px;
          margin-top: 12px;
        }

        .task_progress {
          .task_progress_wrap {
            width: 100px;
          }
        }
      }
    }
  }
</style>
