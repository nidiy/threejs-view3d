import { View3D } from '../View3D';
/**
 * 插件当前的状态
 */
export declare enum PluginsStatus {
    STOP = 0,
    RUNING = 1
}
/**
 * 插件当前的数据接口
 */
export interface IPluginsData {
    id: string;
    status: PluginsStatus;
    data: any;
}
/**
 * 3D视图插件
 */
export interface IView3DPlugins {
    status: PluginsStatus;
    start(view3d: View3D): void;
    stop(): void;
    update(data?: any): void;
    getData(): IPluginsData;
}
