import config from '../config/config.js'
import schedule from 'node-schedule'
import { randomNum } from '../other/tools.js'

/** 获取每日请安配置 */
let dailygreetconfig = config.getconfig('dailygreet', 'dailygreet')
/** 白名单qq群 */
let whitelist = dailygreetconfig.whitelist
/** 请安时间段 */
/** 获取有几个时间段 */
let time = dailygreetconfig.time
let keys = Object.keys(time)
/** 定时任务列表 */
let dailygreets = []
/** 根据每个群聊绑定每个时间段的定时任务 */
for (let i = 0; i < whitelist.length; i++) {
    for (let j = 0; j < keys.length; j++) {
        /** 生成cron表达式 */
        let atime = time[keys[j]]
        let hour = randomNum(atime.starthour, atime.endhour)
        let minute = randomNum(atime.startminute, atime.endminute)
        let second = randomNum(atime.startsecond, atime.endsecond)
        let cron = `${second} ${minute} ${hour} * * ?`
        /** 随机获取对应时间段内的请安文案 */
        let greetcontents = dailygreetconfig.greetcontent[keys[j]]
        let greetcontent = greetcontents[randomNum(0, greetcontents.length - 1)]
        /** 创建定时任务 */
        schedule.scheduleJob(cron, () => {
            let group = Bot.pickGroup(whitelist[i])
            group.sendMsg(greetcontent)
        })
        if (minute <= 9) {
            minute = `0${minute}`
        }
        if (second <= 9) {
            second = `0${second}`
        }
        let name = `${whitelist[i]}:${keys[j]} ${hour}:${minute}:${second}`
        dailygreets.push(name)
    }
}

export { dailygreets }
