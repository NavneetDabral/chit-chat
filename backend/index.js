var express=require('express');
var app=express();
var cors=require('cors');
var mongoose=require('mongoose');
var bodyParser=require('body-Parser');
var sha256=require('sha-256');
var regiSchema=require('./schemas/regis');
app.use(cors());
app.use(bodyParser.json());
var connection = mongoose.connect('mongodb://localhost/chit-chat');
var server=app.listen(8086,'127.0.0.1',function()
{
    console.log("Server running on 8086");
})
var io = require('socket.io')(server);
//Sockets
var myusers=0;
var userso=[];
io.on('connection', function(socket) {
    var me=false;
    myusers++;
   console.log('A user connected');

socket.on('addme',function(data){
              if(me==false)
    {       
         userso.push({
		      		id : socket.id,
		      		userName : data.username
		      	});
        me=true;
          console.log(userso);
       
    }
              })
socket.emit('totalonline', { 
         total: myusers,
         user:userso
        });
   //Whenever someone disconnects this piece of code executed 
   
    socket.on('disconnect', function () {
       myusers--;
       for(let i=0; i < userso.length; i++){
		        	
		        	if(userso[i].id === socket.id){
		          		userso.splice(i-1,1); 
		        	}
		      	}
        
      console.log('A user disconnected');
   });
});

//registration API
app.post("/register",function(req,res)
{
    var mydata={First_Name:req.body.fname,Last_Name:req.body.lname,Email:req.body.email,Password:req.body.pass};
    var register=new regiSchema(mydata);
    
regiSchema.find({Email:mydata.Email},function(err1,data1)
   {
       
       if (data1.length === 0)
        {
          
             register.save(function(err,data){
        if(err)
        {
            res.json({err:1,msg:'Registration Error'});
        }
                 else
                 {
                     //here problem comes we need to send that status it is important and if we send 2 responses then app will crash so i am going to
        //print that successfull message in app.js
        //res.json({err:0,msg:'Registered Succusfully'})
        res.json({msg:myData.email});
        console.log("Success");
                     
                 }
        
    });
        }
        else
            {
             res.json({err:1,msg:'Email already registered'});   
            }
    });
});

//login Api
app.post("/login",function(req,res)
{
   em=req.body.email;
   pass=req.body.pass;
  console.log(req.body); regiSchema.find({Email:em,Password:pass},function(err,data)
   {
       if(err)
       {
          console.log("error");
           return res.json({err:1,msg:'email or pass is not correct'});
       }
       if (data.length === 0)
        {
            console.log("User not found");
            return res.json({ err: 1, msg: 'email or pass is not correct' });
        }
         console.log("hhh");
   return res.json({err:0,msg:em,rol:data[0].role});
   
   })
})

//get users
app.get('/getuser',function(req,res)
{
    regiSchema.find({},function(err,data)
    {
        if(err)
        {
             return res.json({error:1,data:"Error"})
        }
        if(data.length===0)
        {
             return res.json({error:1,data:"No Data Found"})
        }
        return res.json({error:0,data:data})
    })
})
   