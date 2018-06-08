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
        label_name: {
            default: null,
            type: cc.EditBox
        },     
        label_pwd: {
            default: null,
            type: cc.EditBox
        },     
        btn_login: {
            default: null,
            type: cc.Button
        },    
        tip: {
            default: null,
            type: cc.Label
        },    
        loading: {
            default: null,
            type: cc.Prefab
        },
        message_box: {
            default: null,
            type: cc.Prefab
        }         
    },

    // LIFE-CYCLE CALLBACKS:
    // this.node.getChildByName("Cannon 01");
    // cc.find("Cannon 01/Barrel/SFX", this.node);
    onLoad () {
    	var self = this; // 闭包变量

        PrefabUI.getInstance().loading = this.loading
        PrefabUI.getInstance().message_box = this.message_box

        self.label_name.string = "13968021231";
        self.label_pwd.string = "123456";
        self.tip.node.active = false;

        this.btn_login.node.on(cc.Node.EventType.TOUCH_END, function (event) {

            var canvas = cc.find("Canvas");
            var node = PrefabUI.getInstance().CreateLoading(0);
            node.parent = canvas;

            UserModel.getInstance().requestCheckLogin(self.label_name.string, self.label_pwd.string, function(err, data){
                node.destroy()
                if(err == 0){
                    cc.director.loadScene('scenes/main');
                }
                else{
                    self.tip.node.active = true;
                }
            });
        });   
    },

    start () { 	
    },

    // update (dt) {},
});
