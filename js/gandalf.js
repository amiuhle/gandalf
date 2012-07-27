(function(undefined) {
  var screen = /screen=([^\&]*)/.exec(window.location.search)[1]
  switch(screen) {
    case 'map':
      console.log("MAP!!!");
      map = $.ajax('map.php?e=1343353051011&480_440=1');
      console.log('loaded', map);
    break;
    default:
      console.log("Ignoring " + screen);
  }
})();