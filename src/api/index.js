import request from './config'
const api = {
    // 获得所有的行情前置服务器地址
    getAllQuotation () {
        return request.get('/ctpAddr/getAllQuotation')
    },
    // 获得所有的交易前置服务器
    getAllTrade () {
        return request.get('/ctpAddr/getAllTrade')
    },
    // 添加服务器
    addService (params) {
        return request.post('/ctpAddr/insert', params)
    },
    // 获得所有kafkaConfig的配置
    getAllKafkaConfig() {
        return request.get("/kafkaConfig/kafka/config/get");
    }
}

export default api;
