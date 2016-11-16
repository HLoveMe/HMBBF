var conCtrl = angular.module('MBBF.controllers', [])

conCtrl.controller("mainCtrl", function($cordovaDevice, $scope, $rootScope, $http, $timeout, $ionicSideMenuDelegate, $state, transferServer, $shareSDK, $ionicTabsDelegate, $ionicSideMenuDelegate, $UserDefaluts, dataService, $cordovaNetwork, $ionicPopup, $ionicNavBarDelegate) {
		//APP注册
		document.addEventListener("deviceready", function() {
			if ($cordovaNetwork.isOnline()) {
				$UserDefaluts.getValue("USERID", function(res) {
					if (res == null) {
						dataService.postData("api.php/user/register", {
							app_id: $cordovaDevice.getUUID()
						}).then(function(data) {
							$UserDefaluts.setValue({
								key: "USERID",
								value: data.user_id
							})
						}, function() {
							alert("注册失败")
						})
					} else {
						$rootScope.user_id = res
					}
				})
			} else {
				$ionicPopup.alert({
					title: "网络掉线",
					okText: "OK",
				})
			}

		}, false);

		//掉线通知
		$scope.$on('$cordovaNetwork:offline', function() {
			$ionicPopup.alert({
				title: "网络掉线",
				okText: "OK",
			})
		});


		//底部导航
		$scope.previous = ""
		$scope.$on("$ionicView.beforeEnter", function(event, data) {
			var name = $state.current.name
			if (name == "tab.home" || name == "tab.meet" || name == "tab.news" || name == "tab.settings") {
				$scope.hideTabs = false
				$scope.previous = name
			} else {
				if (name == $scope.previous) {
					// $scope.hideTabs = false
					$scope.previous = ""
				} else {
					$scope.hideTabs = true
					$scope.previous = name
				}
			}
		})

		$scope.$on("$ionicView.enter", function(event, data) {
			var name = $state.current.name
			if (name == "tab.home" || name == "tab.meet" || name == "tab.news" || name == "tab.settings") {
				$scope.hideTabs = false
			} else {
				$scope.hideTabs = true
			}
		})



		$http.get('json/sideMenu.json').then(function(data) {
				$rootScope.sideData = data.data.menus
			}, function() {
				$rootScope.sideData = []
			})
			//开启关闭侧栏
		$rootScope.operateSide = function() {
				$ionicSideMenuDelegate.toggleLeft()
			}
			//barge显示
		$rootScope.show = function(barge) {
				return barge >= 1
			}
			//侧栏点击
		$scope.SideClick = function($index, model) {
			$ionicSideMenuDelegate.toggleLeft(false)
			if ($index == 0) {
				$state.go("tab.homeSideAboutMeet")
			}
			if ($index == 1) {
				$state.go("tab.homeSideSpeaker")
			}
			if ($index == 2) {
				$state.go("tab.homeSidePartners")
			}
			if ($index == 3) {
				$state.go("tab.homeSideSurveys")
			}
			if ($index == 4) {
				$state.go("tab.homeSideMsg")
			}
			if ($index == 5) {
				$state.go("ab.homeSideSetting")
			}

		}

	})
	.controller('homeCtrl', function($scope, dataService, $ionicSlideBoxDelegate, $state, $ImageBox,$timeout) {
		//轮播图
		$scope.adArr = []
			//消息滚动
		$scope.newsArr = []
		dataService.getData("api.php/index/index", {
				lang: "zh"
			}).then(function(data) {
				$scope.adArr.length = 0
				$scope.adArr = $scope.adArr.concat(data["ad"])
				$timeout(function(){
					$ionicSlideBoxDelegate.$getByHandle('homeSlide').update()
				},200)
				$scope.newsArr = data["news"]
				console.log($scope.adArr)
			}, function(data) {
				console.log(data)
			})
			//全局搜索
		$scope.globalSeacher = function() {
			console.log(11)
			$state.go("tab.homeGlobalSeacher")
		}

		//say按钮
		$scope.sayClick = function() {
				var news = $scope.newsArr[$ionicSlideBoxDelegate.$getByHandle('homeSlide').currentIndex()]
				console.log(news)
			}
			//底部模块点击
		$scope.moduleClick = function(index) {
			if (index == 0) {
				$state.go("tab.homeOneModule")
			} else if (index == 1) {
				$state.go("tab.homeTwoModule")
			} else if (index == 2) {
				$state.go("tab.homeThereModule")
			} else if (index == 3) {
				$state.go("tab.homeFourModule")
			}
		}
	})
	.controller("meetCtrl", function($rootScope, $scope, $http, $state, dataService, $ionicScrollDelegate) {
		$scope.titles = [{
				id: 1,
				title: "大会介绍",
				icon: "images/meeting/meeting_introduce.png",
				showContent: false,
				hasData: false,
				partShow:function hasData(index) {
					switch (index) {
						case 2:
							return $scope.meetMsg.dinner_time.length>=1
							break;
						case 3:
							return $scope.meetMsg.keepsake_time.length>=1
							break;
						default:
							return true
					}
				}
			}, {
				id: 2,
				title: "场馆接受",
				icon: "images/meeting/meeting_ Venue_introduce.png",
				showContent: false,
				hasData: false
			}, {
				id: 3,
				title: "酒店介绍",
				icon: "images/meeting/meeting_ hotel_introduce.png",
				showContent: false,
				hasData: false
			}, {
				id: 4,
				title: "交通指南",
				icon: "images/meeting/meeting_ traffic_introduce.png",
				showContent: false,
				hasData: false
			}]
			//加载大会介绍
		dataService.getData("api.php/guide/assembly_server").then(function(data) {
				$scope.meetMsg = data
				$scope.titles[0].hasData = true


			}, function(data) {
				alert("loading err")
			})
			//加载酒店介绍
		dataService.getData("api.php/guide/hotel").then(function(data) {
			$scope.hotels = data
			$scope.titles[2].hasData = true
		}, function() {
			alert("loading err")
		})

		$scope.meetDividerClick = function(model) {
			model.showContent = model.hasData && !model.showContent
			$ionicScrollDelegate.$getByHandle("meetScroll").resize()
			console.log($scope.hotels)
		}

	})



