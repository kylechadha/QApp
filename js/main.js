//Questions
//1. Why do I have to set newItemName and newItemTopic to "" in order for the error message to be generated the first time around? Shouldn't they already equal ""? Or should I test for "null" in my if statement?
//2. If everything in the queue gets deleted out, you can no longer add items back in because the entire DB gets set to null -- why?!

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
          {name: 'QApp', topic: 'Add something, then clear me!'}
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
    if ($scope.newItemName == "" || $scope.newItemTopic == "") {
      $scope.errorMessage = "Whoops! Please include your name and the topic  :]"
    }
    else {
      $scope.db.items.push({name: $scope.newItemName, topic: $scope.newItemTopic})
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
