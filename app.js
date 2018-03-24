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
            /*
            .state('restaurant.categories', {
              url: "restaurant/categories?restaurant",
              templateUrl: "categories.html",
              controller:function($scope,$stateParams,$http)
           {
            $http.get("http://127.0.0.1:8086/category/"+$stateParams.restaurant).then(function(res)
            {
                $scope.cat=res.data.data;
                $scope.value=$scope.cat[0].restname;
                console.log(res.data)
            })
           }
          })
        */
            }]);
/*
  app.controller('loginCtrl',function($scope,$http,$cookies,$location)
{
    $scope.login=function()
    {
     $http.post("http://127.0.0.1:8086/login",$scope.myLogin).then(function(res)
     {
        if(res.data.err==0)
        {
         $cookies.put('email',res.data.msg);
          $location.url('/read');
            }
        if(res.data.err==1)
        {
             console.log("hello2");
          $scope.mesg=res.data.msg;
        }
     })
    } 
})
*/
    //registration controller
  
app.controller('regisCtrl',function($scope,$http)
{ 
  $scope.register_me=function()
  {
     
      console.log($scope.myregis);
      if($scope.myregis.pass==$scope.myregis.cpass)
      {
 $http.post("http://127.0.0.1:8086/regis",$scope.myregis).then(function(res)
  {
      //console.log(res.data);
      $scope.data=res.data;
      $scope.myData={};
      $scope.ms="Registered successfully"
  })
      }
      else
      {
          $scope.data={err: 1, ms: "Password and confirm password not matched"};
          console.log("hello");
      }
  }
})