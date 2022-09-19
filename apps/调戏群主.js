import plugin from '../../lib/plugins/plugin.js'

export class 群主 extends plugin {
    constructor () {
      super({
        name: '群主写真',
        dsc: '给发送群主：女装|写真|私房的人 自动禁言一分钟',
        /** https://oicqjs.github.io/oicq/#events */
        event: 'message',
        priority: 50,
        rule: [
            {
              reg: '^#*(小粉|群主)(女装|写真|私房|涩涩|色色|泡水|瑟瑟|涩涩，|照片|私房照|女装照|是男同|是男酮)$',
              fnc: '群主写真'
            },
            {
              reg: '^#*(女装|写真|私房|涩涩|色色|泡水|男同)小粉$',
              fnc: '群主写真'
            }
          ]
      })
    }

    //群主写真
    async 群主写真 () {
        let msg = [
            //@用户
            segment.at(e.user_id),
            //文本消息
            "\n调戏群主，通通禁闭室报道！",
            //图片
            segment.image('./plugins/fenplugin-v3/resources/global/img/番茄炒蛋拳.gif'),
          ];
          if (e.isGroup) {
            e.group.muteMember(e.user_id, 300);
            // 禁言功能默认五分钟
          }
          e.reply(msg);
          return true;
    }
    //涩涩群主
    async 写真群主 () {
        let msg = [
            //@用户
            segment.at(e.user_id),
            //文本消息
            "\n调戏群主，通通禁闭室报道！",
            //图片
            segment.image('./plugins/fenplugin-v3/resources/global/img/番茄炒蛋拳.gif'),
          ];
          if (e.isGroup) {
            e.group.muteMember(e.user_id, 300);
            // 禁言功能默认五分钟
          }
          e.reply(msg);
          return true;
    }
  }