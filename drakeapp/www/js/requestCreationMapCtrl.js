angular.module('drakeApp.requestCreationMap', [])
  .controller('requestCreationMapCtrl', function($scope, Favors, mapService, Nav) {

    $scope.init = function() {
      var markerMap = {};
      var map = mapService.createMap();
      //mapService.addBoundsListener(map, markerMap);
      mapService.addPlaceChangedListener(map);
      mapService.addDefaultMarker(map);
    }

    $scope.init();

    // console.log('creation view');
    // _.defer(function(){
    //   var input = (document.getElementById('pac-input'));
    //   console.log('creation view deferred', input);
    //   $scope.init();
    // });

  });
