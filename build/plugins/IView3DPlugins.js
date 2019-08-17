/**
 * 插件当前的状态
 */
export var PluginsStatus;
(function (PluginsStatus) {
    PluginsStatus[PluginsStatus["STOP"] = 0] = "STOP";
    PluginsStatus[PluginsStatus["RUNING"] = 1] = "RUNING";
})(PluginsStatus || (PluginsStatus = {}));
