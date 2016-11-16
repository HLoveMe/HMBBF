conCtrl.controller('aboutMeetCtrl',function($state,$scope,$rootScope,$ionicTabsDelegate,$ionicNavBarDelegate){
	document.getElementById("sideAboutContent").innerText="11月23日至11月25日，第七届全球移动宽带论坛(Global Mobile Broadband Forum)将在日本东京幕张国际展览中心举行。\n\n作为年度最具影响力的MBB思想领导力盛会，全球移动宽带论坛已经成功举办过六届，伴随MBB产业发展的热点，足迹遍布挪威、德国、加拿大，英国和中国，获得了全球运营商高层和产业链合作伙伴的积极参与和高度称赞。\n\n本届全球移动宽带论坛将邀请1200多位来自管制机构、全球运营商、产业链合作伙伴、垂直行业、标准组织、行业组织、媒体和分析师等业界领袖和公司高层出席。你将聆听他们对MBB产业发展的趋势的判断和观点：运营商们在提升和保持其竞争力的同时，如何把握未来商业新机会；垂直行业领导者们将讲诉他们在视频、车联网、智能运输、机器人等新业务和新应用领域的进展，以及对移动宽带网络的诉求；运营商和垂直行业领导者们还将一起探讨如何实现跨产业合作，打造健康、双赢的产业生态环境，指引全球MBB产业的发展之路。\n\n同时，您还将在大会现场看到一系列MBB新应用展示，包括汽车、VR/AR、可穿戴式消费电子等领域，我们将用最直观的方式让你身临其境地体验到华为解决方案的创新。在外场，您还可以畅游我们为您精心打造的 'TechCity'之旅，感受全球领先的MBB解决方案和各种创新的移动应用。\n\n第七届全球移动宽带论坛，您将与这些MBB产业领袖人物一起，碰撞思想，探索未来，实现人人共享无线美好的全联接世界。"
	//顶部图片
	$scope.topImageSrc = "images/home/home_side_banner.png"
	$scope.navBack = function(){
		$ionicNavBarDelegate.back()
	}
})
.controller('partnersCtrl',function(){


})
.controller('SurveysCtrl',function(){
	
})
