gandalf = (function(w, d, undefined) {
  var loc = w.location,
    // the beautiful world we live in, eg 'de86'
	  world = /([^\.]*)/.exec(loc.host)[1],
    // easy logging
    cl = function() { return console.log.apply(console, arguments); },
    // extracts a url param
    param = function(name) {
      return (new RegExp(name + "=([^\&]*)").exec(loc.search) || [undefined, undefined])[1];
    },
	  screen = param('screen'),

    visualClick = function(selector) {
      var elt = $(selector);
      if(elt && elt[0]) {
        elt.css('border', '1px solid red');
        elt[0].click();
      } else {
        cl('Sorry, I was unable to click ' + selector);
      }
    },

	  enhanceReportList = function() {
      console.log('enhanceReportList');
	  },

    sendOnX = function() {
      $(document).on('keydown', function(e) {
        console.log(e);
        switch(e.which) {
          case 88: // x
            visualClick('#troop_confirm_go');
            break;
        }
      });
    },

    enhanceReportDetails = function() {
      console.log('enhanceReportDetails', d, $('#attack_info_def_units'));

      $(document).on('keydown', function(e) {
        console.log(e);
        if(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
          // make sure we don't click any links when the user actually wanted to copy e.g.
          return;
        }
        switch(e.which) {
          case 65:
            console.log('a');
            visualClick('#attack_spy tr:nth-child(2) a.farm_icon_a');
            break;
          case 66:
            console.log('b');
            visualClick('#attack_spy tr:nth-child(2) a.farm_icon_b');
            break;
          case 67:
            console.log('c');
            visualClick('#attack_spy tr:nth-child(2) a.farm_icon_c');
            break;
          case 74: // 'j': left
            console.log('j');
            visualClick('#content_value table.vis:last a:contains(<<)');
            break;
          case 75: // 'k': right
            console.log('k');
            visualClick('#content_value table.vis:last a:contains(>>)');
            break;
          default:
            console.log(e.which);
            break;
        }
      });

      var p=0,
        a=0,
        m=[4,5,1,5,1,5,6,23,4,12,40,200,4];
        $('#attack_info_def_units tr:eq(1) td.unit-item').each(function(i,e){
          p+=m[i]*parseInt($(e).text());
        });
        $('#attack_info_def_units tr:eq(2) td.unit-item').each(function(i,e){
          a+=m[i]*parseInt($(e).text());
        });
        cl('Möglich: \t'+p+'\nErzielt: \t'+a);
    },

    iCanTypeCommas = undefined;
  
  return {
  	init: function() {
      var f = gandalf[screen];
      if(typeof f === 'function') {
        f();
      } else {
        console.log('Ignoring Screen ' + screen);
      }
    },
    report: function() {
      param('view') === undefined ? enhanceReportList() : enhanceReportDetails();
    },
    place: function() {
      if(param('try') === 'confirm') {
        sendOnX();
      }
    }
  };
})(window, document);

$(gandalf.init);