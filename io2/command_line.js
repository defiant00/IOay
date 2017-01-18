exports.parse = function(args) {
	var res = {};
	for (var i = 2; i < args.length; i++) {
		if (args[i][0] === '-') {
			var ind = args[i].indexOf(':');
			var key = args[i];
			var val = true;
			if (ind > -1) {
				key = args[i].substring(0, ind);
				val = args[i].substring(ind + 1);
			}
			res[key.substring(1)] = val;
		}
	}
	return res;
}
