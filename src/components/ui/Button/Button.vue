<template>
  <button
    :ref="name"
    :class="['button', type, theme]"
    :disabled="disabled || loading"
    v-on="$listeners"
  >
    <slot />
    <Icon
      v-if="loading"
      name="loader"
      :class="$style.spinner"
    />
  </button>
</template>

<script src='./Button.js'/>
<style lang='scss' src='./Button.scss' />
