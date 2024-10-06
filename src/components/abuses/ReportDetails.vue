<template>
  <div v-if="reportedBy" class="report-details">
    <div class="report-details-wrapper">
      <div class="report-details-reported-by">
        Reporter @{{ reportedBy }}
        <a v-if="postURL" :href="postURL" target="_blank">
          <LinkIcon class="report-details-link" fill-color="#5cfd97" :size="32" />
        </a>
      </div>
      <div class="report-details-abuse-type-wrapper" v-if="abuseType">
        {{ abuseType }}
      </div>
    </div>

    <div v-if="supportingLink" class="report-details-supporting-link">
      <a :href="supportingLink" target="_blank">{{ supportingLink }}</a>
    </div>
    <div class="report-details-method">{{ incidentDetails }}</div>
  </div>
</template>

<script setup>
import LinkIcon from 'vue-material-design-icons/Link.vue'

defineProps({
  reportedBy: {
    type: String
  },
  postURL: {
    type: String
  },
  supportingLink: {
    type: String
  },
  abuseType: {
    type: String
  },
  incidentDetails: {
    type: String
  }
})
</script>

<style scoped>
.report-details {
  @apply mb-6 mt-10 mr-12;
}

.report-details-wrapper {
  @apply flex justify-between;
}

.report-details-reported-by {
  @apply flex gap-4 mb-3 font-semibold text-[18px];
}

.report-details-link {
  @apply relative bottom-[2px];
}

.report-details-abuse-type-wrapper {
  @apply inline-block bg-hive-secondary h-4 leading-[0px] 
  rounded-lg px-3 py-3 text-white font-semibold text-[14px];
}

.report-details-supporting-link,
.report-details-method {
  @apply ml-3 font-thin;
}

.report-details-method {
  @apply p-4 mt-3;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
