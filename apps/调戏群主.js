import plugin from '../../../lib/plugins/plugin.js'
import { segment } from "oicq";

const _path = process.cwd()
export class qunzhu extends plugin {
  constructor() {
    super({
      name: 'qunzhu',
      dsc: '给发送群主：女装|写真|私房的人 自动禁言一分钟',
      event: 'message',
      priority: 50,
      rule: [
        {
          reg: '^#*(小粉|群主|䒕粉)(女装|写真|私房|涩涩|色色|泡水|瑟瑟|涩涩，|照片|私房照|女装照|是男同|是男酮)$',
          fnc: 'qunzhuxiezhen'
        }
        ,
        {
          reg: '^#*(女装|写真|私房|涩涩|色色|泡水|男同)小粉$',
          fnc: 'nvzhuangqunzhu'
        }
      ]
    })
  }

  //群主写真
  async qunzhuxiezhen(e) {
    /** 回复 */
    this.reply('调戏群主，通通禁闭室报道！', true, { at: true })
    if (e.isGroup) {
      e.group.muteMember(e.user_id, 300)
    }
    let url = `${_path}/plugins/fenplugin-v3/resources/global/img/番茄炒蛋拳.gif`
    let msg = [
      segment.image(url),
    ];
    e.reply(msg);
  }
//反过来写真群主
  async nvzhuangqunzhu(e) {
    /** 回复 */
    this.reply('调戏群主，通通禁闭室报道！', true, { at: true })
//群禁言，禁言功能默认300=五分钟
    if (e.isGroup) {
      e.group.muteMember(e.user_id, 300)
    }
//发送表情包地址
    let url = `${_path}/plugins/fenplugin-v3/resources/global/img/番茄炒蛋拳.gif`
    let msg = [
      segment.image(url),
    ];
    e.reply(msg);
  }
}
