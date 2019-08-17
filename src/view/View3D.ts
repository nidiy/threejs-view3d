import * as THREE from 'three';
import {View3DPluginsManager} from './manager/View3DPluginsManager';

/**
 * 一个基础的3D视图类，集WebGLRenderer、 Camera、Scene于一体用于快速创建3D实例
 */
export class View3D {
  public static readonly DEFAULT_FAR:number=40000;
  public static readonly DEFAULT_NEAR:number=1;
  public static readonly DEFAULT_FOV:number=75;
  /**
   * 是否自动更新
   * @type {boolean}
   */
  public autoUpdate: boolean = true;
  public renderer: THREE.WebGLRenderer;
  protected _needUpdate: boolean = true;
  protected timeID: number = -1;
  private _pluginsManager:View3DPluginsManager;

  /**
   * Canvas标签的id或Element对像
   * @param {string | HTMLCanvasElement} element
   */
  constructor(element: string | HTMLCanvasElement) {
    if (element instanceof HTMLCanvasElement) {
      this._canvas = element;
    } else {
      this._canvas = document.getElementById(element) as HTMLCanvasElement;
    }
    this.init();
  }
  /**
   * 是否启用该视图
   * @type {boolean}
   */
  private _enable: boolean = true;

  get enable(): boolean {
    return this._enable;
  }

  set enable(value: boolean) {
    this._enable = value;
  }

  private _canvas: HTMLCanvasElement;
  /**
   * 该视图的 HTMLCanvasElement
   * @returns {HTMLCanvasElement}
   */
  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  private _scene: THREE.Scene;
  /**
   * 该视图的场景
   * @returns {Scene}
   */
  get scene(): THREE.Scene {
    return this._scene;
  }

  set scene(value: THREE.Scene) {
    this._scene = value;
  }

  protected _camera: THREE.Camera;
  /**
   * 该视图的相机
   * @returns {Camera}
   */
  get camera(): THREE.Camera {
    return this._camera;
  }

  set camera(value: THREE.Camera) {
    this._camera = value;
  }

  protected _visible:boolean=true;
  /**
   * 是否显示该3D视图 对应canvas的 style.visibility (true:visible,false:hidden)
   * @returns {boolean}
   */
  public get visible():boolean {
    return this._visible;
    this.canvas.style.visibility = 'visible';
    this.start();
  }
  public set visible(value:boolean) {
    if(this._visible===value) return;
    this._visible=value;
    if(this._visible)
    {
      this.canvas.style.visibility = 'visible';
      this.start();
    }else
    {
      this.stop();
      this.canvas.style.visibility = 'hidden';
    }

  }
  /**
   * 需要更新舞台
   */
  public needUpdate(): void {
    this._needUpdate = true;
  }

  /**
   * 开始启动3D视图
   */
  public start(): void {
    this.initPlugins();
    if (this.renderer) {
      this.render();
    }
    
  }
  public initPlugins():void
  {
    this.pluginsManager.pluginsMap.forEach(plugins=>
      {
        plugins.start(this);
      });
  }

  /**
   * 停止该视图
   */
  public stop(): void {
    cancelAnimationFrame(this.timeID);
  }
  /**
   * 设置视窗大小
   * @param {number} width
   * @param {number} height
   */
  public setSize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
    this.renderer.setSize(width, height);
    if(this.camera instanceof THREE.PerspectiveCamera)
    {
      (<THREE.PerspectiveCamera>this.camera).aspect=this.canvas.width/this.canvas.height;
      (<THREE.PerspectiveCamera>this.camera).updateProjectionMatrix();
    }
    this.needUpdate();
  }

  /**
   * 设置视窗的位置
   * @param {number} left
   * @param {number} top
   */
  public setPosition(left: number, top: number): void {
    this.canvas.style.left = left + 'px';
    this.canvas.style.top = top + 'px';
    this.needUpdate();
  }

  /**
   * 获取3D视图快照数据
   * @returns {string}
   */
  snapshot(type: string = 'image/jpeg'): string {
    return this.renderer.domElement.toDataURL(type);
  }

  protected init(): void {
    this._pluginsManager=new View3DPluginsManager();
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initLight();
  }
  public get pluginsManager():View3DPluginsManager
  {
    return this._pluginsManager;
  }
  protected ambientLight:THREE.AmbientLight;
  protected initLight(): void {
    /**
     * 增加环境光源。
     */
    this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.70);
    this.scene.add(this.ambientLight);
  }
  protected initRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({
      canvas: <HTMLCanvasElement>this._canvas,
      antialias: true
    });
    this.renderer.autoClear = false;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xEEEEEE);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  protected initScene(): void {
    this._scene = new THREE.Scene();
  }

  /**
   * 默认使用透视相机
   */
  protected initCamera(): void {
    this.camera = new THREE.PerspectiveCamera(View3D.DEFAULT_FOV, this._canvas.width / this._canvas.height, View3D.DEFAULT_NEAR, View3D.DEFAULT_FAR);
  }
  /**
   * 渲染场景
   */
  public onRender(): void {
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
  }

  private render(): void {
    this.timeID = requestAnimationFrame(this.render.bind(this));
    if (!this.enable) return;
    if (this._needUpdate || this.autoUpdate) {
      this.onRender();
      this._needUpdate = false;
    }
  }

}
