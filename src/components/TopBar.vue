<template>
  <div class="header">
    <Menu mode="horizontal" theme="primary" active-name="1">
      <div class="title">风曈PaaS平台</div>
      <Submenu name="1" class="user">
        <template slot="title">
          <Icon type="md-person"/>
          用户中心
        </template>
        <MenuItem name="1-1">个人信息</MenuItem>
        <MenuItem name="1-2" @click.native="logout()">退出</MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push({path: '/login'})
    }
  }
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left:0;
  width: 100%;
  height: 60px;
  z-index: 1;
}
.user {
  float: right;
}
.title {
  display: inline;
  color: #fff;
  font-size: 20px;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-weight: 800;
  margin: 0 0 0 20px;
}

</style>
