<template>
  <div class="left">
    <!-- :default-active="menu[0].path" -->
    <el-menu
        :default-active="active"
        background-color="#fff"
        text-color="#333"
        mode="vertical"
        unique-opened
        @select="onSelect"
    >
      <el-submenu v-for="item in menu" :key="item.id" :index="item.path">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          {{item.name}}
        </template>
        <el-menu-item
            v-for="child in item.children"
            :key="child.id"
            :index="child.path"
        >{{child.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { menu } from '@/assets/js/menu.js'
export default {
  data() {
    return {
      active: '',
      menu,
    }
  },
  mounted(){
    this.active = location.href.split('/#/')[1]
  },
  methods: {
    onSelect(name) {
      console.log(name);
      this.$router.push({ name })
    },
  },
}
</script>

<style scoped>
.left {
  width: 280px;
  height: 100vh;
}

.el-menu {
  border: none;
}
</style>