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
        num: 0
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
        }
    },
    actions: {
        async fetchAllKafkaConfigData({commit}) {
            const promise = await api.getAllKafkaConfig();
            let data = promise.data;
            for (let payload of data) {
                commit("addKafkaConfig", payload);
            }
        }
    },
    getters: {}
})