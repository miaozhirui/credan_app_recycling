

#import "ToSafari.h"
#import <Cordova/CDVPlugin.h>

@implementation ToSafari

- (void)toSafari:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* url = [command.arguments objectAtIndex:0];

    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]];

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
