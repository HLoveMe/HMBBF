angular.module('MBBF.tags', [])
	.directive("homeModule", function() {
		return {
			restrict: "EA",
			template: '<div class="row" style="height:10%"></div><div class="row" style="height:40%"><div class="col col-20" ></div><div class="col col-30" ></div><div class="col col-40" style="width:50%;height:100%"><img src="{{imgSrc}}" style="background:#666;height:100%;width:100%"></div><div class="col col-10" ></div></div><div class="row" style="height:30%;font-size:28px;"><div class="col col-5"></div><div class="col col-66 col-center">{{title}}</div></div><div class="row" style="height:20%"><div class="col  col-10" style="height: 2px;"></div><div class="col  col-10" style="height: 2px;background:#F00"></div><div class="col " style="height: 2px;background:#FF0"></div></div>',
			repalce: true,
			scope: {
				title: "@",
				imgSrc: "@"
			}
		}
	})
	.directive("meetDivider", function() {
		return {
			restrict: "EA",
			template: '<span class="item item-divider"><div class="row" style="height: 100%"><div class="col col-5"></div><div class="col col-10 col-center"><img src = "{{model.icon}}" style="width:20px;height:20px;" /></div><div class="col col-66 col-center" style="font-size:20px">{{model.title}}</div></div></span>',
			repalce: true,
			scope: {
				model: "="
			}
		}
	})
	.directive("async", function($ImageBox, $ionicPlatform) {
		return {
			restrict: "A",
			scope: {
				src: "=",
				ngSrc: "="
			},
			link: function(scope, element, attrs) {
				var img = element[0]

				function load() {
					scope.$watch('src', function(newValue, oldValue, scope) {
						if (typeof newValue != "undefined") {
							img.src = ""

							$ImageBox.loadImage(newValue, img)
						}
					})
					scope.$watch('ngSrc', function(newValue, oldValue, scope) {
						if (typeof newValue != "undefined") {
							img.src = ""

							$ImageBox.loadImage(newValue, img)
						}
					})

				}
				if (typeof ImageBox == "undefined") {
					$ionicPlatform.ready(function() {
						load()
					})
				} else {
					load()
				}


			}
		}
	})
	.directive('inputModule', function($timeout, $inputFiledDelegate) {
		return {
			restrict: "EA",
			template: '<li class="list item-input" id="{{delegateHandle}}" style="padding-left:5px;padding-right:5px;height:{{height}}"><div class="item-input-wrapper"><i class="icon ion-ios-search" ng-if="showIcon"></i><input  type="text" placeholder="{{placeholder}}" style="padding:0px;margin:0px;height:{{height * 0.9}};font-size:{{fontsize}}px;padding-left:5px;padding-right:5px;padding-top:0px;{{inputstyle}}" ng-model="$inputContent" ng-keyup="inputAction($event)" ng-focus="beginInpput()" ng-blur="endInput()"/><label class="button button-small-small ion-ios-close-empty" ng-click="clear()"style="margin-left:5px" ng-if="inputing_clear"    style="background:#F00"></label></div><a class="button button-small" ng-click="rightClick2()" style="font-size:{{fontsize}}px;margin-left:4px;border:0px;background:#FFF" ng-if="inputing_button">{{cancelTitle}}</a></li>',
			repalce: true,
			scope: {
				showbutton: "@",
				showclear: "@",
				fontsize: "@",
				placeholder: "@",
				height: "@",
				cancelTitle: "@",
				delegateHandle: "@",
				inputBegin: "&",
				rightClick: "&action"
			},

			link: function(scope, element, attrs) {

				var inputTag = element[0].getElementsByTagName('input')[0]

				if (scope.delegateHandle) {
					$inputFiledDelegate.addModule(element[0], scope.delegateHandle)
				} else {
					//没设置 delegateHandle  就会使用默认key
					$inputFiledDelegate.addModule(element[0])
				}

				scope.inputing_clear = false
				scope.inputing_button = false
				scope.showIcon = true
					//提供参数默认值
				scope.cancelTitle = "Cancel"
				scope.placeholder = "Seacher"
				scope.fontsize = "15"
				scope.height = "64"
				scope.showclear = "true"
				scope.showbutton = "true"
					// scope.inputBegin = function(){return true}

				//监听键盘事件
				scope.inputAction = function($event) {
						if ($event.keyCode == 13) {
							scope.inputing_clear = false
							scope.inputing_button = false

							inputTag.blur()
							scope.$emit("input.return", scope.$inputContent)

						} else {
							if ($event.key.length == 1 || $event.keyCode == 8) {
								var statu = {
									content: scope.$inputContent,
									input: $event.keyCode == 8 ? "" : $event.key,
									isAllow: true,
									replace: ""
								}
								scope.$emit("input.progressive", statu)
								if (statu.replace.length >= 1) {
									scope.$inputContent = statu.replace
								} else {
									if (!statu.isAllow) {
										scope.$inputContent = scope.$inputContent.substring(0, scope.$inputContent.length - 1)
									}
								}

							}
						}
					}
					//得到焦点  开始输入
				scope.beginInpput = function() {

						//判断是否容许输入
						scope.begin = true

						if (scope.inputBegin) {
							var res = scope.inputBegin()
							if (res == false) {
								scope.begin = false
							}
						}
						if (scope.begin) {
							if (scope.showclear == "true") {
								scope.inputing_clear = true
							}
							if (scope.showbutton == "true") {
								scope.inputing_button = true
							}
						} else {
							inputTag.blur()
						}

					}
					//失去焦点
				scope.endInput = function() {
						scope.inputing_clear = false
						scope.inputing_button = false
					}
					//清除
				scope.clear = function() {

					scope.$inputContent = ""

					$timeout(function() {
						inputTag.focus()
					}, 200)
				}
				scope.rightClick2 = function() {
					scope.$inputContent = ""
					scope.inputing_clear = false
					scope.inputing_button = false
					scope.rightClick()
				}
			}
		}
	})