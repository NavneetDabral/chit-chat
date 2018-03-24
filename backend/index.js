var express=require('express');
var cors=require('cors');
var mongoose=require('mongoose');
var bodyParser=require('body-Parser');
var sha256=require('sha-256');
var regiSchema=require('./schemas/regis');
var app=express();
app.use(cors());
app.use(bodyParser.json());
var connection = mongoose.connect('mongodb://localhost/chit-chat');
//registration API
app.post("/register",function(req,res)
{
    var data={First_Name:req.body.fname,Last_Name:req.body.lname,Email:req.body.email,Password:req.body.pass};
    var register=new regiSchema(data);
    register.save(function(err,data)
    {
        if(err)
        {
            res.json({err:1,msg:'Registration Error'})
        }
        //here problem comes we need to send that status it is important and if we send 2 responses then app will crash so i am going to
        //print that successfull message in app.js
        //res.json({err:0,msg:'Registered Succusfully'})
        res.sendStatus(200);
        console.log("Success");
    })
})
app.listen(8086,function()
{
    console.log("Server running on 8086")
})