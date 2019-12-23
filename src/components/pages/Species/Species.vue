<template>
  <div :class="['species', screenSize]">
    <div class="container">
      <div class="filters">
        <SearchBar
          :filter="speciesFilter"
          :placeholder="placeholderFilter"
          :set-filter="setSpeciesFilter"
        />
        <Sorter
          :options="sortOptions"
          :active="currentSorter"
          :set-sorter="setSpeciesSorter"
        />
      </div>
      <ItemsList
        :loading="loading"
        :error="speciesError"
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

<script src='./Species.js' />
<style lang="scss" src='./Species.scss' scoped />
