<template>
  <div :class="['sorter', screenSize]">
    <p class="label">
      SORT BY
    </p>
    <Button
      v-for="(option, index) of options"
      :key="index"
      :class="[{'primary': active === option}, {transparent: active !== option}]"
      @click="setSorter(option)"
    >
      {{ option.toUpperCase() }}
    </Button>
  </div>
</template>

<script src='./Sorter.js' />
<style lang="scss" src='./Sorter.scss' scoped />
