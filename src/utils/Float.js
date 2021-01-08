export default class Float
{
    static get INTERPOLATION_LINEAR(){ return 0 }
    static get INTERPOLATION_CUBIC(){ return 1 }

    static interpolation = 1;

    //Noise method https://github.com/jmcneese/libnoise.js/blob/master/noisegen.js
    static integerNoise(x, seed = 1)
    {
        //to be replaced because of an issue with losing randomness over the range
        x = parseInt(x);
		seed = parseInt(seed);
		var n = parseInt((1619 * x + 1013 * seed) & 0x7fffffff);
		n = (n >> 13) ^ n;
		return parseFloat(((n * (n * n * 60493 + 19990303) + 1376312589) & 0x7fffffff)/1073741824);
    }

    static noise(x, seed=0)
    {
        const b = Float.integerNoise(Math.floor(x), seed);
        const c = Float.integerNoise(Math.ceil(x), seed);
        x -= b;

        switch(Float.interpolation)
        {
            case Float.INTERPOLATION_LINEAR:
                return b*(1-x) + c*x;
            case Float.INTERPOLATION_CUBIC:
                const a = Float.integerNoise(Math.floor(x) - 1, seed);
                const d = Float.integerNoise(Math.ceil(x) + 1, seed);
                return (d-c-a+b)*x*x*x + (2*a-2*b-d-c)*x*x + (c-a)*x + b;
        }
    }

    static clamp(x, a, b)
    {
        return Math.min(Math.max(a, x), b);
    }
}