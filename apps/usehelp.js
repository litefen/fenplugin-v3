import plugin from '../../../lib/plugins/plugin.js'

export class usehelp extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '粉酱插件使用帮助',
            /** 功能描述 */
            dsc: '发送粉酱插件使用帮助文档',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 5000,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: '^粉酱使用帮助$',
                    /** 执行方法 */
                    fnc: 'usehelp'
                }
            ]
        })
    }

    async usehelp(e) {
        logger.info('[用户命令]', e.msg)

        let msg = [
            `【腾讯文档】粉酱插件配置教程\nhttps://blog.litefen.com/all/yunzaihelp.html`
        ]

        /** 最后回复消息 */
        await this.reply(msg)
    }
} 