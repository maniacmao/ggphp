// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var httpUtils = require("http");

var UserModel = cc.Class({  
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
        token: "xxxx",
        building_list: [],
        user_batch_list: [],
        batch_list: [],
        building_list: [],
        favorite_building_list: [],
        order_building_list: [],
        current_batch_id: 0,      
    },  
  
    statics: {  
        instance: null  
    },  
  
    // use this for initialization  
    onLoad: function () {  
    },  
      
    sync: function (json_object) { 
        if(json_object.token){
            this.token = json_object.token;
        }
        if(json_object.building_list){
            this.building_list = json_object.building_list;
        }
        if(json_object.user_batch_list){
            this.user_batch_list = json_object.user_batch_list;
        }
        if(json_object.batch_list){
            this.batch_list = json_object.batch_list;
        }
        if(json_object.favorite_building_list){
            this.favorite_building_list = json_object.favorite_building_list;
        }
        if(json_object.order_building_list){
            this.order_building_list = json_object.order_building_list;
        }
    },  

    _parseJson(data){
        var json_object = JSON.parse(data); 
        return json_object;
    },

    checkLogin: function (name, pwd, callback) {

        var err = 0;
        var json_object;
        var self = this;
        httpUtils.getInstance().httpGets('http://tp5.com/pick/index/checkLogin/name/'+name+'/pwd/'+pwd, function (data) {  
            if (data === -1) {  
                cc.log('请检查网络！');  
                err = -1;
            } else {  
                json_object = self._parseJson(data);  
                err = json_object['err'];
                self.sync(json_object)
            }  
            cc.log(json_object)
            callback(err, json_object)
        });
    }, 

    getUser: function (callback) {

        var err = 0;
        var json_object;
        var self = this;
        httpUtils.getInstance().httpGets('http://tp5.com/pick/index/getUser/token/'+self.token, function (data) {  
            if (data === -1) {  
                cc.log('请检查网络！');  
                err = -1;
            } else {  
                json_object = self._parseJson(data);  
                err = json_object['err'];
                self.sync(json_object)
            }  
            cc.log(json_object)
            callback(err, json_object)
        });
    }, 

    getBuilding: function (batch_id, callback) {

        var err = 0;
        var json_object;
        var self = this;
        httpUtils.getInstance().httpGets('http://tp5.com/pick/index/getBuilding/token/'+self.token+'/batch_id/'+batch_id, function (data) {  
            if (data === -1) {  
                cc.log('请检查网络！');  
                err = -1;
            } else {  
                json_object = self._parseJson(data);  
                err = json_object['err'];
                self.sync(json_object)
            }  
            cc.log(json_object)
            callback(err, json_object)
        });
    }, 

    addFavorite: function (building_id, callback) {

        var err = 0;
        var json_object;
        var self = this;
        httpUtils.getInstance().httpGets('http://tp5.com/pick/index/addFavorite/token/'+self.token+'/building_id/'+building_id, function (data) {  
            if (data === -1) {  
                cc.log('请检查网络！');  
                err = -1;
            } else {  
                json_object = self._parseJson(data);  
                err = json_object['err'];
                self.sync(json_object)
            }  
            cc.log(json_object)
            callback(err, json_object)
        });
    }, 

    removeFavorite: function (building_id, callback) {

        var err = 0;
        var json_object;
        var self = this;
        httpUtils.getInstance().httpGets('http://tp5.com/pick/index/removeFavorite/token/'+self.token+'/building_id/'+building_id, function (data) {  
            if (data === -1) {  
                cc.log('请检查网络！');  
                err = -1;
            } else {  
                json_object = self._parseJson(data);  
                err = json_object['err'];
                self.sync(json_object)
            }  
            cc.log(json_object)
            callback(err, json_object)
        });
    }, 

    addOrder: function (building_id, callback) {

        var err = 0;
        var json_object;
        var self = this;
        httpUtils.getInstance().httpGets('http://tp5.com/pick/index/addOrder/token/'+self.token+'/building_id/'+building_id, function (data) {  
            if (data === -1) {  
                cc.log('请检查网络！');  
                err = -1;
            } else {  
                json_object = self._parseJson(data);  
                err = json_object['err'];
                self.sync(json_object)
            }  
            cc.log(json_object)
            callback(err, json_object)
        });
    }, 

    gtFavorite: function (callback) {

        var err = 0;
        var json_object;
        var self = this;
        httpUtils.getInstance().httpGets('http://tp5.com/pick/index/gtFavorite/name/'+self.token, function (data) {  
            if (data === -1) {  
                cc.log('请检查网络！');  
                err = -1;
            } else {  
                json_object = self._parseJson(data);  
                err = json_object['err'];
                self.sync(json_object)
            }  
            cc.log(json_object)
            callback(err, json_object)
        });
    }, 

    getOrder: function (callback) {

        var err = 0;
        var json_object;
        var self = this;
        httpUtils.getInstance().httpGets('http://tp5.com/pick/index/getOrder/name/'+self.token, function (data) {  
            if (data === -1) {  
                cc.log('请检查网络！');  
                err = -1;
            } else {  
                json_object = self._parseJson(data);  
                err = json_object['err'];
                self.sync(json_object)
            }  
            cc.log(json_object)
            callback(err, json_object)
        });
    }, 

});  
  
UserModel.getInstance = function () {  
    if (UserModel.instance == null) {  
        UserModel.instance = new UserModel();  
    }  
    return UserModel.instance;  
};