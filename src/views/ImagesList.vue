<template>
  <div class="container">
    <AdminBase active-name="2-1" :open_names="['2']"></AdminBase>
    <div class="main">
      <ImagesListCard></ImagesListCard>
    </div>
  </div>
</template>

<script>
import AdminBase from '@/components/AdminBase.vue'
import ImagesListCard from '@/components/ImagesListCard.vue'
export default {
  name: 'ImagesList',
  components: {
    AdminBase,
    ImagesListCard,
  }
}
</script>

<style scoped>
.main {
  position: relative;
  margin: 60px 0 0 240px;
}
</style>




