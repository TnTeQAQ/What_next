const express=require('express')
const bodyParser =require('body-parser')
const app=express()
const mysql = require('mysql')
const IPAddress='127.0.0.1'//因为这里是要链接远程数据库，ip 地址是 mysql 的地址！！本地就是 127.0.0.1，服务器上就自己找找看
const UserName='TnTeQAQ'
const PWD='test123.'
const DBName='what_next'
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var connection=mysql.createConnection({
  host:IPAddress,
  port: 3306,		
  user:UserName,
  password:PWD,
  database:DBName,
  multipleStatements: true
})
connection.connect();


// md异步整不了,下下策了属于是
const pool = mysql.createPool({
  host:IPAddress,
  port: 3306,		
  user:UserName,
  password:PWD,
  database:DBName,
})
let mysql_async= function(sql, values) {
  // 返回一个 Promise
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          // 结束会话
          connection.release();
        });
      }
    });
  });
}


// 获取Events
app.get('/getEvents',(req,res)=>{ 
  let sql = "select * from event";
  connection.query(sql,function(error,results){
    if(error) console.log(error);
    res.json(results)
    // console.log(results)
  })
})
// 获取Scenarios
app.get('/getScenarios',(req,res)=>{ 
  let sql = "select * from Scenario";
  connection.query(sql,function(error,results){
    if(error) console.log(error);
    res.json(results)
    // console.log(results)
  })
})
// 获取Relations
app.get('/getRelations',(req,res)=>{ 
  let sql = "select * from relationship";
  connection.query(sql,function(error,results){
    if(error) console.log(error);
    res.json(results)
    // console.log(results)
  })
})
// 删除Event
app.get('/DelEvent',(req,res)=>{ 
  let Eid = req.query["Eid"];
  let sql = "delete from event where Eid = "+Eid+";"+"delete from relationship where Eid = "+Eid;
  connection.query(sql,function(error,results){
    if(error) console.log(error);
    res.json(results)
    // console.log(results)
  })
})
// 删除Scenario
app.get('/DelScenario',(req,res)=>{ 
  let Sid = req.query["Sid"];
  let sql = "delete from scenario where Sid = "+Sid+";"+"delete from relationship where Sid = "+Sid;
  connection.query(sql,function(error,results){
    if(error) console.log(error);
    res.json(results)
    // console.log(results)
  })
})
// 查询某条Event的详细信息
app.get('/getEventDetails',(req,res)=>{ 
  let Eid = req.query["Eid"];
  let sql = "select Ename from event where Eid = "+Eid+";select Sname from scenario where Sid IN (select Sid from relationship where Eid = "+Eid+");";
  connection.query(sql,function(error,results){
    if(error) console.log(error);
    res.json(results)
    // console.log(results)
  })
  
})
// 查询某条Scenario的详细信息
app.get('/getScenarioDetails',(req,res)=>{ 
  let Sid = req.query["Sid"];
  let sql = "select Sname from Scenario where Sid = "+Sid+";select Ename from event where Eid IN (select Eid from relationship where Sid = "+Sid+");"
  connection.query(sql,function(error,results){
    if(error) console.log(error);
    res.json(results);
    // console.log(results);
  })
})
// 提交Event
app.get('/submitEvent',(req,res)=>{ 
  async function submitEvent(){
    // 获取变量
    let EventName = req.query["EventName"];
    let ScenarioName = eval(req.query["ScenarioName"]);
    // 删除relation表和event表数据
    let delsql1 = "DELETE FROM relationship WHERE Eid = (SELECT Eid FROM event WHERE Ename = \""+EventName+"\")";
    let delsql2 = "DELETE FROM event WHERE Ename = \""+EventName+"\";";
    //执行语句,不返回值
    await mysql_async(delsql1).then(res=>{}).catch(err=>{console.log(err);})  
    await mysql_async(delsql2).then(res=>{}).catch(err=>{console.log(err);})  
    // 插入事件
    let insertEvent = "INSERT INTO event(Ename) VALUES(\""+EventName+"\");"
    await mysql_async(insertEvent).then(res=>{}).catch(err=>{console.log(err);})
    // 插入环境
    for(let i=0;i<ScenarioName.length;i++){
      let insertScenario = "INSERT INTO scenario(Sname) SELECT \""+ScenarioName[i]+"\" FROM scenario WHERE NOT EXISTS(SELECT Sname FROM scenario WHERE Sname = \""+ScenarioName[i]+"\") LIMIT 1;"
      await mysql_async(insertScenario).then(res=>{}).catch(err=>{console.log(err);})
    }
    //获取id号
    let Eid = -1;
    let Sid = [];
    let getEid = "SELECT Eid FROM event WHERE Ename = \""+EventName+"\"";
    await mysql_async(getEid).then(res=>{
        Eid=res[0]["Eid"];
    }).catch(err=>{
        console.log(err);
    })
    for(let i=0;i<ScenarioName.length;i++){
      let getSid = "SELECT Sid FROM scenario WHERE Sname = \""+ScenarioName[i]+"\"";
      await mysql_async(getSid).then(res=>{
          Sid.push(res[0]["Sid"]);
      }).catch(err=>{
          console.log(err);
      })
    }
    // 插入relation表
    for(let i=0;i<ScenarioName.length;i++){
      let insertRelation = "INSERT INTO relationship(Eid,Sid) VALUES("+Eid+","+Sid[i]+");";
      await mysql_async(insertRelation).then(res=>{}).catch(err=>{console.log(err);})  
    }
    res.json("success");
  }
  submitEvent();
})
// 提交Event
app.get('/submitScenario',(req,res)=>{ 
  async function submitScenario(){
    // 获取变量
    let ScenarioName = req.query["ScenarioName"];
    let EventName = eval(req.query["EventName"]);
    // 删除relation表和event表数据
    let delsql1 = "DELETE FROM relationship WHERE Sid = (SELECT Sid FROM scenario WHERE Sname = \""+ScenarioName+"\")";
    let delsql2 = "DELETE FROM scenario WHERE Sname = \""+ScenarioName+"\";";
    console.log(delsql1);
    console.log(delsql2);
    //执行语句,不返回值
    await mysql_async(delsql1).then(res=>{}).catch(err=>{console.log(err);})  
    await mysql_async(delsql2).then(res=>{}).catch(err=>{console.log(err);})  
    // 插入环境
    let insertScenario = "INSERT INTO scenario(Sname) VALUES(\""+ScenarioName+"\");"
    console.log(insertScenario);
    await mysql_async(insertScenario).then(res=>{}).catch(err=>{console.log(err);})
    // 插入事件
    for(let i=0;i<EventName.length;i++){
      let insertEventName = "INSERT INTO event(Ename) SELECT \""+EventName[i]+"\" FROM event WHERE NOT EXISTS(SELECT Ename FROM event WHERE Ename = \""+EventName[i]+"\") LIMIT 1;"
      console.log(insertEventName);
      await mysql_async(insertEventName).then(res=>{}).catch(err=>{console.log(err);})
    }
    //获取id号
    let Sid = -1;
    let Eid = [];
    let getSid = "SELECT Sid FROM scenario WHERE Sname = \""+ScenarioName+"\"";
    console.log(getSid);
    await mysql_async(getSid).then(res=>{
        Sid=res[0]["Sid"];
    }).catch(err=>{
        console.log(err);
    })
    for(let i=0;i<EventName.length;i++){
      let getEid = "SELECT Eid FROM event WHERE Ename = \""+EventName[i]+"\"";
      console.log(getEid);
      await mysql_async(getEid).then(res=>{
          Eid.push(res[0]["Eid"]);
      }).catch(err=>{
          console.log(err);
      })
    }
    // 插入relation表
    for(let i=0;i<EventName.length;i++){
      let insertRelation = "INSERT INTO relationship(Eid,Sid) VALUES("+Eid[i]+","+Sid+");";
      console.log(insertRelation);
      await mysql_async(insertRelation).then(res=>{}).catch(err=>{console.log(err);})  
    }
    res.json("success");
  }
  submitScenario();
})

app.listen(3000,()=>{//这是一个监听端口，会输出监听到的信息。上面的 console.log 就会在这里输出
  console.log('server running at http://'+IPAddress+':3000')
})