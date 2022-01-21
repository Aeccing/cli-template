
import semver, { major } from 'semver'
import updater from 'update-notifier'
// import spawn from 'cross-spawn';
// import signale from 'signale'
import chalk from 'chalk'
// import open from 'open'
import { utils } from '../utils'

// TODO 目前升级较为频繁，调整为 10 分钟间隔
const option = { updateCheckInterval: 1000 * 60 * 10, shouldNotifyInNpmScript: true }
const notifyOpt = {
  defer: false,
  message: `{packageName} {currentVersion} {latestVersion} {updateCommand}`
}
// 升级引导文档链接
const docUrl = 'https://come-future.yuque.com/fu-xt/m-development/cvvvrv'
const docTip = `升级涉及到一些调整，可参考这个文档:\n${docUrl}`

export default async (): Promise<boolean> => {
  const pkg = require('../../package.json')
  const _option = { ...option, pkg }
  const m = major(pkg.version)

  const latestNotifier = updater(_option)
  const currentNotifier = updater({ ..._option, distTag: `${m}.x` })
  let isAutoUpdate: 'y' | 'n' | '' = ''

  if (
    latestNotifier.update?.latest &&
    major(latestNotifier.update?.latest) === m &&
    semver.lt(pkg.version, latestNotifier.update?.latest)
  ) {
    latestNotifier.notify({ ...notifyOpt, message: createUpdateMsg(m) })
    latestNotifier.notify({ ...notifyOpt, message: docTip })
    // isAutoUpdate = await utils.select<'y' | 'n'>('是否要自动升级', [{ name: '是', value: 'y' }, { name: '否', value: 'n' }])
    // TODO 临时
    isAutoUpdate = await utils.select<'y' | 'n'>('有新版本，将会自动升级', [{ name: '是', value: 'y' }])
  } else if (
    currentNotifier.update?.latest &&
    major(currentNotifier.update?.latest) === m &&
    semver.lt(pkg.version, currentNotifier.update?.latest)
  ) {
    currentNotifier.notify({ ...notifyOpt, message: createUpdateMsg(m) })
    latestNotifier.notify({ ...notifyOpt, message: docTip })
    // isAutoUpdate = await utils.select<'y' | 'n'>('是否要自动升级', [{ name: '是', value: 'y' }, { name: '否', value: 'n' }])
    // TODO 临时
    isAutoUpdate = await utils.select<'y' | 'n'>('有新版本，将会自动升级', [{ name: '是', value: 'y' }])
  }

  // if (!isAutoUpdate || isAutoUpdate === 'n') return true
  // TODO 临时
  if (!isAutoUpdate) return true

  // 自动升级
  // const install = spawn.sync('fnpm', ['i', '-g', `${pkg.name}@^${m}`], { stdio: 'inherit' })
  // if (install.status !== 0) {
  //   signale.error(chalk.red('安装失败，请手动尝试安装'))
  //   process.exit(1)
  // }
  // signale.success(chalk.green('升级完成，请重新启动命令'))
  // await open(docUrl)
  // process.exit(0)
}

function createUpdateMsg(major: number) {
  const a = '脚手架: iron\n'
  const b = '包名: {packageName}\n'
  const c = '当前版本: {currentVersion}\n'
  const d = `最新 ${major}.x 版本: {latestVersion}\n`
  const e = `运行 fnpm i -g @cffe/iron@^${major} 进行升级\n`
  const f = '升级遇到问题，请联系 @莫停'

  return `${a}${b}${c}${d}${e}${f}`
}
