'use strict';

/* Filters */

angular.module('airscale.filters', [])
	.filter('weight', function($filter) {
		return function(v, units) {
			return $filter('number')(UNITS[units].weight.format(v), 2);
		};
	})
	.filter('arm', function($filter) {
		return function(v, units) {
			return $filter('number')(UNITS[units].arm.format(v), 2);
		};
	})
	.filter('moment', function($filter) {
		return function(v, units) {
			return $filter('number')(UNITS[units].moment.format(v), 2);
		};
	})
	.filter('fuel', function($filter) {
		return function(v, units) {
			return $filter('number')(UNITS[units].fuel.format(v), 2);
		};
	});
