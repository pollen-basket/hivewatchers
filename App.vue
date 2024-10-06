<template>
  <MainLayout :background="shouldDisplayBackground">
    <RouterView />
  </MainLayout>
  <div class="logo-image"></div>
</template>
<script setup>
import { useMainStore } from '@/stores/mainStore.js'

const router = useRouter()
const shouldDisplayBackground = ref(false)
const { fetchBlacklistUsers } = useMainStore()

onMounted(async () => {
  await fetchBlacklistUsers()
})

router.beforeEach((to, from, next) => {
  shouldDisplayBackground.value = to.name === 'home' || window.innerWidth >= 1024
  next()
})
</script>
<style lang="postcss" scoped>
.logo-image {
  @apply absolute top-0 right-[15vw] top-[180px] w-[33vw] h-full;
  background-position: center 16px;
  background-size: 0;
  background-repeat: no-repeat;
  background-image: url('/hive-main-bg.png');
  height: calc(100vh - 135px);

  @media (min-width: 1024px) {
    @apply right-[10vw] w-[35vw] top-[250px];
    background-size: 480px;
  }

  @media (min-width: 1280px) {
    @apply top-[140px] right-[9vw];
    background-size: 580px;
  }

  @media (min-width: 1680px) {
    @apply top-[150px];
    background-size: 680px;
  }

  @media (min-width: 1920px) {
    @apply top-[120px] right-[14vw];
    background-size: 780px;
  }
}
</style>
