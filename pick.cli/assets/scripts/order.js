// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    	var self = this; // 闭包变量
        this.btn_main.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.director.loadScene('scene/main');
        });   
        this.btn_favorite.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.director.loadScene('scene/favorite');
        });   
    },

    start () { 	
    },

    // update (dt) {},
});
