<template>
  <div :class="['pagination', screenSize]">
    <div class="controls">
      <Button
        theme="clean"
        class="previous"
        :disabled="currentPage <= 0"
        @click="goToPreviousPage"
      >
        PREV
      </Button>
      <Button
        theme="clean"
        class="next"
        :disabled="currentPage >= maxPageLimit"
        @click="goToNextPage"
      >
        NEXT
      </Button>
    </div>
    <div class="current">
      PAGE {{ currentPage + 1 }}
    </div>
  </div>
</template>

<script src='./Pagination.js' />
<style lang="scss" src='./Pagination.scss' scoped />
