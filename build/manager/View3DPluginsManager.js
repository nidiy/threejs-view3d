export class View3DPluginsManager {
    constructor() {
        this.pluginsMap = new Map();
    }
    addMultiplePlugins(items) {
        for (let item of items) {
            this.addPlugins(item);
        }
    }
    addPlugins(PluginsClass) {
        if (!PluginsClass.ID)
            throw `${PluginsClass.name}是一个无效的插件`;
        let ID = PluginsClass.ID;
        let plugins = this.pluginsMap.get(ID);
        if (!plugins) {
            plugins = new PluginsClass();
            this.pluginsMap.set(ID, plugins);
        }
    }
    removePlugins(PluginsClass) {
        this.removePluginsByID(PluginsClass.ID);
    }
    removePluginsByID(id) {
        this.pluginsMap.delete(id);
    }
    stopPlugins(PluginsClass) {
        this.stopPluginsByID(PluginsClass.ID);
    }
    stopPluginsByID(id) {
        this.pluginsMap.get(id).stop();
    }
    updatePlugins(PluginsClass, data) {
        this.updatePluginsByID(PluginsClass.ID, data);
    }
    updatePluginsByID(id, data) {
        this.pluginsMap.get(id).update(data);
    }
    /**
     * 释放所有插件
     */
    dispose() {
    }
}
