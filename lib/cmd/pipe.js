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
      let prod  = new Producer(host)
        , stdio = prod.stream({ meta, spec });

      let type = 'stdout';

      prod.on('connect', (socket) => {
console.log(
`piping to:
json - ${prod.uri_json()}
play - ${prod.uri_play()}`
);
      });

      process.stdin.setEncoding('utf8');
      process.stdin.on('data', (chunk) => stdio.write({ type, chunk, meta }));
      process.stdin.on('end', (chunk) => stdio.end({ type, meta }));

      // process.stdin.resume();
      // todo [akamel] make this optional
      // process.stdin.pipe(process.stdout);

      stdio.on('end', () => {
        process.exit();
      });
    })
}

module.exports = { exec };
