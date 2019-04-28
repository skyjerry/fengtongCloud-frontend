<template>
  <div class="container">
    <AdminBase active-name="1-3" :open_names="['1']"></AdminBase>
    <div class="main">
      <PodsListCard></PodsListCard>
    </div>
  </div>
</template>

<script>
import AdminBase from '@/components/AdminBase.vue'
import PodsListCard from '@/components/PodsListCard.vue'
export default {
  name: 'PodsList',
  components: {
    AdminBase,
    PodsListCard,
  }
}
</script>

<style scoped>
.main {
  position: relative;
  margin: 60px 0 0 240px;
}
</style>




