conCtrl.controller('newsDetailCtrl',function($scope,$stateParams,transferServer,$http,dataService,$shareSDK){
	$scope.news = transferServer.getData("news",true)
	dataService.getData("api.php/information/info",{id:$scope.news.id})
	.then(function(data){
		console.log(data)
		$scope.news = data
		document.getElementById("briefContent").innerHTML = $scope.news.brief
		if($scope.news.vedio_url.length>=1){
			$scope.hasVideo = true
		}
		document.getElementById("newsContent").innerHTML = $scope.news.content
	})
	$scope.share = function($event){
		var options = {
				platforms:[
					{
						platform:ShareSDKArg.PlatformType.All,
						shareType:ShareSDKArg.ContentType.Auto,
						content:$scope.news.title,
						url:$scope.news.share_url+"&isApp=-1",
						icons:"person_favicon"
					}
				]
			}
		$shareSDK.share(options)
		$event.stopPropagation()
	}
})
conCtrl.controller("newsSeacherCtrl",function($scope,$rootScope,$state,$timeout,transferServer,dataService,$inputFiledDelegate,$ionicScrollDelegate,$shareSDK){
	$scope.keyword = ""
	$scope.page = 1
	$scope.seacherNewsLite = []
	$scope.showseacherInfinite = false
	$scope.load = function(more){
		if (more) {
			$scope.page = $scope.page + 1 
		}else{
			$scope.page = 1
			$scope.seacherNewsLite.length = 0
		}
		var par = {}
		if($scope.keyword.length>=1){
			par["keyword"] = $scope.keyword
		}
		par["p"] = $scope.page
		dataService.getData("api.php/information/index",par).then(function(data){
			$scope.seacherNewsLite = $scope.seacherNewsLite.concat(data)
			console.log(data)
			if(data.length == 0){
				$scope.showseacherInfinite = false
			}else{
				$ionicScrollDelegate.$getByHandle("seacherContent").resize()
				//getScrollView().__clientHeight <=  $scope.curentCont.getScrollView().__contentHeight
				var view = $ionicScrollDelegate.$getByHandle("seacherContent").getScrollView()
				
				$timeout(function(){
					$scope.showseacherInfinite = view.__clientHeight <= view.__contentHeight
				},500)
			}
			
		}, function(data){
			alert("搜索失败")
		}).finally(function(){
			$scope.$broadcast("scroll.refreshComplete")
			$scope.$broadcast('scroll.infiniteScrollComplete')
		})

	}
	//刷新最新数据
	$scope.loadNewData = function(){
		$scope.load(false);
	}
	$scope.loadMore = function(){
		$scope.load(true);
	}
	$scope.$on("input.return",function($event,content){
		$scope.keyword = content
		$scope.load(false)
	})
	//详情
	$scope.newsDetail = function(item){
		transferServer.setData("news",item)
		$state.go("tab.newsDetail")
	}
	$scope.share = function($event,item){
		var options = {
				platforms:[
					{
						platform:ShareSDKArg.PlatformType.All,
						shareType:ShareSDKArg.ContentType.Auto,
						content:item.title,
						url:item.share_url+"&isApp=-1",
						icons:"person_favicon"
					}
				]
			}
		$shareSDK.share(options)
		$event.stopPropagation() 
	}
})