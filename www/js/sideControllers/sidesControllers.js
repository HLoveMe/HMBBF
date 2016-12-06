conCtrl.controller('aboutMeetCtrl', function($state, $scope, $rootScope, $ionicTabsDelegate, $ionicNavBarDelegate) {
        document.getElementById("sideAboutContent").innerText = "11月23日至11月25日，第七届全球移动宽带论坛(Global Mobile Broadband Forum)将在日本东京幕张国际展览中心举行。\n\n作为年度最具影响力的MBB思想领导力盛会，全球移动宽带论坛已经成功举办过六届，伴随MBB产业发展的热点，足迹遍布挪威、德国、加拿大，英国和中国，获得了全球运营商高层和产业链合作伙伴的积极参与和高度称赞。\n\n本届全球移动宽带论坛将邀请1200多位来自管制机构、全球运营商、产业链合作伙伴、垂直行业、标准组织、行业组织、媒体和分析师等业界领袖和公司高层出席。你将聆听他们对MBB产业发展的趋势的判断和观点：运营商们在提升和保持其竞争力的同时，如何把握未来商业新机会；垂直行业领导者们将讲诉他们在视频、车联网、智能运输、机器人等新业务和新应用领域的进展，以及对移动宽带网络的诉求；运营商和垂直行业领导者们还将一起探讨如何实现跨产业合作，打造健康、双赢的产业生态环境，指引全球MBB产业的发展之路。\n\n同时，您还将在大会现场看到一系列MBB新应用展示，包括汽车、VR/AR、可穿戴式消费电子等领域，我们将用最直观的方式让你身临其境地体验到华为解决方案的创新。在外场，您还可以畅游我们为您精心打造的 'TechCity'之旅，感受全球领先的MBB解决方案和各种创新的移动应用。\n\n第七届全球移动宽带论坛，您将与这些MBB产业领袖人物一起，碰撞思想，探索未来，实现人人共享无线美好的全联接世界。"
            //顶部图片
        $scope.topImageSrc = "images/home/home_side_banner.png"
        $scope.navBack = function() {
            $ionicNavBarDelegate.back()
        }
    })
    .controller('partnersCtrl', function($scope, $rootScope, dataService, $ionicListDelegate) {
        $scope.partner = []
        dataService.getData("api.php/assembly/partner").then(function(data) {
            $scope.partner = data
        }, function() {
            alert("合作伙伴加载失败")
        })
        $scope.showItem = function(item) {
            item.showItem = !item.showItem
            $ionicListDelegate.$getByHandle("partnerHandle").resize();
        }
        $scope.cellHeight = function(item) {
            return parseInt((item.partner.length + 3 - 1) / 3) * 50
        }
    })
    .controller('SurveysCtrl', function($scope, $rootScope, $state, dataService, transferServer) {
        $scope.papers = []
        dataService.getData("api.php/user/paper", {
            user_id: $rootScope.user_id
        }).then(function(data) {
            $scope.papers=data

        }, function() {

        })

        $scope.paperClick = function(model) {
            transferServer.setData("paperModel", model)
            $state.go("tab.homeSidesurveyDetail")
        }
    })
    .controller('surveyDetailCtrl', function($scope, $rootScope, transferServer, dataService,$ionicLoading) {
        //所有问题
        $scope.questions = []
            //哪个问卷
        var paper = transferServer.getData("paperModel", true)

        function changeAnswer(questions) {
            angular.forEach(questions, function(one) {
                var ans = one.answer;
                var res = []
                angular.forEach(ans, function(an) {
                    if (one.type == 3) {
                        res.push({
                            answer: an,
                            select: ""
                        })
                    } else {
                        res.push({
                            answer: an,
                            select: false
                        })
                    }
                })
                one.answer = res
            })
            return questions
        }

        dataService.getData("api.php/user/paper_info", {
                id: paper.id
            }).then(function(data) {
                console.log(data)
                $scope.questions=changeAnswer(data)
            }, function() {

            })
            //单选
        $scope.radioSelect = function(question, answer) {
                for (var i = 0; i < question.answer.length; i++) {
                    question.answer[i].select = false
                }
                answer.select = true
            }
            //多选
        $scope.checkSelect = function(question, answer) {
            answer.select = !answer.select
        }
        //提交
        $scope.submitPaper = function(){
            if(typeof $scope.questions.name == "undefined"){
                $ionicLoading.show({
                   template:"输入名称",
                   noBackdrop:true,
                   duration:750
                });
                return;
            }
            if(typeof $scope.questions.email == "undefined"){
                $ionicLoading.show({
                   template:"输入邮箱",
                   noBackdrop:true,
                   duration:750
                });
                return;
            }
            var result={}
            angular.forEach($scope.questions,function(one){
                if(one.type=="1"){
                    for (var i = 0 ;i<one.answer.length;i++){
                        if(one.answer[i].select){
                            result[one.id.toString()] = i+1       
                            break;
                        }
                    }
                }else if(one.type=="2"){
                    var res =[]
                    for (var i = 0 ;i<one.answer.length;i++){
                        if(one.answer[i].select){
                            res.push(i+1)     
                        }
                    }
                    result[one.id.toString()] = res
                }else{
                    console.log(document.getElementById("ID"+one.id.toString()));
                    var con = document.getElementById("ID"+one.id.toString()).innerHTML;
                    if(typeof con != "undefined"){
                        result[one.id.toString()] = con
                    }
                    
                }
            })
            $ionicLoading.show({
                template:'<ion-spinner class="spinner-assertive" icon="bubbles"></ion-spinner><div>正在上传</div>',
                noBackdrop:true,
                hideOnStateChange:true
            })
            dataService.postData("api.php/user/paper_answer",{
                paper_id:paper.id,
                user_id:$rootScope.user_id,
                user_name:$scope.questions.name,
                email:$scope.questions.email,
                answer:JSON.stringify(result) 
            }).then(function(){
                $ionicLoading.hide()
                $ionicLoading.show({
                   template:"提交成功",
                   noBackdrop:true,
                   duration:750
                });
            }, function(msg){
                $ionicLoading.hide()
                $ionicLoading.show({
                   template:msg.msg,
                   noBackdrop:true,
                   duration:750
                });
            })
        }
    })
