<template>
  <div class="container">
    <AdminBase active-name="2-2" :open_names="['2']"></AdminBase>
    <div class="main">
      <DeployCreateCard></DeployCreateCard>
    </div>
  </div>
</template>

<script>
import AdminBase from '@/components/AdminBase.vue'
import DeployCreateCard from '@/components/DeployCreateCard.vue'
export default {
  name: 'DeployCreate',
  components: {
    AdminBase,
    DeployCreateCard,
  },
}
</script>

<style scoped>
.main {
  position: relative;
  margin: 60px 0 0 240px;
}
</style>
