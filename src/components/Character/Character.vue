<template>
  <div
    :class="['character', screenSize]"
    @mouseover="showTooltip"
    @mouseleave="hideTooltip"
  >
    <img
      class="avatar"
      :src="avatar"
    />
    <p class="heading">
      {{ heading }}
    </p>
    <p class="subheading">
      {{ subheading }}
    </p>
    <transition name="fade">
      <Tooltip
        v-if="tooltipShow"
        :class="screenSize"
        :heading="tooltipHeading"
        :content="tooltipContent"
        :loading="tooltipLoading"
        :error="tooltipError"
      />
    </transition>
  </div>
</template>

<script src='./Character.js' />
<style lang="scss" src='./Character.scss' scoped />
