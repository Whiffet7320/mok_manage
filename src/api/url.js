export default {
    baseUrl: 'http://192.168.1.121:8800/kjgzdt',
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
    // 子菜单项
    addSubmenuItems: '/SubmenuItems/addSubmenuItems',//新增子菜单项
    delSubmenuItemsById: '/SubmenuItems/delSubmenuItemsById',//根据id 删除子菜单项
    // 表信息
    getTableInformationByTableName: '/tableinformation/getTableInformationByTableName',//获取表信息根据表名
    // 属性显示图层
    selectPropertyShowLayers:'/property-show-layer/selectPropertyShowLayers',//查询全部属性显示图层,或以layerName进行模糊查询
    insertPropertyShowLayer:'/property-show-layer/insertPropertyShowLayer',//添加属性显示图层
    deletePropertyShowLayer:'/property-show-layer/deletePropertyShowLayer',//删除属性显示图层
    selectPropertyShowLayer:'/property-show-layer/selectPropertyShowLayer',//分页查询全部属性显示图层,或以layerName进行模糊查询
    // 属性显示图层字段
    updatePropertyShowLayerField: '/property-show-layer-field/updatePropertyShowLayerField',//修改属性显示图层字段
    insertPropertyShowLayerField:'/property-show-layer-field/insertPropertyShowLayerField',//添加属性显示图层字段

}
