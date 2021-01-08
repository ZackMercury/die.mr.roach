import { Texture, Sprite, AnimatedSprite } from 'pixi.js';
import Entity from './Entity';
import Float from './utils/Float';
import Vector2 from './utils/Vector2';

export default class Roach extends Entity
{
    //Sprites
    SPR_IDLE = null;
    SPR_RUN = null;
    SPR_DEAD = null;
    //States
    static get STATE_IDLE(){ return 0 }
    static get STATE_RUN(){ return 1 }
    static get STATE_DEAD(){ return 2 }
    //Consts
    static get TEX_SIZE() { return 256 }
    static get SAFE_RADIUS() { return 100 }

    //Properties
    constructor(x, y)
    {
        super();
        this.initSprites();
        this.goal = new Vector2(x, y);
        
        this.state = Roach.STATE_IDLE;
        this.stateUpdate();
        this.speed = 5;
        this.seed = 0;
        this.pivot.x = this.pivot.y = 0.5 * Roach.TEX_SIZE;
        this.scale.x = this.scale.y = 0.5;
        //Events
        this.interactive = true;
        this.on("pointerdown", (e)=>{
            this.state = Roach.STATE_DEAD;
            this.stateUpdate();
        });
    }

    //Methods
    stateFunction()
    {
        return 1*(Float.noise(this.timeElapsed*0.01, this.seed) > 0) //* Float.clamp(Math.pow(-1, Math.trunc(this.timeElapsed/2+this.seed)), 0, 1);
    }

    initSprites()
    {
        this.SPR_IDLE = Sprite.from('0004.png');
        this.SPR_DEAD = Sprite.from('dead.png');
        let runCycle = [];
        for(let i = 1; i < 9; i++)
            runCycle.push(Texture.from("000" + i.toString() + '.png'));
        this.SPR_RUN = new AnimatedSprite(runCycle);
        this.SPR_RUN.play();
    }

    update(dt)
    {
        super.update(dt);
        if(this.state != Roach.STATE_DEAD)
        {
            if(this.state != this.stateFunction())
            {
                this.state = this.stateFunction();
                this.stateUpdate();
                this.velocity = Vector2.random();
                this.rotation = this.velocity.angle;
            }

            switch(this.state)
            {
                case Roach.STATE_IDLE:
                    
                    break;
                case Roach.STATE_RUN:
                    if(Vector2.distance(this.position, this.goal) > Roach.SAFE_RADIUS)
                        this.velocity = this.goal.subtract(this.position).normalize();
                    this.velocity = this.velocity.normalize().scale(this.speed * dt);
                    this.rotation = this.velocity.angle + Math.PI/2;
                    this.position.x += this.velocity.x;
                    this.position.y += this.velocity.y;
                    break;
            }
        }
    }

    stateUpdate()
    {
        switch(this.state)
        {
            case Roach.STATE_IDLE:
                this.view = this.SPR_IDLE;
                break;
            case Roach.STATE_RUN:
                this.view = this.SPR_RUN;
                break;
            case Roach.STATE_DEAD:
                this.view = this.SPR_DEAD;
                this.interactive = false;
                break;
        }
    }
}