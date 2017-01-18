#! /usr/bin/env node

var commandLine = require('./command_line');

var settings = commandLine.parse(process.argv);
console.log(settings);
