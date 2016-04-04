angular.module('myApp.filters', [])

.filter('showVisitFilter', function() {
	return function(items, currentUser) {
		var filtered = [];
		angular.forEach(items, function(item){
			if( currentUser.role === 'admin' ) {
				filtered.push( item );
			}
			if( item.hasOwnProperty('patient_id') === true && currentUser.id == item.patient_id ) {
				filtered.push( item );
			}
			if( item.hasOwnProperty('doctor_id') === true && currentUser.id == item.doctor_id ) {
				filtered.push( item );
			}
		});
		return filtered;
	}
});