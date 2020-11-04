import axios from 'axios'

export const state = () => ({
    bredMonster: {}
})

export const getters = {
    getData(state) {
        return state.bredMonster
    },
}

export const actions = {
    fetchData({ commit }) {
        axios.get('http://localhost:3000/api/selectBredMonster')
            .then((res) => {
                commit('setData', res)
            })
    }
}

export const mutations = {
    setData(state, res) {
        state.bredMonster = res.data
    },
}