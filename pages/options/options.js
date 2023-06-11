// pages/options/options.js
Page({

  // 页面的初始数据
  data: {
    Events: {
      Eid: -1,
      Ename: ""
    },
    Scenarios: {
      Sid: -1,
      Sname: ""
    }
  },

  // 加载页面时运行
  onLoad: function(){
    wx.showLoading();
    var that = this;
    // 得到Event的数据
    let Events = this.data.Events;
    wx.request({
      method: 'GET',
      url: 'http://127.0.0.1:3000/getEvents',
      data: {
      },
      success: function (Eventdatas) {
        wx.hideLoading();
        Events = Eventdatas.data;
        that.setData({
          Events
        })
      },
      fail: function () {
        // 请求失败返回
        wx.showToast({
          title: 'Request failed',
          icon: 'error'
        })
        wx.navigateBack();
      }
    })

    // 得到Scenarios的数据
    let Scenarios = this.data.Scenarios;
    wx.request({
      method: 'GET',
      url: 'http://127.0.0.1:3000/getScenarios',
      data: {
      },
      success: function (Scenariodatas) {
        Scenarios = Scenariodatas.data;
        that.setData({
          Scenarios
        })
      },
      fail: function () {
      }
    })
  },

  //返回显示页面状态函数
  onShow() { 
    this.onLoad()//这个是重新调取
  },

  // 跳转函数
  navigateToindex(){
    wx.navigateBack()
  },
  navigateToEventSetting(){
    wx.navigateTo({
      url: '../EventSetting/EventSetting',
    })
  },
  navigateToScenarioSetting(){
    wx.navigateTo({
      url: '../ScenarioSetting/ScenarioSetting',
    })
  },
})