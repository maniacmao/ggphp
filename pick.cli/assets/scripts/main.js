// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var UserModel = require("user_model");
var PrefabUI = require("prefab_ui");

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        btn_main: {
            default: null,
            type: cc.Button
        },     
        btn_order: {
            default: null,
            type: cc.Button
        },    
        btn_favorite: {
            default: null,
            type: cc.Button
        },       
        btn_batchs: {
            default: [], 
            type: [cc.Button], // type 同样写成数组，提高代码可读性
        }    
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
  
    },

    start () { 
        var self = this; // 闭包变量
        this.btn_favorite.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.director.loadScene('scenes/favorite');
        });   
        this.btn_order.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.director.loadScene('scenes/order');
        });   

        var user_model = UserModel.getInstance();
        var user_batch_list = user_model.user_batch_list;
        var batch_list = user_model.batch_list;
        var batch_length = batch_list.length;
        var btn_batch_length = this.btn_batchs.length;

        var i = 0;
        for(var key in batch_list){
            var label_node = this.btn_batchs[i].node.getChildByName("Label");
            label_node.getComponent(cc.Label).string = batch_list[key].name;
            (function(){
                var current_batch_id = batch_list[key].id;
                var j = i;
                self.btn_batchs[j].node.active = true;
                self.btn_batchs[j].node.on(cc.Node.EventType.TOUCH_END, function (event) {
                    var canvas = cc.find("Canvas");
                    var node = PrefabUI.getInstance().CreateLoading(0);
                    node.parent = canvas;       
                    cc.log(current_batch_id+'  '+j);             
                    user_model.requestGetUser(function(err, data){
                        node.destroy();
                        if(err == 0){
                            user_model.current_batch_id = current_batch_id
                            cc.director.loadScene('scenes/building');
                        }                        
                    });                    
                });  
            })();
            i++;
        }

        for(; i<btn_batch_length; i++){
            this.btn_batchs[i].node.active = false;
        }    
    },

    // update (dt) {},
});
