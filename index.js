import fs from 'fs'
import chalk from 'chalk'
import config from './model/config/config.js'
import cfg from '../../lib/config/config.js'

/** 获取最新版本的插件信息 */
const plugininfo_default = config.getdefault_config('fen', 'plugininfo')

await redis.set('Yz:fen:config:pluginname', plugininfo_default.pluginname)
await redis.set('Yz:fen:config:version', plugininfo_default.version)
await redis.set('Yz:fen:config:author', plugininfo_default.author)
await redis.set('Yz:fen:config:qq', plugininfo_default.qq)
await redis.set('Yz:fen:config:groupid', plugininfo_default.groupid)

/** 如果第一次使用粉酱插件，则初始化 */
if (!await redis.get('Yz:fen:config:notfirstusefen')) {
  // await redis.set('Yz:fen:config:usefenhelp', "1") // 默认使用粉酱版帮助
  // await redis.set('Yz:fen:config:botname', '粉酱') // 默认机器人名字为粉酱
  // 获取主人qq号
  let masterqq = cfg.getConfig('other').masterQQ[0]
  // 给主人发送配置教程
  Bot.pickFriend(masterqq).sendMsg(`欢迎使用粉酱插件V${plugininfo_default.version}\n配置教程\n粉酱插件配置教程\ncookie绑定指南：https://blog.litefen.com/all/bbscookie.html\n所有功能详细使用指南：https://blog.litefen.com/all/yunzaihelp.html`)
  await redis.set('Yz:fen:config:notfirstusefen', '1')
}

/** 检测更新 */
let currentversion = await redis.get('Yz:fen:config:version')
if (currentversion !== plugininfo_default.version) {
  /** 更新插件信息 */
  await redis.set('Yz:fen:config:version', plugininfo_default.version)
}

/** 获取当前版本插件信息 */
let currentplugininfo = await config.getcurrentplugininfo()

/** 输出粉酱插件信息 */
// logger.info(`~~~~~~~~~~~~~~~~~${chalk.bold('(⑅˃◡˂⑅)')}~~~~~~~~~~~~~~~~~`)
// logger.info(`~\t\t${chalk.yellow('欢迎使用' + currentplugininfo.pluginname + '插件')}`)
logger.info(`~\t\t${chalk.yellow('粉酱版本')}\t${chalk.green(currentplugininfo.version)}`)
// logger.info(`~\t\t${chalk.yellow('作者')}\t${chalk.blueBright(currentplugininfo.author)}`)
// logger.info(`~\t\t${chalk.yellow('联系qq')}\t${chalk.underline(currentplugininfo.qq)}`)
// logger.info(`~\t\t${chalk.yellow('加qq群')}\t${chalk.underline(currentplugininfo.groupid)}`)
// logger.info(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)

// 读取 /fenplugin-v3/apps 里的js文件名保存到数组里
const files = fs.readdirSync("./plugins/fenplugin-v3/apps").filter((file) => file.endsWith(".js"))
// 动态导入 /apps 里的 js 文件
let ret = []
files.forEach((file) => {
  ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')

  if (ret[i].status != 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
  }

  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}

export { apps }