import http from '@/api';

export default {
    namespaced: true,
    state: {
        homeList: {},
        detail: {}
    },
    getters: {
        homeList: state => {
            return state.homeList;
        },

        detail: state => {
            return state.detail;
        }
    },
    mutations: {
        setHomeList(state, payload) {
            let { homeList } = payload;
            state.homeList = homeList;
        },

        setDetail(state, payload) {
            let { detail } = payload;
            state.detail = detail;
        }
    },
    actions: {
        /**
         * 获取首页列表
         */
        getHomeList({ commit }) {
            return http
                .post('/blog/client/home/list')
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
        }
    }
};
