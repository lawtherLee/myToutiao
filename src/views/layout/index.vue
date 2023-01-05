<template>
  <div class="layout-container">
    <!--    子路由出口-->
    <router-view></router-view>

    <!--    标签栏-->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item class="item" to="/ ">
        <span class="text">首页</span>
        <template v-slot:icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item class="item" to="/qa">
        <span class="text">问答</span>
        <template v-slot:icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item class="item" to="/video">
        <span class="text">视频</span>
        <template v-slot:icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
      </van-tabbar-item>

      <van-tabbar-item class="item" to="/my">
        <span class="text">我的</span>
        <template v-slot:icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <!--/    标签栏-->
  </div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  .layout-tabbar {
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    i.toutiao {
      font-size: 40px;
    }

    span.text {
      font-size: 20px;
    }
  }
}
</style>
