angular.module('myApp.filters', [])

.filter('showVisitFilter', function() {
  return function(items, currentUser) {
    var filtered = [];
    angular.forEach(items, function(item){
      if( currentUser.role === 'admin' ) {
        filtered.push( item );
      }
      else if( item.hasOwnProperty('patient_id') === true && currentUser.id == item.patient_id ) {
        filtered.push( item );
      }
      else if( item.hasOwnProperty('doctor_id') === true && currentUser.id == item.doctor_id ) {
        filtered.push( item );
      }
    });
    return filtered;
  }
})

.filter('statusEquals', function() {
  return function(items, string) {
    var filtered = [];
    angular.forEach(items, function(item) {
      if(typeof item.status !== 'undefined' && item.status.toString() == string) {
        filtered.push( item );
      }
    });
    return filtered;
  }
})

.filter('todayConfirmedVisits', function() {
  return function(items) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var filtered = [];

    if( dd < 10 ) {
        dd = '0' + dd;
    } 
    if( mm < 10 ){
        mm = '0' + mm;
    } 
    var today = dd+'.'+mm+'.'+yyyy;

    angular.forEach(items, function(item) {
      if(typeof item.date !== 'undefined' && typeof item.status !== 'undefined' &&
         item.date == today && item.status == 'confirmed') {
        filtered.push( item );
      }
    });
    return filtered;
  }
});