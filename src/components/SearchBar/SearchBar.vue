<template>
  <div :class="['searchbar', screenSize]">
    <input
      v-model="search"
      class="search-input"
      :placeholder="placeholder"
      :set-filter="setFilter"
      @input="setFilter(search)"
    />
  </div>
</template>

<script src='./SearchBar.js' />
<style lang="scss" src='./SearchBar.scss' scoped />
