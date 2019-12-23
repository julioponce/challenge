<template>
  <div :class="['items-list', screenSize]">
    <div class="loader" v-if="loading">
      Loading...
    </div>
    <template v-else>
      <template v-if="!error">
        <template v-if="currentRow">
          <div class="row">
            <Character
              v-for="character of currentRow"
              :character="character"
              :character-info="characterInfo"
              :key="character.created"
            />
          </div>
          <Pagination
            :go-to-next-page="goToNextPage"
            :go-to-previous-page="goToPreviousPage"
            :current-page="currentPage"
            :max-page-limit="maxPageLimit"
          />
        </template>
        <p v-else>
          The force is not with you
        </p>
      </template>
      <p v-else>
        {{ error }}
      </p>
    </template>
  </div>
</template>

<script src='./ItemsList.js' />
<style lang="scss" src='./ItemsList.scss' scoped />
