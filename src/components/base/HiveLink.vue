<template>
  <router-link
    :to="{ name: props.toName }"
    :style="`background-color: ${bgColor}`"
    class="hive-link"
    ><slot
  /></router-link>
</template>

<script setup>
const props = defineProps({
  toName: {
    type: String,
    default: null
  },
  linkType: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'secondary'].includes(value)
    }
  }
})

const bgColor = computed(() => {
  return props.linkType === 'primary' ? '#013F6E' : 'rgb(190, 3, 43)'
})
</script>

<style scoped lang="postcss">
.hive-link {
  @apply uppercase block p-6 mb-8 lg:mb-10 text-white text-[17px] lg:text-[19px] cursor-pointer last-of-type:mb-4
  transition-opacity duration-300 hover:opacity-90;
  text-decoration: none;
}
</style>
