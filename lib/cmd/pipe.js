var Promise             = require('bluebird')
  , _                   = require('lodash')
  , { Producer }        = require('taskmill-core-tailf')
  ;

function exec(options = {}) {
  let { host = 'https://tailf.io/', token, meta } = options;

  let { rows, columns } = process.stdout
    , spec              = { type : 'stdout', rows, columns }
    ;

  Promise
    .try(() => {
      let stdio = (new Producer(host)).stream({ meta, spec });

      let type = 'stdout';

      process.stdin.on('data', (chunk) => stdio.write({ type, chunk, meta }));
      process.stdin.on('end', (chunk) => stdio.end({ type, meta }));

      // todo [akamel] make this optional
      // process.stdin.pipe(process.stdout);

      process.stdin.resume();

      stdio.on('end', () => {
        process.exit();
      });
    })
}

module.exports = { exec };
