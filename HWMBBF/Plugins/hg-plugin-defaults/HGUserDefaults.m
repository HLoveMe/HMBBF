//
//  HGUserDefaults.m
//  TestPro
//
//  Created by 朱子豪 on 2016/11/13.
//  Copyright © 2016年 朱子豪. All rights reserved.
//

#import "HGUserDefaults.h"
@interface HGUserDefaults()
@property(nonatomic,strong)NSUserDefaults *defa;
@end
@implementation HGUserDefaults
-(void)pluginInitialize{
    self.defa = [NSUserDefaults standardUserDefaults];
}
-(void)setValueForKey:(CDVInvokedUrlCommand *)command{
    NSDictionary *ops = command.arguments.firstObject;
    NSString *key = ops[@"key"];
    id value = ops[@"value"];
    [self.defa setValue:value forKey:key];
    [self.defa synchronize];
}
-(void)getValue:(CDVInvokedUrlCommand *)command{
    NSString *key = command.arguments.firstObject;
    id value = [self.defa valueForKey:key];
    CDVPluginResult *res = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:value];
    [self.commandDelegate sendPluginResult:res callbackId:command.callbackId];
}
@end
