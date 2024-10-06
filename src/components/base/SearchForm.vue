<template>
  <div class="hive-search-form">
    <FormLabel v-if="label" :name="name" :label="label" />
    <div v-if="showHeader && title && !label" class="hive-search-form-input-header">
      {{ title }}
    </div>
    <div :class="label && 'relative bottom-2'">
      <input
        v-model="searchValue"
        @keyup.enter="search"
        :name="name"
        class="hive-search-form-input"
        type="text"
        :placeholder="placeholder"
      />
      <PreloaderButton
        v-model="isFetching"
        @preloader-button-click="search"
        :button-position-pct="buttonPositionPct"
        :type="buttonType"
        :full="buttonFull"
        >{{ buttonTitle }}
      </PreloaderButton>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  label: {
    type: String
  },
  placeholder: {
    type: String
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  buttonPositionPct: {
    type: String,
    default: '9%'
  },
  buttonType: {
    type: String,
    default: 'primary'
  },
  buttonFull: {
    type: Boolean,
    default: false
  },
  buttonTitle: {
    type: String,
    default: 'Search'
  },
  message: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['search'])
const isFetching = defineModel('isFetching', { default: false })
const searchValue = defineModel('searchValue')
const search = () => {
  isFetching.value = true
  emit('search')
}
</script>

<style scoped lang="postcss">
.hive-search-form {
  @apply flex-col w-full sm:w-[auto] mt-4;
}

.hive-search-form-input-header {
  @apply text-white text-[18px] mb-2 tracking-wide;
}

.hive-search-form-input {
  @apply w-[217px] sm:w-[260px] mb-4 h-12 rounded-[24px] px-6 text-[18px] text-black focus:outline-none;
}

.hive-search-form-message {
  @apply pl-4 -mt-2 text-hive-success-lightest;
}
</style>
