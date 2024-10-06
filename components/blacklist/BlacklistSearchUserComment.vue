<template>
  <div class="hive-blacklist-user-comment">
    <div class="hive-blacklist-user-comment-wrapper">
      <Markdown class="hive-blacklist-user-comment-contents" html :source="comment.body" />
    </div>
    <div class="hive-blacklist-user-comment-footer">
      <span>@{{ comment.author }}</span>
      <span>{{ formatTimestamp(comment.created) }}</span>
      <a
        class="relative bottom-[3px]"
        :href="`https://hive.blog/@${comment.author}/${comment.permlink}`"
        target="_blank"
      >
        <LinkIcon class="blacklist-user-link" fill-color="#5cfd97" :size="32" />
      </a>
    </div>
  </div>
</template>

<script setup>
import Markdown from 'vue3-markdown-it'
import { DateTime } from 'luxon'
import LinkIcon from 'vue-material-design-icons/Link.vue'

defineProps({
  comment: {
    type: Object
  }
})

const formatTimestamp = (timestamp) => {
  const dateTime = DateTime.fromISO(timestamp)

  return dateTime.toFormat('yyyy-MM-dd HH:mm:ss')
}
</script>

<style lang="postcss" scoped>
.hive-blacklist-user-comment {
  @apply my-8 pt-4;
  background-color: rgba(0, 0, 0, 0.2);
}

.hive-blacklist-user-comment-wrapper {
  @apply px-4;
}

.hive-blacklist-user-comment-footer {
  @apply flex gap-4 p-4;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
