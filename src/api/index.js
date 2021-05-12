import axios from 'axios';
import Vue from 'vue'
import router from '../router.js';
import urls from './url.js';
const vue = new Vue()
let myPost = axios.create({
    baseURL: urls.baseUrl,
    method: 'post',
    timeout: 2000,
})
let myGet = axios.create({
    baseURL: urls.baseUrl,
    method: 'get',
    timeout: 2000,
})
let myDelete = axios.create({
    baseURL: urls.baseUrl,
    method: 'delete',
    timeout: 2000,
})

myDelete.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.token,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.token,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myGet.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.token,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({ path: "/" })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myGet.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error);
    if (error.response.status === 500) {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({ path: "/" })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})

export default {
    // selectKContent(obj, keyword, pageNum, pageSize) {
    //     return myPost({
    //         url: urls.selectKContent,
    //         data: {
    //             ...obj
    //         },
    //         params: {
    //             keyword,
    //             pageNum,
    //             pageSize
    //         }
    //     })
    // },
    // selectKContentById(id) {
    //     return myGet({
    //         url: urls.selectKContentById,
    //         params: {
    //             id
    //         },
    //     })
    // },
    // deleteKContent(id) {
    //     return myDelete({
    //         url: `${urls.baseUrl}${urls.deleteKContent}/${id}`,
    //     })
    // },
    getModules() {
        return myGet({
            url: urls.getModules,
        })
    },
    addModule(obj) {
        return myPost({
            url: urls.addModule,
            data: {
                ...obj
            },
        })
    },
    updateModule(obj) {
        return myPost({
            url: urls.updateModule,
            data: {
                ...obj
            },
        })
    },
    getModuleById(id) {
        return myGet({
            url: urls.getModuleById,
            params: {
                id
            }
        })
    },
    delModuleById(id) {
        return myDelete({
            url: urls.delModuleById,
            params: {
                id
            }
        })
    },
    getModulesByPage(obj) {
        return myPost({
            url: urls.getModulesByPage,
            data: {
                ...obj
            },
        })
    },
    getToolbarByUserid(userid) {
        return myGet({
            url: urls.getToolbarByUserid,
            params: {
                userid
            }
        })
    },
    addToolbar(obj) {
        return myPost({
            url: urls.addToolbar,
            data: {
                ...obj
            },
        })
    },
    updateToolbar(obj) {
        return myPost({
            url: urls.updateToolbar,
            data: {
                ...obj
            },
        })
    },
    delToolbarByid(id) {
        return myDelete({
            url: urls.delToolbarByid,
            params: {
                id
            }
        })
    },
    addToolbarSubmenu(obj) {
        return myPost({
            url: urls.addToolbarSubmenu,
            data: {
                ...obj
            },
        })
    },
    delToolbarSubmenuByid(id) {
        return myDelete({
            url: urls.delToolbarSubmenuByid,
            params: {
                id
            }
        })
    },
    updateToolbarSubmenu(obj) {
        return myDelete({
            url: urls.updateToolbarSubmenu,
            data: {
                ...obj
            }
        })
    },
    getNavigationalbars(userid) {
        return myGet({
            url: urls.getNavigationalbars,
            params: {
                userid
            }
        })
    },
    addNavigationalbar(obj) {
        return myPost({
            url: urls.addNavigationalbar,
            data: {
                ...obj
            },
        })
    },
    updateNavigationalbar(obj) {
        return myPost({
            url: urls.updateNavigationalbar,
            data: {
                ...obj
            },
        })
    },
    delNavigationalbarByid(id) {
        return myDelete({
            url: urls.delNavigationalbarByid,
            params: {
                id
            }
        })
    },
    addNavigationalbarSubmenu(obj) {
        return myPost({
            url: urls.addNavigationalbarSubmenu,
            data: {
                ...obj
            },
        })
    },
    delNavigationalbarSubmenuById(id) {
        return myDelete({
            url: urls.delNavigationalbarSubmenuById,
            params: {
                id
            }
        })
    },
    updateNavigationalbarSubmenu(obj) {
        return myPost({
            url: urls.updateNavigationalbarSubmenu,
            data: {
                ...obj
            },
        })
    },
    navigationalbarSubmenuaddModule(ModuleId, navigationalbarSubmenuId) {
        return myPost({
            url: urls.navigationalbarSubmenuaddModule,
            params: {
                ModuleId,
                navigationalbarSubmenuId,
            },
        })
    },
    toolbaraddModule(moduleId, toolbarId) {
        return myPost({
            url: urls.toolbaraddModule,
            params: {
                moduleId,
                toolbarId,
            },
        })
    },
    getToolbarByid(id) {
        return myGet({
            url: urls.getToolbarByid,
            params: {
                id
            }
        })
    },
    getToolbarSubmenuById(id) {
        return myGet({
            url: urls.getToolbarSubmenuById,
            params: {
                id
            }
        })
    },
    addSubmenuItems(obj) {
        return myPost({
            url: urls.addSubmenuItems,
            data: {
                ...obj
            },
        })
    },
    delSubmenuItemsById(id) {
        return myDelete({
            url: urls.delSubmenuItemsById,
            params: {
                id
            }
        })
    },
    getTableInformationByTableName(tablename) {
        return myGet({
            url: urls.getTableInformationByTableName,
            params: {
                tablename
            }
        })
    },
    updatePropertyShowLayerField(obj) {
        return myPost({
            url: urls.updatePropertyShowLayerField,
            data: {
                ...obj
            },
        })
    },
    insertPropertyShowLayerField(obj) {
        return myPost({
            url: urls.insertPropertyShowLayerField,
            data: {
                ...obj
            },
        })
    },
    selectPropertyShowLayers(layerName) {
        return myGet({
            url: urls.selectPropertyShowLayers,
            params: {
                layerName
            }
        })
    },
    insertPropertyShowLayer(obj) {
        return myPost({
            url: urls.insertPropertyShowLayer,
            data: {
                ...obj
            },
        })
    },
    deletePropertyShowLayer(id) {
        return myDelete({
            url: `${urls.deletePropertyShowLayer}/${id}`,
        })
    },
    selectPropertyShowLayer(pageNum, pageSize) {
        return myGet({
            url: urls.selectPropertyShowLayer,
            params: {
                pageNum,
                pageSize
            }
        })
    },
    selectStatisticalAnalysisLayers(layerName) {
        return myGet({
            url: urls.selectStatisticalAnalysisLayers,
            params: {
                layerName
            }
        })
    },
    selectStatisticalAnalysisLayer(pageNum, pageSize) {
        return myGet({
            url: urls.selectStatisticalAnalysisLayer,
            params: {
                pageNum,
                pageSize
            }
        })
    },
    insertStatisticalAnalysisLayer(obj) {
        return myPost({
            url: urls.insertStatisticalAnalysisLayer,
            data: {
                ...obj
            },
        })
    },
    deleteStatisticalAnalysisLayer(id) {
        return myDelete({
            url: `${urls.deleteStatisticalAnalysisLayer}/${id}`,
        })
    },
    insertStatisticalAnalysisLayerField(obj) {
        return myPost({
            url: urls.insertStatisticalAnalysisLayerField,
            data: {
                ...obj
            },
        })
    },
    updateStatisticalAnalysisLayerField(obj) {
        return myPost({
            url: urls.updateStatisticalAnalysisLayerField,
            data: {
                ...obj
            },
        })
    },
    selectConflictAnalysisLayers() {
        return myGet({
            url: urls.selectConflictAnalysisLayers,
        })
    },
    selectConflictAnalysisLayer(pageNum, pageSize) {
        return myGet({
            url: urls.selectConflictAnalysisLayer,
            params: {
                pageNum,
                pageSize
            }
        })
    },
    insertConflictAnalysisLayer(obj) {
        return myPost({
            url: urls.insertConflictAnalysisLayer,
            data: {
                ...obj
            },
        })
    },
    deleteConflictAnalysisLayer(id) {
        return myDelete({
            url: `${urls.deleteConflictAnalysisLayer}/${id}`,
        })
    },
    delModule(ModuleId, navigationalbarSubmenuId) {
        return myPost({
            url: urls.delModule,
            params: {
                ModuleId,
                navigationalbarSubmenuId,
            },
        })
    },
    toolbarDelModule(moduleId, toolbarId) {
        return myPost({
            url: urls.toolbarDelModule,
            params: {
                moduleId,
                toolbarId,
            },
        })
    },
    delSubmenuItem(moduleId, submenuId) {
        return myPost({
            url: urls.delSubmenuItem,
            params: {
                moduleId,
                submenuId,
            },
        })
    }
}