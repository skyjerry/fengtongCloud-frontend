<template>
  <div class="container">
    <div class="main">
      <Card v-if="nodeInfo.status">
        <p slot="title">节点信息</p>
        <div v-if="nodeInfo.status">
          <p class="list">名称：{{ name }}</p>
          <p class="list">CIDR：{{ nodeInfo.spec.podCIDR }}</p>
          <p class="list">容器运行时/版本：{{ nodeInfo.status.nodeInfo.containerRuntimeVersion }}</p>
          <p class="list">操作系统/镜像版本：{{ nodeInfo.status.nodeInfo.operatingSystem }}/{{ nodeInfo.status.nodeInfo.osImage }}</p>
          <p class="list">资源配额：CPU <b>{{ nodeInfo.status.allocatable.cpu }}</b> 核 | 存储 <b>{{ parseInt((nodeInfo.status.allocatable['ephemeral-storage'])/1073741824) }}</b> GB | 内存 <b>{{ nodeInfo.status.allocatable.memory }}</b> K | POD <b>{{ nodeInfo.status.allocatable.pods }}</b> 个</p>
          <p class="list">缺陷：
            <Tag color="warning" v-for="item in nodeInfo.spec.taints" :key="item.key">{{ item.key }}:{{ item.effect }}</Tag>
          </p>
        </div>
      </Card>

    </div>
  </div>
</template>

<script>
export default {
  name: 'NodeCard',
  props: ['name'],
  data() {
    return {
      nodeName: this.name,
      nodeInfo: {

      }
    }
  },
  created() {
    this.$axios.get(this.host + '/v1/node/' + this.nodeName, {})
    .then(res => {
      this.nodeInfo = res.data.data.nodeInfo
    })
    .catch(err => {
      alert(err)
    })
  }
}
</script>

<style scoped>
.container {
  margin: 100px 0 0 0;
}
.main {
  margin: 0 20px 0 20px;
}

.list {
  margin: 0 0 20px 0;
}
</style>

