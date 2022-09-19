import fs from 'fs'

const _path = process.cwd()
let pathdef = `${_path}/plugins/xiaoxue-plugin/config/default_config/help/help.yaml`
let path = `${_path}/plugins/xiaoxue-plugin/config/config/help/help.yaml`

let xiaoxuedefaulthelp = fs.readFileSync(pathdef, 'utf8')

fs.writeFileSync(path, xiaoxuedefaulthelp, 'utf8')