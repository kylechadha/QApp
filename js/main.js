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
          {name: 'QApp', topic: 'Add something, then clear me :]', duration: 15, estimated: '9:45 PM'}
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
  $scope.newItemTime = ""
  $scope.addItem = function() {
    if ($scope.newItemName == "" || $scope.newItemTopic == "") {
      $scope.errorMessage = "Whoops! Please include your name and the topic  :]"
    }
    else {
      if ($scope.newItemTime == "") {
        $scope.newItemTime = 15;
        $scope.db.items.push({name: $scope.newItemName, topic: $scope.newItemTopic, duration: $scope.newItemTime, estimated: $scope.timeCalc()})
      } else {
        $scope.db.items.push({name: $scope.newItemName, topic: $scope.newItemTopic, duration: $scope.newItemTime, estimated: $scope.timeCalc()})
      }
      $scope.db.$save();
      $scope.newItemName = "";
      $scope.newItemTopic = "";
      $scope.newItemTime = "";
      $scope.errorMessage = ""
    }
  }

  var finishTime = 0;
  var date = new Date;
  var hour = 0;
  var min = 0;

  $scope.timeCalc = function() {
    if ($scope.db.items.length == 0) {
      hour = date.getHours();
      min = date.getMinutes();

      $scope.estTime = "Active";
      finishTime = parseInt($scope.newItemTime) + parseInt(min);

      return $scope.estTime;
    } else {
      
      $scope.estTime = finishTime;
      finishTime += parseInt($scope.newItemTime);
      return $scope.timeClean($scope.estTime, hour);
    }
  }

  $scope.timeUpdate = function() {
    date = new Date;
    hour = date.getHours();
    min = date.getMinutes();

    $scope.db.items[0].estimated = "Active"

    for (i = 0; i < $scope.db.items.length; i++) {
      finishTime = parseInt($scope.db.items[i].duration) + parseInt(min);
      $scope.db.items[i+1].estimated = $scope.timeClean(finishTime, hour);

      console.log($scope.db.items[i].estimated);
      console.log($scope.db.items[i].duration);
    }
  }

  $scope.timeClean = function(min, hour) {
    hour += Math.floor(min / 60);
    min = min % 60;

    var ampm = hour > 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12; // zero = 12
    min = min > 9 ? min : "0" + min;
    $scope.estTime = hour + ":" + min + " " + ampm;

    return $scope.estTime;
  }

  $scope.removeItem = function(item) {
    var itemIndex = $scope.db.items.indexOf(item);
    $scope.db.items.splice(itemIndex,1);
    $scope.timeCalc();
    $scope.db.$save();
  }

  $scope.counter = 0

});
