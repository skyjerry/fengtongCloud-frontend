<template>
  <div class="container">
    <div class="main">
      <Form :model="formData" :label-width="90" class="form">
        <FormItem label="应用名称">
            <Input v-model="formData.appname" placeholder="输入应用名称" style="width: 300px" />
        </FormItem>
        <FormItem label="镜像">
            <Select v-model="formData.image" style="width: 152px">
                <Option v-for="(value, key) in images" :key="key" :value="key">{{ value.imageName }}</Option>
            </Select>&nbsp;
            <Select v-model="formData.imageTag" style="width: 140px" v-if="images.length" prefix="md-pricetag">
                <Option v-for="(value, key) in images[formData.image].tags" :key="key" :value="value">{{ value }}</Option>
            </Select>
        </FormItem>
        <FormItem label="应用标签">
          <Input v-model="formData.label" placeholder="输入标签名称" style="width: 300px" />
        </FormItem>
        <FormItem label="容器组数量">
          <Input v-model="formData.replicas" placeholder="输入容器组数量" style="width: 300px" />
        </FormItem>
        <FormItem label="容器端口">
          <Input v-model="formData.container_port" placeholder="输入容器端口" style="width: 300px" />
        </FormItem>
        <FormItem label="CPU限制(核)">
          <Input v-model="formData.cpu_requirement" placeholder="使用的CPU核数" style="width: 300px" />
        </FormItem>
        <FormItem label="内存限制(M)">
          <Input v-model="formData.memory_requirement" placeholder="使用的最大内存" style="width: 300px" />
        </FormItem>
        <FormItem label="特权模式">
          <Checkbox v-model="formData.runAsPrivileged">开启</Checkbox>
        </FormItem>

        <Button type="primary" size="large" class="deployButton" @click="deploy(formData)" :loading="loading">发布</Button>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeployCreateCard',
  data() {
    return {
      formData: {
        appname: '',
        label: '',
        replicas: 1,
        image: 0,
        imageTag: '',
        container_name: '',
        container_port: '',
        cpu_requirement: 0.1,
        memory_requirement: '100',
        runAsPrivileged: false,
      },
      images: [],
      loading: false,
    }
  },
  methods: {
    getData() {
      this.$axios.get(this.host + '/v1/images', {})
      .then(res => {
        if (res.data.code == 200) {
          this.images = res.data.data.images
        } else {
          this.$Message.error(res.data.msg)
        }
      })
      .catch(err => {
        this.$Message.error(err)
      })
    },
    deploy() {
      this.loading = true
      this.$axios.post(this.host + '/v1/deployment/create', {
        app_name: this.formData.appname,
        replicas: parseInt(this.formData.replicas),
        labels: this.formData.label,
        image: this.images[this.formData.image].imageName + ':' + this.formData.imageTag,
        container_name: this.images[this.formData.image].imageName,
        container_port: parseInt(this.formData.container_port),
        cpu_requirement: this.formData.cpu_requirement,
        memory_requirement: this.formData.memory_requirement + 'Mi',
        runAsPrivileged: this.formData.runAsPrivileged,
      })
      .then(res => {
        if (res.data.code == 200) {
          this.$Message.success(res.data.msg + ' 即将跳转')
          setTimeout(() => {
            this.$router.push('/deploys')
          }, 1500)

        } else {
          this.$Message.error(res.data.msg)
        }
        this.loading = false
      })
      .catch(err => {
        this.$Message.error(err)
        this.loading = false
      })
    }
  },
  created() {
    this.getData()
  },
}
</script>

<style scoped>
.container {
  margin: 100px 0 0 0;
}
.main {
  margin: 0 20px 0 20px;
}
.form {
  width: 500px;
}
.deployButton {
  width: 350px;
  margin: 0 0 0 30px;
}
</style>

