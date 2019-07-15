<template>
  <div id="app">
    <div class="lu_bg_img">
      <img class="lu_bg_img_bg" src="../assets/lu001.png">
    </div>

    <div class="page_div ">
      <div class="lu_msg">
        <!-- 您的反馈小金妹已经记下了，感谢邻居的评价，
        欢迎参与抽奖活动，也可在<span class="lu_msg_span">大社区公众号抽奖活动菜单</span>查看中奖结果哟！ -->
        您的反馈小金妹已经记下了，感谢邻居的评价，欢迎参与抽奖活动，奖品通过公众号发放。
      </div>
    </div>

    <div class="page_div" style="overflow: hidden">
      <div class=" lu_div" style="transform:rotate(60deg)">
        <div class="lu_divT" id="lu_div" :style="{transform:rotateAngle,transition:tranInof}">
          <img class="lu_div_img" src="../assets/lu003.png">
          <div class="lu_div_span "
               :class="[{'lu_div_span_one' :index==0 },
             { 'lu_div_span_tow':  index==1 },
             { 'lu_div_span_three' : index==2},
             { 'lu_div_span_four':index==3 },
             { 'lu_div_span_five': index==4},
             { 'lu_div_span_six': index==5},
              { 'lu_div_span_active': index==acticeNum}
             ]"
               v-for="(item,index) in prizeData "
               :style="{'transform': `rotate(${index * 360 / prizeData.length+25}deg)`}" :key="index">{{item.prizeName}}
          </div>
        </div>

      </div>
      <div class="lu_div_btn" @click="goPrize">
        <img class="lu_div_btn_img" src="../assets/lu002.png">
        <div class="lu_div_btn_text">点击<br>
          抽奖
        </div>
      </div>
    </div>

    <div class="luman">
      <img class="luman_img" src="../assets/lu004.png">
      <div class="luman_title">
        <div class="luman_title_A"></div>
        <div class="luman_title_B"></div>
        <div class="luman_title_C"></div>
        <div class="luman_title_D"></div>
        中奖榜单
      </div>

      <vue-seamless-scroll :data="listData" :class-option="classOptionT" class="luman_List">
        <div class="luman_item" v-for="(item,index) in listData" :key="index">
          <div class="luman_item_proName">{{item.projectName}}</div>
          <div class="luman_item_proNameB"> {{item.awardUser}}</div>
          <div class="luman_item_proNameC">{{item.awardGrade}}</div>
        </div>
      </vue-seamless-scroll>
    </div>

    <div class="popu_div" v-if="prize||notWinning||userPhone"></div>

    <!--抽中奖品-->
    <div class="popu_div_content" v-if="prize">
      <div class="popu_div_content_title">提示信息</div>
      <div class="popu_div_content_con" style="text-align: center">抽中了{{isprizeData.name}}</div>
      <div class="popu_div_content_btn" @click="noPopu">
        确定
      </div>
    </div>
    <!--抽中奖品-->

    <!--未中奖-->
    <div class="popu_div_content" v-if="notWinning">
      <div class="popu_div_content_title_no">谢谢参与</div>
      <div class="popu_div_content_btn popu_div_content_btn_no" @click="noPopu">
        确定
      </div>
    </div>
    <!--未中奖-->

    <!--infor-->
    <div class="popu_infro_div_content" v-if="userPhone">
      <div class="popu_div_content_title">提示信息</div>
      <div class="popu_div_content_con">请<span class="popu_div_content_con_color">填写姓名和电话号码</span>，方便中奖后工作人员联系奖品领取！
      </div>
      <input class="popu_div_content_input" v-model="user.userName" placeholder="请输入您的姓名"/>
      <input class="popu_div_content_input" v-model="user.phone" type="number" placeholder="请输入您的电话"/>
      <div class="popu_div_content_btn bg_wi ">
        <div class="popu_div_content_btn_le popu_div_content_btn_no" @click="noPopu">
          取消
        </div>
        <div class="popu_div_content_btn_Re " @click="getPrize">
          确定
        </div>
      </div>

    </div>
    <!--infor-->
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';

  export default {
    data() {
      return {
        rotateNumber: 0,
        rotateAngle: 0,
        tranInof: 0,
        prize: false,
        notWinning: false,
        userPhone: false,
        listData: [],
        openId: "",
        projectId: "",
        user: {
          "userName": "",
          "phone": ""
        },
        prizeData: [],
        isPrizeGo: true,
        projectName: "",
        isluck: false,
        acticeNum: 10,
        isprizeData: [],
      }
    },
    computed: {
      classOptionT() {
        let _this = this;
        return {
          step: 0.6, // 数值越大速度滚动越快
          limitMoveNum: 3, // 开始无缝滚动的数据量 this.dataList.length
          hoverStop: false, // 是否开启鼠标悬停stop
          direction: 1, // 0向下 1向上 2向左 3向右
          openWatch: true, // 开启数据实时监控刷新dom
        }
      }
    },
    watch: {},
    methods: {
      // 中奖记录
     /* goPrizeList() {
        let _this = this;
        _this.$router.push({
          name: "record"
        })
      }, */
      goluck(i) {
        let _this = this;
        let num = i;
        _this.rotateNumber = -(720 + (num * 60));
        _this.rotateAngle = 'rotate(' + this.rotateNumber + 'deg)';
        _this.tranInof = 'transform 5s linear';
        setTimeout(function () {
          _this.acticeNum = num;
          if (_this.isprizeData.name == '谢谢参与') {
            _this.notWinning = true;
          } else {
            _this.prize = true
          }
          _this.getLuckList();
        }, 5000)
      },

      noPopu() {
        let _this = this;
        if (_this.userPhone) {
          _this.isPrizeGo = true;
        }
        _this.prize = false;
        _this.notWinning = false;
        _this.userPhone = false;
      },

      goPrize() {
        let _this = this;
        if (!_this.isPrizeGo) {
          return
        }
        _this.judgeLotteryDraw()

      },
      //验证是否抽奖
      judgeLotteryDraw() {
        let _this = this;
        let formData = new FormData();
        formData.append("id", _this.prizeData[0].id);
        formData.append("openId", _this.openId);
        let data = {
          data: formData
        };
        this.$server.judgeLotteryDraw(data).then(data => {
          //是否可以点击抽奖
          _this.isPrizeGo = false;
          //_this.userPhone = true;
          _this.getPrize();
        })
      },
      //获取抽中奖品
      getPrize() {
        let _this = this;
        _this.noPopu();

        /* 
          var dataArr = [{
          id: "1556079330195442",
          prizeName: "一等奖",
          prizeType: "2",
          prizeWeight: "20",
          id: "1556079330193953",
        }
        ];
        _this.isprizeData = dataArr[0];
        
        console.log(_this.prizeData);
        for (var i = 0; i < _this.prizeData.length; i++) {
          if (_this.prizeData[i].prizeName == dataArr[0].prizeName) {
            _this.goluck(i);

            return
          }
        }
        console.log(dataArr);
        return;
        */
        let formData = new FormData();

        formData.append("id", _this.prizeData[0].id);
        formData.append("openId", _this.openId);
        formData.append("projectId", _this.projectId);
        formData.append("projectName", _this.projectName);
        formData.append("userName", _this.user.userName);
        formData.append("phone", _this.user.phone);
        /* if (_this.user.userName.length < 2) {
          Toast({
            message: '请输入正确姓名',
            position: 'bottom',
            duration: 3000
          });
          return
        }
        if (_this.user.phone.length != 11) {
          Toast({
            message: '请输入正确手机号',
            position: 'bottom',
            duration: 3000
          });
          return
        } */


        let data = {
          data: formData
        };
        this.$server.luckDraw(data).then(data => {
          var dataArr = data.data.listData;
          _this.isprizeData = data.data.listData;
          for (var i = 0; i < _this.prizeData.length; i++) {
            if (_this.prizeData[i].prizeName == dataArr.name) {
              _this.goluck(i);
              return
            }
          }

        })
      },
      //奖品列表
      prizeList() {
        let _this = this;
        let formData = new FormData();
        formData.append("openId", _this.openId);
        formData.append("projectId", _this.projectId);
        let data = {
          data: formData
        };
        this.$server.getPrizeList(data).then(data => {
          var data = data.data.listData;
          var dataArr = [];
          if(data.length>0){
            dataArr[0] = data[0];
            dataArr[1] = data[3];
            dataArr[2] = data[1];
            dataArr[3] = data[3];
            dataArr[4] = data[2];
            dataArr[5] = data[3];
          }
          _this.prizeData = dataArr
        })
      },
      //中奖公告
      getLuckList() {
        let _this = this;

        let page = {"currentPage": 1, "order": "asc", "pageSize": 20, "total": 1, "totalPage": 1};
        let formData = new FormData();

        formData.append("openId", _this.openId);
        formData.append("source", "2");
        formData.append("projectId", _this.projectId);
        formData.append("pageInfo", JSON.stringify(page));

        let data = {
          data: formData
        };
        this.$server.getPrizeNotice(data).then(data => {
          let mydata = data.data.listData;

          _this.listData = this.$trigger.desensitization(mydata)


        })
      },
    },
    mounted() {
      let _this = this;
      _this.source = localStorage.setItem("cloudEvaluationSource", "2");
      _this.openId = localStorage.getItem("cloudEvaluationOpenId");
      _this.projectId = localStorage.getItem("cloudEvaluationProjectId");
      _this.projectName = localStorage.getItem("cloudEvaluationProjectName");
      _this.getLuckList();
      _this.prizeList();
    }
  }
</script>
