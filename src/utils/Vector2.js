export default class Vector2
{
    constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }

    normalize(length = 1)
    {
        let l = this.length;
        let res = this.scale(1/l);
        res = res.scale(length);
        return res;
    }

    scale(s)
    {
        return new Vector2(this.x * s, this.y * s);
    }

    subtract(vec)
    {
        return new Vector2(this.x - vec.x, this.y - vec.y);
    }

    add(vec)
    {
        return new Vector2(this.x + vec.x, this.y + vec.y);
    }

    get length()
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    dot(vec)
    {
        return this.x * vec.x + this.y * vec.y;
    }

    clone()
    {
        return new Vector2(this.x, this.y);
    }

    cw()
    {
        return new Vector2(-this.y, this.x);
    }

    ccw()
    {
        return new Vector2(this.y, -this.x);
    }

    spinCW(n)
    {
        return new Vector2(k%4==0?this.x:k%4==1?-this.y:k%4==2?-this.x:this.y, k%4==0?this.y:k%4==1?this.x:k%4==2?-this.y:-this.x)
    }

    get angle()
    {
        return Math.atan2(this.y, this.x);
    }

    static random()
    {
        return (new Vector2(Math.random() - 0.5, Math.random()-0.5)).normalize();
    }

    static fromPoint(p)
    {
        return new Vector2(p.x, p.y);
    }

    static distance(v1, v2)
    {
        return Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2));
    }
}