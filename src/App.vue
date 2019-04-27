<template>
  <div id="app">
      <!-- <router-link to="/about">About</router-link> -->
    <router-view/>
  </div>
</template>
<script>
export default {
  created() {
    setInterval(() => {
      if (this.$router.history.current.path != '/login') {
        let expired_at = localStorage.getItem('expired_at')
        let token = localStorage.getItem('token')
        if (expired_at == null || expired_at < Math.floor(Date.now()/1000) || token == null) {
          localStorage.clear()
          this.$router.push({path: '/login'})
        }
      }
    }, 1000)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background-color: #eeeeee;
}
</style>
