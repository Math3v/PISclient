'use strict';

angular.module('myApp.directives', [])

.directive('user', [function(){
	return {
		scope: {
			user: '=',
			toggleEdit: '&',
			editObject: '&',
			deleteObject: '&'
		},
		restrict: 'E',
		templateUrl: 'users/user_directive.html',
		replace: false
	};
}]);