import axios from "axios";


const flask = axios.create({
    withCredentials: true,
    headers: {"Content-Type": "application/json"},
    baseURL: " http://192.168.219.56:5000"
})

export default flask;