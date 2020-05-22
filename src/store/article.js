import http from '@/api';
import { filterField } from '@/utils/common';
export default {
    namespaced: true,
    state: {
        homeList: {},
        detail: {},
        statisticst: {}
    },
    getters: {
        homeList: state => {
            return state.homeList;
        },

        detail: state => {
            return state.detail;
        },

        statisticst: state => {
            return state.statisticst;
        },
    },
    mutations: {
        setHomeList(state, payload) {
            let { homeList } = payload;
            state.homeList = homeList;
        },

        setDetail(state, payload) {
            let { detail } = payload;
            state.detail = detail;
        },

        setStatisticst(state, payload) {
            let { statisticst } = payload;
            state.statisticst = statisticst;
        },
    },
    actions: {
        /**
         * 获取首页列表
         */
        getHomeList({ commit }, options) {
            return http
                .post('/blog/client/home/list', filterField(options))
                .then(res => {
                    commit('setHomeList', { homeList: res });
                })
                .catch(err => {
                    console.log(err);
                });
        },

        /**
         * 获取文章详情
         */
        getDetail({ commit }, query) {
            let { id } = query;
            return http
                .post('/blog/client/article/detail', {
                    articleId: id
                })
                .then(res => {
                    commit('setDetail', { detail: res.detail });
                })
                .catch(err => {
                    console.log(err);
                });
        },

        /**
         * 获取统计
         */
        getStatisticst({ commit }) {
            return http
                .post('/blog/client/statisticst', {})
                .then(res => {
                    commit('setStatisticst', { statisticst: res.statisticst });
                })
                .catch(err => {
                    console.log(err, '-------------------------');
                });
        }
    }
};
