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
    .option('-p, --pipe', 'pipe output back to terminal')
    .parse(process.argv);

  let { host, token, meta, pipe } = program;

  return cmd_pipe.exec({ host, token, meta, pipe });
}

module.exports = {
    exec
};
