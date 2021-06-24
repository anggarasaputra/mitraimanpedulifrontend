//import global API
import Api from '../../api/Api'

const notifications = {

    //set namespace true
    namespaced: true,

    //state
    state: {

        //state untuk "notifications", pakai localStorage, untuk menyimpan informasi tentang notifikasi yang akan di tampilkan
        notifications: JSON.parse(localStorage.getItem('notifications')) || [],
    },

    //mutations
    mutations: {
        SET_NOTIFICATION(state, payload) {
            state.notifications = payload
        }
    },

    //actions
    actions: {

        //action notify
        notify({ commit }) {

            //define callback promise
            return new Promise((resolve, reject) => {

                //send data ke server
                Api.get('/getdonation')
                    .then(response => {
                        localStorage.setItem('notifications',JSON.stringify(response.data.data.data));
                        commit('SET_NOTIFICATION', response.data.data.data)

                        //resolve ke component dengan hasil response
                        resolve(response)

                    }).catch(error => {
                        //reject ke component dengan hasil response
                        reject(error.response.data)

                    })

            })
        },
    },

    //getters
    getters: {

        //get current notifications
        currentNotifications(state) {
            return state.notifications // <-- return dengan data notifications
        },
    }

}

export default notifications