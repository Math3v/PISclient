'use strict';

angular.module('myApp.visits', [])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/visits', {
		templateUrl: 'visits/visits.html',
		controller: 'crudController',
		resolve: {
			url: function(){ return '/Visits'; }
		}
	});
}])