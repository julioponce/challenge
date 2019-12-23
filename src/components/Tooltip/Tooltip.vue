<template>
  <div class="tooltip">
    <p class="heading">
      {{ heading }}
    </p>
    <p class="content">
      <template v-if="loading">
        Loading...
      </template>
      <template v-else>
        <template v-if="!error">
          {{ content }}
        </template>
        <template v-else>
          {{ error }}
        </template>
      </template>
    </p>
  </div>
</template>

<script src='./Tooltip.js' />
<style lang="scss" src='./Tooltip.scss' />
