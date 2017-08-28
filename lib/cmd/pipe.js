var Promise             = require('bluebird')
  , _                   = require('lodash')
  , { Producer }        = require('taskmill-core-tailf')
  ;

function exec(options = {}) {
  let { host = 'https://tailf.io/', token } = options;

  Promise
    .try(() => {
      let stdio = (new Producer(host)).stream({});

      process.stdin.on('data', (chunk) => stdio.write({ chunk, meta : { type : 'stdout' }}));
      process.stdin.on('end', (chunk) => stdio.end({ meta : { type : 'stdout' }}));

      // todo [akamel] make this optional
      // process.stdin.pipe(process.stdout);

      process.stdin.resume();

      stdio.on('end', () => {
        process.exit();
      });
    })
}

module.exports = { exec };
