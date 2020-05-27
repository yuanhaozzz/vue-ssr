import http from '@/api';
import { filterField } from '@/utils/common';
export default {
    namespaced: true,
    state: {
        homeList: {},
        detail: {},
        statisticst: {},
        messageList: [],
    },
    getters: {
        homeList: (state) => {
            return state.homeList;
        },

        detail: (state) => {
            return state.detail;
        },

        statisticst: (state) => {
            return state.statisticst;
        },

        messageList: (state) => {
            return state.messageList;
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

        setMessage(state, payload) {
            let { list } = payload;
            state.messageList = list;
        },
    },
    actions: {
        /**
         * 获取首页列表
         */
        getHomeList({ commit }, options) {
            return http
                .post('/blog/client/home/list', filterField(options))
                .then((res) => {
                    console.log(res);
                    commit('setHomeList', { homeList: res });
                })
                .catch((err) => {
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
                    articleId: id,
                })
                .then((res) => {
                    commit('setDetail', { detail: res.detail });
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        /**
         * 获取统计
         */
        getStatisticst({ commit }) {
            return http
                .post('/blog/client/statisticst', {})
                .then((res) => {
                    commit('setStatisticst', { statisticst: res.statisticst });
                })
                .catch((err) => {
                    console.log(err, '-------------------------');
                });
        },

        /**
         * 获取留言板列表
         */
        getMessage({ commit }) {
            return http
                .post('/blog/client/message/list')
                .then((res) => {
                    commit('setMessage', { list: res.list });
                })
                .catch((err) => {
                    console.log(err, '-------------------------');
                });
        },
    },
};
