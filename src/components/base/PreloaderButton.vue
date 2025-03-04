<template>
  <button
    :disabled="isPreloading"
    @click.stop="emitClick"
    @keyup.enter="emitClick"
    :class="[buttonTypeClass, width || 'w-[145px]', full && 'w-full']"
    :style="`right: ${buttonPositionPct}`"
    class="hive-preloader-button"
  >
    <span class="flex justify-center" v-if="isPreloading">
      <div class="loader" />
    </span>
    <span v-else>
      <slot />
    </span>
  </button>
</template>

<script setup>
import { useMainStore } from '@/stores/mainStore.js'

const store = useMainStore()
const { isFetching, isBlacklistUserFetching } = storeToRefs(store)
const isStoreFetching = computed(() => {
  return isFetching.value || isBlacklistUserFetching.value
})

watch(isStoreFetching, (fetching) => {
  if (!fetching) {
    isPreloading.value = false
  }
})

const emit = defineEmits(['preloader-button-click'])
const isPreloading = defineModel({ default: false })
const props = defineProps({
  type: {
    type: String,
    default: 'primary'
  },
  name: {
    type: String
  },
  buttonPositionPct: {
    type: String,
    default: '15%'
  },
  width: {
    type: String
  },
  full: {
    type: Boolean,
    default: false
  },
  disableEnterKeyUp: {
    type: Boolean,
    default: false
  }
})

const buttonTypeClass = computed(() => {
  return `hive-preloader-button-${props.type}`
})

const emitClick = () => {
  isPreloading.value = true
  emit('preloader-button-click')
}
</script>

<style scoped lang="postcss">
.hive-preloader-button {
  @apply transition relative h-[50px] rounded-[24px]
  text-[17px] text-white font-medium uppercase tracking-[2px] text-center;
}

.hive-preloader-button.hive-preloader-button-primary {
  @apply bg-hive-primary;
}

.hive-preloader-button.hive-preloader-button-primary:not([disabled]) {
  @apply hover:bg-hive-primary-darker active:bg-hive-primary;
}

.hive-preloader-button.hive-preloader-button-primary[disabled] {
  @apply bg-hive-label;
}

.hive-preloader-button.hive-preloader-button-secondary,
.hive-preloader-button.hive-preloader-button-alert {
  @apply bg-hive-secondary;
}

.hive-preloader-button.hive-preloader-button-secondary:not([disabled]),
.hive-preloader-button.hive-preloader-button-alert:not([disabled]) {
  @apply hover:bg-hive-secondary-darker active:bg-hive-secondary;
}

.hive-preloader-button.hive-preloader-button-secondary[disabled],
.hive-preloader-button.hive-preloader-button-alert[disabled] {
  @apply bg-hive-secondary-lighten;
}

.hive-preloader-button.hive-preloader-button-success {
  @apply bg-hive-success;
}

.hive-preloader-button.hive-preloader-button-success:not([disabled]) {
  @apply hover:bg-hive-success-darker active:bg-hive-success;
}

.hive-preloader-button.hive-preloader-button-success[disabled] {
  @apply bg-hive-success-lighten;
}


</style>
