//
//  HGUserDefaults.h
//  TestPro
//
//  Created by 朱子豪 on 2016/11/13.
//  Copyright © 2016年 朱子豪. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
@interface HGUserDefaults : CDVPlugin
-(void)setValueForKey:(CDVInvokedUrlCommand *)command;
-(void)getValue:(CDVInvokedUrlCommand *)command;
@end
