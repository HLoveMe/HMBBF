//
//  ShareSDKBox.m
//  TestPro
//
//  Created by 朱子豪 on 2016/11/4.
//  Copyright © 2016年 朱子豪. All rights reserved.
//

#import "HGShareSDKBox.h"
#import "HGPlatform.h"
#import "UIColor+NSString.h"
#import "NSDictionary+Argument.h"


@implementation HGShareOptions
+(HGShareOptions *)optionsWith:(CDVInvokedUrlCommand*)command{
    HGShareOptions *options = [HGShareOptions new];
    NSDictionary * pars = command.arguments[0];
    
    options.navigationColor = ((NSString *)pars[@"navigationColor"]).hexString;
    //    .....
    options.platforms = [HGPlatform platformsWith:pars[@"platforms"]];;
    NSString *preStr = [NSString stringWithFormat:@"platform = 999"];
    NSPredicate * pre = [NSPredicate predicateWithFormat:preStr];
    
    [options setValue:@([options.platforms filteredArrayUsingPredicate:pre].count>=1) forKey:@"isAllPlatform"];
    
    return options;
}
@end

@interface HGShareSDKBox()

@end
@implementation HGShareSDKBox

-(void)share:(CDVInvokedUrlCommand *)command{
    //主线程
    HGShareOptions *one  =[HGShareOptions optionsWith:command];
    //设置样式
    [SSUIEditorViewStyle setiPhoneNavigationBarBackgroundColor:one.navigationColor];
    //[SSUIEditorViewStyle setContentViewBackgroundColor:one.editbackColor];
    
    
    NSMutableDictionary *par = [NSMutableDictionary dictionary];
    [par SSDKEnableUseClientShare];
    if(one.platforms.count == 0){
        [self resultSend:@"not know platforms" success:CDVCommandStatus_ERROR com:command];
        return ;
    }
    
    //全平台
    if(one.isAllPlatform){
        HGAllPlatform  *plat = (HGAllPlatform  *)one.platforms.lastObject;
        if(plat.errorMsg){
            [self resultSend:plat.errorMsg success:CDVCommandStatus_ERROR com:command];
            return ;
        }
        if(plat.icons.count==0){
            if(plat.shareType == SSDKContentTypeAuto ||  plat.shareType == SSDKContentTypeImage){
                [self resultSend:@"share contains image , but args not image" success:CDVCommandStatus_ERROR com:command];
                return;
            }
        }
        [plat shareSetUp:par];
        
    }else{
        for(HGPlatform *plt in one.platforms){
            [plt shareSetUp:par];
        }
    }
    [ShareSDK showShareActionSheet:nil items:nil shareParams:par onShareStateChanged:^(SSDKResponseState state, SSDKPlatformType platformType, NSDictionary *userData, SSDKContentEntity *contentEntity, NSError *error, BOOL end) {
        [self resultDeal:state msg:error com:command];
    }];
}
-(void)resultSend:(NSString *)msg success:(CDVCommandStatus)statu com:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:statu messageAsString:msg] callbackId:command.callbackId];
}
-(void)resultDeal:(SSDKResponseState)state msg:(NSError *)err com:(CDVInvokedUrlCommand*)command{
    switch (state) {
        case SSDKResponseStateSuccess:{
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Success"] callbackId:command.callbackId];
        }
        break;
        case SSDKResponseStateFail:{
            NSString *con = [NSString stringWithFormat:@"Fail : %@",err.description];
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:con] callbackId:command.callbackId];
        }
        case SSDKResponseStateCancel:{
            [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Fail Cancel"] callbackId:command.callbackId];
        }
        default:
        
        break;
    }
    
}
@end


