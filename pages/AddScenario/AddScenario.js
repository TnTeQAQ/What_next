// pages/AddScenario/AddScenario.js
Page({
  //  页面的初始数据
  data: {
    ScenarioName: '',
    EventName: []
  },

  // 加载页面时运行
  onLoad: function(){
    // 获取设置详情
    let Sid = this.options["Sid"];
    if(Sid == -1){
      return;
    }
    else{
      let that = this;
      wx.request({
        method: 'GET',
        url: 'http://127.0.0.1:3000/getScenarioDetails',
        data: {
          Sid: Sid
        },
        success: function (Scenariodatas) {
          let ScenarioDetails = Scenariodatas.data;
          let ScenarioName = ScenarioDetails[0][0]["Sname"];
          let EventName = [];
          for(let i=0;i<ScenarioDetails[1].length;i++){
            EventName.push(ScenarioDetails[1][i]["Ename"]);
          }
          that.setData({
            ScenarioName: ScenarioName,
            EventName: EventName
          })
          // that.onLoad();
        },
      })
    }
  },

  // 提交函数
  SubmitScenario(datas){
    let values = datas.detail.value;
    let ScenarioName = values["ScenarioName"];
    let tempEN = values["EventName"].split(",");
    let EventName = [];
    for(let i=0;i<tempEN.length;i++){
      if(tempEN[i] != ""){
        EventName.push(tempEN[i]);
      }
    }
    if(EventName.length>0 && ScenarioName.length>0){
      wx.request({
        method: 'GET',
        url: 'http://127.0.0.1:3000/submitScenario',
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