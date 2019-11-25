import axios from 'axios';
import {Indicator, Toast} from 'mint-ui';

// axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'http://192.168.31.55:6521'; //填写域名
//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.data = config.data;
    config.headers = {
      'Content-Type': "application/json",
    };
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 401:
        break;

    }
  }
  return Promise.resolve(err.response)
});


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url = {}) {
  Indicator.close();

  var paras = document.getElementsByClassName('mint-toast');
  for (var i = 0; i < paras.length; i++) {
    if (paras[i] != null)
      paras[i].parentNode.removeChild(paras[i]);
  }
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  });
  return new Promise((resolve, reject) => {
    axios.get(url, {})
      .then(response => {
        Indicator.close();

      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {

  Indicator.close();

  var paras = document.getElementsByClassName('mint-toast');
  for (var i = 0; i < paras.length; i++) {
    if (paras[i] != null)
      paras[i].parentNode.removeChild(paras[i]);
  }
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  });
  return new Promise((resolve, reject) => {
    axios.post(url, data.data)
      .then(response => {

        Indicator.close();

        if (response.data.errcode == "1") {
          // console.log(response.data);
          resolve(response.data);
        } else {
          Toast({
            message: response.data.errmsg,
            position: 'bottom',
            duration: 5000
          });
          if (response.data.errmsg == "参数为空或openId不正确!") {
            setTimeout(function () {
              var url = window.location.href;
              url = url.split('#/');
              localStorage.setItem("cloudEvaluationIsHref", url[1]);
               window.location.href = "http://dev.tq-service.com/evaluate/weiXinUserInfoController/getuserinfo";
              // window.location.href = "http://www.tq-service.com/evaluate/weiXinUserInfoController/getuserinfo";
            }, 3000);
          }
        }


      }, err => {
        Indicator.close();
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}




