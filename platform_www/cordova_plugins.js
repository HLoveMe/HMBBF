cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-actionsheet.ActionSheet",
        "file": "plugins/cordova-plugin-actionsheet/www/ActionSheet.js",
        "pluginId": "cordova-plugin-actionsheet",
        "clobbers": [
            "window.plugins.actionsheet"
        ]
    },
    {
        "id": "cordova-plugin-camera.Camera",
        "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "id": "cordova-plugin-camera.CameraPopoverOptions",
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "id": "cordova-plugin-camera.camera",
        "file": "plugins/cordova-plugin-camera/www/Camera.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "id": "cordova-plugin-camera.CameraPopoverHandle",
        "file": "plugins/cordova-plugin-camera/www/ios/CameraPopoverHandle.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    },
    {
        "id": "cordova-plugin-console.console",
        "file": "plugins/cordova-plugin-console/www/console-via-logger.js",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "console"
        ]
    },
    {
        "id": "cordova-plugin-console.logger",
        "file": "plugins/cordova-plugin-console/www/logger.js",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "cordova.logger"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-network-information.network",
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "id": "cordova-plugin-network-information.Connection",
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "hg-plugin-dataBase.dataManager",
        "file": "plugins/hg-plugin-dataBase/www/dataBase.js",
        "pluginId": "hg-plugin-dataBase",
        "clobbers": [
            "DataManager"
        ]
    },
    {
        "id": "hg-plugin-dataBase.Connect",
        "file": "plugins/hg-plugin-dataBase/www/connect.js",
        "pluginId": "hg-plugin-dataBase",
        "clobbers": [
            "ConnectArgs"
        ]
    },
    {
        "id": "hg-plugin-defaults.UserDefaults",
        "file": "plugins/hg-plugin-defaults/www/UserDefaults.js",
        "pluginId": "hg-plugin-defaults",
        "clobbers": [
            "UserDefaults"
        ]
    },
    {
        "id": "hg-plugin-imageBox.HGImageBox",
        "file": "plugins/hg-plugin-imageBox/www/HGImageBox.js",
        "pluginId": "hg-plugin-imageBox",
        "clobbers": [
            "ImageBox"
        ]
    },
    {
        "id": "hg-plugin-share.ShareSDK.ShareSDKArg",
        "file": "plugins/hg-plugin-share.ShareSDK/www/ShareSDKConstants.js",
        "pluginId": "hg-plugin-share.ShareSDK",
        "clobbers": [
            "ShareSDKArg"
        ]
    },
    {
        "id": "hg-plugin-share.ShareSDK.ShareSDK",
        "file": "plugins/hg-plugin-share.ShareSDK/www/ShareSDKBox.js",
        "pluginId": "hg-plugin-share.ShareSDK",
        "clobbers": [
            "share.shareSDK"
        ]
    },
    {
        "id": "ionic-plugin-keyboard.keyboard",
        "file": "plugins/ionic-plugin-keyboard/www/ios/keyboard.js",
        "pluginId": "ionic-plugin-keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ],
        "runs": true
    },
    {
        "id": "cordova-plugin-file-opener2.FileOpener2",
        "file": "plugins/cordova-plugin-file-opener2/www/plugins.FileOpener2.js",
        "pluginId": "cordova-plugin-file-opener2",
        "clobbers": [
            "cordova.plugins.fileOpener2"
        ]
    },
    {
        "id": "cordova-plugin-vibration.notification",
        "file": "plugins/cordova-plugin-vibration/www/vibration.js",
        "pluginId": "cordova-plugin-vibration",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    },
    {
        "id": "org.pbernasconi.progressindicator.ProgressIndicator",
        "file": "plugins/org.pbernasconi.progressindicator/www/progressIndicator.js",
        "pluginId": "org.pbernasconi.progressindicator",
        "clobbers": [
            "ProgressIndicator"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-actionsheet": "2.3.1",
    "cordova-plugin-compat": "1.0.0",
    "cordova-plugin-camera": "2.3.0",
    "cordova-plugin-console": "1.0.4",
    "cordova-plugin-device": "1.1.3",
    "cordova-plugin-network-information": "1.3.0",
    "cordova-plugin-splashscreen": "4.0.0",
    "cordova-plugin-statusbar": "2.2.0",
    "cordova-plugin-whitelist": "1.3.0",
    "hg-plugin-dataBase": "0.01",
    "hg-plugin-defaults": "0.01",
    "hg-plugin-imageBox": "0.01",
    "hg-plugin-share.ShareSDK": "0.01",
    "ionic-plugin-keyboard": "2.2.1",
    "cordova-plugin-file-opener2": "2.0.3",
    "cordova-plugin-vibration": "2.1.2",
    "org.pbernasconi.progressindicator": "1.1.0"
};
// BOTTOM OF METADATA
});