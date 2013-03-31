function EnvelopeCanvas(envelope) {
	
	var PADW = 10, PADH = 5;
	
	var c = document.getElementsByTagName('canvas')[0];
	var ctx = c.getContext('2d');
	
	this.redraw = function(weight, moment) {
		var bounds = calcBounds();
		
		ctx.clearRect(0, 0, c.width, c.height);
		
		ctx.beginPath();
		ctx.lineWidth = 3;
		
		var tX = function(x) {
			return PADW + (x - bounds.minMoment) * (c.width - 2 * PADW) / (bounds.maxMoment - bounds.minMoment);
		};
		
		var tY = function(y) {
			return PADH + (c.height - 2 * PADH) - ((y - bounds.minWeight) * (c.height - 2 * PADH) / (bounds.maxWeight - bounds.minWeight));
		};
		
		if(envelope.length > 0) {
			ctx.moveTo(tX(envelope[0].moment), tY(envelope[0].weight));
		}
		
		for(var i = 1; i < envelope.length; i++) {
			ctx.lineTo(tX(envelope[i].moment), tY(envelope[i].weight));
		}
		
		ctx.stroke();
		
		ctx.font = 'bold 18px sans-serif';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = '#f00';
		ctx.fillText('x',  tX(moment), tY(weight));
	};
	
	var calcBounds = function() {
		var ret = {
			minWeight: Number.MAX_VALUE, maxWeight: 0,
			minMoment: Number.MAX_VALUE, maxMoment: 0
		};
		
		for(var i = 0; i < envelope.length; i++) {
			var p = envelope[i];
			ret.minWeight = Math.min(p.weight, ret.minWeight);
			ret.maxWeight = Math.max(p.weight, ret.maxWeight);
			ret.minMoment = Math.min(p.moment, ret.minMoment);
			ret.maxMoment = Math.max(p.moment, ret.maxMoment);
		}
		
		return ret;
	};
};