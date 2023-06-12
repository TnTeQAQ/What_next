// pages/EventSetting/EventSetting.js
Page({

  // 页面的初始数据
  data: {
    Events: {
      Eid: -1,
      Ename: ""
    }
  },
  // 加载页面时运行
  onLoad: function(){
    var that = this;
    // 得到Event的数据
    let Events = this.data.Events;
    wx.request({
      method: 'GET',
      url: 'http://127.0.0.1:3000/getEvents',
      data: {
      },
      success: function (Eventdatas) {
        Events = Eventdatas.data;
        that.setData({
          Events
        })
      },
      fail: function () {
        console.log("Events获取失败");
      }
    })
  },
  
  //返回显示页面状态函数
  onShow() { 
    this.onLoad()//这个是重新调取
  },

  // 跳转函数
  navigateToAddEvent(){
    wx.navigateTo({
      url: '../Add/Add?Eid=-1',
    })
  },
  navigateToEventChange(Eid){
    wx.navigateTo({
      url: '../Add/Add?Eid='+Eid.currentTarget.id,
    })
  },
  //删除事件
  DelEvent(Eid){
    let that = this;
    wx.showModal({
      title: 'Attention',
      content: 'Are you sure you want to delete the event?',
      cancelText: 'No',
      confirmText: 'Yes',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          wx.request({
            method: 'GET',
            url: 'http://127.0.0.1:3000/DelEvent',
            data: {
              Eid: Eid.currentTarget.id
            },
            success: function () {
              console.log("删除成功");
              that.onLoad();//这个是重新调取
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