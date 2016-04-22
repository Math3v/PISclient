'use strict';

angular.module('myApp.visits', [])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/visits', {
		templateUrl: 'visits/visits.html',
		controller: 'crudController',
		resolve: {
			url: function(){ return '/Visits'; },
			obj: function(){ return 'visit'; },
			currentUser: function(currentUserService){ return currentUserService.getUser(); }
		}
	});
}])

.controller('visitsController', ['$scope', function($scope){
	
	$scope.showNewModal = function() {
		$scope.visit = {};
		$( "#newVisit" ).modal('show');
	}

	$scope.showEditModal = function(visit) {
		$scope.visit = visit;
		$( "#editVisit" ).modal('show');
	}
}])

document.addEventListener("DOMContentLoaded", function(event) { 
  setTimeout(function(){ 
    var elements_new = document.getElementsByClassName("new");
    var elements_confirm = document.getElementsByClassName("confirmed");
    for(var i=0; i<elements_new.length; i++)
      elements_new[i].setAttribute("src", "img/waiting.png");
    for(var i=0; i<elements_confirm.length; i++)
      elements_confirm[i].setAttribute("src", "img/accept.png");
  }, 400);
});