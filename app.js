var app = angular.module('chit-chat',['ui.router','ngCookies','ngFileUpload']);
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
                
                .state('profile',{
                    url:'/profile',
                 templateUrl:'dashboard/dashboard.html',
                    controller:'dashctrl'
                })
                 .state('profile.groups',{
                    url:'/profile/group',
                templateUrl:'dashboard/group.html',
    
                })
                
                
                
            }]);


//login controller

  app.controller('loginCtrl',function($scope,$http,$cookieStore,$location,$rootScope)
{
    $scope.login=function()
    {
          $cookieStore.put("email", $scope.myLogin.email); 
        console.log($cookieStore.get('email'));
     $http.post("http://127.0.0.1:8086/login",$scope.myLogin).then(function(res)
     {
        if(res.data.err==0)
        {
            console.log(res.data);
            $cookieStore.put('ppic',res.data.user[0].image);
            console.log(res.data.user[0].image);
            $cookieStore.put('token',res.data.token);
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
  
app.controller('regisCtrl',function($scope,$http,$location,$cookieStore,$rootScope,Upload)
{ 
  $scope.register_me=function()
  {
     
      console.log($scope.myregis);
      if($scope.myregis.pass==$scope.myregis.cpass)
      {
          
         Upload.upload({
            url: 'http://localhost:8086/userpic',
            data: {file: $scope.file}
        }).then(function (resp)
         {    
          path=resp.data.path;  
          
          
          $scope.myregis.image=path;
          
 $http.post("http://127.0.0.1:8086/register",$scope.myregis).then(function(res)
  {
      //console.log(res.data);
      $scope.data=res.data;
      $rootScope.value=1;
      $scope.myregis={};
      $rootScope.msg="Registered successfully you can login now";
      $location.url('/login');
  })
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

app.controller('dashctrl',function($scope,$http,$location,$cookieStore,$rootScope){
    console.log($cookieStore.get('email'));
    $scope.token=$cookieStore.get('token');
    $scope.ppath=$cookieStore.get('ppic');
    console.log($scope.ppath);
$http.get("http://127.0.0.1:8086/getuser/"+$scope.token).then(function(res)
            {
                console.log(res.data)
                $scope.users=res.data.data;
          if(res.data.success==false){
              window.location.href = 'http://127.0.0.1:8081';
          }
            
                
            })

$scope.logout=function(){
      $cookieStore.remove('token');
      $cookieStore.remove('email');
      $cookieStore.remove('ppic');
     window.location.href = 'http://127.0.0.1:8081';

    
}
    
    
    
})