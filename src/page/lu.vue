<!--<template>-->
  <!--<div id="app">-->
    <!--<div class="page_div">-->
      <!--<div class="luck_msg">-->
        <!--您的反馈小金妹已经记下了，感谢邻居的评价，欢迎参与抽奖活动，也可在<span class="luck_msg_red" @click="goPrizeList">大社区公众号抽奖活动菜单</span>查看中奖结果哟！-->
      <!--</div>-->
    <!--</div>-->


    <!--&lt;!&ndash;<div class="page_div">&ndash;&gt;-->
    <!--<div class="lunck_content">-->
      <!--<img class="luck_img" src="../assets/A003.png">-->
      <!--<div class="luck_levelTT" v-show="isluck">{{isprizeData.prizeName}}</div>-->
      <!--<vue-seamless-scroll :data="prizeData" :class-option="classOption" class="luck_level" v-show="!isluck">-->
        <!--<div class="luck_levelT" v-for="item in prizeData">{{item.prizeName}}</div>-->
      <!--</vue-seamless-scroll>-->

      <!--<div class="luck_Btn" @click="goPrize">-->
        <!--点击去抽奖-->
        <!--<img class="luck_Btn_img" src="../assets/A008.png">-->
      <!--</div>-->

      <!--&lt;!&ndash;<div class="luck_Btn luck_Btn_bg" v-show="source==1">&ndash;&gt;-->
      <!--&lt;!&ndash;点击去抽奖&ndash;&gt;-->
      <!--&lt;!&ndash;&lt;!&ndash;<img class="luck_Btn_img" src="../assets/A008.png">&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->


      <!--<vue-seamless-scroll :data="listData" :class-option="classOptionT" class="luck_List">-->
        <!--<div class="luck_item" v-for="item in listData">-->
          <!--<div class="luck_item_le">{{item.projectName}} {{item.awardUser}}</div>-->
          <!--<div class="luck_item_re">{{item.awardGrade}}</div>-->
        <!--</div>-->
      <!--</vue-seamless-scroll>-->


    <!--</div>-->


    <!--<div class="popu_div" v-if="prize||notWinning||userPhone"></div>-->


    <!--&lt;!&ndash;抽中奖品&ndash;&gt;-->
    <!--<div class="popu_div_content" v-if="prize">-->
      <!--<div class="popu_div_content_title">提示信息</div>-->
      <!--<div class="popu_div_content_con" style="text-align: center">抽中了{{isprizeData.prizeName}}</div>-->
      <!--<div class="popu_div_content_btn" @click="noPopu">-->
        <!--确定-->
      <!--</div>-->
    <!--</div>-->
    <!--&lt;!&ndash;抽中奖品&ndash;&gt;-->

    <!--&lt;!&ndash;未中奖&ndash;&gt;-->
    <!--<div class="popu_div_content" v-if="notWinning">-->
      <!--<div class="popu_div_content_title_no">谢谢参与</div>-->
      <!--<div class="popu_div_content_btn popu_div_content_btn_no" @click="noPopu">-->
        <!--确定-->
      <!--</div>-->
    <!--</div>-->
    <!--&lt;!&ndash;未中奖&ndash;&gt;-->


    <!--&lt;!&ndash;infor&ndash;&gt;-->
    <!--<div class="popu_infro_div_content" v-if="userPhone">-->
      <!--<div class="popu_div_content_title">提示信息</div>-->
      <!--<div class="popu_div_content_con">请<span class="popu_div_content_con_color">填写姓名和电话号码</span>，方便中奖后工作人员联系奖品领取！-->
      <!--</div>-->
      <!--<input class="popu_div_content_input" v-model="user.userName" placeholder="请输入您的姓名"/>-->
      <!--<input class="popu_div_content_input" v-model="user.phone" type="number" placeholder="请输入您的电话"/>-->
      <!--<div class="popu_div_content_btn bg_wi ">-->
        <!--<div class="popu_div_content_btn_le popu_div_content_btn_no" @click="noPopu">-->
          <!--取消-->
        <!--</div>-->
        <!--<div class="popu_div_content_btn_Re " @click="getPrize">-->
          <!--确定-->
        <!--</div>-->
      <!--</div>-->

    <!--</div>-->
    <!--&lt;!&ndash;infor&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
  <!--</div>-->
