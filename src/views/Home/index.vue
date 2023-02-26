<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          block
          icon="search"
          round
          size="small"
          @click="$router.push('/search')"
        >搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!--    选项卡/内容区-->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!--      文章列表-->
        <article-list :id="item.id"/>
        <span class="toutiao toutiao-gengduo" @click="isShowPopup = true"/>
      </van-tab>

      <!--      弹出层-->
      <van-popup v-model="isShowPopup" :style="{height:'100%'}"
                 close-icon-position="top-left" closeable
                 position="bottom">
        <!--        弹出层内容-->
        <popup-edit v-if="isShowPopup"
                    :my-channels="channels"
                    @del-channel="delChannel"
                    @change-channel="[isShowPopup = false,active = $event]"
                    @add-channel="addChannel"/>
      </van-popup>
    </van-tabs>
    <!--/    选项卡/内容区-->
  </div>
</template>

<script>
import ArticleList from '@/views/Home/components/ArticleList.vue'
import { addChannelAPI, getUserChannelsAPI } from '@/api'
import PopupEdit from '@/views/Home/components/PopupEdit.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Home',
  components: { PopupEdit, ArticleList },
  props: {},
  data () {
    return {
      isShowPopup: true,
      active: 0,
      channels: [],
      channel: {} // 文章内容
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  watch: {},
  created () {
    this.getChannelsData()
  },
  mounted () {
  },
  methods: {
    ...mapMutations(['SET_MY_CHANNEL']),
    // 获取服务器数据
    async getChannelsData () {
      try {
        const { data: { data } } = await getUserChannelsAPI()
        this.channels = data.channels
        // console.log(this.channels)
      } catch (e) {
        console.log(e)
      }
    },
    // 删除频道
    delChannel (id) {
      console.log(id)
    },
    // 添加频道
    async addChannel (e) {
      // this.channels.push(e)
      try {
        if (this.isLogin) {
          console.log('登录了')
          await addChannelAPI(e.id, this.channels.length)
        } else {
          this.SET_MY_CHANNEL([...this.channels, e])
        }
        this.channels.push(e)
        this.$toast.success('添加频道成功')
      } catch (err) {
        if (err.response && err.response.status === 401) {
          this.$toast.fail('请登录')
        } else {
          throw err
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }

  .van-button--block {
    width: 7.4rem;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 70px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */

    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */

    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url("~@/assets/images/gradient-gray-line.png");
  }
}

</style>
