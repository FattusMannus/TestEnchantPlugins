/**
 * @fileOverview
 * Window.enchant.js
 * @version 0.0.2
 * @require enchant.js v0.6.2+
 * @author kamakiri01
 *
 * @description
 * create window dialog in your scene. privent touch event to other entity.
 *
 */

//ウインドウにEntityを配置したい� �合、
//this.digにaddcChildする

//dig上に配置したEntityをタッチ移動してウインドウごと移動させたい� �合、
//タッチイベントでthis.dig._isTouchのトグルを行う

//透明なレイヤーを張ってタッチイベントの透過を止める
var LayerWindow = enchant.Class.create(enchant.Group,{
    initialize: function(){
        enchant.Group.call(this);
        var WIN_WIDTH = enchant.Core.instance.width;
        var WIN_HEIGHT = enchant.Core.instance.height;

        var bg = new Sprite(WIN_WIDTH, WIN_HEIGHT);
        var sf = new Surface(WIN_WIDTH, WIN_HEIGHT);
        var ctx = sf.context;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, WIN_WIDTH, WIN_HEIGHT);
        bg.image = sf;
        bg.opacity = 0;
        this.addChild(bg);
    }
});

//ポップアップ風ウィンドウを作る(座標指定)
var MenuWindow = enchant.Class.create(LayerWindow, {
    initialize: function(width, height){
        LayerWindow.call(this);

        //ダイアログの本体(addChildはこの要� に行う)
        this.dig = new Group();
        this.dig._window = this;

        //タッチ移動の処理
        this.dig._isTouch = false;
        this.dig._touchX = 0;
        this.dig._touchY = 0;

        //ダイアログBGの設定
        this.bg = new Sprite(width, height);
        var sf = new Surface(width, height);
        sf.context.fillStyle = 'rgb(0, 0, 0)';
        sf.context.fillRect(0, 0, width, height);   //draw edge
        sf.context.fillStyle = 'rgb(35, 50, 120)';
        sf.context.fillRect(1, 1, width-2, height-2);
        this.bg.image = sf;
		
		var WIN_WIDTH = enchant.Core.instance.width;
        var WIN_HEIGHT = enchant.Core.instance.height;
		this.bg.x = ((WIN_WIDTH - width)/2);
		this.bg.y = ((WIN_HEIGHT - height)/2);
        
        //if want to use 9path for Sprite[bg], load widget.enchant.js and use this code.
        //var np = new enchant.widget.Ninepatch(width, height);
        //np.src = enchant.Core.instance.assets['navigationBar.png'];
        //bg.image = np;
        this.dig.addChild(this.bg);

        
		
        
    },

    //width opening effect.
    addChildTo: function(target){
        target.addChild(this);
        target.addChild(this.dig);

    },
    //with closing effect.
    removeChildFrom: function(target){
        var that = this;
        this.dig.tl
            .scaleTo(1, 1/100, 5, enchant.Easing.QUINT_EASEINOUT)
            .and().moveTo(this.dig.x, this.dig.y + 85 , 5, enchant.Easing.QUINT_EASEINOUT)
            .then(function(){
                target.removeChild(that);
                target.removeChild(this);
            });
    }    
});
