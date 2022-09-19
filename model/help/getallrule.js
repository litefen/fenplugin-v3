import fs from 'fs'
import YAML from 'yaml'
import config from '../config/config.js'

const _path = process.cwd()
let path_plugin = `${_path}/plugins`
/** 小雪帮助配置文件 */
let xiaoxuehelp = config.getdefault_config('help', 'help')
/** 读取所有的插件目录 */
let plugins = fs.readdirSync(path_plugin, 'utf8').filter(file => {
    if (!file.endsWith('.gitignore')) {
        return true
    }
})

/** 读取每个插件包里的index.js文件 */
for (let i in plugins) {
    /** 如果是example文件夹 */
    if (plugins[i] === 'example') {
        /** 读取文件夹 */
        let examples = fs.readdirSync(`${path_plugin}/${plugins[i]}`).filter(file => file.endsWith('.js'))
        /** 读取文件 */
        let help = {
            group: '云崽插件功能',
            list: []
        }
        for (let j in examples) {
            let example = fs.readFileSync(`${path_plugin}/${plugins[i]}/${examples[j]}`, 'utf8')
            let reg = /reg: ['|"][\S]*['|"]/g
            let rules = example.match(reg)
            let obj = {
                icon: 'role',
                title: '',
                desc: ''
            }
            for (let k in rules) {
                if (rules[k] === "reg: ''" || rules[k] === 'reg: ""') {
                    rules.splice(k, 1)
                    continue
                } else {
                    rules[k] = rules[k].replace("reg:", '')
                    rules[k] = rules[k].replace("^", '')
                    rules[k] = rules[k].replace("$", '')
                    rules[k] = rules[k].replace(/('|")/g, '')
                    rules[k] = rules[k].replace(/[\s]*/, '')
                    if (rules[k] !== '') {
                        obj.title += ` ${rules[k]}`
                    }
                }
            }
            if (rules !== null) {
                help.list.push(obj)
            }
        }
        xiaoxuehelp.push(help)
    }
    /** 其他文件夹找apps文件夹即可 */
    else {
        if (plugins[i] === 'other' || plugins[i] === 'system' || plugins[i] === 'xiaoxue-plugin' || plugins[i] === 'genshin') {
            continue
        }
        /** 读取文件夹 */
        let apps = fs.readdirSync(`${path_plugin}/${plugins[i]}/apps`).filter(app => app.endsWith('.js'))
        /** 读取文件 */
        let help = {
            group: `${plugins[i]}插件功能`,
            list: []
        }
        for (let j in apps) {
            let app = fs.readFileSync(`${path_plugin}/${plugins[i]}/apps/${apps[j]}`, 'utf8')
            let reg = /reg: ('|")[\S]*('|")/g
            let rules = app.match(reg)
            let obj = {
                icon: 'role',
                title: '',
                desc: ''
            }
            for (let k in rules) {
                if (rules[k] === "reg: ''" || rules[k] === 'reg: ""') {
                    rules.splice(k, 1)
                    continue
                } else {
                    rules[k] = rules[k].replace("reg:", '')
                    rules[k] = rules[k].replace("^", '')
                    rules[k] = rules[k].replace("$", '')
                    rules[k] = rules[k].replace(/('|")/g, '')
                    rules[k] = rules[k].replace(/[\s]*/, '')
                    if (rules[k] !== '') {
                        obj.title += ` ${rules[k]}`
                    }
                }
            }
            if (rules != null) {
                if (rules.length != 0) {
                    help.list.push(obj)
                }
            }
        }
        xiaoxuehelp.push(help)
    }
}

fs.writeFileSync(`${path_plugin}/xiaoxue-plugin/config/config/help/help.yaml`, YAML.stringify(xiaoxuehelp), 'utf8')