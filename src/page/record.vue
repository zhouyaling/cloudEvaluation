<template>
  <div id="app">
    <div class="page_div">
      <img class="record_img_bg" src="../assets/A019.jpg"/>
      <img class="record_img_title" src="../assets/A018.jpg"/>
      <div class="record_div">

        <img class="record_tite_img" src="../assets/A016.png" v-if="allPrize" @click="isMyPrize(0)"/>
        <img class="record_tite_img" src="../assets/A015.png" v-if="!allPrize" @click="isMyPrize(1)"/>
        <img class="record_tite_img" src="../assets/A014.png" v-if="contentList" @click="isMyPrize(2)"/>
        <img class="record_tite_img" src="../assets/A017.png" v-if="!contentList" @click="isMyPrize(3)"/>

        <div class="page_div"></div>
        <!--无中奖纪录-->
        <img class="record_contentNo_img" v-if="recordNull && contentList" src="../assets/A013.png"/>

        <div class="record_contentNo_text" v-if="recordNull && contentList">
          暂无中奖纪录，再接再厉哟！
        </div>
        <!--无中奖纪录-->


        <!--中奖纪录-->
        <vue-seamless-scroll :data="listDataT" class="record_content_myList" :class-option="classOption"
                             v-if="contentList">
          <div class="record_content_myItem" v-for="item in listDataT">{{item.projectName}}{{item.awardGrade}}</div>
        </vue-seamless-scroll>


        <!--中奖纪录-->
        <vue-seamless-scroll class="record_allContent_div" :data="listData" v-if="allPrize"
                             :class-option="classOptionT">
          <div class="record_allContent" v-for="(item,index) in listData">
            <div class="record_allContent_title">
             {{item[index].awardNo}}中奖名单：
              <!--金科10年城{{index}}中奖名单：-->
              <img class="record_allContent_title_img" src="../assets/A012.png"/>
            </div>
            <div class="record_allContent_item" v-for="items in item">
              {{items.projectName}} {{items.awardUser}}
            </div>
          </div>
        </vue-seamless-scroll>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        recordNull: false,
        contentList: false,
        allPrize: true,
        openId: "",
        projectId: "",
        projectName: "",
        listData: [],
        listDataT: [],
        source: "2",
      }
    },
    computed: {
      classOption() {
        let _this = this;
        return {
          step: 0.3, // 数值越大速度滚动越快
          limitMoveNum: 3, // 开始无缝滚动的数据量 this.dataList.length
          hoverStop: false, // 是否开启鼠标悬停stop
          direction: 1, // 0向下 1向上 2向左 3向右
          openWatch: true, // 开启数据实时监控刷新dom
        }
      },
      classOptionT() {
        let _this = this;
        return {
          step: 0.4, // 数值越大速度滚动越快
          limitMoveNum: 0, // 开始无缝滚动的数据量 this.dataList.length
          hoverStop: false, // 是否开启鼠标悬停stop
          direction: 1, // 0向下 1向上 2向左 3向右
          openWatch: true, // 开启数据实时监控刷新dom
        }
      }
    },
    watch: {},
    methods: {
      isMyPrize(type) {
        let _this = this;
        if (type == 3 || type == 1) {
          _this.allPrize = !_this.allPrize;
          _this.contentList = !_this.contentList
        }
      },
      //中奖公告
      getLuckList() {
        let _this = this;

        let page = {"currentPage": 1, "order": "asc", "pageSize": 100, "total": 1, "totalPage": 1};
        let formData = new FormData();

        formData.append("openId", _this.openId);
        formData.append("source", _this.source);
        formData.append("projectId", _this.projectId);
        formData.append("pageInfo", JSON.stringify(page));

        let data = {
          data: formData
        };
        this.$server.getPrizeNotice(data).then(data => {
          // desensitization
          let mydata = data.data.listData;
          _this.listData = this.$trigger.sortArr(this.$trigger.desensitization(mydata), 'awardNo');
        })
      },
      //我的中奖记录
      getMemberInfo() {
        let _this = this;

        let page = {"currentPage": 1, "order": "asc", "pageSize": 50, "total": 1, "totalPage": 1};
        let formData = new FormData();

        formData.append("openId", _this.openId);
        formData.append("pageInfo", JSON.stringify(page));
        let data = {
          data: formData
        };
        this.$server.getMemberInfo(data).then(data => {
          _this.listDataT = data.data.listData;
          if (data.data.listData.length == 0) {
            _this.recordNull = true
          }

//          var myData = data.data.listData;
        })
      },

    },
    mounted() {
      let _this = this;
      _this.openId = localStorage.getItem("cloudEvaluationOpenId");
      _this.projectId = localStorage.getItem("cloudEvaluationProjectId");
      _this.projectName = localStorage.getItem("cloudEvaluationProjectName");
      _this.source = localStorage.getItem("cloudEvaluationSource");
      _this.getLuckList();
      _this.getMemberInfo();
    }
  }
</script>
