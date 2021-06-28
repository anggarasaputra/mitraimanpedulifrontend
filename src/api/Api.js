//import axios
import axios from 'axios'

const Api = axios.create({
    //set default endpoint API
    baseURL: 'http://halaman.mitraimanpeduli.org/api'
})

export default Api