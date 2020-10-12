import axios from 'axios'

export const state = () => ({
    parameterInfo: {}
})

export const getters = {
    getData(state) {
        return state.parameterInfo
    }
}

export const actions = {
    fetchData({ commit }) {
        axios.get('http://localhost:3000/api/monster')
            .then((res) => {
                commit('setData', res)
            })
    }
}

export const mutations = {
    setData(state, res) {
        return state.parameterInfo = res.data
    }
}