import { post } from './http-service.js'

var serve = "http://dev.tq-service.com/evaluate/";
//var serve = "http://www.tq-service.com/evaluate/";

export const server = {
    //获取评价点
    point: function(paramObj) {
        return post(serve + 'appController/getPoint', paramObj);
    },
    //用户信息
    judgeOwner: function(paramObj) {
        return post(serve + 'appController/judgeOwner', paramObj);
    },
    //抽奖公告
    getPrizeNotice: function(paramObj) {
        return post(serve + 'appController/getPrizeNotice', paramObj);
    },
    //我的中奖记录
    getMemberInfo: function(paramObj) {
        return post(serve + 'appController/getMemberInfo', paramObj);
    },
    //抽奖奖项
    getPrizeList: function(paramObj) {
        return post(serve + 'appController/getPrize', paramObj);
    },
    //抽奖结果
    luckDraw: function(paramObj) {
        return post(serve + 'appController/luckDraw', paramObj);
    },
    //验证是否抽奖
    judgeLotteryDraw: function(paramObj) {
        return post(serve + 'appController/judgeLotteryDraw', paramObj);
    },
    //获取评分
    getScoreItem: function(paramObj) {
        return post(serve + 'appController/getScoreItem', paramObj);
    },
    //验证是否评价过
    judgeComplete: function(paramObj) {
        return post(serve + 'appController/judgeComplete', paramObj);
    },
    //评价
    sendScore: function(paramObj) {
        return post(serve + 'appController/sendScore', paramObj);
    },

};