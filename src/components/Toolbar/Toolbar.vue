<template>
  <div :class="['toolbar', screenSize]">
    <div class="container">
      <nav>
        <router-link to="/people" class="link">
          People
        </router-link>
        <router-link to="/species" class="link">
          Species
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script src='./Toolbar.js' />
<style lang='scss' src='./Toolbar.scss' scoped />
