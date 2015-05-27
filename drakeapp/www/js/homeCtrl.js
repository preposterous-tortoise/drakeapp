angular.module('drakeApp.home', [])
.controller('homeCtrl', function ($scope, $location, $http, Favors, photoFactory, geo){
 
  $scope.favors = [];
  
  //hard-coded requests for testing
  /*$scope.requests = [

  { 
      _id: 1,
      topic: 'LEMME SEE DRAKE',
      description: 'hey if somebody could take a pic of drake from the front row, that would be rad',
      photos: ["http://upload.wikimedia.org/wikipedia/en/thumb/0/01/Golden_State_Warriors_logo.svg/838px-Golden_State_Warriors_logo.svg.png"],
      hasPhotos: false,
      votes: 0
    },
    {
      _id: 2,
      topic: 'black tshirt',
      description: 'take a picture of somebody wearing a black t-shirt plz',
      photos: [],
      hasPhotos: false,
      votes: 0
    }];*/

  $scope.selectedFavor = Favors.selectedFavor;

  $scope.upVote = function(favor) {
    favor.votes++;
    Favors.upVote(favor);
  }; 

  $scope.downVote = function(favor) {
    favor.votes--;
    Favors.downVote(favor);
  };


  $scope.favorDetails = function(favor){

    Favors.setFavor(favor);
    $location.path('/favordetails');
  }

  $scope.updateFavors = function(){
    geo.getLocation(function(spot){
      console.log('getting location');

      var radius = 0.289855;
      var box = [[spot[1]-radius, spot[0]-radius], [spot[1]+radius, spot[0]+radius]];

      console.log(box);

      Favors.fetchRequests(box, function(data){
        console.log('got requests', data);
        $scope.favors = data;
        $scope.$apply();
      })
    })
  };

  $scope.getPhoto = function(){
  	photoFactory.getPicture().then(function(image){
  		console.log(image);
      $scope.takenPhoto = image;
      photoFactory.sendPhoto(image);

  	}, function(err) {
  		console.log(err);
  	}, {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    })
  };

  $scope.getUserInfo = function() {
    return $http({
            method: 'GET',
            url: '/api/profileID'
        })
        .then(function(resp) {
            console.log('response from getting server', resp);
            photoFactory.stuff = resp;
            return resp;
        });
  };

  $scope.testVar = true;
  $scope.updateFavors();
});

