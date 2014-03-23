Hue Timer using jQuery Knob
=============

- Timer application using jQuery Knob

How to start
-------
<script>
  git clone https://github.com/halsk/huetimer.git
  cd huetimer
  open index.html
</script>

Example (if you want to use classes)
-------

    <script>
      var hueTimer = Object.create(HueTimer,{bridgeIP:bridgeip,
          debugMode:false,
          lights: lights,
        });
      // check registration
      hueTimer.registration();

      $('.knob').timer({
        'width':Math.floor(1000),
        'height':Math.floor(1000),
        notifyObject:hueTimer,
        maxTime: 180,
        secondTime: 120,
      });

    </script>

Options
-------

    <input type="text" class="dial" data-min="-50" data-max="50">

... or in the "knob()" call :

    $(".dial").knob({
                    'min':-50
                    ,'max':50
                    });

The following options are supported :

Behaviors :
* brigadeIP : IP address of hues
* debugMode: debug mode true/false
* bridgeIP:"192.168.1.146"
* lights: "1,3,5"
* maxtime: 180
* secondtime: 120

-------

Tested on Chrome, Safari.

