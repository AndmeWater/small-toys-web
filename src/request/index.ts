import axios from "axios";
axios.defaults.baseURL = "/api";
//创建axios示例
const service = axios.create({
    baseURL: "http://193.111.30.89:1211",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
});
//请求拦截
service.interceptors.request.use((config) => {
    config.headers = config.headers || {};
    if (localStorage.getItem("token")) {
        config.headers.token = localStorage.getItem("token") || "";
    }
    return config;
});
//响应拦截
service.interceptors.response.use(
    (res) => {
        const code: number = res.data.code;
        if (code != 200) {
            return Promise.reject(res.data);
        }
        return res.data;
    },
    (err) => {
        console.log(err);
    },
);
export default service;
