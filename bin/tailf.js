#!/usr/bin/env node

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
require('../lib/program.js').exec();
