var express = require('express');
var bodyparser = require('body-parser');
var mysql = require('mysql');
var util = require('util');
var session = require('express-session');
var app = express();

app.use(session({
    secret:'Dipak',
    resave:true,
    saveUninitialized:true
}));

var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_third'
});
var exe = util.promisify(conn.query).bind(conn);

app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.render("login.ejs");
});

app.post("/user_login",async function(req,res){
    //CREATE TABLE user_tbl(user_tbl_id INT PRIMARY KEY AUTO_INCREMENT,user_name VARCHAR(200),user_mobile VARCHAR(20), user_email VARCHAR(200),user_password(200))
    //INSERT INTO user_tbl(user_name,user_mobile,user_email,user_password) VALUES('ABCD','9022585979','abcd@gmail.com','123456')
    //INSERT INTO user_tbl(user_name,user_mobile,user_email,user_password) VALUES('Tejas','9604796150','tejas@gmail.com','654321')
 
      var d = req.body;
   var sql=`SELECT * FROM login WHERE user_mobile='${d.mobile}' AND user_password='${d.password}' `;
    var data = await exe(sql)
    if(data.length>0){
        req.session.user_id = data[0].user_tbl_id;
       // res.send("Login Success:"+data[0].user_tbl_id);
       res.redirect("/library");
    }
    else{
    res.send("Login Failed");
    }
});

app.get("/library", function(req,res){
   
        res.render("library.ejs");
});

app.listen(5000);