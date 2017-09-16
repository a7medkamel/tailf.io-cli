var Promise             = require('bluebird')
  , _                   = require('lodash')
  , term                = require('terminal-kit').terminal
  , { Producer }        = require('taskmill-core-tailf')
  ;

function exec(options = {}) {
  let { host = 'https://tailf.io/', token, meta, pipe } = options;

  let { rows, columns } = process.stdout
    , spec              = { type : 'stdout', rows, columns }
    ;

  Promise
    .try(() => {
      let prod  = new Producer(host)
        , stdio = prod.stream({ meta, spec });

      let type = 'stdout';

      prod
        .uri()
        .then((uri) => {
          term.bgMagenta.white(` tailf.io > `).bgDefaultColor().defaultColor(` ${uri}\n`);
        });
      // prod.on('connect', (socket) => {
      // });

      process.stdin.setEncoding('utf8');
      process.stdin.on('data', (chunk) => stdio.write({ type, token, chunk, meta }));
      process.stdin.on('end', (chunk) => stdio.end({ type, token, meta }));

      if (pipe) {
        process.stdin.pipe(process.stdout);
      }

      stdio.on('end', () => {
        process.exit();
      });
    })
}

module.exports = { exec };
