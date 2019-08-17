import { IPluginsData, IView3DPlugins, PluginsStatus } from './IView3DPlugins';
import { View3D } from '../View3D';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export declare class OrbitControlPlugins implements IView3DPlugins {
    static readonly ID: string;
    status: PluginsStatus;
    orbitControls: OrbitControls;
    private view3d;
    constructor();
    start(view: View3D): void;
    protected initControls(): void;
    drawGrid(): void;
    protected initCameraPosition(): void;
    stop(): void;
    update(data?: any): void;
    getData(): IPluginsData;
}
