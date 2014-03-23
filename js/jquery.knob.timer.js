$.fn.timer = function( userdefinedoptions ){
    var $this = $(this), opt, count = 0;
    var isSecond = false

    $this.opts = $.extend( {
        // Config
        'maxTime' : 180,
        'width' : 24 ,
        'height' : 24 ,
        'fgColor' : "#ffec03" ,
        'bgColor' : "#333",
        'secondTime' : 0,
        'secondFgColor' : "#f00" ,
        'secondBgColor' : "#000",
        notifyObject:undefined,
        }, userdefinedoptions
    );

    $this.knob({
        'min':0,
        'max': $this.opts.maxTime,
        'readOnly': true,
        'width': $this.opts.width,
        'height': $this.opts.height,
        'fgColor': $this.opts.fgColor,
        'bgColor': $this.opts.bgColor,
        'displayInput' : true,
        'dynamicDraw': true,
        'ticks': 0,
        'thickness': 0.3,
        'data-skin':"tron",
        'data-thickness':0.4,
        'data-displayPrevious':true,
        'data-width':150,
        'data-displayInput':true,
        format: function (v) {
          return $this.opts.maxTime - v;
        }
    });

    timer = setInterval(function(){
        newVal = ++count;
        $this.val(newVal).trigger('change');
        if (!isSecond){
          if ($this.opts.notifyObject) $this.opts.notifyObject.notifySec($this.opts.maxTime,newVal);
          if ($this.opts.maxTime - newVal <=0 && $this.opts.secondTime > 0){
            $('input.knob').hide();
            console.log($this.opts);

            $('.qa').timer({
                'width':Math.floor($this.opts.height * 0.75),
                'height':Math.floor($this.opts.height * 0.75),
                maxTime: $this.opts.secondTime,
                bgColor:$this.opts.secondBgColor,
                fgColor:$this.opts.secondFgColor});
            $('#qabox').show()
            $('input.qa').offset({top:Math.floor($this.opts.height / 2)});
            isSecond = true
          }
        }
    }, 1000);
};

