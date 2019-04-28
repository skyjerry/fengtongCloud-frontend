<template>
  <div class="container">
    <div class="main">
      <Card class="pods-card">
        <Button class="refresh" type="primary" icon="md-refresh" @click="getData()">刷新</Button>
        <Table :columns="columns1" :loading="tableLoading" :data="pods" class="pods-table">
          <template slot-scope="{ index }" slot="keys">
            <strong>{{ index }}</strong>
          </template>
          <template slot-scope="{ row }" slot="action">
            <Button type="error" size="small" @click="del(row.name)">删除</Button>
          </template>
        </Table>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PodsListCard',
  data() {
    return {
      columns1: [
          {
            title: '#',
            slot: 'keys',
            sortable: true,
            width: 100,
          },
          {
            title: '名称',
            key: 'name',
            align: 'center',
            sortable: true,
            width: '140',
          },
          {
            title: '节点',
            key: 'node',
            align: 'center',
            sortable: true,
            width: '140',
          },
          {
            title: '状态',
            key: 'status',
            align: 'center',
            sortable: true,
            width: '100',
          },
          {
            title: '镜像',
            key: 'image',
            align: 'center',
            width: '140',
          },
          {
            title: '创建时间',
            key: 'createTime',
            sortable: true,
            align: 'center',
            width: '200',
          },
          {
            title: '操作',
            slot: 'action',
            width: '200',
          }
      ],
      pods: [],
      tableLoading: false,
    }
  },
  methods: {
    getData() {
      this.tableLoading = true
      this.$axios.get(this.host + '/v1/pods', {})
      .then(res => {
        if (res.data.code == 200) {
          this.pods = []
          res.data.data.pods.forEach(ele => {
            this.pods.push({
              name: ele.name,
              node: ele.nodeName,
              status: ele.status,
              image: ele.image,
              createTime: ele.created_at,
              value: ele.value,
            })
          })
        }

        this.tableLoading = false

      })
      .catch(err => {
        alert(err)
      })
    },
    del(name) {
      this.$axios.post(this.host + '/v1/pod/' + name + '/delete', {})
      .then(res => {
        console.log(res)
        this.getData()
      })
      .catch(err => {
        alert(err)
      })
    },
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
.pods-table {
  font-size: 20px;
}
.refresh {
  margin: 0 0 10px 0;
}
.scaleInput {
  text-align: center;
}
</style>


