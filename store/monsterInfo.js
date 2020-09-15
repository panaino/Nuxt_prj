import axios from 'axios'

export const state = () => ({
    monsteInfo: {}
})

export const getters = {
    getData(state) {
        return state.monsteInfo
    },
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
        let json = {}
        res.data.forEach(data => {
            json[data.NAME] = data
        });
        state.monsteInfo = json
    },
}