<template>
  <div>
    <button v-if="currentPage > 1" @click="changePage(currentPage - 1)">이전</button>
    <button v-for="page in totalPages" :key="page" @click="changePage(page)">{{ page }}</button>
    <button v-if="currentPage < totalPages" @click="changePage(currentPage + 1)">다음</button>
  </div>
</template>

<script>
export default {
  name: "myPagation",
  props: ['pageable'],
  data() {
    return {
      currentPage: 1,
      totalPages: 1
    };
  },
  watch: {
    pageable(newPageable) {
      this.updatePageInfo(newPageable);
    }
  },
  mounted() {
    this.updatePageInfo(this.pageable);
  },
  methods: {
    updatePageInfo(pageable) {
      const { totalPages, currentPage } = this.getPageInfo(pageable);
      this.totalPages = totalPages;
      this.currentPage = currentPage;
    },
    changePage(page) {
      // 페이지 변경 로직 구현
    }
  }
};
</script>

<style>

</style>