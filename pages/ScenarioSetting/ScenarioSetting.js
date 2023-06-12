// pages/ScenarioSetting/ScenarioSetting.js
Page({
  // 页面的初始数据
  data: {
    Scenarios: {
      Sid: -1,
      Sname: ""
    }
  },

  onLoad: function(){
    var that = this;
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
  navigateToAddScenario(){
    wx.navigateTo({
      url: '../AddScenario/AddScenario?Sid=-1',
    })
  },
  navigateToScenarioChange(Sid){
    wx.navigateTo({
      url: '../AddScenario/AddScenario?Sid='+Sid.currentTarget.id,
    })
  },
  //删除事件
  DelScenario(Sid){
    let that = this;
    wx.showModal({
      title: 'Attention',
      content: 'Are you sure you want to delete the Scenario?',
      cancelText: 'No',
      confirmText: 'Yes',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          wx.request({
            method: 'GET',
            url: 'http://127.0.0.1:3000/DelScenario',
            data: {
              Sid: Sid.currentTarget.id
            },
            success: function () {
              that.onLoad()//这个是重新调取
              console.log("删除成功")
            },
            fail: function () {
              console.log("删除失败");
            }
          })
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
})