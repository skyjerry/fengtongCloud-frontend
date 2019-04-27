<template>
  <div class="container">
    <AdminBase activeName="1-1"></AdminBase>
    <div class="main">
      <NodesListCard class="nodelistCard"></NodesListCard>
    </div>
  </div>
</template>

<script>
import AdminBase from '@/components/AdminBase.vue'
import NodesListCard from '@/components/NodesListCard'

export default {
  name: 'NodesList',
  components: {
    AdminBase,
    NodesListCard
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
