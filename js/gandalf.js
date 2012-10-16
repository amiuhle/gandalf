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

	  enhanceReportList = function() {
      console.log('enhanceReportList');
	  },

    enhanceReportDetails = function() {
      console.log('enhanceReportDetails', d, $('#attack_info_def_units'));

      $(document).on('keydown', function(e) {
        switch(e.which) {
          case 65:
            console.log('a');
            $('#attack_spy tr:nth-child(2) a:eq(0)')[0].click();
            break;
          case 66:
            console.log('b');
            $('#attack_spy tr:nth-child(2) a:eq(1)')[0].click();
            break;
          case 67:
            console.log('c');
            $('#attack_spy tr:nth-child(2) a:eq(2)')[0].click();
            break;
          case 74: // 'j': down
            console.log('j');
            $('#content_value table.vis:last td:nth-child(6) a')[0].click();
            break;
          case 75: // 'k': up
            console.log('k');
            $('#content_value table.vis:last td:nth-child(5) a')[0].click();
            break;
          default:
            console.log(e.which);
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
    }
  };
})(window, document);

$(gandalf.init);