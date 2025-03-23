import axios from "axios";

// const api_key = '6231cbc29436d7eac2fa646059cbc1c1.vXHL1R0B40oP2ubh'

// const zhipuAxios = axios.create({
//     baseURL: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${api_key}`
//     },
//     timeout: 20 * 1000
// })

type AxiosInfo = {
    baseURL: string,
    token: string
}

const createAxios = (axisoInfo: AxiosInfo, stream = false) => {
    return axios.create({
        baseURL: axisoInfo.baseURL,
        headers: {
            "Content-Type": stream ? 'text/event-stream' : "application/json",
            "Authorization": `Bearer ${axisoInfo.token}`
        },
    })
}

export default createAxios;