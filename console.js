var repl = require('repl');

var db = require('./models/index.js');

var newREPL = repl.start('hello > ');

newREPL.context.db = db;