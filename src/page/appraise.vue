<template>
  <div id="app">
    <div class="appra_div">
      <div class="page_div">
        <div class="appra_msg">
          小金妹邀请您对该位置的环境进行评价，
          <!--<span class="appra_msg_span">1星</span>-->
          <!--表示评分最低，-->
          <!--<span class="appra_msg_span">5星</span>表示评分最高，-->
          <!---->
          请根据您的实际感受进行点评！
          <div class="appra_msg_line"></div>
        </div>
      </div>

      <div class="page_div " style="background: #ffffff;z-index: 10" v-for="(item,index) in data">
        <!---->
        <div class="appra_title">{{item.titleName}}</div>
        <div class="page_div">
          <div class="appra_score_img_div">
            <img class="appra_score_img" src="../assets/A005.png" v-for="(itemG,indexG) in grade"
                 v-if="(indexG+1)<=item.score" @click="setGrade(indexG,index)">
          </div>
          <div class="appra_score_img_divT">
            <img class="appra_score_img" src="../assets/A004.png" v-for="(itemG,indexG) in grade"
                 @click="setGrade(indexG,index)">
          </div>
          <div class="appra_score_img_num">
            <!--{{item.score}}-->
            <span class="appra_score_img_num_span" v-if="item.score==5">很好</span>
            <span class="appra_score_img_num_span" v-if="item.score==4">好</span>
            <span class="appra_score_img_num_span" v-if="item.score==3">差</span>
            <span class="appra_score_img_num_span" v-if="item.score==2">较差</span>
            <span class="appra_score_img_num_span" v-if="item.score==1">很差</span>
          </div>
        </div>
        <div class="page_div remindertext" v-if="item.score<4&&item.score!=0">
          请告诉小金妹您不满意的原因吧~
        </div>
        <div class="page_div appra_checkbox_margin" v-if="item.score<4&&item.score!=0">
          <!---->
          <div class="appra_checkbox " :class="items.isNO ? 'appra_checkbox_active' : '' "
               v-for="(items,indexs) in item.listBarT" @click="checkbox(indexs,index)"> {{items.name}}
          </div>
        </div>
        <div class="page_div appra_textarea_border" v-if="item.score<4&&item.score!=0">
          <div class="page_div">
            <div class="appra_checkbox_tex appra_checkbox_active" v-for="(itemIs,indexIs) in item.listBarT"
                 v-if="itemIs.isNO" @click="checkbox(indexIs,index)">
              {{itemIs.name}}
              <img class="appra_checkbox_tex_img" src="../assets/A006.png"></div>
          </div>
          <!--<textarea class="appra_textarea" placeholder="请告诉小金妹您不满意的原因吧~"></textarea>-->
        </div>

      </div>
      <div class="page_div" style="width: 100%;margin-bottom: 0.7rem"></div>
    </div>
    <div class="callPhoneDiv">
      <a class="callPhoneA" href="tel:952191"><img class="callPhoneAImg"
                                                   src="../assets/phone.png">服务监督电话</a>
    </div>
    <div class="popu_div" v-if="userPhone"></div>
    <!--infor-->
    <div class="popu_infro_div_contentT" v-if="userPhone">
      <div class="popu_div_content_title">提示信息</div>
      <div class="popu_div_content_con">请<span class="popu_div_content_con_color">填写姓名和电话号码</span>，方便中奖后工作人员联系奖品领取！
      </div>
      <!--<input class="popu_div_content_input" placeholder="请输入您的姓名"/>-->
      <input class="popu_div_content_input" type="number" v-model="phone" placeholder="请输入您的电话"/>
      <div class="popu_div_content_btn bg_wi ">
        <div class="popu_div_content_btn " @click="noPopu">
          确定
        </div>
        <!--<div class="popu_div_content_btn_le popu_div_content_btn_no" @click="noPopu">-->
        <!--取消-->
        <!--</div>-->
        <!--<div class="popu_div_content_btn_Re ">-->
        <!--保存-->
        <!--</div>-->
      </div>

    </div>
    <!--<div class="appra_msg_tishi" v-if="!isShow">-->
    <!--当前点位还未开启暂时不可以评价哦!-->
    <!--</div>-->
    <!--infor-->
    <div class="appra_btn" v-if="isShow">
      <div class="appra_btn_div appra_btn_div_one" @click="sendScoreT">我要报事</div>
      <div class="appra_btn_div appra_btn_div_tow" @click="sendScore">提交问卷</div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  //
  export default {
    data() {
      return {
        openId: "",
        PointId: "",
        projectId: "",
        projectName: "",
        PointName: "",

        data: [],
        grade: [0, 1, 2, 3, 4],
        user: {},
        userPhone: false,
        isPJ: false,
        isShow: false,
      }
    },
    computed: {},
    watch: {},
    methods: {
      sendScoreT() {
        window.location.href = 'http://www.tq-service.com/jkpros/Home/Postit/index'
      },
      //评价信息
      getScoreItem() {
        let _this = this;

        let formData = new FormData();
        formData.append("projectId", _this.projectId);
        formData.append("openId", _this.openId);

        let data = {
          data: formData
        };
        this.$server.getScoreItem(data).then(data => {
          var data = data.data.listData;
          /*  var data = [{"listBar":"蚊子多,垃圾多,灰尘多,园区草木未休剪","projectName":"金科智慧城",
             "id":"1556076878833117","surveyName":"4.24","surveyId":"1556076878832716","titleName":"环境测试"},
             {"surveyName":"4.24","titleName":"电梯测试","surveyId":"1556076878832716",
               "projectName":"金科智慧城","listBar":"电梯清洁差,抖动,广告多,测试B","id":"1556076878836851"}];
           console.log(JSON.stringify(data)) */
          if (data.length == 0) {
            Toast({
              message: "当前点位暂时不可评价",
              position: 'bottom',
              duration: 5000
            });
            return
          }
          for (var i = 0; i < data.length; i++) {
            //评价先选项
            data[i].listBarT = this.$trigger.strToArr(data[i].listBar);
            // 评价分数
            data[i].score = 0
          }
          _this.isShow = true;
          _this.data = data
        })
      },
      //个人信息
      getUserInfor() {
        let _this = this;

        let formData = new FormData();
        formData.append("openId", _this.openId);
        let data = {
          data: formData
        };
        this.$server.judgeOwner(data).then(data => {
          if (data.data.listData.length == 0) {
            _this.userPhone = true;
            _this.phone = ""
          } else {
            _this.phone = data.data.listData[0].phone;
          }
        })
      },
      judgeComplete() {
        let _this = this;
        let formData = new FormData();
        formData.append("openId", _this.openId);
        let data = {
          data: formData
        };
        this.$server.judgeComplete(data).then(data => {
          _this.isPJ = true
        })
      },

      sendScore() {
        let _this = this;
        let dataArr = _this.data;
        if (!_this.isPJ) {
          Toast({
            message: "您今天已经评价过!",
            position: 'bottom',
            duration: 5000
          });
          return
        }
        if (_this.data.length == 0) {
          Toast({
            message: "当前点位暂时不可评价",
            position: 'bottom',
            duration: 5000
          });
          return
        }
        let ArrData = [];
        for (var i = 0; i < dataArr.length; i++) {
          if (dataArr[i].score == 0) {
            Toast({
              message: "请评价所有问卷！",
              position: 'bottom',
              duration: 5000
            });
            ArrData = [];
            return
            // break
          }
          var listBar = '';
          if (dataArr[i].score < 4) {
            listBar = this.$trigger.arrToStr(dataArr[i].listBarT);
            if (listBar == "") {
              Toast({
                message: "请选择评价内容！",
                position: 'bottom',
                duration: 5000
              });
              return
            }
          }
          var Arr = {
            "title": dataArr[i].titleName,
            "listBar": listBar,
            "score": dataArr[i].score
          };
          ArrData.push(Arr)
        }
        // console.log(ArrData)
        let listData = {
          "pointId": _this.PointId,
          "pointName": _this.PointName,
          "surveyId": dataArr[0].surveyId,
          "surveyName": dataArr[0].projectName,
          "projectName": _this.projectName,
          "projectId": _this.projectId,
          "userId": _this.openId,
          // "phone": _this.phone,
          "listData": ArrData
        };

        let formData = new FormData();
        formData.append("openId", _this.openId);
        formData.append("sendObj", JSON.stringify(listData));

        let data = {
          data: formData
        };
        this.$server.sendScore(data).then(data => {
          _this.isPJ = false;
          Toast({
            message: "已提交评价",
            position: 'bottom',
            duration: 5000
          });
          setTimeout(function () {
            _this.$router.push({
              name: "luckydraw"
            })
          }, 3000)
        })
      },
      checkbox(type, num) {
        let _this = this;
        let data = _this.data;
        //type 点击的第几个  num 第几个Arr
        data[num].listBarT[type].isNO = !data[num].listBarT[type].isNO;
        _this.data = data;
      },
      noPopu() {
        let _this = this;
        _this.userPhone = false;
      },
      setGrade(type, num) {
        //type 点击的第几个  num 第几个Arr
        let _this = this;
        let data = _this.data;
        data[num].score = type + 1;
        _this.data = data;
      },
    },
    mounted() {
      let _this = this;
      _this.openId = localStorage.getItem("cloudEvaluationOpenId");
      _this.PointId = localStorage.getItem("cloudEvaluationPointId");
      _this.projectId = localStorage.getItem("cloudEvaluationProjectId");
      _this.projectName = localStorage.getItem("cloudEvaluationProjectName");
      _this.PointName = localStorage.getItem("cloudEvaluationPointName");
      _this.getScoreItem();
      // _this.getUserInfor();
      _this.judgeComplete();
    }
  }
</script>
