
function Airplane() {
	this.tail = '';
	this.name = '';
	this.stations = [];
	this.envelope = [];
	
	this.ramp = function() {
		var w = 0, m = 0;
		for(var i = 0; i < this.stations.length; i++) {
			w += this.stations[i].weight;
			m += this.stations[i].moment();
		}
		return { weight: w, moment: m };
	};
	
	this.taxi = new Station('Taxi', -5, 42);
	
	this.takeoff = function() {
		var ramp = this.ramp();
		return {
			weight: ramp.weight + this.taxi.weight,
			moment: ramp.moment + this.taxi.moment()
		};
	};
	
	this.applyTemplate = function(template) {
		this.stations = [];
		for(var i = 0; i < template.stations.length; i++) {
			var s = template.stations[i];
			this.stations.push(new Station(s.name, s.weight, s.arm));
		}
		this.taxi = new Station(template.taxi.name, template.taxi.weight, template.taxi.arm);
	};
	
	this.save = function(storage, keyPrefix) {
		storage[keyPrefix + '.id'] = this.id;
		storage[keyPrefix + '.tail'] = this.tail;
		storage[keyPrefix + '.name'] = this.name;
		storage[keyPrefix + '.stations.length'] = this.stations.length;
		for(var i = 0; i < this.stations.length; i++) {
			this.stations[i].save(storage, keyPrefix + '.stations.' + i);
		}
		this.taxi.save(storage, keyPrefix + '.taxi');
		
		storage[keyPrefix + '.envelope.length'] = this.envelope.length;
		for(var i = 0; i < this.envelope.length; i++) {
			this.envelope[i].save(storage, keyPrefix + '.envelope.' + i);
		}
	};
};

Airplane.load = function(storage, keyPrefix) {
	var airplane = new Airplane();
	
	if(!storage[keyPrefix + '.id']) {
		return null;
	}
	
	airplane.id = storage[keyPrefix + '.id'];
	airplane.tail = storage[keyPrefix + '.tail'];
	airplane.name = storage[keyPrefix + '.name'];
	
	var l = parseInt(storage[keyPrefix + '.stations.length']);
	for(var i = 0; i < l; i++) {
		airplane.stations.push(Station.load(storage, keyPrefix + '.stations.' + i));
	}
	
	airplane.taxi = Station.load(storage, keyPrefix + '.taxi');
	
	l = parseInt(storage[keyPrefix + '.envelope.length']);
	for(var i = 0; i < l; i++) {
		airplane.envelope.push(EnvelopePoint.load(storage, keyPrefix + '.envelope.' + i));
	}
		
	return airplane;
};

function Station(name, weight, arm, isFuel) {
	this.name = name;
	this.weight = weight;
	this.arm = arm;
	this.isFuel = isFuel;
	this.moment = function() {
		return this.weight * this.arm / 1000;
	};
	this.fuel = function() {
		return this.weight / 6;
	};
	
	this.save = function(storage, keyPrefix) {
		storage[keyPrefix + '.name'] = this.name;
		storage[keyPrefix + '.weight'] = this.weight;
		storage[keyPrefix + '.arm'] = this.arm;
		storage[keyPrefix + '.isFuel'] = this.isFuel;
	};
};

Station.load = function(storage, keyPrefix) {
	return new Station(
		storage[keyPrefix + '.name'],
		parseFloat(storage[keyPrefix + '.weight']),
		parseFloat(storage[keyPrefix + '.arm']),
		storage[keyPrefix + '.isFuel'] == 'true');
};

function EnvelopePoint(weight, moment) {
	this.weight = weight;
	this.moment = moment;
	
	this.save = function(storage, keyPrefix) {
		storage[keyPrefix + '.weight'] = this.weight;
		storage[keyPrefix + '.moment'] = this.moment;
	};
};

EnvelopePoint.load = function(storage, keyPrefix) {
	return new EnvelopePoint(
		parseFloat(storage[keyPrefix + '.weight']),
		parseFloat(storage[keyPrefix + '.moment']));
};

var IDENTITY_FUNCTION = function(v) { return v; };

var UNITS = {
	imperial: {
		weight: {
			unit: 'lbs',
			format: IDENTITY_FUNCTION,
			parse: IDENTITY_FUNCTION
		},
		arm: {
			unit: 'inches',
			format: IDENTITY_FUNCTION,
			parse: IDENTITY_FUNCTION
		},
		moment: {
			unit: 'lb.-in./1000',
			format: IDENTITY_FUNCTION,
			parse: IDENTITY_FUNCTION
		},
		fuel: {
			unit: 'gal',
			format: IDENTITY_FUNCTION,
			parse: IDENTITY_FUNCTION
		}
	},
	metric: {
		weight: {
			unit: 'kg',
			format: function(v) { return v / 2.20462; },
			parse: function(v) { return v * 2.20462; }
		},
		arm: {
			unit: 'cm',
			format: function(v) { return v * 2.54; },
			parse: function(v) { return v / 2.54; }
		},
		moment: {
			unit: 'kg.-mm./1000',
			format: function(v) { return v * 25.4 / 2.20462; },
			parse: function(v) { return v / (25.4 / 2.20462); }
		},
		fuel: {
			unit: 'liter',
			format: function(v) { return v * 3.78541; },
			parse: function(v) { return v / 3.78541; }
		}
	}
};