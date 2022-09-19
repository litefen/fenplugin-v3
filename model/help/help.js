import base from './base.js'
import cfg from '../../../../lib/config/config.js'
import config from '../config/config.js'

export default class Help extends base {
    constructor(e, model) {
        super(e)
        this.model = model
    }

    static async get(e, module, saveId) {
        let html = new Help(e, saveId)
        return await html.getData(module, saveId)
    }

    async getData(module, saveId) {
        let helpData = config.getconfig('help', module)

        return {
            ...this.screenData,
            saveId: saveId,
            version: cfg.package.version,
            helpData,
            pluginversion: config.getdefault_config('xiaoxue', 'plugininfo').version
        }
    }
}
