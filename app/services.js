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

	return {
		setUser: setUser,
		getUser: getUser,
		delUser: delUser	
	};
}])

.factory('permissionService', ['currentUserService', function(currentUserService){

	function canAccess( action ) {
		var currentUser = currentUserService.getUser();
		if( !!currentUser === false || currentUser.hasOwnProperty('role') === false ) {
			return false;
		}
		console.log( "Can access", action, currentUser);
		if( currentUser.role === 'admin') {
			return true;
		} else if( currentUser.role === 'patient' ) {
			switch( action ) {
				case 'add-visit': return true;
				case 'show-visit': return true;
				default: return false;
			}
		} else if( currentUser.role === 'doctor' ) {
			switch( action ) {
				case 'edit-visit': return true;
				case 'show-visit': return true;
				case 'add-commission': return true;
				case 'edit-commission': return true;
				case 'show-commission': return true;
				case 'add-examination': return true;
				case 'edit-examination': return true;
				case 'show-examination': return true;
				case 'add-patient': return true;
				case 'edit-patient': return true;
				case 'delete-patient': return true;
				case 'show-patient': return true;
				case 'edit-doctor': return true;
				case 'show-doctor': return true;
				default: return false;
			}
		} else {
			return false;
		}
	}

	return {
		canAccess: canAccess
	};
}]);