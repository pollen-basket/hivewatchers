<template>
  <TheModal v-model="isVisible">
    <template #header>
      <div class="results-header">List of transactions</div>
    </template>
    <div class="results-container">
      <TransactionsRow
        v-for="({ from, to, memo, timestamp, type, amount, amount_symbol, tx_id }, idx) in results"
        :key="`${tx_id}-${idx}`"
        :from="from"
        :to="to"
        :memo="memo"
        :timestamp="timestamp"
        :type="type"
        :amount="amount"
        :amount-symbol="amount_symbol"
      />
      <div v-if="!results.length">No transactions with the given criteria</div>
    </div>
    <template v-if="results.length" #footer>
      <div class="pagination">
        <vue-awesome-paginate
          v-model="page"
          :total-items="transactions.length"
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
import TransactionsRow from '@/components/transactions/TransationsRow.vue'
const { transactions } = storeToRefs(useMainStore())

const isVisible = defineModel(false)

const itemsPerPage = ref(50)
let results = []
let page = 1

watch(
  transactions,
  () => {
    if (transactions.value?.length) {
      const { currentResults, currentPage } = usePagination([...transactions.value], itemsPerPage)

      results = currentResults
      page = currentPage
    } else {
      results = []
    }
  },
  { immediate: true }
)

defineExpose({ isVisible })
</script>

<style scoped>
.results-header-logo {
  @apply mx-auto w-[120px];
}
.results-header {
  @apply text-center text-[27px] font-semibold uppercase;
}

.results-container {
  @apply py-0 sm:py-6 sm:pl-12;
}
</style>
