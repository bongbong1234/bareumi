import axios from "axios";

const api = axios.create({
                withCredentials: true,
                headers: {"Content-Type" : "application/json"},
                baseURL: "http://localhost:3001"
            })
export default api;