var program   = require('commander')
  , cmd_pipe  = require('./cmd/pipe')
  ;

// ls . | tailf.io
function exec() {
  program
    .version('0.1.0')
    .option('-h, --host [value]', 'tailf.io host')
    .parse(process.argv);

  let { host, token } = program;

  return cmd_pipe.exec({ host, token });
}

module.exports = {
    exec
};
