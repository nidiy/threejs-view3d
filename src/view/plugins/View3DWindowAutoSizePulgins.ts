import {IPluginsData, IView3DPlugins, PluginsStatus} from './IView3DPlugins';
import {View3D} from '../View3D';

export class View3DWindowAutoSizePulgins implements IView3DPlugins {
  public static readonly ID: string = 'com.plugins.windowautosize';
  public status: PluginsStatus = PluginsStatus.STOP;
  private view: View3D;

  start(view: View3D): void {
    this.view=view;
    this.status = PluginsStatus.RUNING;
    window.removeEventListener('resize', this.onResizeHandler);
    window.addEventListener('resize', this.onResizeHandler);
    this.onResizeHandler(null);
  }

  private onResizeHandler = (event) => {
    this.view.setSize(window.innerWidth, window.innerHeight);
  };

  stop(): void {
    window.removeEventListener('resize', this.onResizeHandler);
    this.view = null;
    this.status = PluginsStatus.STOP;
  }

  update(data?: any): void {

  }

  public getData(): IPluginsData {
    return {id: View3DWindowAutoSizePulgins.ID, status: this.status, data: null};
  }
}
