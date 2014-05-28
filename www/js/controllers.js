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
  

  //Firebase references
  $scope.global.firebaseRef = new Firebase('https://exavatar.firebaseio.com/'); 
  $scope.global.firebase    = $firebase($scope.global.firebaseRef); //Entire DB
  $scope.global.users       = $scope.global.firebase.$child('users'); //All Users

  $scope.global.nowish    = new Date();


  //Now people can type it in.  Keeping for the temp password --tconnell 2014-05-05
  //$scope.global.authuser = {email: 'exavatar@gmail.com', password:'B0bbl3'};

  $scope.global.auth = new FirebaseSimpleLogin($scope.global.firebaseRef, function(error, user)
    {
    if (error) {
      console.log(error);
    } else if (user) {
      console.log("user", user);
      console.log("Auth state", $scope.global.auth);
      
      $scope.global.user = user;
      $scope.global.userData  = $scope.global.users.$child(user.id);
      $scope.global.userTasks = $scope.global.userData.$child('tasks');
    }
    else {
      console.log(user);
      $scope.global.user = user;
      //console.log('user not logged in.');
    }

  })


  //=========================== Global Functions ===========================
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
    var taskToAdd = $scope.global.taskToAdd;

    if(taskToAdd && $scope.global.user.id)
    {
      taskToAdd.dueDateTimeObj = new Date(taskToAdd.dueDate +" "+ taskToAdd.dueTime);
      $scope.global.userTasks.$add($scope.global.taskToAdd);
    }
    //$scope.m.taskToAdd = null;
  }

  $scope.globalFn.toggleTaskComplete = function(key, task)
  {
    if(task.completedDateTime)
    {
      delete task.completedDateTime;
    } 
    else
    {
      task.completedDateTime = new Date();
    }   
    $scope.global.userTasks.$save()

  }

  //=========================== End Global Functions ===========================

}])

