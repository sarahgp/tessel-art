var tessel = require('tessel'),
    ambientlib = require('ambient-attx4'),
    ambient = ambientlib.use(tessel.port['C']),
    calibrate = require('./calibrate');

ambient.on('ready', function(){
  calibrate.get(ambient, 'getSoundBuffer')
           .then(function(val){
            console.log(val)
          });
});