<!--</template>-->
<!--<script>-->
  <!--import {Toast} from 'mint-ui';-->

  <!--export default {-->
    <!--data() {-->
      <!--return {-->
        <!--prize: false,-->
        <!--notWinning: false,-->
        <!--userPhone: false,-->
        <!--listData: [],-->
        <!--openId: "",-->
        <!--projectId: "",-->
        <!--user: {-->
          <!--"userName": "",-->
          <!--"phone": ""-->
        <!--},-->
        <!--prizeData: [],-->
        <!--prizeDataT: [],-->
        <!--isprizeData: {},-->
        <!--// isprizeData: {-->
        <!--//   "prizeName": "二等奖",-->
        <!--//   "prizeType": "1",-->
        <!--//   "id": "1553844538728442"-->
        <!--// },-->
        <!--step: 0,-->
        <!--isPrizeGo: true,-->
        <!--projectName: "",-->
        <!--isluck: false-->
      <!--}-->
    <!--},-->
    <!--watch: {},-->
    <!--computed: {-->
      <!--classOption() {-->
        <!--let _this = this;-->
        <!--return {-->
          <!--step: _this.step, // 数值越大速度滚动越快-->
          <!--limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length-->
          <!--hoverStop: false, // 是否开启鼠标悬停stop-->
          <!--direction: 1, // 0向下 1向上 2向左 3向右-->
          <!--openWatch: true, // 开启数据实时监控刷新dom-->
        <!--}-->
      <!--},-->
      <!--classOptionT() {-->
        <!--let _this = this;-->
        <!--return {-->
          <!--step: 1, // 数值越大速度滚动越快-->
          <!--limitMoveNum: 3, // 开始无缝滚动的数据量 this.dataList.length-->
          <!--hoverStop: false, // 是否开启鼠标悬停stop-->
          <!--direction: 1, // 0向下 1向上 2向左 3向右-->
          <!--openWatch: true, // 开启数据实时监控刷新dom-->
        <!--}-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--noPopu() {-->
        <!--let _this = this;-->
        <!--_this.prize = false;-->
        <!--_this.notWinning = false;-->
        <!--_this.userPhone = false;-->
        <!--if (_this.prizeDataT.length != 0) {-->
          <!--_this.isPrizeGo = true;-->
        <!--}-->
      <!--},-->

      <!--//个人信息-->
      <!--getUserInfor() {-->
        <!--let _this = this;-->

        <!--let formData = new FormData();-->
        <!--formData.append("openId", _this.openId);-->
        <!--let data = {-->
          <!--data: formData-->
        <!--};-->
        <!--this.$server.judgeOwner(data).then(data => {-->

          <!--if (data.data.listData[0]) {-->
            <!--_this.user = data.data.listData[0]-->
          <!--} else {-->
            <!--_this.userPhone = true-->
          <!--}-->

        <!--})-->
      <!--},-->

      <!--//中奖公告-->
      <!--getLuckList() {-->
        <!--let _this = this;-->

        <!--let page = {"currentPage": 1, "order": "asc", "pageSize": 20, "total": 1, "totalPage": 1};-->
        <!--let formData = new FormData();-->

        <!--formData.append("openId", _this.openId);-->
        <!--formData.append("source", "2");-->
        <!--formData.append("projectId", _this.projectId);-->
        <!--formData.append("pageInfo", JSON.stringify(page));-->

        <!--let data = {-->
          <!--data: formData-->
        <!--};-->
        <!--this.$server.getPrizeNotice(data).then(data => {-->
          <!--let mydata = data.data.listData;-->

          <!--_this.listData = this.$trigger.desensitization(mydata)-->


        <!--})-->
      <!--},-->

      <!--//奖品列表-->
      <!--prizeList() {-->
        <!--let _this = this;-->
        <!--let formData = new FormData();-->
        <!--formData.append("openId", _this.openId);-->
        <!--formData.append("projectId", _this.projectId);-->
        <!--let data = {-->
          <!--data: formData-->
        <!--};-->
        <!--this.$server.getPrizeList(data).then(data => {-->
          <!--_this.prizeData = [{-->
            <!--awardGrade: "",-->
            <!--awardNo: "",-->
            <!--awardUser: "",-->
            <!--id: "",-->
            <!--projectName: "",-->
            <!--time: "",-->
          <!--}];-->
<!--//          _this.prizeData = data.data.listData;-->

          <!--_this.prizeDataT = data.data.listData;-->
        <!--})-->
      <!--},-->

      <!--//获取抽中奖品-->
      <!--getPrize() {-->
        <!--let _this = this;-->
        <!--_this.noPopu();-->
        <!--let formData = new FormData();-->

        <!--formData.append("id", _this.prizeDataT[0].ruleId);-->
        <!--formData.append("openId", _this.openId);-->
        <!--formData.append("projectId", _this.projectId);-->
        <!--formData.append("projectName", _this.projectName);-->
        <!--formData.append("userName", _this.user.userName);-->
        <!--formData.append("phone", _this.user.phone);-->
        <!--if (_this.user.userName.length < 2) {-->
          <!--Toast({-->
            <!--message: '请输入正确姓名',-->
            <!--position: 'bottom',-->
            <!--duration: 3000-->
          <!--});-->
          <!--return-->
        <!--}-->
        <!--if (_this.user.phone.length != 11) {-->
          <!--Toast({-->
            <!--message: '请输入正确手机号',-->
            <!--position: 'bottom',-->
            <!--duration: 3000-->
          <!--});-->
          <!--return-->
        <!--}-->


        <!--let data = {-->
          <!--data: formData-->
        <!--};-->
        <!--this.$server.luckDraw(data).then(data => {-->

          <!--//设置开始速度-->
          <!--_this.step = 10;-->
          <!--_this.prizeData = _this.prizeDataT;-->
          <!--_this.isprizeData = data.data.listData[0];-->
          <!--_this.myTime()-->
        <!--})-->
      <!--},-->
      <!--//验证是否抽奖-->
      <!--judgeLotteryDraw() {-->
        <!--let _this = this;-->
        <!--let formData = new FormData();-->
        <!--formData.append("id", _this.prizeDataT[0].ruleId);-->
        <!--formData.append("openId", _this.openId);-->
        <!--let data = {-->
          <!--data: formData-->
        <!--};-->
        <!--this.$server.judgeLotteryDraw(data).then(data => {-->

          <!--//是否可以点击抽奖-->
          <!--_this.isPrizeGo = false;-->
          <!--_this.userPhone = true;-->
<!--//          _this.getPrize();-->
        <!--})-->
      <!--},-->
      <!--//开始抽奖-->
      <!--goPrize() {-->
        <!--let _this = this;-->
        <!--if (!_this.isPrizeGo) {-->
          <!--return-->
        <!--}-->
        <!--if (_this.prizeDataT.length == 0) {-->
          <!--_this.notWinning = true;-->
          <!--_this.isPrizeGo = false;-->
          <!--return-->
        <!--}-->
        <!--_this.judgeLotteryDraw()-->

      <!--},-->
      <!--goPrizeList() {-->
        <!--let _this = this;-->
        <!--_this.$router.push({-->
          <!--name: "record"-->
        <!--})-->
      <!--},-->
      <!--//倒计时-->
      <!--myTime() {-->
        <!--let _this = this;-->
        <!--let timout = setTimeout(function () {-->
          <!--if (_this.step == 0) {-->
            <!--_this.isPrizeGo = true;-->
            <!--_this.getLuckList();-->
            <!--clearTimeout(timout);-->
            <!--return-->
          <!--}-->
          <!--if (_this.step == 2) {-->
            <!--let prizeData = _this.prizeData;-->
            <!--prizeData.push(_this.isprizeData);-->
            <!--_this.prizeData = [_this.isprizeData];-->
          <!--}-->
          <!--if (_this.step == 1) {-->
            <!--_this.isluck = true;-->
            <!--if (_this.isprizeData.prizeName == '谢谢参与') {-->
              <!--_this.notWinning = true;-->
            <!--} else {-->
              <!--_this.prize = true-->
            <!--}-->
          <!--}-->
          <!--_this.myTime();-->
          <!--_this.step = _this.step - 1;-->

        <!--}, 1000)-->
      <!--}-->
    <!--},-->
    <!--mounted() {-->
      <!--let _this = this;-->
      <!--_this.source = localStorage.setItem("cloudEvaluationSource", "2");-->
      <!--_this.openId = localStorage.getItem("cloudEvaluationOpenId");-->
      <!--_this.projectId = localStorage.getItem("cloudEvaluationProjectId");-->
      <!--_this.projectName = localStorage.getItem("cloudEvaluationProjectName");-->
<!--//      _this.source = localStorage.getItem("cloudEvaluationSource");-->
      <!--_this.isHref = localStorage.getItem("cloudEvaluationIsHref");-->

      <!--if (_this.isHref) {-->
        <!--localStorage.setItem("cloudEvaluationIsHref", "");-->
      <!--}-->
      <!--// _this.getUserInfor();-->
      <!--_this.getLuckList();-->
      <!--_this.prizeList();-->

    <!--}-->
  <!--}-->
<!--</script>-->
