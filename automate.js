var outputs = require('./outputs');

module.exports = class Automate{
	constructor(){
		this.started = false;
		this.lightson = false;
		this.lightInterval;
		this.waterInterval;
		this.waterOn;
	}
	start(){
		//flash green
		this.light();
		if(!this.started){
			//this.light();
			var water =()=> {
		   		//flood plants
		   		outputs.pumpOn();
		   		this.waterOn = setTimeout(function test2() {
		   			//turn off pump
		   			outputs.pumpOff();
		   		},10*60*1000); //10*60*1000);		// 10 minutes
			}
			water();
			this.waterInterval=setInterval(water, 6 * 60 * 60 * 1000); // 6 hour
			this.started = true;
		}
		
	}
	light(){
		this.lightInterval = setInterval(function () {
			var dt = new Date();
			dt = dt.getTime();
			if(dt.getHour()>5&&dt.getHour()<8&&!this.lightson){
				clearInterval(this.lightInterval);
				outputs.lightsOn();
				this.lightson= true;
				this.lightInterval = setTimeout(function() {
		   			//turn off light
		   			outputs.lightOff();
		   			this.lightson = false;
		   		}, 16*60*60*1000);	
			}
		}, 45 * 60 * 1000); // 45 minute
	}
	stop(){
		//flash red
		clearInterval(this.lightInterval);
		setInterval(this.waterInterval);
		outputs.pumpOff();
		outputs.lightsOff();
		this.started = false;
	}
	

}
