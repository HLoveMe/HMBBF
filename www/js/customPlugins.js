angular.module('customPlugins', [])
.factory('$shareSDK',function($q,$window){
	return {
		share:function(options){
			var ova = $q.defer()
			share.shareSDK.share(options,function(res){
				ova.resolve(res)
			},function(res){
				ova.reject(res)
			})
			return ova.promise;
		}
	}
})
.factory("$UserDefaluts",function(){
	return {
		getValue:function(key,successFun){
			UserDefaults.getValue(key,successFun)
		},
		setValue:function(options){
			UserDefaults.setValue(options)
		}

	}
})
.factory("$ImageBox",function($q){
	return {
		loadImage:function(url,ele){
			ImageBox.loadImage(url,function(data){
				ele.src = "data:image/jpeg;base64," + data
			})
		},
		clear:function(){
			var def = $q.defer()
			ImageBox.clear(function(res){
				ova.resolve(res)
			})
			return res
		}
	}
})

