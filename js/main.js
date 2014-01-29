//Questions
//1. Why do I have to set newItemName and newItemTopic to "" in order for the error message to be generated the first time around? Shouldn't they already equal ""? Or should I test for "null" in my if statement?

function QappCtrl ($scope) {
  $scope.items = [
  ]

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
        $scope.items.push({name: $scope.newItemName, topic: $scope.newItemTopic, duration: $scope.newItemTime, estimated: $scope.timeCalc()})
      } else {
        $scope.items.push({name: $scope.newItemName, topic: $scope.newItemTopic, duration: $scope.newItemTime, estimated: $scope.timeCalc()})
      }
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
    if ($scope.items.length == 0) {
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

    $scope.items[0].estimated = "Active"

    for (i = 0; i < $scope.items.length; i++) {
      finishTime = parseInt($scope.items[i].duration) + parseInt(min);
      $scope.items[i+1].estimated = $scope.timeClean(finishTime, hour);

      console.log($scope.items[i].estimated);
      console.log($scope.items[i].duration);
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
    var itemIndex = $scope.items.indexOf(item);
    $scope.items.splice(itemIndex,1);
    $scope.timeCalc();
  }

  $scope.counter = 0
}