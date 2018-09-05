import store from 'store'
const state = {
    isAuthenticated: false,
    user: {}
}

const getters = {
    getUser: state => state.user,
    isAuthenticated: state => state.isAuthenticated
}

const mutations = {
    SET_USER (state, user) {
        let data = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL
        };
        store.set('user', data);
        state.isAuthenticated = true;
        state.user = data
    },
    CLEAR_USER (state, user) {
        state.isAuthenticated = false
        state.user = {}
    }
}

const actions = {
    setUser ({commit}, user) {
        commit('SET_USER', user)
    },
    clearUser ({commit}) {
        commit('CLEAR_USER')
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
