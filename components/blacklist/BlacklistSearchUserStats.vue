<template>
  <div class="blacklist-user-stats">
    <BlacklistUserStat center statName="Entries" :statValue="String(results.entries || 0)" />
    <BlacklistUserStat center statName="HIVE" :statValue="String(results.hive || 0)" />
    <BlacklistUserStat center statName="HBD" :statValue="String(results.hbd || 0)" />
    <BlacklistUserStat center statName="HP" :statValue="String(results.hp || 0)" />
    <BlacklistUserStat center statName="REP" :statValue="String(results.rep || 0)" />
    <BlacklistUserStat center statName="Posts" :statValue="String(results.numberOfPosts || 0)" />
    <BlacklistUserStat
      center
      statName="Created"
      :statValue="String(results.created || 'no data')"
    />
  </div>
</template>

<script setup>
defineProps({
  results: {
    type: Object,
    default: () => {}
  }
})
</script>

<style lang="postcss" scoped>
.blacklist-user-stats {
  @apply w-full flex-col lg:flex-row flex justify-between pb-4 border-b border-gray-400;
}
</style>
