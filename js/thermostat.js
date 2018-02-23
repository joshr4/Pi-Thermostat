var tstat = function (){

    //inputs and outputs
    this.relayPin = null;
    this.i2cPin = null;

    //constants
    this.minRunTime = 240; //minimum time to let the heater run, in seconds
    this.minOffTime = 480; //minimum time before turning heater back on, in seconds
    this.deadband = 2; //amount temp must rise above setpoint before heater turns off

    //variables
    var curDate = new Date;
    this.lastOn = curDate.getTime()/1000;
    this.lastOff = curDate.getTime()/1000 - this.minOffTime;
    this.temperature = null;
    this.occSetpoint = 70;
    this.unoccSetpoint = 50;
    this.occSch = {};
    this.unoccSch = {};

    //setup schedules  moment JS
    for(var i = 0; i<6; i++){ //0=sunday, 6=saturday
        this.occSch[i] = {};
        this.unccSch[i] = {};
        for(var j = 0; j < 4; j++){ //0=unoccsleep, 1=occmorning, 2=unoccday, 3=occnight, 4=unoccsleep 
            this.occSch[i][j] = {start:'00:00', end:'00:00'};
            this.unoccSch[i][j] = {start:'00:00', end:'00:00'};
       }
    }
}

tstat.prototype.getTstat = function(){
    //I2C code to retrieve code from ADC
    this.temperature = null;
    this.setpoint = null;
}




tstat.prototype.heatOn = function(){  //turn relay on
    if(this.lastOff + this.minOffTime < Date.getTime()/1000){
        //turn on heat
        this.lastOn = Date.getTime()/1000;
    }
}

tstat.prototype.heatOff = function(){  //turn relay off
    if(this.lastOn + this.minOnTime < Date.getTime()/1000){
        //turn off heat
        this.lastOff = Date.getTime()/1000;
    }    
}

tstat.prototype.setSchedule = function(){

    var weekday = $('#weekday').val();
    var start = $('#start-time').val();
    var end = $('#end-time').val();
    this.occSch[weekday] = {start: start, end: end};
}

tstat.prototype.enabled = function(){ //run this main function when stat is enabled

    this.getTstat(); //update temp and setpoint

    if(this.occSch[Date.getDay()].start < Date.getTime){
        if(this.temperature < this.occSetpoint - this.deadband/2) {
            this.heatOn();
        }

        if(this.temperature > this.occSetpoint + this.deadband/2) {
            this.heatOff();
        }
    }


}
//socket io


$(document).ready(function() {
    //var stat = new tstat;

});


