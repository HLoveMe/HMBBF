var app =angular.module('MBBF.controllers', [])

app.controller("MainCtrl",function($scope,$state,$http,$rootScope,$ionicPopover){
	//底部导航隐藏
	$scope.hideTabs = false
	$scope.$on("$ionicView.beforeEnter",function(event,data){
		var name = $state.current.name
		if(name == "tab.home" || name =="tab.meet" || name == "tab.news" || name == "tab.setting"){
			$scope.hideTabs = false
		}else{
			$scope.hideTabs = true
		}
	})
	//侧栏
	$ionicPopover.fromTemplateUrl("sidemenu.html",{
		scope:$rootScope
	}).then(function(popover){
		$rootScope.popover = popover
	})
	//侧栏数据
	$rootScope.sides  = []
	$http.get("json/sideMenu.json").success(function(data){
		$rootScope.sides = data["menus"]
	})
	//显示侧栏
	$rootScope.showMenu = function($event){
  		$rootScope.popover.show($event)
  	}
	//跳转 侧栏隐藏和显示
	$scope.$on("$ionicView.beforeLeave",function(event,data){
		if ($rootScope.popover.isShown()) {
			$rootScope.popover.hide()
		}
	})
	$rootScope.sidemenuClick =  function(index){
		console.log("==========")
		if(index == 2){
			$state.go("tab.sideMenu-partner")	
		}
		
	}
})
.controller('homeCtrl', function($state,$scope,$http,$ionicScrollDelegate) {
   $scope.goSeacher = function(){
		$state.go("home-seacher")
	}
	$scope.currentWidth = document.body.clientWidth
	//请求消息数据
	// $http.get("")
	$scope.newsArr = [
		{
			"img":"images/1.png",
			"url":"http://www.baidu.com"
		},
		{
			"img":"images/2.png",
			"url":"http://www.baidu.com"
		},
		{
			"img":"images/3.png",
			"url":"http://www.baidu.com"
		},
		{
			"img":"images/4.png",
			"url":"http://www.baidu.com"
		}
	]
	//imgClick 图片点击事件
	$scope.imgClick = function(item){
		$state.go("tab.home-scroll-detail")
	}
	//点击语音
	$scope.speak = function(){
		alert(221)
	}
	//底部模块
	$scope.moduleClick = function(index){
		if(index == 0){
			$state.go("tab.home-Agenda")
		}
	}
	//搜索
	$scope.seacher = function(){
		
		$state.go("tab.home-seacher")
	}
})

.controller('meetCtrl', function($scope,$rootScope,$state,$ionicPopover,$ionicScrollDelegate) {

  	
  	$scope.listTitles = [
			{name:"Conference Services",id:0,show:false,content:{height:"200px",src:"images/meet-0.jpg"}},
			{name:"Venue Introduction",id:1,show:false,content:{height:"300px",src:"images/meet-1.png"}},
			{name:"Hotel Introduction",id:2,show:false,content:{height:"500px",src:"images/meet-2.jpg"}},
			{name:"Traffic Guidance",id:3,show:false,content:{height:"100px",src:"images/meet-3.jpg"}}
		]

	$scope.operaItem = function(index){

		$scope.listTitles[index].show = ! $scope.listTitles[index].show
		$ionicScrollDelegate.$getByHandle('meet-main-scroll').resize()
		$state.go("tab.meet",{reload:true})
	}
	$scope.sectionImgClick = function(item){
		$state.go("tab.meet-detail",{
			"msg":item.name
		})
	}
})
.controller("meetDetailCtrl",function($scope,$stateParams){
	$scope.msg = $stateParams["msg"]
	$scope.$on("$ionicView.beforeEnter",function(){

	})

})
.controller('newsCtrl', function($scope,$rootScope,$http,$state,$ionicScrollDelegate,dataServer,$timeout) {
	$scope.showInfiniteScroll = false
	//页码resource-main-scroll
	$scope.page = 1
	//数据
	$scope.dataArr = []
	$scope.$watch("dataArr",function(newV,oldB){
		$scope.showInfiniteScroll = true
		console.log($scope.showInfiniteScroll)
	})
	//加载数据
	$scope.loadData = function(more){
		if(!more){
			//最新
			$scope.dataArr=[]
			$scope.page = 1
		}else{
			$scope.page = $scope.page + 1
		}

		dataServer.getData("api.php/information/index",{
			lang:$rootScope.language,
			p:$scope.page
		}).then(function(data){
			angular.forEach(data,function(ele){
				$scope.dataArr.push(ele)
			})
			console.log($scope.dataArr)
		},function(data){
			console.log(data)
		}).finally(function(){
			console.log(212212)
			if(!more){
				$scope.$broadcast("scroll.refreshComplete")
			}else{
				$scope.$broadcast('scroll.infiniteScrollComplete')
			}
			$ionicScrollDelegate.getByHandle("resource-main-scroll").resize()
		})
	}
	$scope.loadData(false)
	//加载最新数据
	$scope.loadNewData = function(){
		$scope.loadData(false)
		
	}
	$scope.loadMoreData = function(){
		$scope.loadData(true)
	}

	//分享
	$scope.shareMsg = function(item,$event){
		alert(item.title)
		$event.stopPropagation()
	}
	//点击进入详情
	$scope.newsClick = function(item){
		$state.go("news-detail")
	}
})

.controller('settingCtrl', function($scope,$http,$rootScope,dataServer) {
	$scope.deviceInformation = ionic.Platform.device();

});