<template>
<div class="homepage-hero-module">
  <div class="loginCard">
    <div class="title">风曈PaaS平台</div>
    <Input class="input" size="large" prefix="md-contact" placeholder="输入用户名" type="text" v-model="username" />
    <Input class="input" size="large" prefix="md-lock" placeholder="输入密码" type="password" v-model="password" />
    <Button class="input" type="primary" @click="login()">登录</Button>
    <div class="server-status">
      <div class="status">
        服务器状态：<span v-if="serverStatus==true" style="color: #04fd04">正常</span>
        <span v-else style="color: red">异常</span>
      </div>
      <div class="speed">
        延迟：{{serverDelay}}ms
      </div>

    </div>
  </div>
  <div class="video-container">
    <div :style="fixStyle" class="filter"></div>
    <video :style="fixStyle" autoplay loop class="fillWidth" v-on:canplay="canplay">
      <source src="/Travaho.mp4" type="video/mp4"/>
      浏览器不支持 video 标签，建议升级浏览器。
      <source src="/Travaho.webm" type="video/webm"/>
      浏览器不支持 video 标签，建议升级浏览器。
    </video>
    <div class="poster hidden" v-if="!vedioCanPlay">
      <img :style="fixStyle" src="/Travaho.jpg" alt="">
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'login',
  data() {
    return {
      vedioCanPlay: false,
      fixStyle: '',
      username: '',
      password: '',
      serverStatus: true,
      serverDelay: 0,
    }
  },
  methods: {
    canplay() {
      this.vedioCanPlay = true
    },
    ping() {
      let reqTime = Date.now()
      this.$axios.get(this.host + '/ping', {})
      .then(res => {
        if (res.data.code == 200) {
          this.serverDelay = Math.ceil((Date.now() - reqTime)/10)
        } else {
          this.serverStatus = false
        }
      })
      .catch(err => {
        alert(err)
      })
    },
    login() {
      let params = new URLSearchParams();
      params.append('username', this.username)
      params.append('password', this.password)
      this.$axios.post(this.host + '/login', params)
      .then(res => {
        if (res.data.code == 200) {
          localStorage.setItem('token', res.data.data.access_token)
          localStorage.setItem('expired_at', res.data.data.expired_at)
          this.$Message.success('登录成功')
          this.$router.push({path: '/nodes'})
        } else {
          this.$Message.error(res.data.msg)
        }
      })
      .catch(err => {
        alert(err)
      })
    }
  },
  created() {
    this.ping()
    //setInterval(() => {this.ping()}, 10000)
  },
  mounted: function() {
    window.onresize = () => {
      const windowWidth = document.body.clientWidth
      const windowHeight = document.body.clientHeight
      const windowAspectRatio = windowHeight / windowWidth
      let videoWidth
      let videoHeight
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth
        videoHeight = videoWidth * 0.5625
        this.fixStyle = {
          height: windowWidth * 0.5625 + 'px',
          width: windowWidth + 'px',
          'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
          'margin-left': 'initial'
        }
      } else {
        videoHeight = windowHeight
        videoWidth = videoHeight / 0.5625
        this.fixStyle = {
          height: windowHeight + 'px',
          width: windowHeight / 0.5625 + 'px',
          'margin-left': (windowWidth - videoWidth) / 2 + 'px',
          'margin-bottom': 'initial'
        }
      }
    }
    window.onresize()

  }
}

</script>

<style scoped>
.homepage-hero-module,
.video-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.video-container .poster img,
.video-container video {
  z-index: 0;
  position: absolute;
}

.video-container .filter {
  z-index: 1;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
}

.loginCard {
  z-index: 2;
  position: fixed;
  top: 30%;
  left: 50%;
  color: #fff;
  transform: translate(-50%, 0);
}
.title {
  position: fixed;
  z-index: 2;
  width: 247px;
  top: -60%;
  font-size: 40px;
  left: 50%;
  transform: translate(-50%, 0);
}
.input {
  display: block;
  width: 240px;
  margin: 0 0 20px 0;
}
.server-status {
  font-size: 14px;
}
.status {
  float: left;
}
.speed {
  float: right;
}
</style>


