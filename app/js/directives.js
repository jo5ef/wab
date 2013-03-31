'use strict';

angular.module('airscale.directives', [])
	.directive('asWeight', function($filter) {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ngModel) {
				
				var units;
				
				ngModel.$parsers.push(function(v) {
					return units ? units.weight.parse(v) : v;
				});
				
				var f = function(v) {
					return units ? units.weight.format(v).toFixed(2) : v;
				};
				
				ngModel.$formatters.push(f);
				
				attrs.$observe('asWeight', function(v) {
					units = UNITS[v];
					elm.val(f(ngModel.$modelValue));
				});
			}
		};
	})
	.directive('asArm', function($log) {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ngModel) {
				
				var units;
				
				ngModel.$parsers.push(function(v) {
					return units ? units.arm.parse(v) : v;
				});
				
				var f = function(v) {
					return units ? units.arm.format(v).toFixed(2) : v;
				};
				
				ngModel.$formatters.push(f);
				
				attrs.$observe('asArm', function(v) {
					units = UNITS[v];
					elm.val(f(ngModel.$modelValue));
				});
			}
		};
	})
	.directive('asMoment', function($log) {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ngModel) {
				
				var units;
				
				ngModel.$parsers.push(function(v) {
					return units ? units.moment.parse(v) : v;
				});
				
				var f = function(v) {
					return units ? units.moment.format(v).toFixed(2) : v;
				};
				
				ngModel.$formatters.push(f);
				
				attrs.$observe('asMoment', function(v) {
					units = UNITS[v];
					elm.val(f(ngModel.$modelValue));
				});
			}
		};
	});