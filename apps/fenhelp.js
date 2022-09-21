import plugin from '../../../lib/plugins/plugin.js'
import { segment } from "oicq";

const _path = process.cwd()
export class fenhelp extends plugin {
  constructor() {
    super({
      name: 'fenhelp',
      dsc: '小粉的同款帮助，插件地址',
      event: 'message',
      priority: 50,
      rule: [
        {
          reg: '^#*(粉酱|小粉)(帮助|命令|菜单|help|说明|功能|指令)$',
          fnc: 'fenhelp'
        },
        {
          reg: '^#*(粉酱|bot)(演示文档|使用帮助|使用说明|演示)$',
          fnc: 'fenhelp1'
        },
        {
          reg: '^#*(粉酱|bot)(演示文档|使用帮助|使用说明|演示)$',
          fnc: 'fenplugingithub'
        }

      ]
    })
  }

  //群主写真
  async fenhelp(e) {
    this.reply('发送【#粉酱使用帮助】查看每个功能的演示（补齐中。。。）', true, { at: true })
    /** 回复 */
    let url = `${_path}/plugins/fenplugin-v3/resources/img/help.png`
    
    let msg = [
      segment.image(url),];
    e.reply(msg);

  }

  async fenhelp1(e) {
    this.reply('cookie绑定指南：https://blog.litefen.com/all/bbscookie.html\n所有功能详细使用指南：https://blog.litefen.com/all/yunzaihelp.html',
     true, { at: true })
  }

  async fenplugingithub(e) {
    this.reply('粉酱fenplugin-v3插件\n项目地址：https://github.com/litefen/fenplugin-v3',
     true, { at: true })
  }
}
