'use strict';

angular.module('airscale.services', ['ngResource'])
	.factory('airplaneTemplates', function($resource) {
		return $resource('airplane-templates/:filename', {}, {
			query: { method: 'GET', params: { filename: 'templates.json'}, isArray: true}
		});
	})
	.factory('storage', function(localStorage) {
		
		var generateId = function() {
			var i = parseInt(localStorage['nextId'] || 0);
			localStorage['nextId'] = i + 1;
			
			var l = JSON.parse(localStorage['list'] || '[]');
			l.push(i);
			localStorage['list'] = JSON.stringify(l);
			
			return i;
		};
		
		var airplaneList = [];
		
		var reloadList = function() {
			var l = JSON.parse(localStorage['list'] || '[]');
			airplaneList.length = 0;
			for(var i = 0; i < l.length; i++) {
				airplaneList.push({
					id: l[i],
					tail: localStorage['airplanes.' + l[i] + '.tail'],
					name: localStorage['airplanes.' + l[i] + '.name']
				});
			}
			return airplaneList;
		};
		
		var o = {};
		
		o.queryAirplanes = function() {
			return reloadList();
		};
		
		o.storeAirplane = function(airplane) {
			if(!airplane.id) {
				airplane.id = generateId();
			}
			airplane.save(localStorage, 'airplanes.' + airplane.id);
			reloadList();
		};
		
		o.loadAirplane = function(id) {
			return Airplane.load(localStorage, 'airplanes.' + id);
		};
		
		return o;
	})
	.value('localStorage', window.localStorage);
