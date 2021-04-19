export default {
    baseUrl: 'http://192.168.1.192:8888/knowledgebase',
    selectKContent: '/k-content/selectKContent',//查询知识库内容
    insertKContent: '/k-content/insertKContent',//添加知识库内容
    updateKContent: '/k-content/updateKContent',//更新知识库内容
    selectKContentById: '/k-content/selectKContentById',//根据id查询知识库内容

    // 
    selectKType: '/k-type/selectKType',//查询知识库类型
    selectKTypeById: '/k-type/selectKTypeById',//根据id查询知识库类型
    // 
    register: '/user/register',//用户注册
    login: '/user/login',//用户登录
    selectUserByUserId: '/user/selectUserByUserId',//根据userid查询用户信息
    //    
    deleteKContent: '/admin/deleteKContent',//删除知识库内容
    updateKType:'/admin/updateKType',//更新知识库类型
    insertKType:'/admin/insertKType',//添加知识库类型
    deleteKType:'/admin/deleteKType',//删除知识库类型
    selectUser:'/admin/selectUser',//查询用户信息
    deleteUser:'/admin/deleteUser',//删除用户
    updateUser:'/admin/updateUser',//更新用户信息

}