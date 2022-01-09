import request from './config'

const api = {
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
    },
    getAndRefreshDorisSchemaList(params) {
        return request.post('/dorisConfig/schema/get/refresh/list', params);
    },
    testKafkaConnection(params) {
        return request.post('/kafkaConfig/kafka/connection/test', params);
    },
    updateKafkaConfig(params) {
        return request.post('/kafkaConfig/kafka/config/update', params);
    },
    addKafkaConfig(params) {
        return request.post('/kafkaConfig/kafka/config/add', params);
    },
    deleteKafkaConfig(params) {
        return request.post('/kafkaConfig/kafka/config/delete', params);
    },
    addKafkaTopic(params) {
        return request.post('/kafkaConfig/topic/create/v2', params);
    },
    deleteStarRockConfig(params) {
        return request.post('/dorisConfig/doris/config/delete', params);
    },
    pingStarRocksConfig(params) {
        return request.post('/dorisConfig/doris/ping', params);
    },
    addStarRocksConfig(params) {
        return request.post('/dorisConfig/doris/config/insert', params);
    },
    updateStarRocksConfig(params) {
        return request.post('/dorisConfig/doris/config/update', params);
    },
    getStarRocksTableNameList(params) {
        return request.post('/dorisSchema/doris/table/name/list', params);
    },
    // kafka2sr schema生成
    generateK2DSchema(params) {
        return request.post('/k2dSchemaMapping/generate', params);
    },
}

export default api;
