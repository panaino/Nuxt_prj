import axios from 'axios'

export const state = () => ({
    personalInfo: []
})

export const getters = {
    getData(state) {
        return state.personalInfo
    },
}

export const actions = {
    fetchData({ commit }) {
        axios.get('http://localhost:3000/api/personality')
            .then((res) => {
                commit('setData', res)
            })
    }
}

export const mutations = {
    setData(state, res) {
        let json = {}
        res.data.forEach(data => {
            json[data.PERSONALITY] = {
                "UP": data.UP,
                "DOWN": data.DOWN
            }
        });
        state.personalInfo = json
    },
}