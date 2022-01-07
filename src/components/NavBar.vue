<template>
  <div style="width: 256px">
    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'"/>
    </a-button>
    <a-menu
        :default-selected-keys="['1']"
        :default-open-keys="['sub1']"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
    >

      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="appstore"/><span>kafka管理</span></span>
        <a-menu-item key="1" @click="switchPage(1)">
          kafka配置
        </a-menu-item>
        <a-menu-item key="2" @click="switchPage(2)">
          Topic管理
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="appstore"/><span>StarRocks管理</span></span>
        <a-menu-item key="3" @click="switchPage(3)">
          StarRocks管理
        </a-menu-item>
        <a-menu-item key="4" @click="switchPage(4)">
          StarRocks schema管理
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <span slot="title"><a-icon type="appstore"/><span>kafka2starRocks管理</span></span>
        <a-menu-item key="5" @click="switchPage(5)">
          kafka2starRocks映射查看
        </a-menu-item>
        <a-menu-item key="6" @click="switchPage(6)">
          kafka2starRocks映射管理
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  created() {
    this.switchPage(1);
  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    switchPage(pageKey) {
      this.$store.commit({
        type: "changePageKey",
        pageKey: pageKey
      });
    },
  },
};
</script>
