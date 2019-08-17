import {IView3DPlugins} from '../plugins/IView3DPlugins';

export class View3DPluginsManager {
  public pluginsMap: Map<string, IView3DPlugins>;
  constructor() {
    this.pluginsMap = new Map<string, IView3DPlugins>();
  }
  addMultiplePlugins(items:any[]):void
  {
    for (let item of items) {
      this.addPlugins(item);
    }
  }
  addPlugins(PluginsClass: any): void {
    if (!PluginsClass.ID) throw `${PluginsClass.name}是一个无效的插件`;
    let ID: string = PluginsClass.ID;
    let plugins: IView3DPlugins = this.pluginsMap.get(ID);
    if (!plugins) {
      plugins = new PluginsClass();
      this.pluginsMap.set(ID, plugins);
    }
  }
  removePlugins(PluginsClass: any): void {
    this.removePluginsByID(PluginsClass.ID);
  }
  public removePluginsByID(id: string): void {
    this.pluginsMap.delete(id);
  }
  public stopPlugins(PluginsClass: any): void {
    this.stopPluginsByID(PluginsClass.ID);
  }
  public stopPluginsByID(id: string): void {
    this.pluginsMap.get(id).stop();
  }
  public updatePlugins(PluginsClass: any, data?: any): void {
    this.updatePluginsByID(PluginsClass.ID, data);
  }
  public updatePluginsByID(id: string, data?: any): void {
    this.pluginsMap.get(id).update(data);
  }
  /**
   * 释放所有插件
   */
  public dispose():void
  {

  }
}
