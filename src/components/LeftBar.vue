<template>
  <div class="left">
    <Menu :active-name="activeName" :open-names="open_names" class="menu">
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-analytics" />
                监控面板
            </template>
            <MenuItem name="1-1" to="/nodes">节点</MenuItem>
            <MenuItem name="1-2" to="/deploys">部署</MenuItem>
            <MenuItem name="1-3" to="/pods">容器组</MenuItem>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-filing" />
                应用控制台
            </template>
            <MenuItem name="2-1" to="/images">镜像管理</MenuItem>
            <MenuItem name="2-2">应用发布</MenuItem>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-filing" />
                系统管理
            </template>
            <MenuItem name="3-1">系统信息</MenuItem>
        </Submenu>
        <Submenu name="4">
            <template slot="title">
                <Icon type="ios-filing" />
                用户管理
            </template>
            <MenuItem name="4-1">用户列表</MenuItem>
        </Submenu>

    </Menu>
  </div>
</template>

<script>

export default {
  name: 'LeftBar',
  props: {
    activeName: String,
    open_names: Array,
  },
}
</script>

<style scoped>
.left {
  z-index: 999;
  position: fixed;
  top: 60px;
  left:0;
  width: 240px;
  height: 100%;
}
.menu {
  width: 240px;
  height: 100%;
}
</style>
