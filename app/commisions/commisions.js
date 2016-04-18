'use strict';

angular.module('myApp.commisions', [])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/commissions', {
		templateUrl: 'commisions/commisions.html',
		controller: 'crudController',
		resolve: {
			url: function(){ return '/Commissions'; },
			obj: function(){ return 'commission'; },
			currentUser: function(currentUserService){ return currentUserService.getUser(); }
		}
	});
}])

.controller('commissionsController', ['$scope', function($scope){
	$scope.showEditModal = function(commision) {
		$scope.commision = commision;
		$( "#editCommission" ).modal('show');
	}	
}])