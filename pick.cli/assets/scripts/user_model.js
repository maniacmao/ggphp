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
var CryptoJS = require("CryptoJS");

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
        user_batch_list: { default: {} },
        batch_list: { default: {} },
        building_list: { default: {} },
        favorite_building_list: { default: {} },
        order_building_list: { default: {} },
        current_batch_id: 0,  
        // http: "http://tp5.com",
        url_host: "http://47.100.30.205",
    },  
  
    statics: {  
        instance: null  
    }, 

    getCurrentBatch(){
        return this.batch_list[this.current_batch_id];
    },

    getCurrentBatchBuilding(){

        var batch_building_list = {}
        for(var key in this.building_list){
            var building = this.building_list[key];
            if(building.batch_id == this.current_batch_id){
                batch_building_list[building.id] = building;
            }
        }
        return batch_building_list;
    },

    getFavoriteBuilding(){

        var building_list = {}
        for(var key in this.favorite_building_list){
            var favorite_building = this.favorite_building_list[key];
            if(favorite_building.active){
                building_list[favorite_building.building_id] = this.building_list[favorite_building.building_id];
            }
        }
        return building_list;
    },   

    getOrderBuilding(){

        var building_list = {}
        for(var key in this.order_building_list){
            var order_building = this.order_building_list[key];
            if(order_building.active){
                building_list[order_building.building_id] = this.building_list[order_building.building_id];
            }
        }
        return building_list;
    },   

    isFavorite(building_id){
        var favorite_building = this.favorite_building_list[building_id]
        if(!favorite_building || !favorite_building.active){
            return true;
        }
        return false;
    },

    isCanAddOrder(batch_id){

        for(var key in this.order_building_list){
            var order_building = this.order_building_list[key]
            if(order_building.active && order_building.batch_id == batch_id){
                return false;
            }
        }

        var batch = this.batch_list[batch_id];
        var usr_batch = this.user_batch_list[batch_id];
        var today = new Date()
        var begin_time = new Date(batch.begin_time);
        var end_time = new Date(batch.end_time);
        if(usr_batch.is_preference){
            begin_time = new Date(batch.preference_time);
        }
        if(today<begin_time || today>end_time){
            return false;
        }
        return true;
    },

    // use this for initialization  
    onLoad: function () {  
    },  
      
    sync: function (json_object) { 

        if(json_object.token){
            
            this.token = json_object.token;
        }

        if(json_object.building_list){

            for(var i in json_object.building_list){
                var building = json_object.building_list[i];
                if(!this.building_list[building.id]){
                    this.building_list[building.id] = building;
                }
                else{
                    var new_building = this.building_list[building.id];
                    new_building.id = building.id;
                    new_building.batch_id = building.batch_id;
                    new_building.name = building.name;
                    new_building.des = building.des;
                    new_building.is_parking = building.is_parking;
                    new_building.area = building.area;
                    new_building.unit_price = building.unit_price;
                    new_building.total_price = building.total_price;
                    new_building.user_id = building.user_id;
                    new_building.favorite = building.favorite;
                }
            }
        } 
        if(json_object.user_batch_list){

            for(var i in json_object.user_batch_list){
                var user_batch = json_object.user_batch_list[i];
                if(!this.user_batch_list[user_batch.batch_id]){
                    this.user_batch_list[user_batch.batch_id] = user_batch;
                }
                else{
                    var new_user_batch = this.user_batch_list[user_batch.batch_id];
                    new_user_batch.id = user_batch.id;
                    new_user_batch.batch_id = user_batch.batch_id;
                    new_user_batch.is_preference = user_batch.is_preference;
                }
            }
        }      
        if(json_object.batch_list){

            for(var i in json_object.batch_list){
                var batch = json_object.batch_list[i];
                if(!this.batch_list[batch.id]){
                    this.batch_list[batch.id] = batch;
                }
                else{
                    var new_batch = this.batch_list[batch.id];
                    new_batch.id = batch.id;
                    new_batch.name = batch.name;
                    new_batch.des = batch.des;
                    new_batch.preference_time = batch.preference_time;
                    new_batch.begin_time = batch.begin_time;
                    new_batch.end_time = batch.end_time;
                }
            }
        }
        if(json_object.favorite_building_list){

            for(var key in this.favorite_building_list){
                var new_favorite_building = this.favorite_building_list[key];
                new_favorite_building.active = false;
            }

            for(var i in json_object.favorite_building_list){
                var favorite_building = json_object.favorite_building_list[i];
                if(!this.favorite_building_list[favorite_building.building_id]){
                    favorite_building.active = true;
                    this.favorite_building_list[favorite_building.building_id] = favorite_building;
                }
                else{
                    var new_favorite_building = this.favorite_building_list[favorite_building.building_id];
                    new_favorite_building.user_id = favorite_building.user_id;
                    new_favorite_building.building_id = favorite_building.building_id;
                    new_favorite_building.active = true;
                }
            }
        }
        if(json_object.order_building_list){

            for(var key in this.order_building_list){
                var new_order_building = this.order_building_list[key];
                new_order_building.active = false;
            }

            for(var i in json_object.order_building_list){
                var order_building = json_object.order_building_list[i];
                if(!this.order_building_list[order_building.building_id]){
                    order_building.active = true;
                    this.order_building_list[order_building.building_id] = order_building;
                }
                else{
                    var new_order_building = this.order_building_list[order_building.building_id];
                    new_order_building.user_id = order_building.user_id;
                    new_order_building.building_id = order_building.building_id;
                    new_order_building.batch_id = order_building.batch_id;
                    new_order_building.active = true;
                }
            }
        }
        cc.log(this)
    },  

    _parseJson(data){
        var json_object = JSON.parse(data); 
        return json_object;
    },

    requestCheckLogin: function (name, pwd, callback) {

        var err = 0;
        var json_object;
        var self = this;
        var md5_pwd = CryptoJS.MD5(pwd)
        httpUtils.getInstance().httpGets(this.url_host+'/pick/index/checkLogin/name/'+name+'/pwd/'+md5_pwd, function (data) {  
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

    requestGetUser: function (callback) {

        var err = 0;
        var json_object;
        var self = this;
        httpUtils.getInstance().httpGets(this.url_host+'/pick/index/getUser/token/'+self.token, function (data) {  
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

    requestAddFavorite: function (building_id, callback) {

        var err = 0;
        var json_object;
        var self = this;
        httpUtils.getInstance().httpGets(this.url_host+'/pick/index/addFavorite/token/'+self.token+'/building_id/'+building_id, function (data) {  
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

    requestRemoveFavorite: function (building_id, callback) {

        var err = 0;
        var json_object;
        var self = this;
        httpUtils.getInstance().httpGets(this.url_host+'/pick/index/removeFavorite/token/'+self.token+'/building_id/'+building_id, function (data) {  
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

    requestAddOrder: function (building_id, callback) {

        var err = 0;
        var json_object;
        var self = this;
        httpUtils.getInstance().httpGets(this.url_host+'/pick/index/addOrder/token/'+self.token+'/building_id/'+building_id, function (data) {  
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

    requestGetFavorite: function (callback) {

        var err = 0;
        var json_object;
        var self = this;
        httpUtils.getInstance().httpGets(this.url_host+'/pick/index/gtFavorite/name/'+self.token, function (data) {  
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

    requestGetOrder: function (callback) {

        var err = 0;
        var json_object;
        var self = this;
        httpUtils.getInstance().httpGets(this.url_host+'/pick/index/getOrder/name/'+self.token, function (data) {  
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