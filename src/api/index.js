import request from './config'

const api = {
    // 获得所有的行情前置服务器地址
    getAllQuotation() {
        return request.get('/ctpAddr/getAllQuotation')
    },
    // 获得所有的交易前置服务器
    getAllTrade() {
        return request.get('/ctpAddr/getAllTrade')
    },
    // 添加服务器
    addService(params) {
        return request.post('/ctpAddr/insert', params)
    },
    // 获得所有kafkaConfig的配置
    getAllKafkaConfig() {
        return request.get("/kafkaConfig/kafka/config/get");
    },
    // 获得所有kafkaConfig alias
    getAllKafkaConfigAlias() {
        return request.get("/kafkaConfig/kafka/config/alias/all/get");
    },
    // 获得topic信息
    getRichTopicInfo(params) {
        return request.post("/kafkaConfig/topic/rich/post", params);
    },
    // 删除topic
    deleteTopic(params) {
        return request.post("/kafkaConfig/topic/delete/", params);
    },
    getAllDorisConfig() {
        return request.get("/dorisConfig/doris/config/get");
    },
    getTableNamesSchema(params) {
        return request.post('/dorisConfig/schema/tbname/get', params);
    }
}

export default api;
