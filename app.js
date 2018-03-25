var app = angular.module('chit-chat',['ui.router','ngCookies']);
app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
    
				$stateProvider.state('login', {
            url: '/login',
            templateUrl: 'login.html',
                    controller:'loginCtrl'
                     })
                .state('register', {
            url: '/register',
            templateUrl: 'register.html',
                    controller:'regisCtrl'
                     })
                .state('profile', {
            url: '/profile',
            templateUrl: 'profile.html',
            controller:'profctrl'
                     })
            }]);
//profile controller
app.controller('profctrl',function($scope,$http,$cookies,$location)
{
     
    $scope.logout=function()
    { 
        console.log("logout");
        $cookies.remove("email");
        $location.url('/login');
    
                      }
    var session=$cookies.get('email');
  if(session==null)
     {
       console.log("you are not logged in");
     }
               else{
               
 var socket = io.connect('http://localhost:8086/');
 socket.on('connect', function(data){
socket.emit('join', 'Hello World from client');
 });
        
     socket.emit('addme', { 
         username:session
     }); 
                   
    socket.on('totalonline',function(data){
            $scope.total=data.total;
            console.log(data.user);
            console.log(data.total);
            $scope.userlist=data.user;
      
        })
    
    socket.emit('chatting_mate',);

 $('form').submit(function(e){
     e.preventDefault();
     var message = $('#chat_input').val();
     socket.emit('messages', message);

 })
               }
                  
     });  
    
/*    app.controller('chatctrl',function($scope,$http,$cookies,$stateParams)
{
        console.log($stateParams.f_name);
        console.log($stateParams.l_name);
        var value = $cookies.get("email");
        console.log(value);
var socket = io.connect('http://localhost:8086/');
 socket.on('connect', function(data) {
socket.emit('join'+'$stateParams.f_name'+'$stateParams.l_name'+'value', 'Hello World from client');
 });
        var username=$stateParams.f_name+$stateParams.l_name;
socket.emit('add user', username);
 socket.on('broad', function(data) {
         $('#future').append(data+ "<br/>");
   });

 $('form').submit(function(e){
     e.preventDefault();
     var message = $('#chat_input').val();
     socket.emit('messages', message);
     
 }); 
     






})
*/



//login controller

  app.controller('loginCtrl',function($scope,$http,$cookies,$location)
{
    $scope.login=function()
    {
     $http.post("http://127.0.0.1:8086/login",$scope.myLogin).then(function(res)
     {
        if(res.data.err==0)
        {
        console.log(res.data.msg);
            
         $cookies.put('email',res.data.msg);
          $location.url('/profile');
            }
        if(res.data.err==1)
        {
             console.log("hello2");
          $scope.msg=res.data.msg;
        }
     })
    } 
})

  
  
    //registration controller
  
app.controller('regisCtrl',function($scope,$http,$location,$cookies)
{ 
  $scope.register_me=function()
  {
     
      console.log($scope.myregis);
      if($scope.myregis.pass==$scope.myregis.cpass)
      {
 $http.post("http://127.0.0.1:8086/register",$scope.myregis).then(function(res)
  {
      //console.log(res.data);
      $scope.data=res.data;
      $scope.myregis={};
      $scope.msg="Registered successfully",
     $cookies.put('email',res.data.msg);
      $location.url('/profile');
  })
      }
      else
      {
          $scope.data={err: 1, msg: "Password and confirm password not matched"};
          console.log("hello");
          $scope.myregis={};
      }
  }
})