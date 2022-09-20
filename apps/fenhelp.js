import plugin from '../../../lib/plugins/plugin.js'
import { segment } from "oicq";
import { renderNum, render } from "../render.js";

const _path = process.cwd()
export class fenhelp extends plugin {
  constructor() {
    super({
      name: 'fenhelp',
      dsc: '小粉的同款帮助',
      event: 'message',
      priority: 50,
      rule: [
        {
          reg: '^#*(粉酱|小粉)(帮助|命令|菜单|help|说明|功能|指令|使用说明)$',
          fnc: 'fenhelp'
        }

      ]
    })
  }

  //群主写真
  async fenhelp(e) {
    /** 回复 */
    let url = [ (random(0, 3) <= 1)
        `${_path}/plugins/fenplugin-v3/resources/img/help.jpg`
    ]
    let msg = [
        "发送【#粉酱使用帮助】查看每个功能的演示（补齐中。。。）",
        segment.image(url),
    ];
    e.reply(msg);
    
  }
}
