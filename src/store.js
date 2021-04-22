import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pageSize: 10,
    page: 1,
    AttributeDisplayLayerObj: null,
    AttributeDisplayLayerPageSize: 10,
    AttributeDisplayLayerPage: 1,
  },
  mutations: {
    pageSize(state, str) {
      state.pageSize = str;
    },
    page(state, str) {
      state.page = str;
    },
    AttributeDisplayLayerObj(state, str) {
      state.AttributeDisplayLayerObj = str;
    },
    AttributeDisplayLayerPageSize(state, str) {
      state.AttributeDisplayLayerPageSize = str;
    },
    AttributeDisplayLayerPage(state, str) {
      state.AttributeDisplayLayerPage = str;
    },
  },
  actions: {

  },
});
