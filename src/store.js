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
    StatisticalAnalysisLayerObj: null,
    StatisticalAnalysisLayerPageSize: 10,
    StatisticalAnalysisLayerPage: 1,
    ConflictAnalysisLayerObj: null,
    ConflictAnalysisLayerPageSize: 10,
    ConflictAnalysisLayerPage: 1,
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
    StatisticalAnalysisLayerObj(state, str) {
      state.StatisticalAnalysisLayerObj = str;
    },
    StatisticalAnalysisLayerPageSize(state, str) {
      state.StatisticalAnalysisLayerPageSize = str;
    },
    StatisticalAnalysisLayerPage(state, str) {
      state.StatisticalAnalysisLayerPage = str;
    },
    ConflictAnalysisLayerObj(state, str) {
      state.ConflictAnalysisLayerObj = str;
    },
    ConflictAnalysisLayerPageSize(state, str) {
      state.ConflictAnalysisLayerPageSize = str;
    },
    ConflictAnalysisLayerPage(state, str) {
      state.ConflictAnalysisLayerPage = str;
    },
  },
  actions: {

  },
});
