#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const command_line = require('./command_line');
const processor = require('./processor');

var settings = command_line.parse(process.argv);
console.log(settings);

fs.watch(settings.f, {}, (eventType, filename) => {
	if (eventType === 'change' && filename && filename.toLowerCase().endsWith('.txt')) {
		let filePath = path.join(settings.f, filename);
		fs.readFile(filePath, (err, data) => {
			if (err) {
				console.error(err);
			} else {
				let output = processor.process(data);
				fs.writeFile(filePath + '.output', output, (err) => {
					if (!err) {
						console.log('Processed file ' + filename);
					}
				});
			}
		});
	}
});
