var program   = require('commander')
  , cmd_pipe  = require('./cmd/pipe')
  ;

// ls . | tailf.io
function exec() {
  program
    .version('0.1.0')
    .option('-h, --host [value]', 'tailf.io host')
    .option('-t, --token [value]', 'token')
    .option('-m, --meta [value]', 'metadata object', JSON.parse)
    .parse(process.argv);

  let { host, token, meta } = program;

  return cmd_pipe.exec({ host, token, meta });
}

module.exports = {
    exec
};
