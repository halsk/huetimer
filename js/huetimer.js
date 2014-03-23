var MAX_HUE = 65535
var BLUE_HUE = 46920
var COLOR_BLUE = '#0070c0'
var COLOR_PURPLE = '#ff00ff'
var COLOR_RED1 = '#ff0067'
var COLOR_RED2 = '#FF0000'

Object.create = function(o){
  var F = function(){};
  F.prototype = o;
  var f = new F();
  f.init(arguments.length>1 ? arguments[1] : undefined);
  return f;
};
/**
 * HueTimer object
 * usage:
 *   var hueTimer = Object.create(HueTimer,{bridgeIP:bridgeip,
 *       pressBridge:function(){
 *         $("#bridgeinfo").show();
 *         $("#bridgeipinput").val(bridgeip);
 *         $("#bridgeipinput").focus();
 *       }
 *       });
 *
 *   hueTimer.registration()
 */
var HueTimer = {
  options:{
    debugMode:false, // debug mode for no Hue users ;)
    bridgeIP:"192.168.1.146",
    apiKey:"huetimerapp",
    lights: null,
    pressBridge:function(msg){
      alert(msg);
    },
  },
  init: function(options){
    console.log(options);
    $.extend(this.options, options);
    self = this;
  },
  registration:function(){
    if (self.options.debugMode){
      self.lights.push("1");
      self.lights.push("2");
      self.lights.push("3");
      return;
    }
    $.ajax({
        contentType : 'application/json',
        type : 'GET',
        url : self.buildQuery({path:"lights"}),
        success: function (data){
          console.log(data);
          if (data[0] && data[0].error){
            self.doRegistration();
          }else{
            $.each(data,function(key){
              self.lights.push(key);
              });
          }
        },
        error:function(data){
          self.options.pressBridge("Couldn't connect to the bridge. Please set correct Bridge IP and press Bridge button, then submit button");
        }});

  },
  doRegistration:function(){
    var data = {"devicetype":"test user","username":self.options.apiKey}
    $.ajax({
        contentType : 'application/json',
        type : 'POST',
        url : "http://" + this.options.bridgeIP + "/api",
        data : JSON.stringify(data),
        success: function (data){
          console.log(data);
          if (data[0].success){
            console.log("success");
          }else if (data[0].error.type == 101){
            self.options.pressBridge("Please set Bridge IP and press Bridge button, then submit button");
            console.log("need to registration");
          }
        }
      });
  },
  /**
   * @param userdefinedoptions: {key:value} style
   *                          : below are possible keys (http://bridgeip/api/apiKey/{path}/{lightid}/{method})
   *                          : lightid (Hue light ID, use all if ID is not specified)
   *                          : method (method will be used for query)
   *                          : path (path will be used for query)
   */
  buildQuery:function(userdefinedoptions){
    var opt = {};
    $.extend(opt, userdefinedoptions);
    var additional = ''
    if (opt.lightid != null)
      additional = '/' + opt.lightid
    if (opt.method != null)
      additional = additional + "/" + opt.method

    console.log("http://" + self.options.bridgeIP + "/api/" + self.options.apiKey + '/' + opt.path + additional);
    return "http://" + self.options.bridgeIP + "/api/" + self.options.apiKey + '/' + opt.path + additional
  },
  notifySec:function(maxTime,second){
    self.calcAndChangeColor(maxTime,second);
  },
  calcAndChangeColor:function(maxTime, newVal) {
    if (newVal % 2 == 1) return // change light per two seconds
    var hue = self.calcHue(maxTime, newVal);
    var bright = self.calcBright(maxTime, newVal);
    var jatuation = 255
    var isAlert = (maxTime - newVal <= 0)
    $.each(self.lights,function(index,value){
        if (self.options.lights == null || $.inArray(value, self.options.lights) > -1){
          self.changeState(value, bright, hue, isAlert);
        }
    });
  },
  changeState: function(lightid, bright, hue, isAlert){
      var lightquery  = self.buildQuery({'path':'lights', 'lightid':lightid, 'method':'state'});
      var data = {"on":true, "sat":255, "bri":bright,"hue":hue}
      if (isAlert){
        data.alert = "lselect"
      }
      console.log(JSON.stringify(data));
      $.ajax({
        contentType : 'application/json',
        type : 'PUT',
        data : JSON.stringify(data),
        url : lightquery,
        success: function (data){
          console.log(data);
        },
        error: function(data){
          console.log('failed');
        }
      });
  },
  calcHue: function(max, newVal){
    var percentage = 0;
    var lastSec = max - newVal;
    if (lastSec > 0 ){
      percentage = lastSec / max;
    }
    return Math.floor(BLUE_HUE + (MAX_HUE - BLUE_HUE) * (1 - percentage));
  },
  calcBright: function(max, newVal){
    var percentage = 0;
    var lastSec = max - newVal;
    if (lastSec > 0 ){
      percentage = lastSec / max;
    }
    return Math.floor(255 * (1-percentage));
  },
  lights: [],
};
