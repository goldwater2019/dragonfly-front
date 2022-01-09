<template>
  <div>
    <!-- 添加按钮 -->
    <div>
      <el-button icon="el-icon-plus" type="primary" @click="onAddStarRocksConfigData" class="mt-5">添 加</el-button>
      <el-dialog
          title="新增/修改配置"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
        <!-- dialog的数据 -->
        <el-form :model="editStarRocksConfigData">
          <el-form-item label="doris连接名称" :label-width="formLabelWidth">
            <el-input v-model="editStarRocksConfigData.dorisAlias" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数据库名" :label-width="formLabelWidth">
            <el-input v-model="editStarRocksConfigData.dbname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="jdbc地址" :label-width="formLabelWidth">
            <el-input v-model="editStarRocksConfigData.jdbcUrl" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="load地址" :label-width="formLabelWidth">
            <el-input v-model="editStarRocksConfigData.loadUrl" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="editStarRocksConfigData.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="editStarRocksConfigData.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-dialog :title="innerDialogTitle" :visible.sync="innerDialogVisible">
          {{ innerDialogMessage }}
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button @click="onEditStarRocksConnectionTest">测试连接</el-button>
          <el-button type="primary" @click="onEditConfigConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div>
      <!-- 表格数据 -->
      <el-table :data="srConfigData" max-height="500px" class="mt-5" stripe border>
        <el-table-column align="center" prop="dorisId" label="starRocksId" width="150px"></el-table-column>
        <el-table-column align="center" prop="dorisAlias" label="	doris名称" width="150px"></el-table-column>
        <el-table-column align="center" prop="dbname" label="	数据库" width="150px"></el-table-column>
        <el-table-column align="center" prop="username" label="用户名" width="150px"></el-table-column>
        <el-table-column align="center" prop="password" label="	密码" width="150px"></el-table-column>
        <el-table-column align="center" prop="loadUrl" label="load地址" width="150px"></el-table-column>
        <el-table-column align="center" prop="jdbcUrl" label="jdbc地址" width="150px"></el-table-column>
        <el-table-column label="操作" width="200px" fixed="right" align="center">
          <template slot-scope="{row}">
            <lambda-button size="mini" icon="el-icon-edit" type="warning" @click="onUpdateStarRocksConfig(row)">
              修改
            </lambda-button>
            <lambda-button
                size="mini"
                icon="el-icon-delete"
                confirm
                type="danger"
                @confirm="onDeleteStarRocksConfig(row)"
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
import api from "@/api";

