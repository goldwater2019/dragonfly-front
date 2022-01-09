<template>

  <div>

    <!-- 添加按钮 -->
    <div>
      <el-button icon="el-icon-plus" type="primary" @click="onAddKafkaConfig" class="mt-5">添 加</el-button>
      <el-dialog
          title="新增/修改配置"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
        <!-- dialog的数据 -->
        <el-form :model="editKafkaConfigData">
          <el-form-item label="kafka服务器地址" :label-width="formLabelWidth">
            <el-input v-model="editKafkaConfigData.brokerList" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="kafka名称" :label-width="formLabelWidth">
            <el-input v-model="editKafkaConfigData.kafkaAlias" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-dialog :title="innerDialogTitle" :visible.sync="testConnectionResultVisiable">
          {{ testConnectionResult }}
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button @click="onEditConfigTestConnection">测试连接</el-button>
          <el-button type="primary" @click="onEditConfigConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div>
      <!-- 表格数据 -->
      <el-table :data="kafkaConfigList" max-height="500px" class="mt-5" stripe border>
        <el-table-column align="center" prop="kafkaId" label="kafka配置ID" width="150px"></el-table-column>
        <el-table-column align="center" prop="brokerList" label="	kafka服务器列表" width="150px"></el-table-column>
        <el-table-column align="center" prop="kafkaAlias" label="kafka别名" width="150px"></el-table-column>
        <el-table-column align="center" prop="createTime" label="	创建时间" width="150px"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="	修改时间" width="150px"></el-table-column>
        <el-table-column label="操作" width="200px" fixed="right" align="center">
          <template slot-scope="{row}">
            <lambda-button size="mini" icon="el-icon-edit" type="warning" @click="onEditKafkaConfig(row)">修改
            </lambda-button>
            <lambda-button
                size="mini"
                icon="el-icon-delete"
                confirm
                type="danger"
                @confirm="onDeleteKafkaConfig(row)"
            >删除
            </lambda-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

import LambdaButton from "@/components/common/LambdaButton";

// import {useState} from "@/store";
import {mapState} from "vuex";
import api from "@/api";

export default {
  name: "KafkaConfig",
  components: {
    LambdaButton
  },
  computed: {
    ...mapState({
      kafkaConfigList: state => state.kafkaConfigList,
      kafkaConfigAliasList: state => state.kafkaConfigAliasList
    })
  },
  methods: {
    onEditConfigTestConnection() {
      this.innerDialogTitle = "测试连接结果";
      let params = {
        brokerList: this.editKafkaConfigData.brokerList
      };
      api.testKafkaConnection(params)
          .then(res => {
            this.testConnectionResultVisiable = true;
            let code = res.code;
            if (code === 0) {
              this.testConnectionResult = "连接成功";
            } else {
              this.testConnectionResult = res.msg;
            }
          }).catch(err => {
        console.error(err);
      });
    },
    onEditConfigConfirm() {
      let editKafkaConfigData = this.editKafkaConfigData;
      if (editKafkaConfigData.kafkaId === "new") {
        let params = {
          brokerList: editKafkaConfigData.brokerList,
          kafkaAlias: editKafkaConfigData.kafkaAlias
        };
        api.addKafkaConfig(params).then((res) => {
          if (res.code === 0) {
            this.fetchAllKafkaConfigData();
            this.dialogVisible = false;
            this.editKafkaConfigData = {
              kafkaId: 'new',
              brokerList: '',
              kafkaAlias: ''
            };
          } else {
            this.innerDialogTitle = "添加错误";
            this.testConnectionResultVisiable = true;
            this.testConnectionResult = res.msg;
          }
        }).catch(() => {
        });
      } else {
        let params = {
          kafkaId: editKafkaConfigData.kafkaId,
          brokerList: editKafkaConfigData.brokerList,
          kafkaAlias: editKafkaConfigData.kafkaAlias
        };
        api.updateKafkaConfig(params).then((res) => {
          if (res.code === 0) {
            this.fetchAllKafkaConfigData();
            this.dialogVisible = false;
            this.editKafkaConfigData = {
              kafkaId: 'new',
              brokerList: '',
              kafkaAlias: ''
            };
          } else {
            this.innerDialogTitle = "修改错误";
            this.testConnectionResultVisiable = true;
            this.testConnectionResult = res.msg;
          }
        }).catch(() => {
        });
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {
          });
    },
    onEditKafkaConfig(kafkaConfig) {
      let editKafkaConfigData = this.editKafkaConfigData;
      editKafkaConfigData.brokerList = kafkaConfig.brokerList;
      editKafkaConfigData.kafkaId = kafkaConfig.kafkaId;
      editKafkaConfigData.kafkaAlias = kafkaConfig.kafkaAlias;
      this.dialogVisible = true;
    },
    onAddKafkaConfig() {
      this.dialogVisible = true;
    },
    onDeleteKafkaConfig(kafkaConfig) {
      let params = {
        kafkaId: kafkaConfig.kafkaId
      };
      api.deleteKafkaConfig(params)
          .then(() => {
            this.fetchAllKafkaConfigData();
          })
          .catch(() => {
          });
    },
    fetchAllKafkaConfigData() {
      this.kafkaConfigLoading = true;
      this.$store.dispatch("fetchAllKafkaConfigData");
      let data = this.kafkaConfigList;
      const kafkaConfigPagination = this.kafkaConfigPagination;
      kafkaConfigPagination.total = data.length;
      this.kafkaConfigLoading = false;
      this.kafkaConfigPagination = kafkaConfigPagination;
      let pageSize = data.length < 10 ? data.length : 10;
      let kafkaConfigData = [];
      for (let i = 0; i < pageSize; i++) {
        kafkaConfigData.push(data[i]);
      }
      this.kafkaConfigData = kafkaConfigData;
      let aliasList = this.kafkaConfigAliasList;
      let filterList = []
      for (let alias of aliasList) {
        filterList.push({
          text: alias,
          value: alias
        });
      }
    }
  },
  data() {
    return {
      kafkaConfigLoading: false,
      kafkaConfigPagination: {},
      kafkaConfigData: [],
      dialogVisible: false,
      editKafkaConfigData: {
        kafkaId: 'new',
        brokerList: '',
        kafkaAlias: ''
      },
      formLabelWidth: '150px',
      testConnectionResultVisiable: false,
      testConnectionResult: "",
      innerDialogTitle: "测试连接结果"
    }
  },
  created() {
    this.fetchAllKafkaConfigData();  // 通过接口获得所有的kafkaConfig数据
  },
}
</script>

<style scoped>

</style>