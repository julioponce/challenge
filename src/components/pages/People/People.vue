<template>
  <div :class="['people', screenSize]">
    <div class="container">
      <div class="filters">
        <SearchBar
          :filter="peopleFilter"
          :placeholder="placeholderFilter"
          :set-filter="setPeopleFilter"
        />
        <Sorter
          :options="sortOptions"
          :active="currentSorter"
          :set-sorter="setPeopleSorter"
        />
      </div>
      <ItemsList
        :loading="loading"
        :error="peopleError"
        :current-row="currentRow"
        :current-page="currentPage"
        :max-page-limit="maxPageLimit"
        :go-to-previous-page="goToPreviousPage"
        :go-to-next-page="goToNextPage"
        :character-info="sortOptions"
      />
    </div>
  </div>
</template>

<script src='./People.js' />
<style lang="scss" src='./People.scss' scoped />
