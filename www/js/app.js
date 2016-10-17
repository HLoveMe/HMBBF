// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('MBBF', ['ionic', 'MBBF.controllers', "MBBF.route","MBBF.customDirective"])

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
  //国际化配置
  $rootScope.language = 'zh'
  $rootScope.locationBox = locationA
  
})
.filter("location",function($rootScope){
  return function(args){
    if ($rootScope.language == 'zh'){
        var res = $rootScope.locationBox[args]
        if (res){
          return res
        }else{
          return args
        }
    }else{
        return args
    }
    return args  
  }
})
.factory("dataServer",function($http,$q){
  var HClient = {
    main:"http://192.168.40.238",
    port:"80"
  }
  HClient.getData = function(path,pars){
        var defer = $q.defer()
        var pathUrl = HClient.main + ":"+ HClient.port + "/" + path
        $http.get(pathUrl).success(function(data){
            defer.resolve(data.data)
        }).error(function(data){
            defer.reject(data)
        })
        return defer.promise
    }
  return HClient
})