.controller("newsCtrl", function($rootScope, $scope, $http, $state, dataService, $ionicScrollDelegate, $timeout, $shareSDK, transferServer) {
		$scope.showInfinite = false
		$scope.page = 1
		$scope.newsArr = []
		$scope.curentCont = $ionicScrollDelegate.$getByHandle("newsScroll")
		$scope.loadData = function(more) {
				if (more) {
					$scope.page = 1 + $scope.page
				} else {
					$scope.page = 1
					$scope.newsArr.length = 0
				}

				dataService.getData("api.php/information/index", {
					p: $scope.page
				}).then(function(data) {
					if (!more) {
						var mydate = new Date()
						var hour = mydate.getHours()
						var min = mydate.getMinutes()
						if (min <= 9) {
							$scope.currentTime = hour.toString() + ":0" + min.toString()
						} else {
							$scope.currentTime = hour.toString() + ":" + min.toString()
						}
					}

					$scope.newsArr = $scope.newsArr.concat(data)
					if (data.length == 0) {

						$scope.showInfinite = false
					} else {
						$timeout(function() {
							$scope.showInfinite = $scope.curentCont.getScrollView().__clientHeight <= $scope.curentCont.getScrollView().__contentHeight
						}, 1000)
					}
				}, function() {
					alert("资讯加载失败")
				}).finally(function() {
					$scope.$broadcast("scroll.refreshComplete")
					$scope.$broadcast('scroll.infiniteScrollComplete')
				})
			}
			//下拉触发事件
		$scope.loadLast = function() {
				$scope.loadData(false)
			}
			//上拉刷新
		$scope.loadMore = function() {
			$scope.loadData(true)
			console.log(2222)
		}

		//默认加载数据
		$scope.loadData(false)



		//点击事件
		$scope.newsDetail = function(model) {
				transferServer.setData("news", model)
				$state.go("tab.newsDetail")
			}
			//分享
		$scope.share = function($event, model) {
			var options = {
				platforms: [{
					platform: ShareSDKArg.PlatformType.All,
					shareType: ShareSDKArg.ContentType.Auto,
					content: model.title,
					url: model.share_url + "&isApp=-1",
					icons: "person_favicon"
				}]
			}
			$shareSDK.share(options)
			$event.stopPropagation()
		}

		//搜索框点击
		$scope.inputBegin = function() {
			$state.go("tab.newsSeaher")
			return false
		}
	})
	.controller("settingsCtrl", function($rootScope, $scope, $cordovaCamera, $shareSDK, $UserDefaluts, dataService, $ImageBox) {
		$scope.takePictrue = function() {
			$ImageBox.loadImage("http://f.hiphotos.baidu.com/image/pic/item/e1fe9925bc315c60d916f9d58ab1cb134954770d.jpg", document.getElementById("takeImagePic"))

			return;
			console.log($cordovaCamera)
			var options = {
				quality: 50,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				allowEdit: true,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 100,
				targetHeight: 100,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false,
				correctOrientation: true
			};
			$cordovaCamera.getPicture(options).then(function(imageData) {
				document.getElementById("takeImagePic").src = "data:image/jpeg;base64," + imageData;

			}, function(err) {

			});
		}
		$scope.shareAA = function() {
			alert($rootScope.user_id)
			return;
			var options = {
				navigationColor: "#F0F",
				platforms: [
					// {
					// 	platform:ShareSDKArg.PlatformType.All,
					// 	shareType:ShareSDKArg.ContentType.Auto,
					// 	content:"我走我哈酒睡觉奥萨看不上沙龙会手拉手啊 是爱上啊 ",
					// 	title:"APP_Name",
					// 	url:"http://www.lameshuang.com/meinv/juru/",
					// 	icons:["person_favicon","person_favicon"]
					// }
					{
						platform: ShareSDKArg.PlatformType.Wechat,
						subPlatform: ShareSDKArg.PlatformType.WechatSession,
						content: "分享到微信好友",
						title: "HWMBBF",
						thumbImage: "http://pic2016.ytqmx.com:82/2016/1013/44/17.jpg!960.jpg",
						url: "http://www.sas.com"
					}
				]
			}
			$shareSDK.share(options).then(function(msg) {
				alert(msg)
			}, function(msg) {
				alert(msg)
			})
		}
	})