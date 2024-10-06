<template>
  <div v-if="username" class="verified-user">
    <div class="verified-user-name">
      @{{ username }}
      <a v-if="hivePost" :href="hivePost" target="_blank">
        <LinkIcon class="verified-user-link" fill-color="#5cfd97" :size="32" />
      </a>
    </div>
    <div v-if="mediaLink" class="verified-user-media-link">
      <a :href="mediaLink">{{ mediaLink }}</a>
    </div>
    <div class="verified-user-method">{{ additionalInfo }}</div>
  </div>
</template>

<script setup>
import LinkIcon from 'vue-material-design-icons/Link.vue'

defineProps({
  username: {
    type: String
  },
  hivePost: {
    type: String
  },
  mediaLink: {
    type: String
  },
  additionalInfo: {
    type: String
  }
})
</script>

<style scoped>
.verified-user {
  @apply mb-6 mt-4 mr-12;
}

.verified-user-name {
  @apply flex gap-4 mb-3 font-semibold text-[18px];
}

.verified-user-method {
  @apply mt-3;
}

.verified-user-link {
  @apply relative bottom-[2px];
}

.verified-user-media-link,
.verified-user-method {
  @apply ml-3 font-thin;
}

.verified-user-method {
  @apply p-4 mt-3;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
