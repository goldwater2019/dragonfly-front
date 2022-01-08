// import {createStore, mapGetters} from "vuex";
// import {useStore, mapState} from "vuex";
// import {computed} from "vue";
//
// const store = createStore({
//     state() {
//         return {
//             kafkaConfigList: [],
//             rootCounter: 100,
//             name: "lambda1024",
//             age: 18,
//             height: 188,
//             books: [
//                 {name: "vueJS", count: 2, price: 110},
//                 {name: "react", count: 3, price: 120},
//                 {name: "webpack", count: 4, price: 133}
//             ]
//         }
//     },
//     getters: {
//         doubleRootCounter(state) {
//             return state.rootCounter * 2;
//         },
//         totalPrice(state) {
//             let totalPrice = 0;
//             for (const book of state.books) {
//                 totalPrice += book.count * book.price;
//             }
//             return totalPrice;
//         },
//         totalPriceWithMyName(state, getters) {
//             return getters.totalPrice + ", " + getters.myName;
//         },
//         myName(state) {
//             return state.name;
//         }
//     },
//     mutations: {
//         addKafkaConfigList(state, payload) {
//             state.kafkaConfigList.push({
//                 kafkaId: payload.kafkaId,
//                 brokerList: payload.brokerList,
//                 kafkaAlias: payload.kafkaAlias,
//                 createTime: payload.createTime,
//                 updateTime: payload.updateTime
//             })
//         },
//         removeKafkaConfigById(state, payload) {
//             let newKafkaConfigList = []
//             let removedKafkaConfig = null;
//             for (let kafkaConfig in state.kafkaConfigList) {
//                 if (kafkaConfig.kafkaId === payload.kafkaId) {
//                     removedKafkaConfig = kafkaConfig;
//                     continue;
//                 }
//                 newKafkaConfigList.push(kafkaConfig);
//             }
//             state.kafkaConfigList = newKafkaConfigList;
//             return removedKafkaConfig;
//         },
//         increment(state) {
//             state.rootCounter++;
//         },
//         decrement(state) {
//             state.rootCounter--;
//         },
//         incrementN(state, payload) {
//             console.log(payload);
//             state.rootCounter = state.rootCounter + payload.n;
//         },
//         decrementN(state, payload) {
//             state.rootCounter = state.rootCounter - payload.n;
//         }
//     },
//     actions: {
//         testIncrementAction(context, payload) {
//             context.commit("incrementN", payload);
//         },
//         increment(context) {
//             return new Promise((resolve) => {
//                 setTimeout(() => {
//                     context.commit("increment");
//                     resolve("异步完成");
//                 }, 1000);
//             });
//         }
//     },
//     modules: {
//         // home,
//         // user
//     }
// })
//
// export default store;
//
// export function useState(mapper) {
//     const store = useStore();
//     const stateFns = mapState(mapper);
//
//     const state = {}
//     Object.keys(stateFns).forEach(fnKey => {
//         state[fnKey] = computed(
//             stateFns[fnKey].bind({$store: store})
//         )
//     });
//
//     return {
//         ...state
//     }
// }
//
// export function useGetters(mapper) {
//     const store = useStore();
//     const getterFns = mapGetters(mapper);
//
//     const state = {}
//     Object.keys(getterFns).forEach(fnKey => {
//         state[fnKey] = computed(
//             getterFns[fnKey].bind({$store: store})
//         )
//     });
//
//     return {
//         ...state
//     }
// }

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
        }
    },
    actions: {
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
        }
    },
    getters: {}
})