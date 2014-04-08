
var app = angular.module("Qapp", ["firebase"])
app.controller("QappCtrl", function($scope, $firebase) {

  qappRef = new Firebase("https://qapp.firebaseio.com/");
  $scope.fbRoot = $firebase(qappRef);

  var IDs;
  $scope.fbRoot.$on("loaded", function() {
    IDs = $scope.fbRoot.$getIndex();

    if (IDs.length == 0) {
      $scope.fbRoot.$add( {
        items: [
          {name: 'QApp', topic: "Add something, then clear me!"}
          ]
      });
      $scope.fbRoot.$on("change", function() {
        IDs = $scope.fbRoot.$getIndex();
        $scope.db = $scope.fbRoot.$child(IDs[0]);
      });
    } else {
      $scope.db = $scope.fbRoot.$child(IDs[0]);
    };

  });

  $scope.newItemName = ""
  $scope.newItemTopic = ""
  $scope.addItem = function() {
    if ($scope.newItemLR) {
      $scope.newItemLR = "LR"
    }
    if ($scope.newItemCD) {
      $scope.newItemCD = "CD"
    } 
    if ($scope.newItemEC) {
      $scope.newItemEC = "EC"
    }

    if ($scope.newItemName == "" || $scope.newItemTopic == "") {
      $scope.errorMessage = "Whoops! Please include your name and the topic  :]"
    }
    else {
      $scope.db.items.push({name: $scope.newItemName, topic: $scope.newItemTopic, review: $scope.newItemLR, debug: $scope.newItemCD, extra: $scope.newItemEC})
      $scope.db.$save();

      $scope.newItemName = "";
      $scope.newItemTopic = "";
      $scope.errorMessage = ""
    }
  }

  $scope.removeItem = function(item) {
    var itemIndex = $scope.db.items.indexOf(item);
    $scope.db.items.splice(itemIndex,1);
    $scope.db.$save();
  }

});
