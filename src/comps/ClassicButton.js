import {Container, Sprite,} as PIXI from "pixi.js";
import Color from "../utils/Color"

export default class ClassicButton extends Container
{
    static get STATE_IDLE(){ return 0 }
    static get STATE_HOVER(){ return 1 }
    static get STATE_DOWN(){ return 2 }

    static get COLOR(){ return 0x991111 }
    static get WIDTH(){ return 150 }
    static get HEIGHT(){ return 50 }
    static get TEXT_SIZE(){ return 14 }

    constructor(caption = "Button")
    {
        this.view = new PIXI.Sprite();
        this.graphics = new PIXI.Graphics();
        this.interactive = true;
        const style = new PIXI.TextStyle({
            fontFamily: 'Helvetica',
            fontSize: ClassicButton.TEXT_SIZE,
            fill: ["#ffffff"],
            wordWrap: true,
            wordWrapWidth: ClassicButton.WIDTH,
            lineJoin: 'round',
            align: 'center'
        });
        this.text = new PIXI.Text(caption, style);
        this.view.addChild(this.graphics);
        this.view.addChild(this.text);

        this._caption = caption;
        this._onClick = null;
        this.state = ClassicButton.STATE_IDLE;

        this.view.on("pointerover", this.pointerOver.bind(this))
                 .on("pointerdown", this.pointerDown.bind(this))
                 .on("pointerup", this.pointerUp.bind(this))
                 .on("pointerout", this.pointerOut.bind(this));

        this.update();
    }
    
    pointerOut(e)
    {
        this.state = ClassicButton.STATE_IDLE;
        this.update();
    }

    pointerOver(e){
        this.state = ClassicButton.STATE_HOVER;
        this.update();
    }

    pointerDown(e){
        this.state = ClassicButton.STATE_DOWN;
        this.update();
    }

    pointerUp(e)
    {
        if (this.state == ClassicButton.STATE_DOWN && this._onClick)
            this._onClick();
        this.state = ClassicButton.STATE_HOVER;
        this.update();
    }

    update()
    {
        let g = this.graphics;
        g.clear();
        let c = new Color();

        switch(this.state)
        {
            case ClassicButton.STATE_IDLE:
                g.beginFill(ClassicButton.COLOR);
                break;
            case ClassicButton.STATE_HOVER:
                c.setHex(ClassicButton.COLOR);
                c.value += 0.1;
                g.beginFill(c.getHex());
                break;
            case ClassicButton.STATE_DOWN:
                c.setHex(ClassicButton.COLOR);
                c.value -= 0.1;
                g.beginFill(c.getHex());
        }
        g.drawRect(0, 0, ClassicButton.WIDTH, ClassicButton.HEIGHT);
        g.endFill();
        this.text.text = this._caption.toUpperCase();
        this.text.position.x = (ClassicButton.WIDTH - this.text.width)/2;
        this.text.position.y = (ClassicButton.HEIGHT - this.text.height)/2;
    }

    //GET/SET

    set caption(c)
    {
        this._caption = c;
        this.update();
    }

    get caption()
    {
        return this._caption;
    }


    set onClick(func){
        this._onClick = func;
    }

    get onClick(){
        return this._onClick;
    }
}