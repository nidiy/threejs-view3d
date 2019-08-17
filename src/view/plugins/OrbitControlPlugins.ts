import {IPluginsData, IView3DPlugins, PluginsStatus} from './IView3DPlugins';
import {View3D} from '../View3D';
import {LineBasicMaterial} from 'three';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export class OrbitControlPlugins implements IView3DPlugins {
  public static readonly ID: string = 'OrbitControlPlugins';
  public status: PluginsStatus = PluginsStatus.STOP;
  public orbitControls: OrbitControls = null;
  private view3d: View3D;

  constructor() {

  }

  public start(view: View3D): void {
    this.status = PluginsStatus.RUNING;
    this.view3d = view;
    this.initCameraPosition();
    this.initControls();
    this.drawGrid();
  }

  protected initControls(): void {
    if (this.orbitControls == null) this.orbitControls = new OrbitControls(this.view3d.camera, this.view3d.canvas);
    this.orbitControls.minDistance = 10;
    this.orbitControls.maxDistance = View3D.DEFAULT_FAR;
    this.orbitControls.rotateSpeed = 1.0;
    this.orbitControls.zoomSpeed = 1.2;
    this.orbitControls.target.set(0, 0, 0);
    this.orbitControls.enabled = true;
    this.view3d.camera.lookAt(this.orbitControls.target);
  }

  public drawGrid() {
    let grid = new THREE.GridHelper(12000, 12000 / 100, 0xcecece, 0xcecece);
    (grid.material as LineBasicMaterial).depthWrite = false;
    this.view3d.scene.add(grid);
  }

  protected initCameraPosition(): void {
    this.view3d.camera.position.set(0, 1000, 1000);
    this.view3d.camera.up.set(0, 1, 0);
    if(this.view3d.camera instanceof THREE.PerspectiveCamera)
    {
      (<THREE.PerspectiveCamera>this.view3d.camera).aspect=this.view3d.canvas.width/this.view3d.canvas.height;
      (<THREE.PerspectiveCamera>this.view3d.camera).updateProjectionMatrix();
    }
    this.view3d.needUpdate();
  }

  public stop(): void {
    this.orbitControls.enabled=false;
    this.status = PluginsStatus.STOP;
  }

  update(data?: any): void {

  }

  getData(): IPluginsData {
    return {id: OrbitControlPlugins.ID, status: this.status, data: null};
  }
}
