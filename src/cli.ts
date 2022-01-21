/** 
 * cli 
 * @description cli入口
 * @author xaiowei.rw 
 * @creat 2022-01-18 23:06:32 
 */
import yParser from 'yargs-parser'

export default () => {
  const args = yParser(process.argv.slice(2))

  // print version
  if (args.v || args.version) {
    console.log(require('../package.json').version)
    process.exit(0)
  }

  const _ = args._
  const command = _[0]
  if (command) {
    // instanceCore(command, args)
  } else {
    if (args.h || args.help) {
      [
        'Usage: rawcli <command> [options]',
        '',
        'Options:',
        '  -v, --version       output the version number',
        '  -h, --help          output usage information',
        '',
        'Commands:',
        '  create              Create page for project',
        '  build               Build a project with options',
        '  dev                 Develop a project with options',
      ].forEach(str => console.log(str))
    }
  }
}

