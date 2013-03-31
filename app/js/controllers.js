'use strict';

/* Controllers */
function NavCtrl($scope, storage) {
	$scope.airplanes = storage.queryAirplanes();
}

function AirplaneEditCtrl($rootScope, $scope, $routeParams, $location, airplaneTemplates, storage) {
	
	$scope.units = 'metric';
		
	if($routeParams.id) {
		$scope.airplane = storage.loadAirplane($routeParams.id);
	} else {
		$scope.airplane = new Airplane();
	}
	
	$scope.templates = airplaneTemplates.query();
	
	$scope.$watch('template', function() {
		if($scope.template) {
			airplaneTemplates.get({filename: $scope.template.filename }, function(t) {
				$scope.airplane.applyTemplate(t);
			});
		}
	});
	
	$scope.addStation = function() {
		$scope.airplane.stations.push(new Station());
	};
	
	$scope.removeStation = function(index) {
		$scope.airplane.stations.splice(index, 1);
	};
	
	$scope.save = function() {
		storage.storeAirplane($scope.airplane);
		$location.path('edit/' + $scope.airplane.id);
	};
	
	$scope.getUnits = function(units) {
		return UNITS[units];
	};
}