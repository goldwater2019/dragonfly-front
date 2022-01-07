import axios from 'axios'
// import { Message} from 'element-ui'

const baseURL = 'http://localhost:8081'


const request = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    withCredentials: true,
})


//请求拦截器
// request.interceptors.request.use(config => {
//   const token = localStorage.getItem('token')
//   config.headers.Authorization = token
//   return config
// }, error => {
//   return Promise.reject(error)
// })

//响应拦截器
request.interceptors.response.use(config => {
    const {data} = config
    return data
}, error => {
    // Message.error('Network Error')
    return Promise.reject(error)
})

export default request
