conCtrl.controller('globalSeacherCtrl', function() {
	console.log("globalSeacherCtrl")
})
conCtrl.controller('oneModuleAgendaCtrl', function($rootScope,$scope,dataService) {
	$scope.dayData = []
	//请求天数
	dataService.getData("api.php/assembly/index",{
		p: $scope.page
	}).then(function(data){
		angular.forEach(data, function(value, key){
			$scope.dayData.push(value)
		});
		console.log($scope.dayData)
	}, function(){})
	
	$scope.loadMeet = function(){

		
	}

})
conCtrl.controller('twoModuleVideoCtrl', function() {


})
conCtrl.controller('thereModuleGuestCtrl', function() {


})
conCtrl.controller('fourModuleExhibitionCtrl', function() {


})