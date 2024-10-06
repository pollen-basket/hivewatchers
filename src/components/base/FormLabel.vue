<template>
  <div v-if="label" class="label-container">
    <label v-if="name" :for="name">{{ label }}</label>
    <div class="label-contents" v-if="!name">{{ label }}</div>
    <div class="required-sign"><span :class="{ 'opacity-0': !required }"> *</span></div>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String
  },
  label: {
    type: String
  },
  required: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="postcss">
.label-container {
  @apply inline-flex pb-2;
  label,
  .label-contents {
    @apply relative inline-block text-[19px] text-hive-label font-bold;
  }
  .required-sign {
    @apply ml-2 leading-[2.5rem] text-[29px] text-hive-secondary;
  }

  .label-contents {
    @apply top-4;
  }
}
</style>
