import plugin from '../../../lib/plugins/plugin.js'
import puppeteer from '../model/other/puppeteer.js'
import Help from '../model/help/help.js'
import md5 from 'md5'

/** 获取机器人名字 */
let botname = await redis.get('Yz:fen:config:botname')

let helpData = {
    md5: '',
    img: ''
}

export class fenhelp extends plugin {
    constructor(e) {
        super({
            name: '粉酱帮助',
            dsc: '粉酱帮助',
            event: 'message',
            priority: 499,
            rule: [
                {
                    reg: '^#?(#|粉酱)*(命令|帮助|菜单|help|说明|功能|指令|使用说明)$',
                    fnc: 'fenhelp'
                },
                {
                    reg: '^#设置粉酱帮助开启$',
                    fnc: 'openfenhelp'
                },
                {
                    reg: '^#设置粉酱帮助关闭$',
                    fnc: 'closefenhelp'
                }
            ]
        })
    }

    /** 制作转发内容 */
    async makeForwardMsg(title, msgs) {
        let nickname = Bot.nickname
        let userInfo = {
            user_id: Bot.uin,
            nickname
        }
        let forwardMsg = [
            {
                ...userInfo,
                message: title
            }
        ]
        for (let i in msgs) {
            forwardMsg.push({ ...userInfo, message: msgs[i] })
        }
        return forwardMsg
    }

    async makehelp_Yunzai(e) {
        let data = await Help.get(e, 'help-Yunzai', 'Yunzai')
        if (!data) return
        let img = await this.cache(data)
        return img
    }

    async makehelp_fen(e) {
        let data = await Help.get(e, 'help-fen', 'fen')
        if (!data) return
        let img = await this.cache(data)
        return img
    }

    async makehelp_example(e) {
        let data = await Help.get(e, 'help-example', 'example')
        if (!data) return
        let img = await this.cache(data)
        return img
    }

    async fenhelp(e) {
        if (await redis.get('Yz:fen:config:usefenhelp')) {
            let msgs = []
            await sleep(1000)
            let img_Yunzai = await this.makehelp_Yunzai(e)
            msgs.push(img_Yunzai)
            msgs.push('粉酱指令')
            await sleep(1000)
            let img_fen = await this.makehelp_fen(e)
            msgs.push(img_fen)
            msgs.push('其它指令')
            await sleep(1000)
            let img_example = await this.makehelp_example(e)
            msgs.push(img_example)
            let forwardmsg = await this.makeForwardMsg('云崽指令', msgs)
            let msg
            if (e.isGroup) {
                msg = await e.group.makeForwardMsg(forwardmsg)
            }
            else {
                msg = await e.friend.makeForwardMsg(forwardmsg)
            }
            e.reply(msg)
            return true
        }
        else {
            return false
        }
    }

    async openfenhelp(e) {
        if (e.isGroup) {
            if (!e.sender.role === 'owner' || !e.isMaster) {
                e.reply(`抱歉~${botname}只听群主和主人的~`)
                return
            }
            else {
                await redis.set('Yz:fen:config:usefenhelp', '1')
                e.reply('已开启~')
                return
            }
        }
        else {
            if (!e.isMaster) {
                e.reply(`抱歉~${botname}只听主人的~`)
                return
            }
            else {
                await redis.set('Yz:fen:config:usefenhelp', '1')
                e.reply('已开启~')
                return
            }
        }
    }

    async closefenhelp(e) {
        if (e.isGroup) {
            if (!e.sender.role === 'owner' || !e.isMaster) {
                e.reply(`抱歉~${botname}只听群主和主人的~`)
                return
            }
            else {
                await redis.del('Yz:fen:config:usefenhelp')
                e.reply('已关闭~')
                return
            }
        }
        else {
            if (!e.isMaster) {
                e.reply(`抱歉~${botname}只听主人的~`)
                return
            }
            else {
                await redis.del('Yz:fen:config:usefenhelp')
                e.reply('已关闭~')
                return
            }
        }
    }

    async cache(data) {
        let tmp = md5(JSON.stringify(data))
        if (helpData.md5 == tmp) return helpData.img
        helpData.img = await puppeteer.screenshot('help', data)
        helpData.md5 = tmp
        return helpData.img
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}