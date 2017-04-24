//Mohammad Akhtar 050464585

var dropBox;
var jsonText;
window.onload = function() {
  dropBox = document.getElementById("dropBox"); 
  dropBox.ondragenter = ignoreDrag; 
  dropBox.ondragover = ignoreDrag; 
  dropBox.ondrop = drop;
  dropBox2 = document.getElementById("dropBox2"); 
}

function ignoreDrag(e) { 
  e.stopPropagation();
  e.preventDefault(); 
}
function drop(e) { 
  e.stopPropagation(); 
  e.preventDefault();
  var data = e.dataTransfer; 
  var files = data.files;
  processFiles(files);
}

function processFiles(files) { 
  var file = files[0];
  

  if (file) {
  	// Create the FileReader.
  var reader = new FileReader();
  // Tell it what to do when the data URL is ready.
    reader.onload = function (e) {
  // Use the image URL to paint the drop box background
    jsonText = e.target.result;
    change(jsonText);
  };

  // Start reading the image.
  reader.readAsText(file); 


  } else {
  	alert("Failed to load or read file");
  }
}

var Todo = angular.module('Todo', []).
controller('todoController', ['$scope', '$http', function($scope, $http){

	$http.get('todos.json').then(function(data){

		$scope.todos = data.data;
		console.log(data.data);

	});
	
	//main todos Array
	$scope.todos = [
		{'task': 'Default TODO', 'completion': false, 'description': 'description'}
	];

	$scope.completedTodos = [

		{'task': 'Completed tasks go here', 'completion': true, 'description': ''}

	]

	$scope.taskView = "task.html";
	$scope.taskViewCompleted = "taskViewCompleted.html";

	//todo functions

	$scope.addTodo = function(){

	if ($scope.todos.map(x => x.task).indexOf($scope.newTask) === -1) {

		$scope.todos.push({'task': $scope.newTask, 'completion': false, 'description': $scope.newDescription});
	  } else {
		alert('Item already in list');
	  }

	};

	$scope.removeTodo = function(todo){

		var index = $scope.todos.indexOf(todo);
		$scope.todos.splice(index, 1);
	};

	$scope.removeCompletedTodo = function(todo){

		var index = $scope.todos.indexOf(todo);
		$scope.completedTodos.splice(index, 1);
	};

	$scope.showCompleted = function(todo){

		$scope.completedTodos.push(todo);
		$scope.removeTodo(todo);
    };

    $scope.userInput = function() {
    	console.log($scope.jsonInput.value);
	  
	  };


}]);

var change = function (jsonText) {
    var scope = angular.element(document.getElementById('mainView')).scope();
    scope.$apply(function(){
        scope.todos = JSON.parse(jsonText);
        console.log(JSON.parse(jsonText));
    })
}

