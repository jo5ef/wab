'use strict';

/* Controllers */
function NavCtrl($scope, storage) {
	$scope.airplanes = storage.queryAirplanes();
}

function AirplaneDetailCtrl($rootScope, $location, $scope, $routeParams, storage) {
	$rootScope.units = 'metric';
	
	if($routeParams.id) {
		$scope.airplane = storage.loadAirplane($routeParams.id);
	}
	
	if(!$scope.airplane) {
		$location.path('/airplane/new');
		return;
	}
	
	var env = new EnvelopeCanvas($scope.airplane.envelope);
	
	$scope.$watch('airplane', function() {
		var to = $scope.airplane.takeoff();
		env.redraw(to.weight, to.moment);
	}, true);
	
	$scope.getUnits = function(units) {
		return UNITS[units];
	};
};

function AirplaneEditCtrl($rootScope, $log, $scope, $routeParams, $location, airplaneTemplates, storage) {
	
	$rootScope.units = 'metric';
		
	if($routeParams.id) {
		$scope.airplane = storage.loadAirplane($routeParams.id);
	} else {
		$scope.airplane = new Airplane();
	}
	
	var env = new EnvelopeCanvas($scope.airplane.envelope);
	
	$scope.templates = airplaneTemplates.query();
	
	$scope.$watch('template', function() {
		if($scope.template) {
			airplaneTemplates.get({filename: $scope.template.filename }, function(t) {
				$scope.airplane.applyTemplate(t);
			});
		}
	});
	
	$scope.$watch('airplane', function() {
		var to = $scope.airplane.takeoff();
		env.redraw(to.weight, to.moment);
	}, true);
	
	$scope.addStation = function() {
		$scope.airplane.stations.push(new Station());
	};
	
	$scope.removeStation = function(index) {
		$scope.airplane.stations.splice(index, 1);
	};
	
	$scope.addPoint = function() {
		$scope.airplane.envelope.push(new EnvelopePoint());
	};
	
	$scope.removePoint = function(index) {
		$scope.airplane.envelope.splice(index, 1);
	};
	
	$scope.save = function() {
		storage.storeAirplane($scope.airplane);
		$location.path('/airplane/' + $scope.airplane.id);
	};
	
	$scope.getUnits = function(units) {
		return UNITS[units];
	};
}