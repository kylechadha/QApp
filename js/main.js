function QappCtrl ($scope) {
  $scope.items = [
    {name: "Kyle", topic: "Controllers in Angular", time: "25 minutes"},
    {name: "Arya", topic: "CSS relative positioning", time: "10 minutes"},
    {name: "Eva", topic: "Implementing game logic in Angular", time: "35 minutes"}, 
  ]
  
  $scope.newItemTime = ""
  $scope.addItem = function() {
    if ($scope.newItemTime == "") {
      $scope.items.push({name: $scope.newItemName, topic: $scope.newItemTopic, time: "Unestimated"})
      $scope.newItemName = "";
      $scope.newItemTopic = "";
    } else {
      $scope.items.push({name: $scope.newItemName, topic: $scope.newItemTopic, time: $scope.newItemTime + " minutes"})
      $scope.newItemName = "";
      $scope.newItemTopic = "";
      $scope.newItemTime = "";
    }
  }
  $scope.removeItem = function() {
    var placeHolder = $scope.items;
    $scope.items = [];
    angular.forEach(placeHolder, function(item) {
      if (!item.done) $scope.items.push(item);
    })
  }
}