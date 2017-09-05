var Promise             = require('bluebird')
  , _                   = require('lodash')
  , { Producer }        = require('taskmill-core-tailf')
  ;

function exec(options = {}) {
  let { host = 'https://tailf.io/', token } = options;

  Promise
    .try(() => {
      let stdio = (new Producer(host)).stream({});

      let { rows, columns } = process.stdout
        , meta              = { type : 'stdout', rows, columns }
        ;

      process.stdin.on('data', (chunk) => stdio.write({ chunk, meta }));
      process.stdin.on('end', (chunk) => stdio.end({ meta }));

      // todo [akamel] make this optional
      // process.stdin.pipe(process.stdout);

      process.stdin.resume();

      stdio.on('end', () => {
        process.exit();
      });
    })
}

module.exports = { exec };
