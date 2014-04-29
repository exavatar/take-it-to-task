angular.module('takeItToTask.controllers', [])

.controller('MenuController', ['$scope', '$firebase', function($scope, $firebase) {
  var tasksRef = new Firebase('https://exavatar.firebaseio.com/tasks');

  $scope.m  = {};
  $scope.fn = {};

  $scope.m.authuser = {email: 'exavatar@gmail.com', password:'B0bbl3'};

  $scope.m.tasks = $firebase(tasksRef);

  $scope.m.auth = new FirebaseSimpleLogin(tasksRef, function(error, user)
  {
    if (error) {
      console.log(error);
    } else if (user) {
      console.log(user);
      console.log($scope);
      $scope.m.user = user;
    }
    else {
      console.log('user not logged in.');
    }

  })
	$scope.m.categories = [
		{ id: 1, name: 'Personal'},
		{ id: 2, name: 'Work'}
	];

  //TOMTODO - in the wrong controller!
  $scope.fn.addTask = function()
  {
    console.log('go?', $scope.m);
    if($scope.m.taskToAdd)
    {
      $scope.m.tasks[$scope.m.user.id].$add($scope.m.taskToAdd);
      console.log('task added');
    }
    //$scope.m.taskToAdd = null;
  }

  $scope.fn.signIn = function()
  {
    $scope.m.auth.login('password', {
      email: $scope.m.authuser.email,
      password: $scope.m.authuser.password
    });
  }

  $scope.fn.signUp = function()
  {
    $scope.m.auth.createUser($scope.m.authuser.email, $scope.m.authuser.password, function(error, user)
    {
      if( error )
      {
        console.log(error);
      }
      else
      {
        console.log(user);
      }
    })
  }

}])

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
