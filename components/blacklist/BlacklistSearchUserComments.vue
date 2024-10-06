<template>
  <div class="hive-blacklist-user-comments">
    <BlacklistSearchUserComment :comment="comment" :key="idx" v-for="(comment, idx) in comments" />
  </div>
</template>

<script setup>
defineProps({
  comments: {
    type: Array
  }
})
</script>
