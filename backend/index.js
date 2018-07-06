var express=require('express');
var app=express();
var multer=require('multer');
var cors=require('cors');
var mongoose=require('mongoose');
var bodyParser=require('body-Parser');
var jwt    = require('jsonwebtoken');
var config = require('./config');
var sha256=require('sha-256');
var regiSchema=require('./schemas/regis');
var postSchema=require('./schemas/post');
app.use(cors());
app.use(bodyParser.json());
var connection = mongoose.connect('mongodb://localhost/chit-chat');
app.use(express.static('../admin'));

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            fn=file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
            cb(null,fn);
        }
    });

    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');


app.post("/userpic",function(req,res)
{
upload(req,res,function(err){
    //req will give all the details of image
    //see by console.log(req)
   console.log(req)
    //console.log(req.file.path)
    //path=req.file.path;
    res.json({path:req.file.filename})
            if(err){
                
                console("error")
            }
})
  
    })





























app.set('superSecret', config.secret); // secret variable


var apiRoutes = express.Router(); 

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token with only our given payload
    // we don't want to pass in the entire user since that has the password
    const payload = {
      admin: user.admin 
    };
        var token = jwt.sign(payload, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

// TODO: route middleware to verify a token

function middleman (req, res, next) {

  // check header or url parameters or post parameters for token
    console.log(req.params);
    
  var token = req.body.token || req.query.token || req.headers['x-access-token']||req.params.token;
console.log(token);
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
}

// apply the routes to our application with the prefix /api
//app.use('/api', apiRoutes);




























var io = require('socket.io')(server);
//Sockets
var myusers=0;
var users=[];
io.on('connection', function(socket) {
    myusers++;
   console.log('A user connected');

socket.on('addme',function(data){
              
         users.push({
		      		id : socket.id,
		      		userName : data.username
		      	});
          console.log(users);

         socket.emit('totalonline', { 
         total: myusers,
         user:users
        });
    })              

   //Whenever someone disconnects this piece of code executed 
   
    socket.on('disconnect', function () {
       myusers--;
       for(let i=0; i < users.length; i++){
		        	
		        	if(users[i].id === socket.id){
		          		users.splice(i,1); 
		        	}
		      	}
        
      console.log('A user disconnected');
   });
});
//registration API
app.post("/register",function(req,res)
{
    var mydata={First_Name:req.body.fname,Last_Name:req.body.lname,Email:req.body.email,Password:req.body.pass,image:req.body.image};
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
        res.json({err:0,msg:mydata.email});
        console.log("Success");
                     
                 }
        
    });
        }
        else
            {
             res.json({err:1,msg:'Email already registered'});   
            }
    });
})

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
   const payload = {
      email:em  
    };
        var token = jwt.sign(payload, app.get('superSecret'), {
          expiresIn:60*60*24 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          err:0,
          msg: 'Enjoy your token!',
          token: token,
          user:data
        });
      
         console.log("hhh");
   
   })
})




//get users
app.get('/getuser/:token',[middleman],function(req,res)
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
app.post('/post',function(req,res){
    
    console.log(req.body);
    
})

var server=app.listen(8086,'127.0.0.1',function()
{
    console.log("Server running on 8086");
})
