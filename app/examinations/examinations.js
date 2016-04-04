'use strict';

angular.module('myApp.examinations', [])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/examinations', {
		templateUrl: 'examinations/examinations.html',
		controller: 'crudController',
		resolve: {
			url: function(){ return '/Examinations'; },
			obj: function(){ return 'examination'; },
			currentUser: function(currentUserService){ return currentUserService.getUser(); }
		}
	});
}])

.controller('examinationsController', ['crudUserService', '$scope', function(crudUserService, $scope){
	$scope.userNames = [];
	crudUserService.all().then(
		function(data) {
			for( var i = 0; i < data.length; i++ ) {
				$scope.userNames[i+1] = data[i].name;
			}
		},
		function(err) {
			console.log("Cannot load users");
		}
	);
}])