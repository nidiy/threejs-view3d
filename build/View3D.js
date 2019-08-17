import * as THREE from 'three';
import { View3DPluginsManager } from './manager/View3DPluginsManager';
/**
 * 一个基础的3D视图类，集WebGLRenderer、 Camera、Scene于一体用于快速创建3D实例
 */
export class View3D {
    /**
     * Canvas标签的id或Element对像
     * @param {string | HTMLCanvasElement} element
     */
    constructor(element) {
        /**
         * 是否自动更新
         * @type {boolean}
         */
        this.autoUpdate = true;
        this._needUpdate = true;
        this.timeID = -1;
        /**
         * 是否启用该视图
         * @type {boolean}
         */
        this._enable = true;
        this._visible = true;
        if (element instanceof HTMLCanvasElement) {
            this._canvas = element;
        }
        else {
            this._canvas = document.getElementById(element);
        }
        this.init();
    }
    get enable() {
        return this._enable;
    }
    set enable(value) {
        this._enable = value;
    }
    /**
     * 该视图的 HTMLCanvasElement
     * @returns {HTMLCanvasElement}
     */
    get canvas() {
        return this._canvas;
    }
    /**
     * 该视图的场景
     * @returns {Scene}
     */
    get scene() {
        return this._scene;
    }
    set scene(value) {
        this._scene = value;
    }
    /**
     * 该视图的相机
     * @returns {Camera}
     */
    get camera() {
        return this._camera;
    }
    set camera(value) {
        this._camera = value;
    }
    /**
     * 是否显示该3D视图 对应canvas的 style.visibility (true:visible,false:hidden)
     * @returns {boolean}
     */
    get visible() {
        return this._visible;
        this.canvas.style.visibility = 'visible';
        this.start();
    }
    set visible(value) {
        if (this._visible === value)
            return;
        this._visible = value;
        if (this._visible) {
            this.canvas.style.visibility = 'visible';
            this.start();
        }
        else {
            this.stop();
            this.canvas.style.visibility = 'hidden';
        }
    }
    /**
     * 需要更新舞台
     */
    needUpdate() {
        this._needUpdate = true;
    }
    /**
     * 开始启动3D视图
     */
    start() {
        this.initPlugins();
        if (this.renderer) {
            this.render();
        }
    }
    initPlugins() {
        this.pluginsManager.pluginsMap.forEach(plugins => {
            plugins.start(this);
        });
    }
    /**
     * 停止该视图
     */
    stop() {
        cancelAnimationFrame(this.timeID);
    }
    /**
     * 设置视窗大小
     * @param {number} width
     * @param {number} height
     */
    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        this.renderer.setSize(width, height);
        if (this.camera instanceof THREE.PerspectiveCamera) {
            this.camera.aspect = this.canvas.width / this.canvas.height;
            this.camera.updateProjectionMatrix();
        }
        this.needUpdate();
    }
    /**
     * 设置视窗的位置
     * @param {number} left
     * @param {number} top
     */
    setPosition(left, top) {
        this.canvas.style.left = left + 'px';
        this.canvas.style.top = top + 'px';
        this.needUpdate();
    }
    /**
     * 获取3D视图快照数据
     * @returns {string}
     */
    snapshot(type = 'image/jpeg') {
        return this.renderer.domElement.toDataURL(type);
    }
    init() {
        this._pluginsManager = new View3DPluginsManager();
        this.initScene();
        this.initCamera();
        this.initRenderer();
        this.initLight();
    }
    get pluginsManager() {
        return this._pluginsManager;
    }
    initLight() {
        /**
         * 增加环境光源。
         */
        this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.70);
        this.scene.add(this.ambientLight);
    }
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this._canvas,
            antialias: true
        });
        this.renderer.autoClear = false;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0xEEEEEE);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    initScene() {
        this._scene = new THREE.Scene();
    }
    /**
     * 默认使用透视相机
     */
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(View3D.DEFAULT_FOV, this._canvas.width / this._canvas.height, View3D.DEFAULT_NEAR, View3D.DEFAULT_FAR);
    }
    /**
     * 渲染场景
     */
    onRender() {
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
    }
    render() {
        this.timeID = requestAnimationFrame(this.render.bind(this));
        if (!this.enable)
            return;
        if (this._needUpdate || this.autoUpdate) {
            this.onRender();
            this._needUpdate = false;
        }
    }
}
View3D.DEFAULT_FAR = 40000;
View3D.DEFAULT_NEAR = 1;
View3D.DEFAULT_FOV = 75;
