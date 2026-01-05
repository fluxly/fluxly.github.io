class Bytebeat extends AudioWorkletProcessor {
    static get parameterDescriptors() {
         return [
             { name: 'amplitude', defaultValue: 0.25, minValue: 0, maxValue: 1 },
             { name: 'formula1', defaultValue: 48, minValue: 0, maxValue: 96 },
             { name: 'formula2', defaultValue: 0, minValue: 0, maxValue: 96 },
             { name: 'speed', defaultValue: 0, minValue: -6, maxValue: 6 }
        ];
    }
    
    constructor() {
      super();
      this.setup();
    }
    
    setup = () => {
        this.t = 0;
        this.count = 0;
        this.nFormula = 96;
        this.formulaIndex = [ 0, 0 ];
        console.log(this.formulaIndex);
    }
    
    process(inputs, outputs, parameters) {
        const output = outputs[0];
        const amplitude = parameters.amplitude;
        this.formulaIndex = [ parameters.formula1[0], parameters.formula2[0] ];
        for (let channel = 0; channel < output.length; ++channel) {
            const outputChannel = output[channel];
            for (let i = 0; i < outputChannel.length; ++i) {
                this.count += parameters.speed[0];
                this.t = Math.floor(this.count);
                let index = Math.abs(this.t) % 2;
                if (this.formulaIndex[1] == 0) index = 0;
                outputChannel[i] = ((((this.formula(this.formulaIndex[index])) & 0xFF) - 128 )/ 128) * amplitude;
            }
        }
        return true;
    }
    
    formula(n) {
        switch (n) {
            case 0: 
                return 0;
            case 1: 
                return (((((this.t>>12)^(this.t>>12)-2)%11*this.t)/4|this.t>>13)&127);  
            case 2: 
                return ((this.t*("36364689"[this.t>>13&7]&15))/12&128);  
            case 3: 
                return (this.t>>5)|(this.t>>4)|((this.t%42)*(this.t>>4)|(0x15483113)-(this.t>>4))/(this.t>>16)^(this.t|(this.t>>4));  
            case 4: 
                return ((this.t*5/53)|this.t*5+(this.t<<1));  
            case 5: 
                return (this.t<65536)?((2*this.t*(this.t>>11)&(this.t-1)|(this.t>>4)-1)%64):(((this.t%98304)>65536)?((17*this.t*(this.t*this.t>>8)&(this.t-1)|(this.t>>7)-1)%128|(this.t>>4)):((13*this.t*(2*this.t>>16)&(this.t-1)|(this.t>>8)-1)%32|(this.t>>4)));  
            case 6: 
                return this.t>>16|((this.t>>4)%16)|((this.t>>4)%192)|(this.t*this.t%64)|(this.t*this.t%96)|(this.t>>16)*(this.t|this.t>>5);  
            case 7: 
                return this.t>>6^this.t&37|this.t+(this.t^this.t>>11)-this.t*((this.t%24?2:6)&this.t>>11)^this.t<<1&(this.t&598?this.t>>4:this.t>>10);  
            case 8: 
                return ((this.t/2*(15&(0x234568a0>>(this.t>>8&28))))|this.t/2>>(this.t>>11)^this.t>>12)+(this.t/16&this.t&24);  
            case 9: 
                return (this.t<65536)?((2*this.t*(this.t>>11)&(this.t-1)|(this.t>>4)-1)%64):(((this.t%98304)>65536)?((17*this.t*(2*this.t>>8)&(this.t-1)|(this.t>>6)-1)%64|(this.t>>4)):((15*this.t*(2*this.t>>16)&(this.t-1)|(this.t>>8)-1)%64|(this.t>>4)));  
            case 10: 
                return ((this.t>>4)*(13&(0x8898a989>>(this.t>>11&30)))&255)+((((this.t>>9|(this.t>>2)|this.t>>8)*10+4*((this.t>>2)&this.t>>15|this.t>>8))&255)>>1);  
            case 11: 
                return this.t*(((this.t>>12)|(this.t>>8))&(63&(this.t>>4)));  
            case 12: 
                return (this.t*(this.t>>5|this.t>>8))>>(this.t>>16);  
            case 13: 
                return this.t*(((this.t>>9)|(this.t>>13))&(25&(this.t>>6)));  
            case 14: 
                return this.t*(((this.t>>11)&(this.t>>8))&(123&(this.t>>3)));  
            case 15: 
                return this.t*(this.t>>8*((this.t>>15)|(this.t>>8))&(20|(this.t>>19)*5>>this.t|(this.t>>3)));  
            case 16: 
                return (this.t*this.t/256)&(this.t>>((this.t/1024)%16))^this.t%64*(0xC0D3DE4D69>>(this.t>>9&30)&this.t%32)*this.t>>18;  
            case 17: 
                return this.t*(this.t>>((this.t>>9)|(this.t>>8))&(63&(this.t>>4)));  
            case 18: 
                return (this.t>>6|this.t|this.t>>(this.t>>16))*10+((this.t>>11)&7);  
            case 19: 
                return (this.t%25-(this.t>>2|this.t*15|this.t%227)-this.t>>3)|((this.t>>5)&(this.t<<5)*1663|(this.t>>3)%1544)/(this.t%17|this.t%2048);  
            case 20: 
                return (this.t|(this.t>>9|this.t>>7))*this.t&(this.t>>11|this.t>>9);  
            case 21: 
                return this.t*5&(this.t>>7)|this.t*3&(this.t*4>>10);  
            case 22: 
                return (this.t>>7|this.t|this.t>>6)*10+4*(this.t&this.t>>13|this.t>>6);  
            case 23: 
                return ((this.t&4096)?((this.t*(this.t^this.t%255)|(this.t>>4))>>1):(this.t>>3)|((this.t&8192)?this.t<<2:this.t));  
            case 24: 
                return ((this.t*(this.t>>8|this.t>>9)&46&this.t>>8))^(this.t&this.t>>13|this.t>>6);  
            case 25: 
                return (this.t*5&this.t>>7)|(this.t*3&this.t>>10);  
            case 26: 
                return (this.t/1e7*this.t*this.t+this.t)%127|this.t>>4|this.t>>5|this.t%127+(this.t>>16)|this.t;  
            case 27: 
                return ((this.t/2*(15&(0x234568a0>>(this.t>>8&28))))|this.t/2>>(this.t>>11)^this.t>>12)+(this.t/16&this.t&24);  
            case 28: 
                return (this.t&this.t%255)-(this.t*3&this.t>>13&this.t>>6); 
            case 29: 
                return (this.t&this.t%255)-(this.t*3&this.t>>13&this.t>>6); 
            case 29: 
                return this.t>>4|this.t&((this.t>>5)/(this.t>>7-(this.t>>15)&-this.t>>7-(this.t>>15))); 
            case 30: 
                return ((this.t*("36364689"[this.t>>13&7]&15))/12&128)+(((((this.t>>12)^(this.t>>12)-2)%11*this.t)/4|this.t>>13)&127);  
            case 31: 
                return (this.t*9&this.t>>4|this.t*5&this.t>>7|this.t*3&this.t/1024)-1;   
            case 32: 
                return ((this.t*(this.t>>12)&(201*this.t/100)&(199*this.t/100))&(this.t*(this.t>>14)&(this.t*301/100)&(this.t*399/100)))+((this.t*(this.t>>16)&(this.t*202/100)&(this.t*198/100))-(this.t*(this.t>>17)&(this.t*302/100)&(this.t*298/100)));  
            case 33: 
                return ((this.t*(this.t>>12)&(201*this.t/100)&(199*this.t/100))&(this.t*(this.t>>14)&(this.t*301/100)&(this.t*399/100)))+((this.t*(this.t>>16)&(this.t*202/100)&(this.t*198/100))-(this.t*(this.t>>18)&(this.t*302/100)&(this.t*298/100)));  
            case 34: 
                return ((this.t*("36364689"[this.t>>13&7]&15))/12&128)+(((((this.t>>12)^(this.t>>12)-2)%11*this.t)/4|this.t>>13)&127);  
            case 35: 
                return this.t*(this.t^this.t+(this.t>>15|1)^(this.t-1280^this.t)>>10);  
            case 36: 
                return ((1-(((this.t+10)>>((this.t>>9)&((this.t>>14))))&(this.t>>4&-2)))*2)*(((this.t>>10)^((this.t+((this.t>>6)&127))>>10))&1)*32+128;  
            case 37: 
                return ((this.t>>1%128)+20)*3*this.t>>14*this.t>>18;  
            case 38: 
                return this.t*(((this.t>>9)&10)|((this.t>>11)&24)^((this.t>>10)&15&(this.t>>15)));  
            case 39: 
                return (this.t*this.t/256)&(this.t>>((this.t/1024)%16))^this.t%64*(0xC0D3DE4D69>>(this.t>>9&30)&this.t%32)*this.t>>18;  
            case 40: 
                return this.t&this.t>>8;  
            case 41: 
                return this.t*(42&this.t>>10);  
            case 42: 
                return this.t|this.t%255|this.t%257;  
            case 43: 
                return this.t>>6&1?this.t>>5:-this.t>>4;  
            case 44: 
                return this.t*(this.t>>9|this.t>>13)&16;  
            case 45: 
                return (this.t&this.t>>12)*(this.t>>4|this.t>>8);  
            case 46: 
                return (this.t*5&this.t>>7)|(this.t*3&this.t>>10);  
            case 47: 
                return (this.t*(this.t>>5|this.t>>8))>>(this.t>>16);  
            case 48: 
                return this.t*5&(this.t>>7)|this.t*3&(this.t*4>>10);  
            case 49: 
                return (this.t>>13|this.t%24)&(this.t>>7|this.t%19);  
            case 50: 
                return (this.t*((this.t>>9|this.t>>13)&15))&129;  
            case 51: 
                return (this.t&this.t%255)-(this.t*3&this.t>>13&this.t>>6);  
            case 52: 
                return (this.t&this.t>>12)*(this.t>>4|this.t>>8)^this.t>>6;  
            case 53: 
                return this.t*(((this.t>>9)^((this.t>>9)-1)^1)%13);  
            case 54: 
                return this.t*(0xCA98>>(this.t>>9&14)&15)|this.t>>8;  
            case 55: 
                return (this.t/8)>>(this.t>>9)*this.t/((this.t>>14&3)+4);  
            case 56: 
                return (~this.t/100|(this.t*3))^(this.t*3&(this.t>>5))&this.t;  
            case 57: 
                return (this.t|(this.t>>9|this.t>>7))*this.t&(this.t>>11|this.t>>9);  
            case 58: 
                return ((this.t>>1%128)+20)*3*this.t>>14*this.t>>18;  
            case 59: 
                return ((this.t&4096)?((this.t*(this.t^this.t%255)|(this.t>>4))>>1):(this.t>>3)|((this.t&8192)?this.t<<2:this.t));  
            case 60: 
                return this.t*(((this.t>>12)|(this.t>>8))&(63&(this.t>>4)));  
            case 61: 
                return this.t*(((this.t>>9)|(this.t>>13))&(25&(this.t>>6)));  
            case 62: 
                return this.t*(this.t^this.t+(this.t>>15|1)^(this.t-1280^this.t)>>10);  
            case 63: 
                return this.t*(((this.t>>11)&(this.t>>8))&(123&(this.t>>3)));  
            case 64: 
                return (this.t>>7|this.t|this.t>>6)*10+4*(this.t&this.t>>13|this.t>>6);  
            case 65: 
                return (this.t*9&this.t>>4|this.t*5&this.t>>7|this.t*3&this.t/1024)-1;  
            case 66: 
                return this.t*(this.t>>((this.t>>9)|(this.t>>8))&(63&(this.t>>4)));  
            case 67: 
                return (this.t>>6|this.t|this.t>>(this.t>>16))*10+((this.t>>11)&7);  
            case 68: 
                return (this.t>>1)*(0xbad2dea1>>(this.t>>13)&3)|this.t>>5;  
            case 69: 
                return (this.t>>4)*(13&(0x8898a989>>(this.t>>11&30)));  
            case 70: 
                return (this.t>>(this.t&7))|(this.t<<(this.t&42))|(this.t>>7)|(this.t<<5);  
            case 71: 
                return (this.t>>7|this.t%45)&(this.t>>8|this.t%35)&(this.t>>11|this.t%20);  
            case 72: 
                return (this.t>>6|this.t<<1)+(this.t>>5|this.t<<3|this.t>>3)|this.t>>2|this.t<<1;  
            case 73: 
                return this.t+(this.t&this.t^this.t>>6)-this.t*((this.t>>9)&(this.t%16?2:6)&this.t>>9);  
            case 74: 
                return ((this.t*(this.t>>8|this.t>>9)&46&this.t>>8))^(this.t&this.t>>13|this.t>>6);  
            case 75: 
                return this.t*(((this.t>>9)^((this.t>>9)-1)^1)%13);  
            case 76: 
                return (this.t>>5)|(this.t<<4)|((this.t&1023)^1981)|((this.t-67)>>4); 
            case 77: 
                return (this.t>>5)|(this.t<<4)|((this.t&1023)^1981)|((this.t-67)>>4); 
            case 77: 
                return this.t>>4|this.t&(this.t>>5)/(this.t>>7-(this.t>>15)&-this.t>>7-(this.t>>15)); 
            case 78: 
                return this.t*(this.t/256)-this.t*(this.t/255)+this.t*(this.t>>5|this.t>>6|this.t<<2&this.t>>1);  
            case 79: 
                return ((this.t>>5&this.t)-(this.t>>5)+(this.t>>5&this.t))+(this.t*((this.t>>14)&14));  
            case 80: 
                return (this.t*((3+(1^this.t>>10&5))*(5+(3&this.t>>14))))>>(this.t>>8&3);   
            case 81: 
                return ((this.t>>4)*(13&(0x8898a989>>(this.t>>11&30)))&255)+((((this.t>>9|(this.t>>2)|this.t>>8)*10+4*((this.t>>2)&this.t>>15|this.t>>8))&255)>>1);  
            case 82: 
                return (this.t/1e7*this.t*this.t+this.t)%127|this.t>>4|this.t>>5|this.t%127+(this.t>>16)|this.t;  
            case 83: 
                return this.t*(((this.t>>9)&10)|((this.t>>11)&24)^((this.t>>10)&15&(this.t>>15)));  
            case 84: 
                return (~this.t>>2)*((127&this.t*(7&this.t>>10))<(245&this.t*(2+(5&this.t>>14))));  
            case 85: 
                return (this.t+(this.t>>2)|(this.t>>5))+(this.t>>3)|((this.t>>13)|(this.t>>7)|(this.t>>11));  
            case 86: 
                return this.t*(this.t>>8*((this.t>>15)|(this.t>>8))&(20|(this.t>>19)*5>>this.t|(this.t>>3)));  
            case 87: 
                return (this.t>>4)|(this.t%10)|(((this.t%101)|(this.t>>14))&((this.t>>7)|(this.t*this.t%17)));  
            case 88: 
                return ((this.t&((this.t>>5)))+(this.t|((this.t>>7))))&(this.t>>6)|(this.t>>5)&(this.t*(this.t>>7));  
            case 89: 
                return ((this.t&((this.t>>23)))+(this.t|(this.t>>2)))&(this.t>>3)|(this.t>>5)&(this.t*(this.t>>7));  
            case 90: 
                return (((((this.t*((this.t>>9|this.t>>13)&15))&255/15)*9)%(1<<7))<<2)%6<<4;  
            case 91: 
                return ((this.t%42)*(this.t>>4)|(0x15483113)-(this.t>>4))/(this.t>>16)^(this.t|(this.t>>4));  
            case 92: 
                return this.t*(this.t>>((this.t&4096)?((this.t*this.t)/4096):(this.t/4096)))|(this.t<<(this.t/256))|(this.t>>4);  
            case 93: 
                return ((this.t&4096)?((this.t*(this.t^this.t%255)|(this.t>>4))>>1):(this.t>>3)|((this.t&8192)?this.t<<2:this.t));  
            case 94: 
                return this.t*((0xbadbea75>>((this.t>>12)&30)&3)*0.25*(0x5afe5>>((this.t>>16)&28)&3)); 
            case 95: 
                return this.t&(this.t>>4)>>3&this.t>>7; 
        }
    }
    
};

registerProcessor("bytebeat-processor", Bytebeat);
        