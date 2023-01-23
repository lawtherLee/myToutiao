<template>
  <div class="article-list">
    <!--
     List 列表组件：瀑布流滚动加载，用于展示长列表。

     List 组件通过 loading 和 finished 两个变量控制加载状态，
     当组件初始化或滚动到到底部时，会触发 load 事件并将 loading 自动设置成 true，此时可以发起异步操作并更新数据，
     数据更新完毕后，将 loading 设置成 false 即可。
     若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

     - load 事件：
       + List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
       + 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。

     - loading 属性：控制加载中的 loading 状态
       + 非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
       + 加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件

     - finished 属性：控制加载结束的状态
       + 在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
       + 所有数据加载结束，finished 为 true，此时不会触发 load 事件
    -->
    <van-pull-refresh v-model="refreshingLoading" @refresh="getNextPage">
      <van-list
        v-model="loading"
        :error.sync="error"
        :finished="finished"
        error-text="加载失败，请重试"
        finished-text="----没有更多了----"
        offset="100"
        @load="getNextPage"
      >

        <article-item v-for="item in list" :key="item.art_id" :article="item"/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
import ArticleItem from '@/views/Home/components/ArticleItem.vue'

export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    id: {
      type: Number || String,
      required: true
    }
  },
  data () {
    return {
      refreshingLoading: false,
      list: [],
      loading: false,
      finished: false,
      timeStamp: null,
      error: false
    }
  },
  methods: {
    async onload () {
      try {
        this.loading = true
        const { data: { data } } = await getArticleList(this.id, +new Date())
        this.list = data.results
        this.loading = false
        // console.log(this.list)
        // 判断是否结束
        if (data.results.length) {
          // 保存下一页时间戳 用于分页
          this.timeStamp = data.pre_timestamp
          // console.log('保存的时间戳', this.timeStamp)
          console.log('保存了时间戳', this.timeStamp)
        } else {
          this.finished = true
        }
      } catch (e) {
        this.error = true // 开启错误提示
        const status = e.response?.status
        if (!e.response || status === 507) {
          throw e
        } else {
          if (status === 400) throw new Error(e.response.data.message)
        }
      }
    },

    // 滑动加载下一页
    async getNextPage () {
      try {
        console.log(this.timeStamp)
        const { data: { data } } = await getArticleList(this.id, this.timeStamp)
        console.log(data)
        // 如果没有数据直接显示底部文案
        if (!data.pre_timestamp) this.finished = true
        // 判断用户上滑还是下拉
        if (this.refreshingLoading) {
          this.list.unshift(...data.results)
        } else {
          this.list.push(...data.results)
        }
        // 更新时间戳
        this.timeStamp = data.pre_timestamp
      } catch (err) {
        console.log(111)
        console.log(err)
        this.error = true
      } finally {
        this.loading = false
        this.refreshingLoading = false
      }
    }
  },
  created () {
    this.onload()
  }
}
</script>

<style lang="scss" scoped>
.van-cell-group--inset {
  margin: 10px;
}

.article-list {
  margin-top: 20px;

  van-cell {
    //padding: 10px;
  }
}
</style>
