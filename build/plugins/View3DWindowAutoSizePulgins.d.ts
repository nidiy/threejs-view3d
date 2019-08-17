import { IPluginsData, IView3DPlugins, PluginsStatus } from './IView3DPlugins';
import { View3D } from '../View3D';
export declare class View3DWindowAutoSizePulgins implements IView3DPlugins {
    static readonly ID: string;
    status: PluginsStatus;
    private view;
    start(view: View3D): void;
    private onResizeHandler;
    stop(): void;
    update(data?: any): void;
    getData(): IPluginsData;
}
