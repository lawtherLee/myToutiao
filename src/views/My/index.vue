<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="isLogin" class="userInfo header">
      <!-- 基本信息 -->
      <div class="base">
        <div class="left">
          <van-image
            :src='userinfo.photo'
            class="avatar"
            fit="cover"
            round
          />
          <span class="name">{{ userinfo.name }}</span>
        </div>
        <div class="right">
          <van-button round size="mini" type="default">编辑资料</van-button>
        </div>
      </div>
      <!-- 粉丝、关注 -->
      <div class="data">
        <div class="data-item">
          <span>{{ userinfo.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{ userinfo.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{ userinfo.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{ userinfo.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!--    未登录-->
    <div v-else class="header">
      <img
        alt=""
        class="mobile-img"
        src="@/assets/images/mobile.png"
        @click="$router.push('/login')">
    </div>

    <van-grid class="nav-grid" clickable column-num="2">
      <van-grid-item text="收藏">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item text="文字">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <div class="link">
      <van-cell is-link title="消息通知"/>
      <van-cell is-link title="小智同学"/>
    </div>

    <footer style="margin: 10px 0; width: 100%; ">
      <van-button v-if="isLogin" block style="color: red; border: 0" @click="logout">退出</van-button>
    </footer>

  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { getUserinfoAPI } from '@/api/user'

export default {
  name: 'MyPage',
  components: {},
  props: {},
  data () {
    return {
      isLogin: true,
      userinfo: {}
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters({ isToken: 'isLogin' })
  },
  watch: {},
  async created () {
    console.log('my-created')
    if (this.isToken) {
      console.log('获取用户信息')
      await this.loadUserinfo()
    }
  },
  mounted () {

  },
  methods: {
    // 退出
    async logout () {
      try {
        await this.$dialog.confirm({
          title: '确认退出吗？'
        })
        this.$store.commit('SET_TOKEN', null)
        this.isLogin = false
      } catch (e) {
      }
    },
    // 获取用户信息
    async loadUserinfo () {
      try {
        console.log('loadUserInfo')
        const { data: { data } } = await getUserinfoAPI()
        console.log(data)
        this.userinfo = data
      } catch (e) {
        console.log('获取用户信息失败', e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-container {
  > .header {
    height: 361px;
    background: url("~@/assets/images/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .mobile-img {
      width: 132px;
      height: 132px;
    }
  }

  .header {
    width: 750px;
    height: 401px;
    background: url('~@/assets/images/banner.png');
    background-size: cover;
  }

  .userInfo {
    background: #5999f3;
    display: flex;
    flex-wrap: wrap;

    .data {
      width: 100%;
      display: flex;
      justify-content: space-around;

      .data-item {
        height: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #fff;

        span:nth-child(1) {
          font-size: 36px;
          margin-bottom: 15px;
        }

        span:nth-child(2) {
          font-size: 23px;
        }
      }
    }

    .base {
      width: 700px;
      height: 231px;
      padding: 76px 32px 23px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;

      .left {
        display: flex;
        align-items: center;

        .avatar {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
        }

        .name {
          font-size: 29px;
          margin-left: 22px;
          color: white;
        }
      }
    }

  }

  .nav-grid {
    background: #fff;

    .toutiao {
      font-size: 45px;
    }

    .toutiao-shoucang {
      color: #EB5253;
    }

    .toutiao-lishi {
      color: #FF9D1D;
    }

    .text {
      color: #000;
      margin-top: 8px;
      font-size: 28px;
    }
  }

  .logout-cell {
    text-align: center;
    color: #EB5253;
    margin: 10px 0;
    font-size: 30px;
  }
}
</style>
