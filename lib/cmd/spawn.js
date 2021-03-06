var Promise             = require('bluebird')
  , _                   = require('lodash')
  , term                = require('terminal-kit').terminal
  , { Log }             = require('tailf.io-sdk')
  , { spawn }           = require('child_process')
  ;

function exec(options = {}) {
  let { host = 'https://tailf.io/', id, token, meta, pipe, keep_open, args } = options;

  Promise
    .try(() => {
      let { rows, columns } = process.stdout;

      return Log
              .open({ id, host, rows, columns, meta, keep_open, token })
              .then((log) => {
                term.bgMagenta.white(` tailf.io > `).bgDefaultColor().defaultColor(` ${log}\n`);

                let child = spawn(_.first(args), _.tail(args));

                child.stdout.pipe(process.stdout);
                child.stderr.pipe(process.stderr);

                return log.pipe(child);
              });
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      process.exit();
    });
}

module.exports = { exec };
