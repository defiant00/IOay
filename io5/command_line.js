exports.parse = function(args) {
	var res = {};
	var key = null;
	for (var i = 2; i < args.length; i++) {
		if (args[i][0] === '-') {
			var key = args[i].substring(1);
			res[key] = true;
		} else if (key !== null) {
			res[key] = args[i];
			key = null;
		}
	}
	return res;
};
