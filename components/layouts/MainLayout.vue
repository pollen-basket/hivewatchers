<template>
  <div class="main">
    <div class="main-container">
      <div class="flex-container">
        <header>
          <div class="fixed top-0 w-full sm:w-[50%] h-[120px] bg-black z-[400]">
            <router-link :to="{ name: 'home' }" class="logo">
              <img class="logo-image" :src="HiveLogo" alt="hive-logo" />
            </router-link>
          </div>
        </header>
        <slot />
      </div>
    </div>
  </div>
  <VerifiedUsersResultsMobile v-model="verifiedUsersResultsMobileVisible" />
</template>
<script setup>
import HiveLogo from '@/assets/hive-logo.png'

defineProps({
  background: {
    type: Boolean,
    default: false
  }
})

const verifiedUsersResultsMobileVisible = ref(false)
</script>
<style scoped lang="postcss">
.main {
  @apply bg-hive-dark h-screen overflow-y-auto;
}

.logo-image {
  @apply mx-auto lg:mt-8 lg:ml-0 lg:w-[180px];
}

.main-container {
  @apply container mx-auto h-full;
}
.flex-container {
  @apply flex flex-col min-h-screen;
}

header {
  @apply flex justify-center sm:justify-between pt-4 max-h-[140px] lg:pl-4;
}

.hive-mobile-search-button {
  @apply absolute block sm:hidden text-white top-[18px] right-[18px];
}

@media screen and (min-width: 1024px) {
  .flex-container {
    min-height: 100%;
  }
}
</style>
