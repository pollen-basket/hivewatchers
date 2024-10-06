<template>
  <div class="hive-blacklist-user" v-for="(blacklistUser, idx) in users" :key="idx">
    {{ blacklistUser }}
    <PreloaderButton
      @preloader-button-click="emitUser(blacklistUser)"
      type="success"
      width="w-[110px]"
      button-position-pct="0"
      >Details</PreloaderButton
    >
  </div>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['fetch-user'])
const emitUser = (user) => {
  emit('fetch-user', user)
}
</script>

<style scoped>
.hive-blacklist-user {
  @apply flex justify-between items-center w-full px-4 mb-4 text-lg;
}
</style>
