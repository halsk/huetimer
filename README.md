Hue Timer using jQuery Knob
=============

- Timer application using jQuery Knob

How to start
-------

    git clone https://github.com/halsk/huetimer.git
    cd huetimer
    open index.html

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


Tested on Chrome, Safari.