export default {
  name: "StarRocksConfig",
  components: {
    LambdaButton
  },
  data() {
    return {
      innerDialogMessage: '', // 内嵌dialog信息
      innerDialogVisible: false, // 内嵌dialog是否可见
      innerDialogTitle: '', // 内嵌dialog的title
      formLabelWidth: '120px',
      dialogVisible: false,  // 编辑会话框是否显示
      srConfigData: [],
      editStarRocksConfigData: {
        dbname: 'tx_dev',
        dorisAlias: '天象DorisDB测试环境',
        jdbcUrl: '10.10.230.2:9030',
        loadUrl: '10.10.230.2:8030',
        password: 'anetx',
        username: 'anetx'
      }
    }
  },
  methods: {
    // 会话关闭处理句柄
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {
          });
    },
    onQueryData() {
      this.$store.dispatch("fetAllDorisConfigData").then(
          () => {
            this.srConfigData = this.$store.state.dorisConfigList;
          }
      )
    },
    // 确认保存
    onEditConfigConfirm() {
      let editStarRocksConfigData = this.editStarRocksConfigData;
      let params = {};
      if (editStarRocksConfigData.dorisId === undefined) {
        params = {
          dbname: editStarRocksConfigData.dbname,
          dorisAlias: editStarRocksConfigData.dorisAlias,
          jdbcUrl: editStarRocksConfigData.jdbcUrl,
          loadUrl: editStarRocksConfigData.loadUrl,
          password: editStarRocksConfigData.password,
          username: editStarRocksConfigData.username,
        };
      } else {
        params = {
          dbname: editStarRocksConfigData.dbname,
          dorisAlias: editStarRocksConfigData.dorisAlias,
          jdbcUrl: editStarRocksConfigData.jdbcUrl,
          loadUrl: editStarRocksConfigData.loadUrl,
          password: editStarRocksConfigData.password,
          username: editStarRocksConfigData.username,
          dorisId: editStarRocksConfigData.dorisId
        };
      }
      let promise;
      if (this.editStarRocksConfigData.dorisId === undefined) {
        promise = api.addStarRocksConfig(params);
      } else {
        promise = api.updateStarRocksConfig(params);
      }
      promise.then(res => {
        let code = res.code;
        if (code === 0) {
          /**
           * 1. 关闭弹窗
           * 2. 更新数据
           * 3. 初始化编辑数据
           */
          this.innerDialogVisible = false;
          this.dialogVisible = false;
          this.onQueryData();
          this.initEditStarRocksConfigData();
        } else {
          this.innerDialogVisible = true;
          this.dialogVisible = true;
          if (this.editStarRocksConfigData.dorisId === undefined) {
            this.innerDialogTitle = '新增StarRocks错误';
          } else {
            this.innerDialogTitle = '修改StarRocks错误';
          }
          this.innerDialogMessage = res.msg;
        }
      })
          .catch(err => {
            console.error(err);
          });
    },
    // 连接测试
    onEditStarRocksConnectionTest() {
      this.dialogVisible = true;
      let editStarRocksConfigData = this.editStarRocksConfigData;
      let params = {
        dbname: editStarRocksConfigData.dbname,
        dorisAlias: editStarRocksConfigData.dorisAlias,
        jdbcUrl: editStarRocksConfigData.jdbcUrl,
        loadUrl: editStarRocksConfigData.loadUrl,
        password: editStarRocksConfigData.password,
        username: editStarRocksConfigData.username,
        dorisId: editStarRocksConfigData.dorisId
      };
      api.pingStarRocksConfig(params)
          .then(res => {
            let code = res.code;
            // 显示
            this.innerDialogVisible = true;
            this.innerDialogTitle = '连接测试';
            if (code === 0) {
              this.innerDialogMessage = '连接成功';
            } else {
              let errorMessage = res.msg;
              if (errorMessage === undefined || errorMessage === null) {
                errorMessage = "连接失败";
              }
              this.innerDialogMessage = errorMessage;
            }
          }).catch(err => {
        console.error(err);
      })
    },
    // 初始化新增的数据, 默认值填在此处
    initEditStarRocksConfigData() {
      let editStarRocksConfigData = {
        dbname: 'tx_dev',
        dorisAlias: '天象DorisDB测试环境',
        jdbcUrl: '10.10.230.2:9030',
        loadUrl: '10.10.230.2:8030',
        password: 'anetx',
        username: 'anetx',
        dorisId: undefined
      };
      this.editStarRocksConfigData = editStarRocksConfigData;
    },
    // 删除按钮事件
    onDeleteStarRocksConfig(starRocksConfig) {
      // console.log(starRocksConfig);
      let params = {
        dorisId: starRocksConfig.dorisId
      };
      api.deleteStarRockConfig(params)
          .then(res => {
            console.log(res);
            this.onQueryData();
          }).catch(() => {
      });
    },
    // 添加按钮事件
    onAddStarRocksConfigData() {
      this.initEditStarRocksConfigData();
      this.dialogVisible = true;
    },
    // 修改按钮事件
    onUpdateStarRocksConfig(starRocksConfig) {
      let editStarRocksConfigData = {
        dbname: starRocksConfig.dbname,
        dorisAlias: starRocksConfig.dorisAlias,
        jdbcUrl: starRocksConfig.jdbcUrl,
        loadUrl: starRocksConfig.loadUrl,
        password: starRocksConfig.password,
        username: starRocksConfig.username,
        dorisId: starRocksConfig.dorisId
      }
      this.editStarRocksConfigData = editStarRocksConfigData;
      this.dialogVisible = true;
    },
  },
  watch: {
    srConfigData: (newVal, oldVal) => {
      console.log(newVal, oldVal);
    }
  },
  created() {
    this.onQueryData();
  }
}
</script>

<style scoped>

</style>