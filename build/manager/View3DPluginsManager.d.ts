import { IView3DPlugins } from '../plugins/IView3DPlugins';
export declare class View3DPluginsManager {
    pluginsMap: Map<string, IView3DPlugins>;
    constructor();
    addMultiplePlugins(items: any[]): void;
    addPlugins(PluginsClass: any): void;
    removePlugins(PluginsClass: any): void;
    removePluginsByID(id: string): void;
    stopPlugins(PluginsClass: any): void;
    stopPluginsByID(id: string): void;
    updatePlugins(PluginsClass: any, data?: any): void;
    updatePluginsByID(id: string, data?: any): void;
    /**
     * 释放所有插件
     */
    dispose(): void;
}
