// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    Ename: [],
    choice: ""
  },
  
  // 迷糊了
  onLoad(){
    
  },
  // 点击就送
  chooseOptions(){
    let Ename = this.data.Ename;
    console.log(this.data);
    let t = Math.floor(Math.random()*Ename.length);
    this.setData({
      Ename: Ename,
      choice: Ename[t]
    })
    this.onLoad()
  },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  navigateToOptions(){
    wx.navigateTo({
      url: '../options/options',
    })
  },
})
