'use strict';

angular.module('myApp.examinations', [])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/examinations', {
		templateUrl: 'examinations/examinations.html',
		controller: 'crudController',
		resolve: {
			url: function(){ return '/Examinations'; },
			obj: function(){ return 'examination'; }
		}
	});
}])