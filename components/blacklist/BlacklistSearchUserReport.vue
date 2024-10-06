<template>
  <div class="hive-blacklist-user-report">
    <div class="hive-blacklist-user-report-wrapper">
      <div>
        <div class="hive-blacklist-user-report-title">{{ report.title }}</div>
        <div class="hive-blacklist-user-report-permlink">{{ permlink }}</div>
      </div>
      <a :href="permlinkUrl" target="_blank">
        <LinkIcon class="hive-blacklist-user-link" fill-color="#5cfd97" :size="32" />
      </a>
    </div>
  </div>
</template>

<script setup>
import LinkIcon from 'vue-material-design-icons/Link.vue'

const props = defineProps({
  report: {
    type: Object
  }
})

const permlink = computed(() => {
  return `@${props.report.parent_permlink}/${props.report.permlink}`
})

const permlinkUrl = computed(() => {
  return `https://peakd.com/${permlink.value}`
})
</script>

<style lang="postcss" scoped>
.hive-blacklist-user-report {
  @apply my-8 py-4;
  background-color: rgba(0, 0, 0, 0.2);
}

.hive-blacklist-user-report-title {
  @apply font-semibold;
}

.hive-blacklist-user-report-wrapper {
  @apply flex justify-between items-center px-4;
}
</style>
