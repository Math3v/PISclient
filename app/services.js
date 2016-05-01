'use strict';

angular.module('myApp.services', [])

.factory('currentUserService', ['$cookies', '$rootScope', function($cookies, $rootScope){
	var currentUser = undefined;

	function setUser(user) {
		currentUser = user;
		$cookies.putObject('currentUser', user);
		$rootScope.$broadcast( 'permissionsChanged' );
	}

	function getUser() {
		if( !!currentUser !== false ) {
			return currentUser;
		}
		try {
			currentUser = $cookies.getObject('currentUser');
		} catch( err ) {
			currentUser = undefined;
		}
		return currentUser;
	}

	function delUser() {
		currentUser = undefined;
		$cookies.remove('currentUser');
		$rootScope.$broadcast( 'permissionsChanged' );
	}

	function hasUser() {
		if( undefined === getUser() ) {
			return false;
		}
		return true;
	}

	return {
		setUser: setUser,
		getUser: getUser,
		delUser: delUser,
		hasUser: hasUser	
	};
}])

.factory('permissionService', ['currentUserService', function(currentUserService){

	function canAccess( action ) {
		var currentUser = currentUserService.getUser();
		if( !!currentUser === false || currentUser.hasOwnProperty('role') === false ) {
			return false;
		}
		//console.log( "Can access", action, currentUser);
		if( currentUser.role === 'admin') {
			return true;
		} else if( currentUser.role === 'patient' ) {
			switch( action ) {
				case 'add-visit':
				case 'show-visit-patient':
					return true;
				default:
					return false;
			}
		} else if( currentUser.role === 'doctor' ) {
			switch( action ) {
				case 'edit-visit':
				case 'show-visit-doctor':
				case 'add-commission':
				case 'edit-commission':
				case 'show-commission':
				case 'add-examination':
				case 'edit-examination':
				case 'show-examination':
				case 'add-patient':
				case 'edit-patient':
				//case 'delete-patient':
				case 'show-patient':
				case 'edit-doctor':
				case 'show-doctor':
				case 'show-today':
				case 'add-act':
				case 'edit-act':
				case 'delete-act':
					//console.log( "Access doctor ", true);
					return true;
				default:
					//console.log( "Access doctor ", false);
					return false;
			}
		} else {
			return false;
		}
	}

	return {
		canAccess: canAccess
	};
}])

.factory('crudUserService', ['$http', '$q', 'apiUrl', function($http, $q, apiUrl){
	
	function all() {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: apiUrl+'/ApiUsers'
		}).then(function(response) {
			console.log( "All users ", response.data );
			deferred.resolve( response.data );
		}, function(err) {
			console.log( err );
			deferred.reject( err );
		});
		return deferred.promise;
	}

	return {
		all: all
	};
}]);