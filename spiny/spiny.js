var tessel = require('tessel'),
    servolib = require('servo-pca9685'),
    servo = servolib.use(tessel.port['B']);

var pubnub = require("pubnub").init({
  publish_key: "pub-c-09f2fc82-1e55-478c-a93d-f0d7265ee647", 
  subscribe_key: "sub-c-e9a1c52e-9ab9-11e4-a626-02ee2ddab7fe" 
});

var target = .5; // Eventually will be driven by pubnub input

function moveToTarget(target){
  for (var i = 0, t = target; i < t; i += 0.05){
    (function(j){
      setTimeout(function move(){
        console.log('Position:', j);
        servo.move(1, j);
      }, j * 10000);
    })(i);
  }
}

servo.on('ready', function () {
  servo.configure(1, 0.05, 0.14, function () {
    moveToTarget(target);  
  });
  
  pubnub.subscribe({
    channel: "spiny-servo",
    message: function(m){
      console.log('Message received:', m);
      moveToTarget(+m);
    }
  });

});