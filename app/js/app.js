'use strict';

// Declare app level module which depends on filters, and services
angular.module('airscale', ['airscale.services', 'airscale.directives', 'airscale.filters'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/airplane/new', {templateUrl: 'partials/airplane-edit.html', controller: AirplaneEditCtrl});
		$routeProvider.when('/airplane/edit/:id', {templateUrl: 'partials/airplane-edit.html', controller: AirplaneEditCtrl});
		$routeProvider.when('/airplane/:id', {templateUrl: 'partials/airplane-detail.html', controller: AirplaneDetailCtrl});
		$routeProvider.otherwise({redirectTo: '/airplane/new'});
	}]);