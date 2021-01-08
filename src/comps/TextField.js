import { Text, TextStyle } from "pixi.js";


export default class TextField extends Text
{
    static get TEXT_SIZE(){ return 35 }
    static get WIDTH(){ return 200 }
    static get COLOR(){ return '#ffffff' }

    constructor(text, style)
    {
        if(!style)
            style = new TextStyle({
                fontFamily: 'Helvetica',
                fontSize: TextField.TEXT_SIZE,
                fill: [TextField.COLOR],
                wordWrap: true,
                wordWrapWidth: TextField.WIDTH,
                lineJoin: 'round',
                align: 'center'
            });
        super(text, style);
    }
}