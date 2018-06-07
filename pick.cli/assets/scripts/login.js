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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    	var self = this; // 闭包变量

        self.label_name.string = "13968021231"
        self.label_pwd.string = "123456"
        this.btn_login.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            console.log("TOUCH_END" + self);
            console.log("TOUCH_END" + self.label_name.string);
            console.log("TOUCH_END" + self.label_pwd.string);

            UserModel.getInstance().checkLogin(self.label_name.string, self.label_pwd.string, function(err, data){

                if(err == 0){
                    cc.director.loadScene('scene/main');
                }
            } )
        });   
    },

    start () { 	
    },

    // update (dt) {},
});
