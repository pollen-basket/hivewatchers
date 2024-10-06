<template>
  <div class="hive-blacklist-user">
    <BlacklistSearchUser :results="results" />
    <BlacklistSearchUserStats :results="results" />
    <BlacklistSearchUserComments :comments="comments" />
  </div>
</template>

<script setup>
defineProps({
  results: {
    type: Object,
    default: () => {}
  },
  comments: {
    type: Array
  }
})
</script>

<style lang="postcss" scoped>
.hive-blacklist-user {
  @apply px-4;
}
</style>
