<template>
  <div>
<!--    <h2>StarRocksConfig</h2>-->
<!--    <div>-->
<!--      <el-button icon="el-icon" type="primary" class="mt-5" @click="onQueryData">查询</el-button>-->
<!--    </div>-->
    <div>
      <!-- 表格数据 -->
      <el-table :data="srConfigData" max-height="500px" class="mt-5" stripe border>
        <el-table-column align="center" prop="dorisId" label="dorisId" width="150px"></el-table-column>
        <el-table-column align="center" prop="dorisAlias" label="	doris名称" width="150px"></el-table-column>
        <el-table-column align="center" prop="dbname" label="	数据库" width="150px"></el-table-column>
        <el-table-column align="center" prop="username" label="用户名" width="150px"></el-table-column>
        <el-table-column align="center" prop="password" label="	密码" width="150px"></el-table-column>
        <el-table-column align="center" prop="loadUrl" label="load地址" width="150px"></el-table-column>
        <el-table-column align="center" prop="jdbcUrl" label="jdbc地址" width="150px"></el-table-column>
        <el-table-column label="操作" width="200px" fixed="right" align="center">
          <template slot-scope="{row}">
            <lambda-button
                size="mini"
                icon="el-icon-delete"
                confirm
                type="danger"
                @confirm="onDeleteKafkaTopic(row)"
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

export default {
  name: "StarRocksConfig",
  components: {
    LambdaButton
  },
  data() {
    return {
      srConfigData: []
    }
  },
  methods: {
    onQueryData() {
      this.$store.dispatch("fetAllDorisConfigData").then(
          () => {
            this.srConfigData = this.$store.state.dorisConfigList;
          }
      )
    }
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