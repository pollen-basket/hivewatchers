<template>
  <div :class="{ 'items-center': center }" class="blacklist-user-stat">
    <div class="blacklist-user-stat-name">{{ statName }}</div>
    <div
      :class="
        statValue &&
        Number(statValue) &&
        Number(statValue) < 0 &&
        'text-hive-secondary font-semibold'
      "
      class="blacklist-user-stat-value"
    >
      {{ statValue }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  statName: {
    type: String
  },
  statValue: {
    type: String
  },
  center: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="postcss" scoped>
.blacklist-user-stat {
  @apply flex flex-row gap-4 lg:gap-0 lg:flex-col;
}
</style>
