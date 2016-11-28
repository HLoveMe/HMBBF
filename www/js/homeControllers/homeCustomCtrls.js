conCtrl.controller('globalSeacherCtrl', function() {
        console.log("globalSeacherCtrl")
    })
    .controller('oneModuleAgendaCtrl', function($rootScope, $scope, dataService, $ionicScrollDelegate, transferServer, $state, $timeout, $ionicLoading) {
        $scope.dayData = [] //11-24
        $scope.showTopView = false
        $scope.currentDay = {}
        $scope.dataDic = {} //所有显示显示数据
        $scope.currentShowData = []

        $scope.seacherResult = [] //搜索结果
        $scope.keyword = " "
            //请求天数
        dataService.getData("api.php/assembly/index", {
                p: $scope.page
            }).then(function(data) {
                angular.forEach(data, function(value, key) {
                    value.backgroundColor = "#FFF"
                    $scope.dayData.push(value)

                });
                $scope.dayData[0].backgroundColor = "#49B8F0"
                $scope.showTopView = true
                $scope.currentDay = $scope.dayData[0]

                //加载某天数据
                $scope.loadMeet(1)
            }, function() {})
            //加载具体数据
        $scope.loadMeet = function(dayNum) {
                dataService.getData("api.php/assembly/theme", {
                    user_id: $rootScope.user_id,
                    day: dayNum
                }).then(function(data) {
                    $scope.dataDic[dayNum] = data
                    $scope.currentShowData = data
                }, function() {
                    alert("fail")
                }).finally(function() {
                    $ionicLoading.hide()
                })
            }
            //menuItem点击
        $scope.topDaySelect = function(model) {
                $ionicScrollDelegate.$getByHandle("AgendaList").scrollTop()
                $scope.currentDay = model
                angular.forEach($scope.dayData, function(value, key) {
                    value.backgroundColor = "#FFF"
                    if (model == value) {
                        value.backgroundColor = "#49B8F0"
                        var dayNum = parseInt(key) + 1
                        if (typeof $scope.dataDic[dayNum] == "undefined") {
                            $ionicLoading.show({
                                template: "<ion-spinner class='spinner-assertive' icon='bubbles' ></ion-spinner><div style='margin-top:10px'>Loading</div>",
                                scope: $scope,
                                hideOnStateChange: true
                            })
                            $scope.loadMeet(dayNum)
                        } else {
                            $scope.currentShowData = $scope.dataDic[dayNum]
                        }
                    }
                });
            }
            //收藏
        $scope.collectClick = function(model, $event) {

                model.is_collect = model.is_collect == "0" ? "1" : "0"
                    //服务器收藏
                dataService.postData("api.php/user/collect", {
                    user_id: $rootScope.user_id,
                    id: model.id,
                    type: 2
                }).then(function(msg) {

                }, function(msg) {

                })
                $event.stopPropagation()
            }
            //跳转
        $scope.goToDetail = function(model) {
                transferServer.setData("agenda", model)
                $state.go("tab.homeAgendaDetail")
            }
            //搜索
        $scope.loadSeacher = function() {
                if ($scope.keyword.length == 0) {
                    $scope.currentShowData = $scope.dataDic[$scope.currentDay.id]
                    return;
                }
                $scope.currentTime = $timeout(function() {
                    $scope.seacherResult.length = 0
                    var datas = $scope.dataDic[$scope.currentDay.id]
                    for (var i = 0; i < datas.length; i++) {
                        var one = datas[i]
                        if (one.type_info.indexOf($scope.keyword) >= 0) {
                            $scope.seacherResult.push(one)
                        } else if (one.theme_name.indexOf($scope.keyword) >= 0) {
                            $scope.seacherResult.push(one)
                        } else if (one.address.indexOf($scope.keyword) >= 0) {
                            $scope.seacherResult.push(one)
                        } else {
                            //搜索第一个嘉宾
                            if (one.theme_guest.length >= 1) {
                                var guest = one.theme_guest[0]
                                if (guest.company.indexOf($scope.keyword) >= 0) {
                                    $scope.seacherResult.push(one)
                                } else if (guest.guest_name.indexOf($scope.keyword) >= 0) {
                                    $scope.seacherResult.push(one)
                                } else if (guest.position.indexOf($scope.keyword) >= 0) {
                                    $scope.seacherResult.push(one)
                                }
                            }
                        }

                    }
                    $scope.currentShowData = $scope.seacherResult
                }, 0)
            }
            //取消
        $scope.cancelSeacher = function() {
            $scope.currentShowData = $scope.dataDic[$scope.currentDay.id]
        }
        $scope.$on("input.return", function($event, content) {
            $scope.keyword = content
            $scope.loadSeacher()
        })
    })
    .controller('agendaDetailCtrl', function($scope, $rootScope, transferServer, dataService) {
        $scope.model = transferServer.getData("agenda", true)
        $scope.collectClick = function() {
            $scope.model.is_collect = $scope.model.is_collect == 0 ? 1 : 0
            dataService.postData("api.php/user/collect", {
                user_id: $rootScope.user_id,
                id: $scope.model.id,
                type: 2
            }).then(function() {

            }, function() {

            })
        }

    })
    .controller('twoModuleVideoCtrl', function($scope, $rootScope, dataService) {
        dataService.getData("api.php/assembly/index").then(function(data) {
            var temp = []
            data.forEach(function(value) {
                temp.push(value.date)
            })
            $scope.dayData = temp
        })

    })
    .controller('thereModuleGuestCtrl', function($scope, dataService, transferServer, $state) {
        //嘉宾
        $scope.Speakers = []
        dataService.getData("api.php/assembly/guest").then(function(data) {
            $scope.Speakers = $scope.Speakers.concat(data)
        }, function() {
            alert(-1)
        })
        $scope.lookDetail = function(guest) {
            transferServer.setData("guest", guest)
            $state.go("tab.guestDetail")
        }
        $scope.$on("")
    })
    //嘉宾详情
    .controller('guestDetailCtrl', function($scope, $rootScope, dataService, transferServer) {
        var guest = transferServer.getData("guest", true)
        $scope.hasData = false
        dataService.getData("api.php/assembly/guest_info", {
                id: guest.id,
                user_id: $rootScope.user_id
            }).then(function(data) {
                console.log(data)
                $scope.guest = data["guest"]
                $scope.guest.showAll = false
                $scope.guest_theme = data["guest_themes"]
                $scope.hasData = true
            }, function(argument) {

            })
            //收藏
        $scope.collectClick = function() {
                $scope.guest.is_collect = $scope.guest.is_collect == "0" ? "1" : "0"
                    //服务器收藏
                dataService.postData("api.php/user/collect", {
                    user_id: $rootScope.user_id,
                    id: $scope.guest.id,
                    type: 1
                }).then(function(msg) {

                }, function(msg) {
                    console.log($scope.guest)
                    $scope.guest.is_collect = $scope.guest.is_collect == "0" ? "1" : "0"
                })

            }
            //得到显示的简介信息
        $scope.getShow = function() {
            var con = $scope.guest.info.substring(0, 48)
            if (con.length == 48) {
                return $scope.guest.info.substring(0, 48) + "..."
            } else if (con.length >= 1) {
                return con
            } else {
                return ""
            }
        }

    })

.controller('fourModuleExhibitionCtrl', function() {


})