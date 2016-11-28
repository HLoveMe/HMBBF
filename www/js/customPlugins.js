angular.module('customPlugins', [])
    .factory('$shareSDK', function($q, $window) {
        return {
            share: function(options) {
                var ova = $q.defer()
                share.shareSDK.share(options, function(res) {
                    ova.resolve(res)
                }, function(res) {
                    ova.reject(res)
                })
                return ova.promise;
            }
        }
    })
    .factory("$UserDefaluts", function() {
        return {
            getValue: function(key, successFun) {
                UserDefaults.getValue(key, successFun)
            },
            setValue: function(options) {
                UserDefaults.setValue(options)
            }

        }
    })
    .factory("$ImageBox", function($q) {
        return {
            loadImage: function(url, ele) {
                var def = $q.defer()
                ImageBox.loadImage(url, function(data) {
                    if (data == "Not Result") {
                        return; }
                    ele.src = "data:image/jpeg;base64," + data
                    def.resolve()
                })
                return def.promise
            },
            clear: function() {
                var def = $q.defer()
                ImageBox.clear(function(res) {
                    def.resolve(res)
                })
                return def.promise
            }
        }
    })
    .factory("$DataManager", function($q) {
        return {
            size: function() {
                var def = $q.defer()
                DataManager.size(function(size) {
                    def.resolve(size)
                })
                return def.promise
            },
            operation: function(ops, type) {
                var def = $q.defer()
                switch (type) {
                    case 0:
                        //打开数据库
                        DataManager.openBase(function(msg) {
                            def.resolve(msg)
                        }, function(msg) {
                            def.reject(msg)
                        })
                        break;
                    case 1:
                        //关闭数据库
                        DataManager.closeBase(function(msg) {
                            def.resolve(msg)
                        }, function(msg) {
                            def.reject(msg)
                        })
                        break;
                    case 2:
                        //保存数据
                        DataManager.saveObjects(ops, function(msg) {
                            def.resolve(msg)
                        }, function(msg) {
                            def.reject(msg)
                        })
                        break;
                    case 3:
                        //删除数据
                        DataManager.delete(ops, function(msg) {
                            def.resolve(msg)
                        }, function() {
                            def.reject(msg)
                        })
                        break;
                    case 4:
                        //更新数据
                        DataManager.update(ops, function(msg) {
                            def.resolve(msg)
                        }, function(msg) {
                            def.reject(msg)
                        })
                        break;
                    case 5:
                        //查找数据
                        DataManager.select(ops, function(msg) {
                            def.resolve(msg)
                        }, function() {
                            def.reject(msg)
                        })
                        break;
                    case 6:
                        //删除表
                        DataManager.removeTable(ops, function(msg) {
                            def.resolve(msg)
                        }, function() {
                            def.reject(msg)
                        })
                        break;
                    case 7:
                        //  清除数据库文件
                        DataManager.removeBase(function(msg) {
                            def.resolve(msg)
                        }, function() {
                            def.reject(msg)
                        })
                        break;
                }
                return def.promise
            }
        }
    })
