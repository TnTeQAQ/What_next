// pages/EventSetting/EventSetting.js
Page({

  // 页面的初始数据
  data: {

  },
  // 跳转函数
  navigateToAddEvent(){
    wx.navigateTo({
      url: '../Add/Add',
    })
  },
  navigateToEventChange(){
    wx.navigateTo({
      url: '../Add/Add',
    })
  },
  //删除事件
  DelEvent(){
    wx.showModal({
      title: 'Attention',
      content: 'Are you sure you want to delete the event?',
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