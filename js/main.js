function QappCtrl ($scope) {
  $scope.items = [
    {name: "Kyle", topic: "Controllers in Angular", time: "25 minutes"},
    {name: "Johnny", topic: "CSS relative positioning", time: "10 minutes"},
    {name: "Kate", topic: "Implementing game logic in Angular", time: "35 minutes"}, 
  ]
  $scope.addItem = function() {
    $scope.items.push({name: $scope.newItemName, topic: $scope.newItemTopic, time: $scope.newItemTime + " minutes"})
    $scope.newItemName = "";
    $scope.newItemTopic = "";
    $scope.newItemTime = "";    
  }
  $scope.removeItem = function() {
    var placeHolder = $scope.items;
    $scope.items = [];
    angular.forEach(placeHolder, function(item) {
      if (!item.done) $scope.items.push(item);
    })
  }
}