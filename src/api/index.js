import axios from 'axios';
import Vue from 'vue'
import router from '../router.js';
import urls from './url.js';
const vue = new Vue()
let myPost = axios.create({
    baseURL: urls.baseUrl,
    method: 'post',
    timeout: 1000,
})
let myGet = axios.create({
    baseURL: urls.baseUrl,
    method: 'get',
    timeout: 1000,
})
let myDelete = axios.create({
    baseURL: urls.baseUrl,
    method: 'delete',
    timeout: 1000,
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
    selectKContent(obj, keyword, pageNum, pageSize) {
        return myPost({
            url: urls.selectKContent,
            data: {
                ...obj
            },
            params: {
                keyword,
                pageNum,
                pageSize
            }
        })
    },
    insertKContent(obj) {
        return myPost({
            url: urls.insertKContent,
            data: {
                ...obj
            },
        })
    },
    updateKContent(obj) {
        return myPost({
            url: urls.updateKContent,
            data: {
                ...obj
            },
        })
    },
    selectKContentById(id) {
        return myGet({
            url: urls.selectKContentById,
            params: {
                id
            },
        })
    },
    deleteKContent(id) {
        return myDelete({
            url: `${urls.baseUrl}${urls.deleteKContent}/${id}`,
        })
    },
    selectKType() {
        return myGet({
            url: urls.selectKType,
        })
    },
    insertKType(obj) {
        return myPost({
            url: urls.insertKType,
            data: {
                ...obj
            },
        })
    },
    selectKTypeById(id) {
        return myGet({
            url: urls.selectKTypeById,
            params: {
                id
            },
        })
    },
    register(obj) {
        return myPost({
            url: urls.register,
            data: {
                ...obj
            },
        })
    },
    login(obj) {
        return myGet({
            url: urls.login,
            params: {
                ...obj
            },
        })
    },
    selectUserByUserId(userid) {
        return myGet({
            url: urls.selectUserByUserId,
            params: {
                userid
            },
        })
    },
    updateKType(obj) {
        return myPost({
            url: urls.updateKType,
            data: {
                ...obj
            },
        })
    },
    deleteKType(id) {
        return myDelete({
            url: `${urls.baseUrl}${urls.deleteKType}/${id}`,
        })
    },
    selectUser() {
        return myGet({
            url: urls.selectUser,
        })
    },
    deleteUser(id) {
        return myDelete({
            url: `${urls.baseUrl}${urls.deleteUser}/${id}`,
        })
    },
    updateUser(obj) {
        return myPost({
            url: urls.updateUser,
            data: {
                ...obj
            },
        })
    }
}