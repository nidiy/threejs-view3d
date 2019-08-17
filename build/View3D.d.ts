import * as THREE from 'three';
import { View3DPluginsManager } from './manager/View3DPluginsManager';
/**
 * 一个基础的3D视图类，集WebGLRenderer、 Camera、Scene于一体用于快速创建3D实例
 */
export declare class View3D {
    static readonly DEFAULT_FAR: number;
    static readonly DEFAULT_NEAR: number;
    static readonly DEFAULT_FOV: number;
    /**
     * 是否自动更新
     * @type {boolean}
     */
    autoUpdate: boolean;
    renderer: THREE.WebGLRenderer;
    protected _needUpdate: boolean;
    protected timeID: number;
    private _pluginsManager;
    /**
     * Canvas标签的id或Element对像
     * @param {string | HTMLCanvasElement} element
     */
    constructor(element: string | HTMLCanvasElement);
    /**
     * 是否启用该视图
     * @type {boolean}
     */
    private _enable;
    enable: boolean;
    private _canvas;
    /**
     * 该视图的 HTMLCanvasElement
     * @returns {HTMLCanvasElement}
     */
    readonly canvas: HTMLCanvasElement;
    private _scene;
    /**
     * 该视图的场景
     * @returns {Scene}
     */
    scene: THREE.Scene;
    protected _camera: THREE.Camera;
    /**
     * 该视图的相机
     * @returns {Camera}
     */
    camera: THREE.Camera;
    protected _visible: boolean;
    /**
     * 是否显示该3D视图 对应canvas的 style.visibility (true:visible,false:hidden)
     * @returns {boolean}
     */
    visible: boolean;
    /**
     * 需要更新舞台
     */
    needUpdate(): void;
    /**
     * 开始启动3D视图
     */
    start(): void;
    initPlugins(): void;
    /**
     * 停止该视图
     */
    stop(): void;
    /**
     * 设置视窗大小
     * @param {number} width
     * @param {number} height
     */
    setSize(width: number, height: number): void;
    /**
     * 设置视窗的位置
     * @param {number} left
     * @param {number} top
     */
    setPosition(left: number, top: number): void;
    /**
     * 获取3D视图快照数据
     * @returns {string}
     */
    snapshot(type?: string): string;
    protected init(): void;
    readonly pluginsManager: View3DPluginsManager;
    protected ambientLight: THREE.AmbientLight;
    protected initLight(): void;
    protected initRenderer(): void;
    protected initScene(): void;
    /**
     * 默认使用透视相机
     */
    protected initCamera(): void;
    /**
     * 渲染场景
     */
    onRender(): void;
    private render;
}
