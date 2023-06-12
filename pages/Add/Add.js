// pages/Add/Add.js
Page({
  // 页面的初始数据
  data: {
    EventName: "",
    ScenarioName: []
  },

  // 加载页面时运行
  onLoad: function(){
    // 获取设置详情
    let Eid = this.options["Eid"];
    if(Eid == -1){
      return;
    }
    else{
      let that = this;
      wx.request({
        method: 'GET',
        url: 'http://127.0.0.1:3000/getEventDetails',
        data: {
          Eid: Eid
        },
        success: function (Eventdatas) {
          let EventDetails = Eventdatas.data;
          let EventName = EventDetails[0][0]["Ename"];
          let ScenarioName = [];
          for(let i=0;i<EventDetails[1].length;i++){
            ScenarioName.push(EventDetails[1][i]["Sname"]);
          }
          that.setData({
            EventName: EventName,
            ScenarioName: ScenarioName
          })
          // that.onLoad();
        },
      })
    }
  },
  // 提交函数
  SubmitEvent(datas){
    let values = datas.detail.value;
    let EventName = values["EventName"];
    let tempSN = values["ScenarioName"].split(",");
    let ScenarioName = [];
    for(let i=0;i<tempSN.length;i++){
      if(tempSN[i] != ""){
        ScenarioName.push(tempSN[i]);
      }
    }
    if(EventName.length>0 && ScenarioName.length>0){
      wx.request({
        method: 'GET',
        url: 'http://127.0.0.1:3000/submitEvent',
        data: {
          EventName: EventName,
          ScenarioName: ScenarioName
        },
        success: function () {
          console.log("添加成功")
        },
        fail: function () {
          console.log("添加失败");
        }
      })
    }
    else{
      console.log("不能为空");
    }
    // 返回上一层
    wx.navigateBack();
  },
})