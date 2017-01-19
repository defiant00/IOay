#! /usr/bin/env node

var fs = require('fs');
var command_line = require('./command_line');

var settings = command_line.parse(process.argv);
console.log(settings);

fs.watch(settings.f, {}, (eventType, filename) => {
	if (eventType === 'change' && filename && filename.toLowerCase().endsWith('.txt')) {
		fs.writeFile(filename + '.res', 'content', (err) => {
			if (!err) {
				console.log('Processed file ' + filename);
			}
		});
	}
});
