// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var httpUtils = cc.Class({  
    extends: cc.Component,  
  
    properties: {  
        // foo: {  
        //    default: null,      // The default value will be used only when the component attaching  
        //                           to a node for the first time  
        //    url: cc.Texture2D,  // optional, default is typeof default  
        //    serializable: true, // optional, default is true  
        //    visible: true,      // optional, default is true  
        //    displayName: 'Foo', // optional  
        //    readonly: false,    // optional, default is false  
        // },  
        // ...  
    },  
  
    statics: {  
        instance: null  
    },  
  
    // use this for initialization  
    onLoad: function () {  
    },  
  
    httpGets: function (url, callback) {

        var xhr = cc.loader.getXMLHttpRequest();  
        xhr.onreadystatechange = function () {  
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {  
                var respone = xhr.responseText;  
                callback(respone);  
            }  
        };  
        xhr.open("GET", url, true);  
        if (cc.sys.isNative) {  
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");  
        }  
  
        // note: In Internet Explorer, the timeout property may be set only after calling the open()  
        // method and before calling the send() method.  
        xhr.timeout = 5000;// 5 seconds for timeout  
  
        xhr.send();  
    },  
  
    httpPost: function (url, params, callback) {  
        var xhr = cc.loader.getXMLHttpRequest();  
        xhr.onreadystatechange = function () {  
            cc.log('xhr.readyState='+xhr.readyState+'  xhr.status='+xhr.status);  
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {  
                var respone = xhr.responseText;  
                callback(respone);  
            }else{  
                  callback(-1);  
            }  
        };  
        xhr.open("POST", url, true);  
        if (cc.sys.isNative) {  
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");  
        }  
  
        // note: In Internet Explorer, the timeout property may be set only after calling the open()  
        // method and before calling the send() method.  
        xhr.timeout = 5000;// 5 seconds for timeout  
  
        xhr.send(params);  
    },  

});  
  
httpUtils.getInstance = function () {  
    if (httpUtils.instance == null) {  
        httpUtils.instance = new httpUtils();  
    }  
    return httpUtils.instance;  
};  



httpUtils.test = function(){
        httpUtils.getInstance().httpGets('http://tp5.com/pick/index/checklogin/name/13968021231/pwd/123456', function (data) {  
            if (data === -1) {  
                cc.log('请检查网络！');  
            } else {  
                var json_object = JSON.parse(data);  
                if (json_object['err'] === 0) {  
                    cc.log('发送成功');  
                } else {  
                    cc.log('发送失败' + ':' + eval("'" + jsonD['message'] + "'"));  
                }  
                cc.log(json_object)
            }  
        }); 
    }