<template>
  <div class="blacklist-user-name">
    <BlacklistUserStat class="font-medium text-lg" :statValue="results.name" />
    <a :href="`https://hive.blog/${userName}`" target="_blank">
      <LinkIcon class="blacklist-user-link" fill-color="#5cfd97" :size="32" />
    </a>
  </div>
</template>

<script setup>
import LinkIcon from 'vue-material-design-icons/Link.vue'
const props = defineProps({
  results: {
    type: Object,
    default: () => {}
  }
})

const userName = computed(() => {
  return props.results.name
})
</script>

<style lang="postcss" scoped>
.blacklist-user-name {
  @apply flex justify-between w-full mb-4 pb-4 border-b border-gray-400;
}
</style>
