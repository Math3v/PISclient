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
}])

.directive('access', ['permissionService', function(permissionService){
	return {
		restrict: 'A',
		link: function($scope, iElm, iAttrs, controller) {
			if( permissionService.canAccess( iAttrs.access ) === true ) {
				iElm.removeClass('hidden');
			} else {
				iElm.addClass('hidden');
			}
		}
	};
}]);