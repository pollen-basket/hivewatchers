<template>
  <div class="view-contents">
    <nav class="view-contents-nav-wrapper">
      <div class="main-nav">
        <router-link to="/">Home</router-link>
        <router-link to="/report-abuse">Report Abuse</router-link>
        <router-link to="/identity-verification">Verify Identity</router-link>
        <router-link to="/blacklist-search">Blacklist Search</router-link>
        <router-link to="/transaction-search">Transaction Search</router-link>
      </div>
    </nav>
    <div :class="wrapperClasses" class="view-contents-wrapper">
      <div class="view-header">
        <p :class="titleClasses" class="view-header-title">{{ viewTitle }}</p>
        <div class="view-header-title-prepend" v-if="$slots['prepend']">
          <slot name="prepend"></slot>
        </div>

        <p :class="{ 'mt-6': $slots.prepend }" v-if="viewSubTitle" class="view-header-subtitle">
          {{ viewSubTitle }}
        </p>
      </div>
      <div v-if="$slots['mobile-navigation']" class="mobile-navigation">
        <slot name="mobile-navigation" />
      </div>
      <div v-if="$slots['desktop-navigation']" class="desktop-navigation">
        <slot name="desktop-navigation" />
      </div>
      <div class="view-contents-inside">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  viewTitle: {
    type: String,
    default: null
  },
  viewSubTitle: {
    type: String,
    default: null
  },
  titleClasses: {
    type: String,
    default: 'pt-[170px] lg:pt-0'
  },
  wrapperClasses: {
    type: String,
    default: 'justify-between lg:justify-start'
  }
})
</script>

<style scoped lang="postcss">
.main-nav {
  @apply absolute bg-black pb-8 text-white text-[19px] pt-16 uppercase z-10;
}

.main-nav a {
  @apply mr-8 transition-opacity duration-300 hover:opacity-80 text-white;
  text-decoration: none;
}

.view-contents {
  @apply mt-[100px];
}

.view-contents-nav-wrapper {
  @apply hidden lg:block pl-4 sm:mb-12 md:mb-10;
}

.view-contents-wrapper {
  @apply text-white flex flex-col h-full;
}

.view-contents-inside {
  @apply py-6 md:py-0 px-4;
}

.mobile-navigation {
  @apply mt-12 lg:hidden mb-8 md:mb-16 mx-auto w-full max-w-[480px];
}

.desktop-navigation {
  @apply mt-20 hidden lg:block max-w-[500px] text-center;
}

.view-header-title {
  @apply text-[28px] leading-[32px] tracking-wide uppercase font-semibold px-4;
}

.view-header-title-prepend {
  @apply ml-4 w-full sm:w-[750px] xl:w-[900px];
}

.view-header-subtitle {
  @apply mt-4 px-4 text-[18px] text-hive-success-lightest leading-[24px] font-thin lg:max-w-[550px];
}

.router-link-active {
  @apply border border-b-2 border-x-0 border-t-0 pb-2 font-medium cursor-default hover:!opacity-100;
}

@media screen and (max-height: 680px) {
  .view-header-title {
    padding-top: 16px !important;
  }
}
</style>
