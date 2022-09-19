import config from '../config/config.js'
import schedule from 'node-schedule'
import { randomNum } from '../other/tools.js'

/** 得到工作路径 */
const _path = process.cwd()
/** 得到宵禁配置 */
let curfews = config.getconfig('curfew', 'curfew')
/** 获取宵禁白名单群号 */
let whitelist = curfews.whitegrouplist
/** 获取机器人名字 */
let botname = await redis.get('Yz:xiaoxue:config:botname')

let curfewlist = []

/** 初始化宵禁配置 */
for (let i in whitelist) {
    curfew('opencurfew', whitelist[i].groupid)
    curfew('closecurfew', whitelist[i].groupid)
}

/**
 * 宵禁开关
 * @param type opencurfew 开启 一 closecurfew 关闭
 * @param groupid 群号 
 */
function curfew(type, groupid) {
    /** 得到宵禁配置 */
    let curfewconfig = curfews[type]
    /** 得到宵禁时间 */
    let hour = curfewconfig.time.hour
    let minute = curfewconfig.time.minute
    /** 如果分钟是58或59 */
    if (minute === 58 || minute === 59) {
        minute = randomNum(minute - 2, minute)
    }
    else {
        minute = randomNum(minute, minute + 2)
    }
    let second = curfewconfig.time.second
    /** 生成cron表达式 */
    let cron = `${second} ${minute} ${hour} * * ?`
    /** 补零 */
    if (minute <= 9) {
        minute = `0${minute}`
    }
    if (second <= 9) {
        second = `0${second}`
    }
    /** 得到宵禁提示文案 */
    let tipcontent = curfewconfig.tip
    /** 将提示文案中的机器人名字进行替换 */
    tipcontent = tipcontent.replace('小雪', botname)
    let groupcurfew = {
        type: type,
        groupqq: groupid,
        hour: hour,
        minute: minute,
        second: second
    }
    curfewlist.push(groupcurfew)
    /** 如果是开启宵禁 */
    if (type === 'opencurfew') {
        /** 创建定时任务 */
        schedule.scheduleJob(cron, () => {
            redis.set(`Yz:xiaoxue:curfewgroup:${groupid}`, "1")
            Bot.pickGroup(groupid).sendMsg(tipcontent)
        })
    }
    /** 如果是关闭宵禁 */
    else {
        /** 创建定时任务 */
        schedule.scheduleJob(cron, () => {
            redis.del(`Yz:xiaoxue:curfewgroup:${groupid}`)
            Bot.pickGroup(groupid).sendMsg(tipcontent)
        })
    }
}

export { curfewlist }
