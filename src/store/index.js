import Vue from "vue";
import Vuex from 'vuex';
import api from "@/api";


Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        kafkaConfigList: [],
        kafkaConfigAliasList: [],
        topicInfoList: [],
        kafkaSelectedConfig: [],
        num: 0,
        pageKey: 1, // 1: kafkaConfig页面; 2: topic管理页面; 3: starRocks管理页面; 4: schema管理
        dorisConfigList: [],
        dorisTableConfigSelectedList: [],
        dorisIdList: []
    },
    mutations: {
        addNum(state, payload) {
            state.num += payload.num;
        },
        addKafkaConfig(state, payload) {
            state.kafkaConfigList.push({
                kafkaId: payload.kafkaId,
                brokerList: payload.brokerList,
                kafkaAlias: payload.kafkaAlias,
                createTime: payload.createTime,
                updateTime: payload.updateTime
            })
        },
        mockKafkaConfigAdd(state) {
            state.kafkaConfigList.push({
                kafkaId: -1,
                brokerList: "test",
                kafkaAlias: "测试数据",
                createTime: "d",
                updateTime: "d"
            });
        },
        clearKafkaConfig(state) {
            state.kafkaConfigList = [];
        },
        changePageKey(state, payload) {
            state.pageKey = payload.pageKey;
        },
        clearKafkaConfigAlias(state) {
            state.kafkaConfigAliasList = [];
        },
        addKafkaConfigAlias(state, payload) {
            state.kafkaConfigAliasList.push(payload.kafkaAlias);
        },
        clearTopicInfoList(state) {
            state.topicInfoList = [];
        },
        addTopicInfoList(state, payload) {
            state.topicInfoList.push({
                kafkaConfigId: payload.kafkaConfigId,
                brokerList: payload.brokerList,
                kafkaAlias: payload.kafkaAlias,
                topicName: payload.topicName,
                topicId: payload.topicId
            });
        },
        clearKafkaSelectedConfig(state) {
            state.kafkaSelectedConfig = [];
        },
        addKafkaSelectedConfig(state, payload) {
            state.kafkaSelectedConfig.push(
                {
                    kafkaConfigId: payload.kafkaConfigId,
                    kafkaAlias: payload.kafkaAlias
                }
            );
        },
        clearDorisConfigList(state) {
            state.dorisConfigList = [];
        },
        addDorisConfig(state, payload) {
            state.dorisConfigList.push({
                dorisId: payload.dorisId,
                dorisAlias: payload.dorisAlias,
                dbname: payload.dbname,
                username: payload.username,
                password: payload.password,
                loadUrl: payload.loadUrl,
                jdbcUrl: payload.jdbcUrl
            });
        },
        clearDorisTableConfigSelectedList(state) {
            state.dorisTableConfigSelectedList = [];
        },
        addDorisTableConfigSelectedList(state, payload) {
            state.dorisTableConfigSelectedList.push({
                // tableHash: payload.dbName + payload.tableName + payload.dorisId,
                tableId: String(payload.dorisId) + "@" + payload.tableName,
                dorisId: payload.dorisId,
                tableName: payload.tableName,
                dbName: payload.dbName
            });
        },
        clearDorisIdList(state) {
            state.dorisIdList = [];
        },
        addDorisIdIntoList(state, payload) {
            state.dorisIdList.push({
                dorisId: payload.dorisId
            });
        }
    },
    actions: {
        async fetAllDorisConfigData(context) {
            await api.getAllDorisConfig().then(
                (res) => {
                    context.commit('clearDorisConfigList');
                    let data = res.data;
                    for (let payload of data) {
                        context.commit({
                            type: 'addDorisConfig',
                            dorisId: payload.dorisId,
                            dorisAlias: payload.dorisAlias,
                            dbname: payload.dbname,
                            username: payload.username,
                            password: payload.password,
                            loadUrl: payload.loadUrl,
                            jdbcUrl: payload.jdbcUrl
                        })
                    }
                }
            );
        },
        async fetchAllKafkaConfigData({commit}) {
            const configPromise = await api.getAllKafkaConfig();
            const aliasPromise = await api.getAllKafkaConfigAlias();
            let data = configPromise.data;
            commit("clearKafkaConfig");
            for (let payload of data) {
                commit("addKafkaConfig", payload);
            }
            data = aliasPromise.data;
            commit("clearKafkaConfigAlias");
            for (let payload of data) {
                commit("addKafkaConfigAlias", payload);
            }
        },
        async queryTopicInfo(context) {
            let params = [];
            for (let selectKafkaConfig of context.state.kafkaSelectedConfig) {
                params.push({
                    kafkaId: selectKafkaConfig.kafkaConfigId
                });
            }
            const promise = await api.getRichTopicInfo(params);
            context.commit("clearTopicInfoList");
            let data = promise.data;
            for (let topicInfo of data) {
                context.commit({
                    type: "addTopicInfoList",
                    kafkaConfigId: topicInfo.kafkaId,
                    brokerList: topicInfo.brokerList,
                    kafkaAlias: topicInfo.kafkaAlias,
                    topicName: topicInfo.topicName,
                    topicId: topicInfo.topicId
                })
            }
        },
        async fetchTableNamesSchema(context) {
            let param = context.state.dorisIdList;
            await api.getTableNamesSchema(param).then(
                (res) => {
                    context.commit("clearDorisTableConfigSelectedList");
                    let dorisTableConfigList = [];
                    let data = res.data;
                    for (let dorisSchema of data) {
                        dorisTableConfigList.push({
                            dorisId: dorisSchema.dorisId,
                            tableName: dorisSchema.tableName,
                            dbName: dorisSchema.dbName
                        });
                    }
                    for (let payload of dorisTableConfigList) {
                        context.commit({
                            type: "addDorisTableConfigSelectedList",
                            dorisId: payload.dorisId,
                            tableName: payload.tableName,
                            dbName: payload.dbName
                        })
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    getters: {}
})