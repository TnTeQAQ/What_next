// pages/options/options.js
Page({

  // 页面的初始数据
  data: {

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