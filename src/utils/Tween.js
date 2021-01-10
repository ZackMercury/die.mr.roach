export default class Tween {
    static get LINEAR(){ return 0 }
    static get EASE_IN(){ return 1 }
    static get EASE_OUT(){ return 2 }

    static transitionType = Tween.LINEAR;
    static transitions = [];

    static init(app)
    {
        app.ticker.add(this.update);
    }

    static lowestLevel(obj, paramAddress)
    {
        paramAddress.split(".").forEach((prop, i, arr)=>{
            if(i < arr.length - 1)
                obj = obj[prop];
        })
        return obj;
    }

    static ease(obj, fromParams, toParams, duration)
    {
        let t = {object: obj, duration:duration, timeElapsed:0, from:fromParams, to:toParams};
        Tween.transitions.push(t);
        return new Promise((resolve, reject)=>{
            t.whenDone = resolve;
        });
    }

    static update(dt)
    {
        Tween.transitions.forEach(t=>{
            t.timeElapsed += dt;
            Object.keys(t.from).forEach(key=>{
                let a = t.from[key];
                let b = t.to[key];
                let x = t.timeElapsed/t.duration;

                switch(Tween.transitionType)
                {
                    case Tween.LINEAR:
                        Tween.lowestLevel(t.object, key)[key.split(".").pop()] = a*(1-x) + b*x;
                        break;
                }

                if(t.timeElapsed >= t.duration)
                    Tween.lowestLevel(t.object, key)[key.split(".").pop()] = b;
            })
            
            if(t.timeElapsed >= t.duration)
            {
                Tween.transitions.splice(Tween.transitions.indexOf(t), 1);
                if(t.whenDone) 
                    t.whenDone(t.object);
            }
        })
    }
}