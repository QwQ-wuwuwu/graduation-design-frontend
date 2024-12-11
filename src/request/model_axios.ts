import axios from "axios";

const token = "MC-88ADC8C5992E40EC82CC774497E73B4D";

const customAxios = axios.create({
    baseURL: "https://api.mindcraft.com.cn/v1/chat",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },
    timeout: 20000
});

customAxios.interceptors.response.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
})

export default customAxios;