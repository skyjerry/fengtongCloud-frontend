<template>
  <div class="container">
    <div class="main">
      <Card class="node-card">
        <Button class="refresh" type="primary" icon="md-refresh" @click="getData()">刷新</Button>
        <Table :columns="columns1" :loading="tableLoading" :data="nodes" class="nodes-table">
          <template slot-scope="{ row }" slot="name">
            <router-link :to="{ path: '/node/' + row.name }">{{ row.name }}</router-link>
          </template>
          <template slot-scope="{ row }" slot="schedulable">
            <i-switch v-model="row.schedulable" @on-change="schedulable(row)" :loading="row.schedulableLoading" />
          </template>
        </Table>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NodesListCard',
  data() {
    return {
      tableLoading: true,
      columns1: [
          {
              title: '名称',
              slot: 'name',
              sortable: true
          },
          {
              title: '角色',
              key: 'role'
          },
          {
              title: '集群IP',
              key: 'internalIp',
          },
          {
              title: '状态',
              key: 'status',
              sortable: true
          },
          {
              title: '调度',
              slot: 'schedulable'
          },
          {
              title: '创建时间',
              key: 'createTime',
              sortable: true
          }
      ],
      nodes: [

      ]

    }
  },
  methods: {
    getData() {
      this.tableLoading = true
      this.$axios.get(this.host + '/v1/nodes', {})
      .then(res => {
        if (res.data.code == 200) {
          this.nodes = []
          res.data.data.nodes.forEach(ele => {
            this.nodes.push({
              name: ele.name,
              role: ele.role !== '' ? ele.role : 'master',
              status: ele.status.find(item => item.type === 'Ready').status ? 'Ready' : 'NotReady',
              schedulable: !ele.unschedulable,
              createTime: ele.created_at,
              internalIp: ele.addresses[0].address,
              schedulableLoading: false
            })
          })
        }

        this.tableLoading = false

      })
      .catch(err => {
        alert(err)
      })
    },
    schedulable(row) {
      let nodeName = row.name
      row.schedulableLoading = true
      let action = !row.schedulable ? '/stop' : '/start'
      this.$axios.post(this.host + '/v1/node/' + nodeName + action, {})
      .then(res => {
        if (res.data.code == 200) {
          this.$Message.success(res.data.msg)
          row.schedulableLoading = false
        } else {
          this.$Message.error(res.data.msg)
          row.schedulableLoading = false
          row.schedulable = !row.schedulable
        }
      })
      .catch(err => {
        alert(err)
        row.schedulableLoading = false
      })
    }
  },
  created() {
    this.getData()
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
.nodes-table {
  font-size: 20px;
}
.refresh {
  margin: 0 0 10px 0;
}
</style>


