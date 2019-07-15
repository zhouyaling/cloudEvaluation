export const trigger = {
  //字符串转数组加false
  strToArr(str) {
    var data = str.split(",");
    var dataArr = [];
    for (var i = 0; i < data.length; i++) {
      var Arr = {
        "name": data[i],
        "isNO": false
      };
      dataArr.push(Arr);

    }
    return dataArr
  },

  //脱敏操作
  desensitization(arr) {

    var data = arr;
    var myArr = [];
    for (var i = 0; i < data.length; i++) {

      for (var j = 0; j < data[i].awardUser.length; j++) {
        if (j > 0) {
          var str = data[i].awardUser;
          str = str.substr(0, parseInt(1)) + '**';
          data[i].awardUser = str
        }

      }
      myArr.push(data[i])
    }
    return myArr
  },
  //
  arrToStr(arr) {
    var dataArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].isNO) {
        dataArr.push(arr[i].name);
      }
    }
    return dataArr.join(',');
  },
  // 传入一个数组
  // 按照特定方式格式化
  sortArr(arr, str) {
    var _arr = [],
      _t = [],
      // 临时的变量
      _tmp;

    // 按照特定的参数将数组排序将具有相同值得排在一起
    arr = arr.sort(function (a, b) {
      var s = a[str],
        t = b[str];

      return s < t ? -1 : 1;
    });

    if (arr.length) {
      _tmp = arr[0][str];
    }
    // console.log( arr );
    // 将相同类别的对象添加到统一个数组
    for (var i in arr) {

      if (arr[i][str] === _tmp) {

        _t.push(arr[i]);
      } else {
        _tmp = arr[i][str];
        _arr.push(_t);
        _t = [arr[i]];
      }
    }
    // 将最后的内容推出新数组
    _arr.push(_t);
    return _arr;
  }

};


