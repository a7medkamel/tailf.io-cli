var Promise             = require('bluebird')
  , _                   = require('lodash')
  , term                = require('terminal-kit').terminal
  , { Producer }        = require('taskmill-core-tailf')
  ;

function exec(options = {}) {
  let { host = 'https://tailf.io/', token, meta, pipe, keep_open } = options;

  Promise
    .try(() => {
      let { rows, columns } = process.stdout;

      let prod  = new Producer(host, { rows, columns, meta, keep_open })
        , stdio = prod.stream();

      let type = 'stdout';

      prod
        .uri()
        .then((uri) => {
          term.bgMagenta.white(` tailf.io > `).bgDefaultColor().defaultColor(` ${uri}\n`);
        });

      process.stdin.setEncoding('utf8');
      process.stdin.on('data', (chunk) => stdio.write({ type, chunk }));
      process.stdin.on('end', (chunk) => stdio.end({ type }));

      if (pipe) {
        process.stdin.pipe(process.stdout);
      }

      stdio.on('end', () => {
        process.exit();
      });
    })
}

module.exports = { exec };
