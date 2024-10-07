<template>
  <TheModal v-model="isVisible">
    <template #header>
      <div class="results-header">List of transactions</div>
    </template>
    <div class="results-preloader" v-if="isPageLoading">
      <div class="mr-5">Loading</div>
      <div class="loader"></div>
    </div>
    <div v-else class="results-container">
      <TransactionsRow
        v-for="(
          { from, to, memo, timestamp, type, amount, amount_symbol, tx_id }, idx
        ) in currentTransactions"
        :key="`${tx_id}-${idx}`"
        :from="from"
        :to="to"
        :memo="memo"
        :timestamp="timestamp"
        :type="type"
        :amount="amount"
        :amount-symbol="amount_symbol"
      />
      <div v-if="!currentTransactions.length">No transactions with the given criteria</div>
    </div>
    <template v-if="currentTransactions.length" #footer>
      <div class="pagination">
        <vue-awesome-paginate
          v-model="transactionsCurrentPage"
          @click="emitPage"
          :total-items="transactionsTotalCount"
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
import { useMainStore } from '@/stores/mainStore.js'
import TransactionsRow from '@/components/transactions/TransationsRow.vue'
const { transactions, transactionsCurrentPage, transactionsTotalCount } =
  storeToRefs(useMainStore())

const emit = defineEmits(['page'])

const isPageLoading = defineModel('isPageLoading', {
  type: Boolean,
  default: false
})

const isVisible = defineModel('isVisible', {
  type: Boolean,
  default: true
})

const currentTransactions = computed(() => transactions.value || [])
const itemsPerPage = ref(30)

const emitPage = (data) => {
  emit('page', data)
}

defineExpose({ isVisible })
</script>

<style scoped>
.results-header {
  @apply text-center text-[27px] font-semibold uppercase;
}

.results-container {
  @apply py-0 sm:py-6 sm:pl-12;
}
.results-preloader {
  @apply w-full h-full flex items-center justify-center;
}
</style>
