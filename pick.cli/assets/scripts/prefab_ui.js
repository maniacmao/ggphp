// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html


var PrefabUI = cc.Class({  
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
        message_box: null,
        loading: null,
    },

    statics: {  
        instance: null  
    },     

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    CreateMessageBox( message, callback ){
 
        var new_node = cc.instantiate(this.message_box);
        new_node.getComponent("message_box").init(message, callback)
        return new_node       
    },

    CreateLoading(close_time_out){
        var new_node = cc.instantiate(this.loading); 
        new_node.getComponent("loading").init(close_time_out)
        return new_node
    },

    start () {
    },

    // update (dt) {},
});

PrefabUI.getInstance = function () {  
    if (PrefabUI.instance == null) {  
        PrefabUI.instance = new PrefabUI();  
    }  
    return PrefabUI.instance;  
};