<template>
  <div class="hive-submit-message">
    <div v-if="isDenied">Access denied. You are not allowed to submit forms.</div>
    <div v-else>Your report has been submitted.</div>
    <button v-show="!isDenied" @click.stop="emitClick" class="hive-submit-message-button">
      Send another report
    </button>
  </div>
</template>

<script setup>
defineProps({
  isDenied: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const emitClick = () => {
  emit('click')
}
</script>

<style scoped lang="postcss">
.hive-submit-message {
  @apply mt-4;
}
.hive-submit-message-button {
  @apply w-[320px] mt-6 md:mt-12 h-12 rounded-[24px] px-6 bg-hive-primary
  text-white font-medium uppercase tracking-[2px] text-[17px] text-center
  transition hover:bg-hive-primary-lighten active:bg-hive-primary-lighten;

  @media (max-width: 640px) {
    @apply w-full;
  }
}
</style>
