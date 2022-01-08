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
        component: () => import('@/view/KafkaConfig')
    }, {
        path: '/topicManage',
        name: 'topicManage',
        component: () => import('@/view/TopicManage')
    }, {
        path: '/starRocksConfig',
        name: 'starRocksConfig',
        component: () => import('@/view/StarRocksConfig')
    }, {
        path: '/starRocksSchema',
        name: 'starRocksSchema',
        component: () => import('@/view/StarRocksSchema')
    }, {
        path: '/kafka2starRocksSchemaConfig',
        name: 'kafka2starRocksSchemaConfig',
        component: () => import('@/view/Kafka2starRocksSchemaConfig')
    }, {
        path: '/kafka2starRocksSchemaShow',
        name: 'kafka2starRocksSchemaShow',
        component: () => import('@/view/Kafka2starRocksSchemaShow')
    }
]

const router = new VueRouter({
    routes
})

export default router
