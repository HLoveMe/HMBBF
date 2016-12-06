cordova.define("hg-plugin-defaults.UserDefaults", function(require, exports, module) {
var exec = require('cordova/exec')

var defalut = {}
               
defalut.setValue = function(options){
     exec(null,null,"HGDefaults","setValueForKey",[options])
}
defalut.getValue = function(key,sucFun){
     exec(sucFun,null,"HGDefaults","getValue",[key])
}

module.exports = defalut
});
