'use strict';

angular.module('myApp.users', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/patients', {
    templateUrl: 'users/patients.html',
    controller: 'crudController',
    resolve: {
    	url: function(){ return '/APIUsers'; },
      obj: function(){ return 'patient'; },
      currentUser: function(currentUserService){ return currentUserService.getUser(); }
    },
    access: {
      requiredRoles: ['admin', 'doctor']
    }
  })
  $routeProvider.when('/patient/:id', {
    templateUrl: 'users/patients_board.html',
    controller: 'patientsBoardController',
    resolve: {
      currentUser: function(currentUserService){ return currentUserService.getUser(); }
    },
    access: {
      requiredRoles: ['admin', 'doctor']
    }
  });
  $routeProvider.when('/doctors', {
    templateUrl: 'users/doctors.html',
    controller: 'crudController',
    resolve: {
    	url: function(){ return '/APIUsers'; },
      obj: function(){ return 'doctor'; },
      currentUser: function(currentUserService){ return currentUserService.getUser(); }
    },
    access: {
      requiredRoles: ['admin', 'doctor']
    }
  });
  $routeProvider.when('/admins', {
    templateUrl: 'users/admins.html',
    controller: 'crudController',
    resolve: {
    	url: function(){ return '/APIUsers'; },
      obj: function(){ return 'admin'; },
      currentUser: function(currentUserService){ return currentUserService.getUser(); }
    },
    access: {
      requiredRoles: ['admin']
    }
  });
}])

.controller('patientsBoardController', ['$scope', '$http', 'apiUrl', '$routeParams', 'currentUserService', function($scope, $http, apiUrl, $routeParams, currentUserService){
  
  $scope.init = function() {
    $http({
      method: 'GET',
      url: apiUrl + '/APIUsers/' + $routeParams.id
    }).then(function(response) {
      $scope.user = response.data;
    }, function(response) {
      console.log( "Error: ", response );
    })

    $http({
      method: 'GET',
      url: apiUrl + '/Commissions'
    }).then(function(response) {
      $scope.commissions = response.data;
    }, function(response) {
      console.log( "Error: ", response) ;
    });

    $http({
      method: 'GET',
      url: apiUrl + '/Examinations'
    }).then(function(response) {
      $scope.examinations = response.data;
    }, function(response) {
      console.log( "Error: ", response);
    });

    $http({
      method: 'GET',
      url: apiUrl + '/Acts'
    }).then(function(response) {
      $scope.acts = response.data;
    }, function(response) {
      console.log( "Error: ", response );
    });
  }

  $scope.init();

  $scope.newExaminationModal = function() {
    $scope.examination = {};
    $( "#newExamination" ).modal('show');
  }

  $scope.newCommissionModal = function() {
    $scope.commission = {};
    $( "#newCommission" ).modal('show');
  }

  $scope.newActModal = function(examination) {
    $scope.act = {};
    $scope.act.examination_id = examination.id;
    $( "#newAct" ).modal('show');
  }

  $scope.newAct = function(examination) {
    console.log( "New act ", $scope.act );
    $http({
      method: 'POST',
      url: apiUrl + '/Acts',
      data: $scope.act
    }).then(function(response) {
      $scope.init();
    }, function(response) {
      console.log( "Error ", response );
    });
  }

  $scope.deleteAct = function(act) {
    $http({
      method: 'DELETE',
      url: apiUrl + '/Acts/' + act.id
    }).then(function(response) {
      $scope.init();
    }, function(response) {
      console.log( "Error ", response );
    })
  }

  $scope.newObject = function(obj, url) {
    obj.patient_id = $scope.user.id;
    obj.doctor_id = currentUserService.getUser().id;
    $http({
      method: 'POST',
      url: apiUrl + url,
      data: obj
    }).then(function(response) {
      console.log("Success");
      $scope.init();
    }, function(response) {
      console.log("Error", response);
    })
  }

  $scope.editObject = function(obj, url) {
    $http({
      method: 'PUT',
      url: apiUrl + url,
      data: obj
    }).then(function(response) {
      console.log("Success");
      $scope.init();
    }, function(response) {
      console.log("Error", response);
    })
  }

  $scope.deleteObject = function(obj, url) {
    $http({
      method: 'DELETE',
      url: apiUrl + url + '/' + obj.id
    }).then(function(response) {
      console.log("SUCCESS");
      $scope.init();
    }, function(response) {
      console.log("ERROR ", response);
    })
  }

  $scope.showExaminationEdit = function(examination) {
    $scope.examination = examination;
    $( "#editExamination" ).modal('show');
  }

  $scope.showCommissionEdit = function(commission) {
    $scope.commission = commission;
    console.log( $scope.commission );
    $( "#editCommission" ).modal('show');
  }

}])

.controller('patientsController', ['$scope', '$http', 'apiUrl', function($scope, $http, apiUrl){
  
    $scope.showEditModal = function(patient) {
      $scope.patient = patient;
      $( "#editPatient" ).modal('show');
    }

    $scope.showNewModal = function() {
      $scope.patient = {};
      $( "#newPatient" ).modal('show');
    }

    $scope.goToPatient = function(patient) {
      window.location.assign( '/app/?#/patient/' + patient.id );
    }

}]);