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
        axios.get('http://localhost:3000/api/parameter')
            .then((res) => {
                commit('setData', res)
            })
    }
}

export const mutations = {
    setData(state, res) {
        let json = {}
        res.data.forEach(data => {
            json[data.DISP_NO] = {
                "id": data.STATUS,
                "labelName": data.STATUS_NAME,
                "statusKey": data.STATUS,
                "dataType": "status",
                "valueType":"effortValue",
            } 
        })
        return state.parameterInfo = json
    }
}