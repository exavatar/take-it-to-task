angular.module('takeItToTask.controllers', [])

.controller('MenuController', ['$scope', function($scope) {
  

  $scope.m  = {};
  $scope.fn = {};

	$scope.m.categories = [
		{ id: 1, name: 'Personal'},
		{ id: 2, name: 'Work'}
	];

}])

.controller('CategoryController', function($scope, $stateParams) {
  //console.log($stateParams);
  console.log("Da scope", $scope);
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

.controller('GlobalController', ['$scope', '$firebase', function($scope, $firebase) {
  $scope.global = {};
  $scope.globalFn = {};
  $scope.global.firebaseRef = new Firebase('https://exavatar.firebaseio.com/tasks');

  //Now people can type it in. --tconnell 2014-05-05
  //$scope.global.authuser = {email: 'exavatar@gmail.com', password:'B0bbl3'};

  $scope.global.auth = new FirebaseSimpleLogin($scope.global.firebaseRef, function(error, user)
    {
    if (error) {
      console.log(error);
    } else if (user) {
      console.log("user", user);
      console.log("Auth state", $scope.global.auth);
      $scope.global.user = user;
      $scope.global.userRef = new Firebase('https://exavatar.firebaseio.com/users/'+ user.id);
      $scope.global.tasksRef = new Firebase('https://exavatar.firebaseio.com/users/'+ user.id +'/tasks');
      $scope.global.userData = $firebase($scope.global.userRef);
      $scope.global.tasksData = $firebase($scope.global.tasksRef);
    }
    else {
      console.log(user);
      $scope.global.user = user;
      //console.log('user not logged in.');
    }

  })

  $scope.globalFn.signIn = function()
  {
    $scope.global.auth.login('password', {
      email: $scope.global.authuser.email,
      password: $scope.global.authuser.password
    });
  }

  $scope.globalFn.signOut = function()
  {
    $scope.global.auth.logout();
  }

  $scope.globalFn.signUp = function()
  {
    $scope.global.auth.createUser($scope.global.authuser.email, $scope.global.authuser.password, function(error, user)
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


  $scope.globalFn.addTask = function()
  {

    if($scope.global.taskToAdd && $scope.global.user.id)
    {
      $scope.global.tasksData.$add($scope.global.taskToAdd);
      console.log('task added');
    }
    //$scope.m.taskToAdd = null;
  }



}])

