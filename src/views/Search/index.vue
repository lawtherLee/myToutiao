<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="keywords"
        background="#3296fa"
        class="search"
        placeholder="请输入搜索关键词"
        show-action
        @cancel="$router.push('/ ')"
        @search="onSearch"
      />
    </form>
    <component :is="componentName" @change-keywords="onSearch"/>
  </div>
</template>

<script>
import SearchHistory from '@/views/Search/components/SearchHistory.vue'
import SearchSuggestion from '@/views/Search/components/SearchSuggestion.vue'
import SearchResult from '@/views/Search/components/SearchResult.vue'
import { mapState } from 'vuex'

export default {
  name: 'Search',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data () {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['histories']),
    // 动态组件
    componentName () {
      if (this.keywords === '') {
        return 'SearchHistory'
      } else if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    onSearch (keywords) {
      console.log(keywords)
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  [role="button"] {
    color: white;
  }
}

:deep(.van-search__action) {
  &:active {
    background-color: #4f94f2 !important;
  }
}
</style>
