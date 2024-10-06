<template>
  <div class="search-results">
    <slot />
  </div>
</template>
<style lang="postcss" scoped>
.search-results {
  @apply relative w-full lg:w-1/2 lg:min-w-[490px];
}
</style>
