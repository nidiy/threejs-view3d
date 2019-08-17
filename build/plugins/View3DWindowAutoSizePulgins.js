import { PluginsStatus } from './IView3DPlugins';
export class View3DWindowAutoSizePulgins {
    constructor() {
        this.status = PluginsStatus.STOP;
        this.onResizeHandler = (event) => {
            this.view.setSize(window.innerWidth, window.innerHeight);
        };
    }
    start(view) {
        this.view = view;
        this.status = PluginsStatus.RUNING;
        window.removeEventListener('resize', this.onResizeHandler);
        window.addEventListener('resize', this.onResizeHandler);
        this.onResizeHandler(null);
    }
    stop() {
        window.removeEventListener('resize', this.onResizeHandler);
        this.view = null;
        this.status = PluginsStatus.STOP;
    }
    update(data) {
    }
    getData() {
        return { id: View3DWindowAutoSizePulgins.ID, status: this.status, data: null };
    }
}
View3DWindowAutoSizePulgins.ID = 'com.plugins.windowautosize';
