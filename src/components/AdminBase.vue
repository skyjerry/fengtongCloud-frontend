<template>
  <div>
    <TopBar></TopBar>
    <LeftBar :activeName="activeName"></LeftBar>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import LeftBar from '@/components/LeftBar.vue'

export default {
  name: 'AdminBase',
  components: {
    TopBar,
    LeftBar
  },
  props: ['activeName'],
}
</script>


