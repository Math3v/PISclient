'use strict';

angular.module('myApp.services', [])

.factory('currentUserService', [function(){
	var currentUser = {};

	function setUser(user) {
		currentUser = user;
	}

	function getUser() {
		return currentUser;
	}

	function delUser() {
		currentUser = {};
	}

	return {
		setUser: setUser,
		getUser: getUser,
		delUser: delUser	
	};
}]);