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
        btn_main: {
            default: null,
            type: cc.Button
        },  
        label_title: {
            default: null,
            type: cc.Label
        },   
        scrollview:{
            default:null,
            type: cc.ScrollView
        },        
        item_cell: {
            default: null,
            type: cc.Prefab
        },                
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    	var self = this; // 闭包变量
        self.btn_main.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            cc.director.loadScene('scenes/main');
        });   

        var user_model = UserModel.getInstance();
        var batch = user_model.getCurrentBatch();
        var building_list = user_model.getCurrentBatchBuilding();
        self.label_title.string = batch.name;

        self.content = self.scrollview.content;
        self.opt_item_set = [];
        for(var key in building_list){
            var item_cell = cc.instantiate(self.item_cell);
            var scell = item_cell.getComponent("building_cell");
            if (scell){
                scell.setData(building_list[key]);
            } 
            self.content.addChild(item_cell);
            self.opt_item_set.push(item_cell);            
        }      
    },

    start () { 	
    },

    // update (dt) {},
});
