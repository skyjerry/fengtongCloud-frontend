<template>
  <div class="container">
    <div class="main">
      <Card class="deploys-card">
        <Button class="refresh" type="primary" icon="md-refresh" @click="getData()">刷新</Button>
        <Table :columns="columns1" :loading="tableLoading" :data="deployments" class="deploys-table">
          <template slot-scope="{ row }" slot="labels">
            <Tag v-for="(item, value) in row.labels" :key="item">{{ value }}: {{ item }}</Tag>
          </template>
          <template slot-scope="{ row }" slot="pods">
            {{ row.runningCount }}/{{ row.replicas }}
          </template>
          <template slot-scope="{ index }" slot="action">
            <Button type="primary" size="small" @click="showScale(index)">伸缩</Button>&nbsp;
            <Button type="info" size="small" @click="edit(index)">编辑</Button>
          </template>
        </Table>
      </Card>
      <Modal
        v-model="editModal"
        title="Deployment JSON"
        :closable="false"
        :mask-closable="false"
        :transition-names="['ease', 'fade']"
        @on-ok="deploy()"
        ok-text="应用"
        :loading="editLoading"
        width="700"

        >
        <div id="jsoneditor" style="width: 650px; height: 500px;"></div>
      </Modal>
      <Modal
          v-model="scaleModal"
          title="弹性伸缩"
          :closable="false"
          :mask-closable="false"
          :transition-names="['ease', 'fade']"
          @on-ok="scale()"
          ok-text="立即更新"
          :loading="scaleLoading"
          >
          <Input class="scaleInput" v-model="scaleNum" placeholder="期望POD数量" :number="true" autofocus />
      </Modal>
    </div>
  </div>
</template>

<script>
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css';
import { setTimeout } from 'timers';
export default {
  name: 'DeploymentsListCard',
  components: {

  },
  data() {
    return {
      columns1: [
          {
            title: '名称',
            key: 'name',
            align: 'center',
            sortable: true,
            width: '140',
          },
          {
            title: '标签',
            slot: 'labels',
            align: 'center',
            width: '140',
          },
          {
            title: '容器组',
            slot: 'pods',
            align: 'center',
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
          }
      ],
      editModal: false,
      scaleModal: false,
      editIndex: 0,
      scaleIndex: 0,
      editLoading: true,
      scaleLoading: true,
      scaleNum: 0,
      deployments: [],
      editor: {},

    }
  },
  methods: {
    getData() {
      this.tableLoading = true
      this.$axios.get(this.host + '/v1/deployments', {})
      .then(res => {
        if (res.data.code == 200) {
          this.deployments = []
          res.data.data.deployments.forEach(ele => {
            this.deployments.push({
              name: ele.name,
              replicas: ele.replicas,
              runningCount: ele.runningCount,
              labels: ele.labels,
              image: ele.containers[0].image,
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
    edit(index) {
      this.editModal = true
      this.editIndex = index
      this.editor.set(this.deployments[index].value)
    },
    deploy() {
      try{
        JSON.stringify(this.editor.get(), null, 2)
      } catch {
        alert("格式错误")
        this.editModal = false
        setTimeout(() => {this.editModal = true}, 1)
        return false
      }

      this.$axios.post(this.host + '/v1/deployment/update', this.editor.get())
      .then(res => {
        if (res.data.code == 200) {
          this.$Message.success(res.data.msg)
        } else {
          this.$Message.error(res.data.msg)
        }
        this.getData()
        this.editModal = false
      })
      .catch(err => {
        alert(err)
      })
    },
    showScale(index) {
      this.scaleModal = true
      this.scaleIndex = index
      this.scaleNum = this.deployments[index].replicas
    },
    scale() {
      let deployName = this.deployments[this.scaleIndex].name
      let data = {'replicas': this.scaleNum}
      this.$axios.post(this.host + '/v1/deployment/' + deployName + '/scale', data)
      .then(res => {
        if (res.data.code == 200) {
          this.$Message.success(res.data.msg)
        } else {
          this.$Message.error(res.data.msg)
        }
        this.getData()
        this.scaleModal = false
      })
      .catch(err => {
        alert(err)
      })
    },

  },
  created() {
    this.getData()
  },
  mounted() {
    this.editor = new JSONEditor(document.getElementById('jsoneditor'), {mode: 'code'}, {})
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
.deploys-table {
  font-size: 20px;
}
.refresh {
  margin: 0 0 10px 0;
}
.scaleInput {
  text-align: center;
}
</style>

