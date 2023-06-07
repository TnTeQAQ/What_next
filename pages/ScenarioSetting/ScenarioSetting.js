// pages/ScenarioSetting/ScenarioSetting.js
Page({
  // 页面的初始数据
  data: {

  },
// 跳转函数
navigateToAddScenario(){
  wx.navigateTo({
    url: '../AddScenario/AddScenario',
  })
},
navigateToScenarioChange(){
  wx.navigateTo({
    url: '../AddScenario/AddScenario',
  })
},
//删除事件
DelScenario(){
  wx.showModal({
    title: 'Attention',
    content: 'Are you sure you want to delete the Scenario?',
    cancelText: 'No',
    confirmText: 'Yes',
    success: function (res) {
      if (res.confirm) {//这里是点击了确定以后
        console.log('用户点击确定')
      } else {//这里是点击了取消以后
        console.log('用户点击取消')
      }
    }
  })
},
})