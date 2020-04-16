// store.js
import Vue from 'vue';
import Vuex from 'vuex';

// 模块
import Article from './article';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        modules: {
            article: Article
        }
    });
}
