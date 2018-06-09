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
            type: cc.Label
        },   
        label_desc: {
            default: null,
            type: cc.Label
        },   
        label_unit_price: {
            default: null,
            type: cc.Label
        },   
        label_total_price: {
            default: null,
            type: cc.Label
        },  
        btn_add_favorite: {
            default: null,
            type: cc.Button
        },  
        btn_remove_favorite: {
            default: null,
            type: cc.Button
        },  
        btn_add_order: {
            default: null,
            type: cc.Button
        },  
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    setData: function( data )
    {
        //這邊直接將我們的Label字串設定為 No.#
        var self = this;
        this.building = data;

        this._refreashUI();

        this.btn_add_favorite.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            var canvas = cc.find("Canvas");
            var node = PrefabUI.getInstance().CreateLoading(0);
            node.parent = canvas;         
            UserModel.getInstance().requestAddFavorite(self.building.id, function(err, data){
                node.destroy();
                if(err == 0){
                    self._emitRefreashUI();
                }                        
            });   
        });   
        this.btn_remove_favorite.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            var canvas = cc.find("Canvas");
            var node = PrefabUI.getInstance().CreateLoading(0);
            node.parent = canvas;         
            UserModel.getInstance().requestRemoveFavorite(self.building.id, function(err, data){
                node.destroy();
                if(err == 0){
                    self._emitRefreashUI();
                }                        
            });   
        });   

        this.btn_add_order.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            var canvas = cc.find("Canvas");
            var node = PrefabUI.getInstance().CreateLoading(0);
            node.parent = canvas;                 
            UserModel.getInstance().requestAddOrder(self.building.id, function(err, data){
                node.destroy();
                if(err == 0){
                    self._emitRefreashUI();
                }                        
            });   
        }); 
    },

    _emitRefreashUI(){
        this.node.parent.emit('building_cell_refersh', {
          msg: 'Hello, this is Cocos Creator',
        });
    },

    _refreashUI(){

        this.label_name.string = this.building.name;
        this.label_desc.string = this.building.des;
        this.label_unit_price.string = '单价'+this.building.unit_price+'元/m²';
        this.label_total_price.string = Math.round(this.building.total_price/100)/100 +"万";
        if(this.building.is_parking==1){
            this.label_desc.node.active = false;
            this.label_unit_price.node.active = false;
        }
        else{
            this.label_desc.node.active = true;
            this.label_unit_price.node.active = true;
        }
        this.btn_add_favorite.node.active = UserModel.getInstance().isFavorite(this.building.id);
        this.btn_remove_favorite.node.active = !this.btn_add_favorite.node.active;
        this.btn_add_order.node.active = UserModel.getInstance().isCanAddOrder(this.building.batch_id);
    },

    start () {
        var self = this;
        this.node.parent.on('building_cell_refersh', function (event) {
            self._refreashUI();
        });
    },

    // update (dt) {},
});
