var app = angular.module('chit-chat',['ui.router','ngCookies']);
app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
    
				$stateProvider.state('login', {
            url: '/login',
            templateUrl: 'login.html',
                    controller:'loginCtrl'
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
//login controller
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
    //registration controller
app.controller('regisCtrl',function($scope,$http)
{ 
  $scope.regis=function()
  {
      var fn=$scope.myData.fn;
      var ln=$scope.myData.ln;
      var email=$scope.myData.email;
      var pass=$scope.myData.pass;
      var cpass=$scope.myData.cpass;
      console.log($scope.myData);
      if(pass==cpass)
      {
     data={fnn:fn,lnn:ln,emaill:email,passs:pass};
 $http.post("http://127.0.0.1:8086/regis",data).then(function(res)
  {
      //console.log(res.data);
      $scope.data=res.data;
      $scope.myData={};
      $scope.ms="Registered successfully"
  })
      }
      else
      {
          $scope.data={err: 1, msg: "Pass & cpass is not match"};
          console.log("hello");
      }
  }
})
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
})
*/