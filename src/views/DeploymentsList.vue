<template>
  <div class="container">
    <AdminBase activeName="1-2"></AdminBase>
    <div class="main">
      <DeploymentsListCard class="deploymentsListCard"></DeploymentsListCard>
    </div>
  </div>
</template>

<script>
import AdminBase from '@/components/AdminBase.vue'
import DeploymentsListCard from '@/components/DeploymentsListCard'

export default {
  name: 'DeploymentsList',
  components: {
    AdminBase,
    DeploymentsListCard
  }
}
</script>

<style scoped>
/* body {
  background-color: #ccc;
} */
.main {
  position: relative;
  margin: 60px 0 0 240px;
}
</style>
