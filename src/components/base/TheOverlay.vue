<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="isVisible" class="hive-overlay">
        <slot />
      </div>
    </transition>
  </teleport>
</template>

<script setup>
const isVisible = defineModel({ default: false })
</script>

<style lang="postcss" scoped>
.hive-overlay {
  @apply fixed inset-0 z-[10000] bg-transparent;
}
</style>
