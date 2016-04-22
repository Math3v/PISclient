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

.controller('visitsController', ['$scope', 'apiUrl', '$http', function($scope, apiUrl, $http){
	
	$scope.showNewModal = function() {
		$scope.visit = {};
		$( "#newVisit" ).modal('show');
	}

	$scope.showEditModal = function(visit) {
		$scope.visit = visit;
		$( "#editVisit" ).modal('show');
	}

	$scope.newVisit = function(visit) {
		visit.status = 'new';
		console.log(visit);
		$http({
			method: 'POST',
			url: apiUrl + '/Visits',
			data: visit
		}).then(function(response) {
			console.log("SUccess");
			$scope.loadVisits();
		}, function(response) {
			console.log( "Error ", response);
		})
	}

	$scope.loadVisits = function() {
		$http({
			method: 'GET',
			url: apiUrl + '/Visits'
		}).then(function(response) {
			$scope.visits = response.data;
		}, function(err) {
			console.log(err);
		})	
	}
}])
 /*
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
*/