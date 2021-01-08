
export default class Color {
		constructor(hue = 0, saturation = 0, value = 0) 
		{
			this.hue = hue;
			this.saturation = saturation;
            this.value = value;
		}
 
		getRGB()
		{
			var hi = Math.floor(this._hue / 60) % 6;
			var vMin = (100 - this._saturation * 100) * this._value; 
 
			var a = (this._value * 100 - vMin) * (this._hue % 60) / 60;
			var vInc = vMin + a;
			var vDec = this._value * 100 - a;
 
			var rgb = {r:0, g:0, b:0};
			switch(hi)
			{
				case 0:
					rgb.r = this._value;
					rgb.g = vInc / 100;
					rgb.b = vMin / 100; 
					break;
				case 1:
					rgb.r = vDec / 100;
					rgb.g = this._value;
					rgb.b = vMin / 100; 
					break;
				case 2:
					rgb.r = vMin / 100;
					rgb.g = this._value;
					rgb.b = vInc / 100; 
					break;
				case 3:
					rgb.r = vMin / 100;
					rgb.g = vDec / 100;
					rgb.b = this._value; 
					break;
				case 4:
					rgb.r = vInc / 100;
					rgb.g = vMin / 100;
					rgb.b = this._value; 
					break;
				case 5:
					rgb.r = this._value;
					rgb.g = vMin / 100;
					rgb.b = vDec / 100; 
					break;
			}
 
			return rgb;
		}
 
		setRGB(rgb)
		{
			if (rgb.r > 1) rgb.r = 1;
			else if (rgb.r < 0) rgb.r = 0;
			if (rgb.g > 1) rgb.g = 1;
			else if (rgb.g < 0) rgb.g = 0;
			if (rgb.b > 1) rgb.b = 1;
			else if (rgb.b < 0) rgb.b = 0; 
 
			var min = Math.min(rgb.r, rgb.g, rgb.b);
			var max = Math.max(rgb.r, rgb.g, rgb.b);
 
			if (max == min) this._hue = 0; 
			else if ((max == rgb.r) && (rgb.g >= rgb.b)) 
				this._hue = (60 * (rgb.g - rgb.b)) / (max - min); 
			else if ((max == rgb.r) && (rgb.g < rgb.b)) 
                this._hue = (60 * (rgb.g - rgb.b)) / (max - min) + 360; 
			else if (max == rgb.g) 
                this._hue = (60 * (rgb.b - rgb.r)) / (min - max) + 120; 
			else 
                this._hue = (60 * (rgb.r - rgb.g)) / (max - min) + 240; 
			if(max == 0) this._saturation = 0;
			else this._saturation = 1 - min / max;
			this._value = max;
		}
 
		setHex(hex)
		{
			var rgb = { r: (hex >> 16) & 0xFF, g: (hex >> 8) & 0xFF, b: hex & 0xFF };
			rgb.r /= 0xFF;
			rgb.g /= 0xFF;
			rgb.b /= 0xFF;
 
			this.setRGB(rgb);
		}
 
		getHex()
		{
			var rgb = this.getRGB();
			return (Math.round(rgb.r * 0xFF) << 16) | (Math.round(rgb.g * 0xFF) << 8) | (Math.round(rgb.b * 0xFF));
		}
 
		//GET/SET
		get hue()
		{
			return this._hue;
		}
 
		set hue(val)
		{
			if (val < 0)
				val += Math.ceil(-val / 360) * 360;
			if (val >= 360)
				val -= int(val / 360) * 360;
                this._hue = val;
		}
 
		get saturation()
		{
			return this._saturation;
		}
 
		set saturation(val)
		{
			if (val < 0)
				val = 0;
			if (val > 1)
				val = 1; 
            this._saturation = val;
		}
 
		get value()
		{
			return this._value;
		}
 
		set value(val)
		{
			if (val < 0)
				val = 0;
			if (val > 1)
				val = 1; 
            this._value = val;
		}
}