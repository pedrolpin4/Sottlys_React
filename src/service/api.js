import axios from 'axios';

const API = axios.create({
    baseURL: "https://sottlys.herokuapp.com",
})

export default API;