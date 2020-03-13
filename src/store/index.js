// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function fetchItem () {
    return new Promise(resolve => {
        resolve({ title: 'test00000000000' });
    });
}

export function createStore () {
    return new Vuex.Store({
        state: {
            items: {}
        },
        actions: {
            fetchItem ({ commit }, id) {
                // `store.dispatch()` 会返回 Promise，
                // 以便我们能够知道数据在何时更新
                return fetchItem(id).then(item => {
                    commit('setItem', { item });
                });
            }
        },
        mutations: {
            setItem (state, { item }) {
                console.log(item);
                Vue.set(state.items, 'title', item.title);
            }
        }
    });
}