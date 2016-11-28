angular.module('MBBF.routes', [])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/tab/home');

        $stateProvider
            .state("tab", {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })
            .state("tab.home", {
                url: "/home",
                views: {
                    "tab-home": {
                        templateUrl: "templates/home.html",
                        controller: "homeCtrl"
                    }
                }
            })
            .state("tab.homeGlobalSeacher", {
                url: "/globalSeacher",
                views: {
                    "tab-home": {
                        templateUrl: "templates/home/globalSeacher.html",
                        controller: "globalSeacherCtrl"
                    }
                }
            })
            //大会议程
            .state("tab.homeOneModule", {
                url: "/home-oneModule",
                views: {
                    "tab-home": {
                        templateUrl: "templates/home/oneModuleAgenda.html",
                        controller: "oneModuleAgendaCtrl"
                    }
                }
            })
            //议程详情
            .state("tab.homeAgendaDetail", {
                url: "/agenda-detail",
                views: {
                    "tab-home": {
                        templateUrl: "templates/home/agendaDetail.html",
                        controller: "agendaDetailCtrl"
                    }
                }
            })

        //视频
        .state("tab.homeTwoModule", {
                url: "/home-twoModule",
                views: {
                    "tab-home": {
                        templateUrl: "templates/home/twoModuleVideo.html",
                        controller: "twoModuleVideoCtrl"
                    }
                }
            })
            //嘉宾
            .state("tab.homeThereModule", {
                url: "/home-thereModule",
                views: {
                    "tab-home": {
                        templateUrl: "templates/home/thereModuleGuest.html",
                        controller: "thereModuleGuestCtrl"
                    }
                }
            })
            //嘉宾详情
            .state("tab.guestDetail", {
                url: "/guestDetail",
                views: {
                    "tab-home": {
                        templateUrl: "templates/home/guestDetail.html",
                        controller: "guestDetailCtrl"
                    }
                }
            })
            //展区
            .state("tab.homeFourModule", {
                url: "/home-fourModule",
                views: {
                    "tab-home": {
                        templateUrl: "templates/home/fourModuleExhibition.html",
                        controller: "fourModuleExhibitionCtrl"
                    }
                }
            })
            /////////////////////////会务/////////////////////////////
            .state("tab.meet", {
                url: "/meet",
                views: {
                    "tab-meet": {
                        templateUrl: "templates/meet.html",
                        controller: "meetCtrl"
                    }
                }
            })
            /////////////////////////新闻/////////////////////////////
            .state("tab.news", {
                url: "/news",
                views: {
                    "tab-news": {
                        templateUrl: "templates/news.html",
                        controller: "newsCtrl"
                    }
                }
            })
            .state("tab.newsDetail", {
                url: "/news-detail",
                views: {
                    "tab-news": {
                        templateUrl: "templates/news/news-detail.html",
                        controller: "newsDetailCtrl"
                    }
                }
            })
            .state("tab.newsSeaher", {
                url: "/news-seacher",
                views: {
                    "tab-news": {
                        templateUrl: "templates/news/seacher.html",
                        controller: "newsSeacherCtrl"
                    }
                }

            })
            /////////////////////设置/////////////////////////////////
            .state("tab.settings", {
                url: "/settings",
                views: {
                    "tab-settings": {
                        templateUrl: "templates/settings.html",
                        controller: "settingsCtrl"
                    }
                }
            })
            .state("tab.settingMsgCtrl", {
                url: "/sysMsg",
                views: {
                    "tab-settings": {
                        templateUrl: "templates/settings/messages.html",
                        controller: "sysMsgCtrl"
                    }
                }
            })
            /////////////////////侧栏/////////////////////////////////
            .state("tab.homeSideAboutMeet", {
                url: "/aboutMeet",
                views: {
                    "tab-home": {
                        templateUrl: "templates/sides/aboutMeet.html",
                        controller: "aboutMeetCtrl"
                    }
                }
            })
            .state("tab.homeSideSpeaker", {
                url: "/speakers",
                views: {
                    "tab-home": {
                        templateUrl: "templates/home/thereModuleGuest.html",
                        controller: "thereModuleGuestCtrl"
                    }
                }
            })
            .state("tab.homeSidePartners", {
                url: "/partners",
                views: {
                    "tab-home": {
                        templateUrl: "templates/sides/partners.html",
                        controller: "partnersCtrl"
                    }
                }
            })
            .state("tab.homeSideSurveys", {
                url: "/surveys",
                views: {
                    "tab-home": {
                        templateUrl: "templates/sides/surveys.html",
                        controller: "SurveysCtrl"
                    }
                }
            })
            .state("tab.homeSideMsg", {
                url: "/sysMsg",
                views: {
                    "tab-home": {
                        templateUrl: "templates/settings/messages.html",
                        controller: "sysMsgCtrl"
                    }
                }
            })
            .state("tab.homeSideSetting", {
                url: "/settings",
                views: {
                    "tab-home": {
                        templateUrl: "templates/settings.html",
                        controller: "settingsCtrl"
                    }
                }
            })

    });
