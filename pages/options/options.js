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
    },
    selectedEventId: [],
    selectedScenarioId: [],
    Relations: []
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
    // 得到relation的数据
    let Relations = this.data.Relations;
    wx.request({
      method: 'GET',
      url: 'http://127.0.0.1:3000/getRelations',
      success: function (Relationdatas) {
        Relations = Relationdatas.data;
        that.setData({
          Relations
        })
      },
      fail: function () {
      }
    })
  },

  //返回显示页面状态函数
  onShow() { 
    this.onLoad();//这个是重新调取
  },
  // 当Event被改变
  Echange(e){
    let that = this;
    let Eid = parseInt(e.currentTarget.id, 10);
    let relations = this.data.Relations;
    let selectedId = this.data.selectedEventId;
    if(this.data.selectedScenarioId.includes(Eid)){
      // 如果在里面
      selectedId = selectedId.splice(selectedId.indexOf(Eid), 1);
    }
    else{
      // 如果不在里面
      selectedId.push(Eid);
    }
  },
  // 当Scenario被改变
  changeScenario(s){
    let that = this;
    let Sid = parseInt(s.currentTarget.id, 10);
    let relations = this.data.Relations;
    let selectedId = this.data.selectedScenarioId;

    // ___________________________________________________
    // let query = wx.createSelectorQuery();
    // query.selectAll('.options_box').boundingClientRect();
    // query.exec(function (res) {
    //   res[0][0].checked = "1";
    //   console.log(123);  
    // })
    // console.log(query);
    // ___________________________________________________

    if(this.data.selectedScenarioId.includes(Sid)){
      // 如果在里面
      selectedId = selectedId.splice(selectedId.indexOf(Sid), 1);
    }
    else{
      // 如果不在里面
      selectedId.push(Sid);
      // ___________________________________________________
      // for(let i=0;i<relations.length;i++){
      //   if(Sid == relations[i]["Sid"]){
      //     let Eid = relations[i]["Eid"];
      //     this.data.selectedEventId.push(Eid);
      //   }
      // }
      // ___________________________________________________
    }
    // console.log(relations);
  },

  // 跳转函数
  navigateToindex(e){
    let Ename = [];
    let Events = this.data.Events;
    let selectedEventId = this.data.selectedEventId;
    for(let i=0;i<Events.length;i++){
      if(selectedEventId.includes(Events[i]["Eid"])){
        Ename.push(Events[i]["Ename"]);
      }
    }
    // console.log(Ename);

    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length-2];//上一页面
    prevPage.setData({//直接给上移页面赋值
      Ename: Ename,
    });
    wx.navigateBack();
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