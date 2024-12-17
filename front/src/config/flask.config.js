import axios from "axios";


const flask = axios.create({
    withCredentials: true,
    headers: {"Content-Type": "application/json"},
    baseURL: " http://127.0.0.1:5000"
})

export default flask;