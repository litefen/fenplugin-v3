import plugin from '../../../../lib/plugins/plugin.js'
import puppeteer from '../other/puppeteer.js'
import Help from './help.js'
import md5 from 'md5'

let helpData = {
    md5: '',
    img: ''
}

export class xiaoxuehelp extends plugin {
    constructor(e) {
        super({
            name: '小雪帮助',
            dsc: '小雪帮助',
            event: 'message',
            priority: 499,
            rule: [
                {
                    reg: '^(#|小雪)*(命令|帮助|菜单|help|说明|功能|指令|使用说明)$',
                    fnc: 'xiaoxuehelp'
                }
            ]
        })
    }

    async xiaoxuehelp() {
        let data = await Help.get(this.e)
        if (!data) return
        let img = await this.cache(data)
        await this.reply(img)
    }

    async cache(data) {
        let tmp = md5(JSON.stringify(data))
        if (helpData.md5 == tmp) return helpData.img

        helpData.img = await puppeteer.screenshot('help', data)
        helpData.md5 = tmp

        return helpData.img
    }
}
