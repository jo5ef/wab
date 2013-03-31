'use strict';

// Declare app level module which depends on filters, and services
angular.module('airscale', ['airscale.services', 'airscale.directives', 'airscale.filters'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/new', {templateUrl: 'partials/airplane-edit.html', controller: AirplaneEditCtrl});
		$routeProvider.when('/edit/:id', {templateUrl: 'partials/airplane-edit.html', controller: AirplaneEditCtrl});
		$routeProvider.otherwise({redirectTo: '/new'});
	}]);