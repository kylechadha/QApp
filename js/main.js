//Questions
//1. Why do I have to set newItemName and newItemTopic to "" in order for the error message to be generated the first time around? Shouldn't they already equal ""? Or should I test for "null" in my if statement?

function QappCtrl ($scope) {
  $scope.items = [
    {name: "Kyle", topic: "Controllers in Angular", time: "25 minutes"},
    {name: "Arya", topic: "CSS relative positioning", time: "10 minutes"},
    {name: "Eva", topic: "Implementing game logic in Angular", time: "35 minutes"}, 
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
        $scope.items.push({name: $scope.newItemName, topic: $scope.newItemTopic, time: "Unestimated"})
        $scope.newItemName = "";
        $scope.newItemTopic = "";
      } else {
        $scope.items.push({name: $scope.newItemName, topic: $scope.newItemTopic, time: $scope.newItemTime + " minutes"})
        $scope.newItemName = "";
        $scope.newItemTopic = "";
        $scope.newItemTime = "";
      }
      $scope.errorMessage = ""
    }
  }

  $scope.removeItem = function() {
    var placeHolder = $scope.items;
    $scope.items = [];
    angular.forEach(placeHolder, function(item) {
      if (!item.done) $scope.items.push(item);
    })
  }

  $scope.icon = "&#xf0ab;"
  // $scope.icon = function() {
  //   if (arrow == true) {
  //     return "&#xf0ab;"
  //   } else {
  //     return "&#xf0aa;"
  //   }
  // }
}