<template>
  <div id="app" style="background: #F5F6F7">
    <div class="page_div">
      <img class="home_logo" src="../assets/A001.png">
    </div>
    <div class="page_div">
      <img class="home_text_name" src="../assets/A020.png">
      <!--<div class="home_text_name">-->

      <!--<span class="home_text_name_text">金科</span>环境云评价系统-->
      <!--</div>-->
    </div>
    <div class="page_div">
      <div class="home_addres">
        <img class="home_addres_img" src="../assets/A010.png"> {{data.projectName}}{{data.pointName}}
      </div>
    </div>

    <img class="home_btn" src="../assets/A002.png" @click="goAppraise">

    <div class="popu_div" v-if="isPopu"></div>
    <div class="popu_div_content" v-if="isPopu">
      <div class="popu_div_content_title">提示信息</div>
      <div class="popu_div_content_con">您当前定位与评测点位置不符，不能评价！</div>
      <div class="popu_div_content_btn" @click="noisPopu">
        确定
      </div>
    </div>

    <div id="container"></div>
  </div>
</template>

<script>
//  import BMap from 'BMap'
import wx from "weixin-js-sdk";
import { Indicator, Toast } from "mint-ui";

export default {
  data() {
    return {
      OpenId: "",
      PointId: "",
      isPopu: false,
      data: {
        projectName: "",
        pointName: ""
      },
      urlData: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    noisPopu() {
      let _this = this;
      _this.isPopu = false;
    },

    goAppraise() {
      let _this = this;

      if (_this.data.status == "N") {
        _this.$router.push({
          name: "appraise"
        });
        return;
      }
      if (_this.data.projectName == "") {
        Toast({
          message: "点位已停用或不存在",
          position: "bottom",
          duration: 5000
        });
        return;
      }
      if (_this.data.status == "N") {
        _this.$router.push({
          name: "appraise"
        });
        return;
      }
      Indicator.open({
        text: "定位中...",
        spinnerType: "fading-circle"
      });

      wx.getLocation({
        type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function(res) {
          var data = _this.change(res.latitude, res.longitude);
          Indicator.close();
          var distance = _this.GetDistance(
            data.latitude,
            data.longitude,
            _this.data.latitude,
            _this.data.longitude
          );
          if (distance < _this.data.distance) {
            _this.$router.push({
              name: "appraise"
            });
          } else {
            _this.isPopu = true;
          }
        },
        cancel: function(res) {
          Indicator.close();
          Toast({
            message: "您拒绝了位置授权，暂时无法使用该功能！",
            position: "bottom",
            duration: 5000
          });
        }
      });
    },
    GetDistance(lat1, lng1, lat2, lng2) {
      var radLat1 = lat1 * Math.PI / 180.0;
      var radLat2 = lat2 * Math.PI / 180.0;
      var a = radLat1 - radLat2;
      var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
      var s =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
              Math.cos(radLat1) *
                Math.cos(radLat2) *
                Math.pow(Math.sin(b / 2), 2)
          )
        );
      s = s * 6378.137; // EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000;
      return s;
    },
    change(lat, lng) {
      var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
      var x = parseFloat(lng);
      var y = parseFloat(lat);
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
      lng = z * Math.cos(theta) + 0.0065;
      lat = z * Math.sin(theta) + 0.006;
      let arrMap = {
        latitude: lat,
        longitude: lng
      };
      return arrMap;
    },
    getAdders() {
      let _this = this;

      var formData = new FormData();

      formData.append("pointId", _this.PointId);
      formData.append("openId", _this.OpenId);
      let data = {
        data: formData
      };
      this.$server.point(data).then(data => {
        if (data.data.listData.length != 0) {
          _this.data = data.data.listData[0];
          localStorage.setItem(
            "cloudEvaluationProjectId",
            data.data.listData[0].projectId
          );
          localStorage.setItem(
            "cloudEvaluationPointName",
            data.data.listData[0].pointName
          );
          localStorage.setItem(
            "cloudEvaluationProjectName",
            data.data.listData[0].projectName
          );
        }
      });
    },
    addressDetail() {
      let _this = this;
      wx.config({
        debug: false,
        appId: _this.urlData.appId,
        timestamp: _this.urlData.timestamp,
        nonceStr: _this.urlData.noncestr,
        signature: _this.urlData.signature.toLocaleLowerCase(),
        jsApiList: ["openLocation", "getLocation"]
      });
      wx.ready(function() {
        wx.checkJsApi({
          jsApiList: ["openLocation", "getLocation"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function(res) {
            console.log(res);
            // alert(res)
          }
        });
      });
    }
  },
  mounted() {
    let _this = this;
    _this.urlData = JSON.parse(localStorage.getItem("cloudEvaluationUrlData"));

    //点位Id
   // localStorage.setItem("cloudEvaluationPointId", "1567508064829635");
    //用户ID
    /* localStorage.setItem(
      "cloudEvaluationOpenId",
      "oK0Jcv6pyM_thF3HbrZ01jd9sefg"
    ); */

    _this.OpenId = localStorage.getItem("cloudEvaluationOpenId");
    _this.PointId = localStorage.getItem("cloudEvaluationPointId");

    _this.addressDetail();
    _this.getAdders();

    // var isshuaxin = localStorage.getItem("cloudEvaluationisshuaxin");
    // if (isshuaxin == "0") {
    //   setTimeout(function () {
    //     localStorage.setItem("cloudEvaluationisshuaxin", "1");
    //     // window.location.reload();
    //   }, 500)
    //
    // }

    //
  }
};
</script>
