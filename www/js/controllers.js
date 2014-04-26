angular.module('starter.controllers', [])

.controller('MenuController', function($scope) {
  $scope.m = {};
	$scope.m.categories = [
		{ id: 1, name: 'Personal'},
		{ id: 2, name: 'Work'}
	];
})

.controller('CategoryController', function($scope, $stateParams) {
  //console.log($stateParams);
  $scope.m = {};
  $scope.m.activeCategoryId = $stateParams.categoryId;
  $scope.m.categoryTasks = { 
    1: [
      { id: 1, name: 'Fix it'},
      { id: 2, name: 'Break it'}
    ],
    2: [
      { id: 1, name: 'Slack off'},
      { id: 2, name: 'Work it'}
    ]
  };
})

.controller('TaskController', function($scope, $stateParams) {
  $scope.m = {};
  $scope.m.activeTaskId = $stateParams.taskId;
  $scope.m.task = {
    name: 'The Task',
    priority: 'OMG do it now!'
  }
})
