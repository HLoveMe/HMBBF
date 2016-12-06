angular.module('MBBF.service', [])
    .factory('dataService', function($http, $q) {
        var client = {
            mainUrl: "http://huawei.vr68.com:80",
        }
        client.dataSerce = function(url, methodName, pars) {
            var defer = $q.defer()
            var httpPro = {}
            if (methodName == "GET") {
                httpPro = $http({
                    url: client.mainUrl + "/" + url,
                    method: methodName,
                    params: pars,
                    timeout: 7000
                })
            } else if (methodName == "POST") {
                httpPro = $http({
                    url: client.mainUrl + "/" + url,
                    data: pars,
                    method: "POST",
                    timeout: 7000,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                })
            }
            httpPro.success(function(data) {
                defer.resolve(data.data)
            }).error(function(data) {
                defer.reject(data)
            });
            return defer.promise

        }
        client.getData = function(url, par) {
            return client.dataSerce(url, "GET", par)
        }
        client.postData = function(url, par) {
            return client.dataSerce(url, "POST", par)
        }

        return client
    })
    .factory('transferServer', function($rootScope) {
        // 下载控制器传递model
        var dataPool = {
            data: {},
            getData: function(key, isRemove) {
                res = dataPool.data[key]
                if (isRemove != undefined & isRemove == true) {
                    delete dataPool.data[key]
                }
                return res
            },
            setData: function(key, value) {
                dataPool.data[key] = value
            }
        }
        $rootScope.$on('dataPool.destroyData', function(event, key) {
            delete dataPool.data[key]
        });
        return dataPool
    })
    .factory("$inputFiledDelegate", function($timeout) {
        var inputPool = {
            count: 0,
            data: {},
            setModule: function(inputModel, key) {
                if (typeof(key) == "string") {
                    inputPool.data[key] = inputModel
                } else {
                    inputPool.data[inputPool.count.toString()] = inputModel
                }
                inputPool.count += 1
            },
            getModule: function(key) {
                if (typeof(key) == "string") {
                    return inputPool.data[key]
                } else {
                    var key = ""
                    for (i in inputPool.data) {
                        key = i
                    }
                    return inputPool.data[key]
                }
            }
        }

        var server = {
            addModule: function(ele, key) {
                //ele   <input-module>
                //key  delegate-handle
                //模块对象
                var module = {
                        inputTag: ele.getElementsByTagName("input")[0],
                        beginFirstResopnse: function() {
                            $timeout(function() {
                                module.inputTag.focus()
                            }, 200)
                        },
                        resignFirstResopnse: function() {
                            $timeout(function() {
                                module.inputTag.blur()
                            }, 200)
                        },
                        getContent: function() {
                            return module.inputTag.value
                        },
                        setContent: function(text, flag) {
                            module.inputTag.value = text
                            if (flag) {
                                module.beginFirstResopnse()
                            }
                        }
                    }
                    //保存模块对象
                inputPool.setModule(module, key)
            },
            $getByHandle: function(key) {
                return inputPool.getModule(key)
            },
            getContent: function() {
                //默认获取最后一个模块
                return server.$getByHandle(0).getContent()
            },
            setContent: function(text, flag) {
                console.log(server.$getByHandle(0))
                server.$getByHandle(0).setContent(text, flag)
            },

            beginFirstResopnse: function() {
                server.$getByHandle(0).beginFirstResopnse()
            },
            resignFirstResopnse: function() {
                server.$getByHandle(0).resignFirstResopnse()
            }
        }
        return server
    })
    .factory('$navItemDelegate', function() {
        var statu = {
            _current: {},
            currentIndex: function() {
                return statu._current._scope.__currentIndex
            },
            setIndex: function(index) {
                statu._current._scope.itemClick(statu._current._data[index])
            },
            currentStatu: function() {
                return {
                    beforIndex: statu._current._beforIndex,
                    currentIndex: statu._current._currentIndex,
                    data: statu._current._currentModel
                }
            },
            setData: function(data) {
                //有问题
                statu._current._scope.data = data
            }
        }
        return statu
    })