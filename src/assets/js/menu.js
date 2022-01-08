export const menu = [
    {
        id: 1,
        name: 'kafka管理',
        path: 'kafkaManage',
        children: [
            {
                id: '1.1',
                name: 'kafka配置',
                path: 'kafkaConfig'
            },
            {
                id: '1.2',
                name: 'topic管理',
                path: 'topicManage'
            }
        ]
    }, {
        id: 2,
        name:  'starRocks管理',
        path: 'starRocksManage',
        children: [
            {
                id: '2.1',
                name: 'starRocks配置',
                path: 'starRocksConfig'
            },
            {
                id: '2.2',
                name: 'starRocks schema',
                path: 'starRocksSchema'
            }
        ]
    },
    {
        id: 3,
        name:  'kafka2starRocks',
        path: 'kafka2starRocks',
        children: [
            {
                id: '3.1',
                name: 'shema配置',
                path: 'kafka2starRocksSchemaConfig'
            },
            {
                id: '3.2',
                name: 'schema查看',
                path: 'kafka2starRocksSchemaShow'
            }
        ]
    }

]