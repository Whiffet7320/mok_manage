export default {
    baseUrl: 'http://192.168.1.195:8800/kjgzdt',
    getModules: '/module/getModules',//获取模块列表
    addModule: '/module/addModule',//添加模块
    updateModule: '/module/updateModule',//修改模块
    getModuleById: '/module/getModuleById',//根据id获取模块
    delModuleById: '/module/delModuleById',//根据id删除模块
    getModulesByPage: '/module/getModulesByPage',//查询模块列表分页
    // 工具栏
    getToolbarByUserid: '/toolbar/getToolbarByUserid',//根据用户名 查询工具栏列表
    addToolbar: '/toolbar/addToolbar',//添加工具栏
    updateToolbar: '/toolbar/updateToolbar',//修改工具栏
    delToolbarByid: '/toolbar/delToolbarByid',//根据id 删除工具栏
    toolbaraddModule: '/toolbar/addModule',//工具栏分配模块
    getToolbarByid: '/toolbar/getToolbarByid',//根据id 查看工具栏详情
    toolbarDelModule:'/toolbar/delModule',//工具栏解绑模块


    // 工具栏子菜单
    addToolbarSubmenu: '/toolbarSubmenu/addToolbarSubmenu',//新增工具栏子菜单
    delToolbarSubmenuByid: '/toolbarSubmenu/delToolbarSubmenuByid',//根据id 删除工具栏子菜单
    updateToolbarSubmenu: '/toolbarSubmenu/updateToolbarSubmenu',//修改工具栏子菜单
    getToolbarSubmenuById: '/toolbarSubmenu/getToolbarSubmenuById',//根据id 查询工具栏子菜单

    // 导航栏
    getNavigationalbars: '/navigationalbar/getNavigationalbars',//获取导航栏列表
    addNavigationalbar: '/navigationalbar/addNavigationalbar',//新增导航栏
    updateNavigationalbar: '/navigationalbar/updateNavigationalbar',//修改导航栏
    delNavigationalbarByid: '/navigationalbar/delNavigationalbarByid',//根据id 删除导航栏
    // 导航栏子菜单
    addNavigationalbarSubmenu: '/navigationalbarSubmenu/addNavigationalbarSubmenu',//新增导航栏菜单项
    delNavigationalbarSubmenuById: '/navigationalbarSubmenu/delNavigationalbarSubmenuById',//根据id 删除导航栏菜单项
    updateNavigationalbarSubmenu: '/navigationalbarSubmenu/updateNavigationalbarSubmenu',//修改导航栏菜单项
    navigationalbarSubmenuaddModule: '/navigationalbarSubmenu/addModule',//导航栏菜单项分配模块
    delModule:'/navigationalbarSubmenu/delModule',//导航栏菜单项解绑模块

    // 子菜单项
    addSubmenuItems: '/SubmenuItems/addSubmenuItems',//新增子菜单项
    delSubmenuItemsById: '/SubmenuItems/delSubmenuItemsById',//根据id 删除子菜单项
    delSubmenuItem:'/SubmenuItems/delSubmenuItem',//解绑子菜单项

    // 表信息
    getTableInformationByTableName: '/tableinformation/getTableInformationByTableName',//获取表信息根据表名
    // 属性显示图层
    selectPropertyShowLayers: '/property-show-layer/selectPropertyShowLayers',//查询全部属性显示图层,或以layerName进行模糊查询
    insertPropertyShowLayer: '/property-show-layer/insertPropertyShowLayer',//添加属性显示图层
    deletePropertyShowLayer: '/property-show-layer/deletePropertyShowLayer',//删除属性显示图层
    selectPropertyShowLayer: '/property-show-layer/selectPropertyShowLayer',//分页查询全部属性显示图层,或以layerName进行模糊查询
    // 属性显示图层字段
    updatePropertyShowLayerField: '/property-show-layer-field/updatePropertyShowLayerField',//修改属性显示图层字段
    insertPropertyShowLayerField: '/property-show-layer-field/insertPropertyShowLayerField',//添加属性显示图层字段
    // 统计分析图层
    selectStatisticalAnalysisLayers: '/statistical-analysis-layer/selectStatisticalAnalysisLayers',//查询全部统计分析图层,或以layerName进行模糊查询
    insertStatisticalAnalysisLayer:'/statistical-analysis-layer/insertStatisticalAnalysisLayer',//添加统计分析图层
    selectStatisticalAnalysisLayer: '/statistical-analysis-layer/selectStatisticalAnalysisLayer',//分页查询全部统计分析图层,或以layerName进行模糊查询
    deleteStatisticalAnalysisLayer:'/statistical-analysis-layer/deleteStatisticalAnalysisLayer',//删除统计分析图层
    // 统计分析图层字段
    // selectStatisticalAnalysisLayerField:'/statistical-analysis-layer-field/selectStatisticalAnalysisLayerField',//查询全部统计分析图层字段
    insertStatisticalAnalysisLayerField:'/statistical-analysis-layer-field/insertStatisticalAnalysisLayerField',//添加统计分析图层字段
    updateStatisticalAnalysisLayerField:'/statistical-analysis-layer-field/updateStatisticalAnalysisLayerField',//修改统计分析图层字段
    // 冲突分析图层
    selectConflictAnalysisLayers:'/conflict-analysis-layer/selectConflictAnalysisLayers',//查询全部冲突分析图层,或以layerName进行模糊查询
    selectConflictAnalysisLayer:'/conflict-analysis-layer/selectConflictAnalysisLayer',//分页查询全部冲突分析图层,或以layerName进行模糊查询
    insertConflictAnalysisLayer:'/conflict-analysis-layer/insertConflictAnalysisLayer',//添加冲突分析图层
    deleteConflictAnalysisLayer:'/conflict-analysis-layer/deleteConflictAnalysisLayer',//删除冲突分析图层
    
}
