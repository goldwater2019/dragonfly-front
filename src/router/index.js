import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const routes = [
    {
        path: '/',
        redirect: '/kafkaConfig'
    }, {
        path: '/kafkaConfig',
        name: 'kafkaConfig',
        component: () => import('@/view/kafka/KafkaConfig')
    }, {
        path: '/topicManage',
        name: 'topicManage',
        component: () => import('@/view/kafka/TopicManage')
    }, {
        path: '/starRocksConfig',
        name: 'starRocksConfig',
        component: () => import('@/view/starrocks/StarRocksConfig')
    }, {
        path: '/starRocksSchema',
        name: 'starRocksSchema',
        component: () => import('@/view/starrocks/StarRocksSchema')
    }, {
        path: '/kafka2starRocksSchemaGenerator',
        name: 'kafka2starRocksSchemaGenerator',
        component: () => import('@/view/kafka2starrocks/Kafka2starRocksSchemaGenerator')
    }, {
        path: '/kafka2starRocksSchemaConfig',
        name: 'kafka2starRocksSchemaConfig',
        component: () => import('@/view/kafka2starrocks/Kafka2starRocksSchemaConfig')
    }, {
        path: '/kafkaConfig/edit/:kafkaId',
        name: 'kafkaConfigEdit',
        component: () => import('@/view/kafka/KafkaEdit')
    }
]

const router = new VueRouter({
    routes
})

export default router
