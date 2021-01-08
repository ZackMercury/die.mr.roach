import {Container} from "pixi.js";
import Vector2 from "./utils/Vector2";

export default class Entity extends Container
{
    constructor()
    {
        super();
        this._view = null;
        this.timeElapsed = 0;
        this.state = -1;
        this.velocity = new Vector2();
        this.speed = 0;
    }

    get view() { return this._view }
    set view(v) 
    { 
        if(this._view === v)
            return;
        if(this._view) 
            this.removeChild(this._view); 
        this._view = v; 
        if(v)
            this.addChild(v);
    }

    update(dt)
    {
        this.timeElapsed += dt;
    }
}