app.controller("partnerCtrl",function($state,$scope,$http,$ionicScrollDelegate){
	$scope.partners = ["A","B","C"]
	$http.get("json/partner.json").success(function(data){
		$scope.partners = data
	})
	$scope.name = "名称"
	$scope.operaItem = function(index){
		if($scope.partners[index].show){
			$scope.partners[index].show = false
		}else{
			$scope.partners[index].show = true 
		}
		$ionicScrollDelegate.$getByHandle("PartnerScroll").resize()
	}
})