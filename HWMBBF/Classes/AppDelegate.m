/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  AppDelegate.m
//  HelloCordova
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"
#import <ShareSDK/ShareSDK.h>
#import <ShareSDKConnector/ShareSDKConnector.h>
#import "WXApi.h"


@implementation AppDelegate

- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    self.viewController = [[MainViewController alloc] init];
    //注册分享
    [ShareSDK registerApp:@"1746b65c31b3a" activePlatforms:@[@(SSDKPlatformTypeWechat),
                                                             @(SSDKPlatformTypeLinkedIn),
                                                             @(SSDKPlatformTypeTwitter)
                                                             ] onImport:^(SSDKPlatformType platformType) {
                                                                 switch (platformType) {
                                                                     case SSDKPlatformTypeWechat:
                                                                         [ShareSDKConnector connectWeChat:[WXApi class]];
                                                                         break;
                                                                         
                                                                     default:
                                                                         break;
                                                                 }
                                                             } onConfiguration:^(SSDKPlatformType platformType, NSMutableDictionary *appInfo) {
                                                                 switch (platformType) {
                                                                     case SSDKPlatformTypeWechat:
                                                                         [appInfo SSDKSetupWeChatByAppId:@"wx22ba77e9909bcb62" appSecret:@"ff22e0979d487f723310eb355647ffc5"];
                                                                         break;
                                                                     case SSDKPlatformTypeTwitter:
                                                                         [appInfo SSDKSetupTwitterByConsumerKey:@"TW8Z3oKkhVgMe7wBR49N20Lt1" consumerSecret:@"vLYNsIz5XWlIsetq6zJzfIY5WJH8qYxQWODqCJX2SOkU4izJ8t" redirectUri:@"http://www.spacecg.cn"];
                                                                         break;
                                                                     case SSDKPlatformTypeLine:
                                                                         [appInfo SSDKSetupLinkedInByApiKey:@"81w5wf1miifaec" secretKey:@"E08xnUqxHNHfIwZD" redirectUrl:@"http://www.spacecg.cn"];
                                                                         break;
                                                                     default:
                                                                         break;
                                                                 }
                                                             }];
    
    
    
    
    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

@end
