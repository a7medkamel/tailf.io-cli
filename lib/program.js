var program   = require('commander')
  , _         = require('lodash')
  , cmd_pipe  = require('./cmd/pipe')
  , cmd_spawn = require('./cmd/spawn')
  ;

// ls . | tailf.io
function exec() {
  program
    .version('0.1.0')
    .option('-h, --host [value]', 'tailf.io host')
    .option('-t, --token [value]', 'token')
    .option('-m, --meta [value]', 'metadata object', JSON.parse)
    .option('-p, --pipe', 'pipe output back to terminal')
    .option('-k, --keep-open', 'keep log open')
    .option('-o, --id [value]', 'output log id')
    .arguments('[cmd...]')
    .parse(process.argv);

  let { host, token, meta, pipe, id, keepOpen : keep_open, args } = program;

  if (_.size(args)) {
    return cmd_spawn.exec({ host, token, meta, id, keep_open, args });
  }

  return cmd_pipe.exec({ host, token, meta, pipe, id, keep_open });
}

module.exports = {
    exec
};
