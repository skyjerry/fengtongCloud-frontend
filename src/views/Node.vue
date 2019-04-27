<template>
  <div class="container">
    <AdminBase></AdminBase>
    <div class="main">
      <NodeCard :name="this.$route.params.name"></NodeCard>

    </div>
  </div>
</template>

<script>
import AdminBase from '@/components/AdminBase.vue'
import NodeCard from '@/components/NodeCard.vue'

export default {
  name: 'Node',
  components: {
    AdminBase,
    NodeCard
  },
  props: ['id']
}
</script>

<style scoped>
.main {
  position: relative;
  margin: 60px 0 0 240px;
}
</style>

