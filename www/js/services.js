angular.module("MBBF.customDirective",[])
.directive("homeModule",function(){
	return {
		restrict:"AE",
		template:'<div class="row" style="height:50%"><div class="col col-33 col-offset-66" ><img src="{{hImageSrc}}" style="width:100%;height:80%"></div></div><div class="row" style="height:40%"><div class="col" style="font-size:28px">{{hHitle}}</div></div><div class="row" style="20%"><div class="col"><div  style="height:2px;background:#57F"><div style="height:100%;width:20px;background:#666"></div></div></div></div>',
		repalce:true,
		scope:{
			hHitle:"@title",
			hImageSrc:"@",
		}

	}
})
