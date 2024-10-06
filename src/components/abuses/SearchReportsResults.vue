<template>
  <TheModal v-model="isVisible">
    <template #header>
      <div class="results-header">List of reports</div>
    </template>
    <div class="results-container">
      <ReportDetails
        v-for="(
          { reportedBy, postURL, supportingLink, abuseType, incidentDetails }, idx
        ) in results"
        :key="idx"
        :reportedBy="reportedBy"
        :postURL="postURL"
        :supportingLink="supportingLink"
        :abuseType="abuseType"
        :incidentDetails="incidentDetails"
      />
    </div>
    <template #footer>
      <div class="pagination">
        <vue-awesome-paginate
          v-model="page"
          :total-items="reports.length"
          :items-per-page="itemsPerPage"
          :max-pages-shown="5"
          :hide-prev-next-when-ends="true"
          :show-breakpoint-buttons="false"
          prev-button-content=""
          next-button-content="next"
        />
      </div>
    </template>
  </TheModal>
</template>

<script setup>
import usePagination from '@/composables/usePagination.js'
import { useMainStore } from '@/stores/mainStore.js'
const { reports } = storeToRefs(useMainStore())

const isVisible = defineModel(false)

const itemsPerPage = ref(4)
let results = []
let page = 1

watch(
  reports,
  () => {
    if (reports.value?.length) {
      const { currentResults, currentPage } = usePagination([...reports.value], itemsPerPage)

      results = currentResults
      page = currentPage
    }
  },
  { immediate: true }
)

defineExpose({ isVisible })
</script>

<style scoped>
.results-header {
  @apply text-center text-[27px] font-semibold uppercase;
}

.results-container {
  @apply py-6 pl-12;
}
</style>
