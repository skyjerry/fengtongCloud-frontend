<template>
  <div class="container">
    <div class="main">
      <div id="images-box">
        <Card class="imageCard" v-for="(item, key) in images" :key="key">
          <div class="imageTitle" style="text-align:center">
            <h1>{{ item.imageName }}</h1>
            <Tag :color="randomHexColor()" v-for="tag in item.tags" :key="tag">{{ tag }}</Tag>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: 'ImagesListCard',
  data() {
    return {
      images: [],
    }
  },
  methods: {
    getData() {
      this.tableLoading = true
      this.$axios.get(this.host + '/v1/images', {})
      .then(res => {
        if (res.data.code == 200) {
          this.images = res.data.data.images
          // setTimeout(() => {
          //   this.waterFall()
          // }, 100)
          this.$nextTick(() =>{
            this.waterFall()
          })

        } else {
          this.$Message.error(res.data.msg)
        }
      })
      .catch(err => {
        this.$Message.error(err)
      })
    },
    randomHexColor() {
      let hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
      while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
        hex = '0' + hex;
      }
      return '#' + hex; //返回‘#’开头16进制颜色
    },
    getClient() {
      return {
        width: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 240,
        height: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) -60,
      }
    },
    waterFall() {
      let box = document.getElementById('images-box')
      let items = box.children
      if (items.length == 0) return
      let gap = 10
      let pageWidth = this.getClient().width
      let itemWidth = items[0].offsetWidth
      let columns = parseInt(pageWidth / (itemWidth + gap))
      var arr = []
      for (var i = 0; i < items.length; i++) {
          if (i < columns) {
              // 2- 确定第一行
              items[i].style.top = 0;
              items[i].style.left = (itemWidth + gap) * i + 20 + 'px';

              arr.push(items[i].offsetHeight - 31)

          } else {
              // 其他行
              // 3- 找到数组中最小高度  和 它的索引
              var minHeight = arr[0];
              var index = 0;
              for (var j = 0; j < arr.length; j++) {
                  if (minHeight > arr[j]) {
                      minHeight = arr[j];
                      index = j;
                  }
              }
              // 4- 设置下一行的第一个盒子位置
              // top值就是最小列的高度 + gap
              items[i].style.top = arr[index] + gap + 'px';
              // left值就是最小列距离左边的距离
              items[i].style.left = items[index].offsetLeft + 'px';

              // 5- 修改最小列的高度
              // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
              console.log(items[i].offsetHeight)
              arr[index] = arr[index] + items[i].offsetHeight + gap -31;
          }
      }
    },
  },
  mounted() {
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

.imageCard {
  position: absolute;
  width: 260px;
}
.imageTitle {
  word-break:break-all;
}
#images-box {
  width: 1000px;
}
</style>

