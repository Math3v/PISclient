'use strict';

angular.module('myApp.commisions', [])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/commissions', {
		templateUrl: 'commisions/commisions.html',
		controller: 'usersCtrl',
		resolve: {
			url: function(){ return '/Commissions'; }
		}
	});
}])