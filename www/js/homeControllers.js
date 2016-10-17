app.controller("homeSeacherCtrl",function(){
	

})
.controller("homeScrollDeatilCtrl",function(){
	

})
.controller("homeAgendaCtrl",function($scope,$state,$http){
	//大会议程界面
	$scope.scrollWidth = "100%"
	$scope.times = [{
		content:"11/1",
		color:"#F00"
	},{
		content:"11/2",
		color:"#FFF"
	},{
		content:"11/3",
		color:"#FFF"
	},{
		content:"11/4",
		color:"#FFF"
	}]
	$scope.scrollWidth = ( 100.0 / 3.0 * $scope.times.length).toString()+"%"
	$scope.currentIndex = 0
	$scope.changeIndex = function(one){
		
		var index = $scope.times.indexOf(one)
		if($scope.currentIndex != index){
			var item = $scope.times[$scope.currentIndex]
			item.color = "#FFF"
			$scope.currentIndex = index
			item = $scope.times[$scope.currentIndex]
			item.color="#F00"
		}
	}

})