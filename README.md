## viewpro3d

### View3D for three.js
这是一个基于three.js的3D视类库，主要用于快整构建3D应用，不需要重复编写相机、场景、控制器、以及大小控制等代码，View3D将 WebGLRenderer、Scene、Camera、canvas封装在一起，方便使用，并且支持定义插件。
#
##  TS使用实例
```
    let view3D:View3D=new View3D("view3D");
    view3D.pluginsManager.addPlugins(OrbitControlPlugins);
    view3D.pluginsManager.addPlugins(View3DWindowAutoSizePulgins);
    view3D.start();
    view3D.scene.add(new Mesh(new BoxGeometry(100,100,100),new MeshBasicMaterial({color:0xff0000})));
```
如你所见，使用起来真的很方便！