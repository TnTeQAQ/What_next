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

app.listen(3000,()=>{//这是一个监听端口，会输出监听到的信息。上面的 console.log 就会在这里输出
  console.log('server running at http://'+IPAddress+':3000')
})