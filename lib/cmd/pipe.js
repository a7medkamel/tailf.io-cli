var Promise             = require('bluebird')
  , _                   = require('lodash')
  , term                = require('terminal-kit').terminal
  , { Producer }        = require('tailf.io-sdk')
  ;

function exec(options = {}) {
  let { host = 'https://tailf.io/', id, token, meta, pipe, keep_open } = options;

  Promise
    .try(() => {
      let { rows, columns } = process.stdout;

      let prod  = new Producer({ id, host, rows, columns, meta, keep_open })
        , stdio = prod.stream('stdout');

      prod
        .uri()
        .then((uri) => {
          term.bgMagenta.white(` tailf.io > `).bgDefaultColor().defaultColor(` ${uri}\n`);
        });

      process.stdin.setEncoding('utf8');

      process.stdin.pipe(stdio);

      if (pipe) {
        process.stdin.pipe(process.stdout);
      }

      stdio.on('end', () => {
        process.exit();
      });
    })
}

module.exports = { exec };
