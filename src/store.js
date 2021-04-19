import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    editKContentByIdObj:null,//修改知识库的obj
    selectKContentByIdObj:{},//知识库详情的obj
    pageSize:10,
    page:1,
    treeForTypeId:null,//根据树形组件来筛选table
    personalPageSize:10,
    personalPage:1,
    userObj:{}
  },
  mutations: {
    editKContentByIdObj(state, str){
      state.editKContentByIdObj = str;
    },
    selectKContentByIdObj(state, str){
      state.selectKContentByIdObj = str;
    },
    pageSize(state, str){
      state.pageSize = str;
    },
    page(state, str){
      state.page = str;
    },
    treeForTypeId(state, str){
      state.treeForTypeId = str;
    },
    personalPageSize(state, str){
      state.personalPageSize = str;
    },
    personalPage(state, str){
      state.personalPage = str;
    },
    userObj(state, str){
      state.userObj = str;
    }
  },
  actions: {

  },
});
