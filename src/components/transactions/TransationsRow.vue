<template>
  <div class="transaction">
    <span class="transaction-timestamp">{{ formattedTimestamp }}</span>

    <div class="transaction-row">
      <div class="flex gap-2">
        <span>{{ from }}</span>
        <span v-if="type !== 'transfer_to_savings' && type !== 'transfer_from_savings'">
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="#5cfd97"
          >
            <path
              d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"
            />
          </svg>
        </span>
        <span v-if="type !== 'transfer_to_savings' && type !== 'transfer_from_savings'">
          {{ to }}
        </span>
      </div>
      <div class="transaction-contents">
        <div>
          <span class="transaction-amount">{{ amount }} {{ amountSymbol }}</span>
          <span class="transaction-timestamp-desktop">
            {{ formattedTimestamp }}
          </span>
        </div>
        <svg
          @click="memoVisible = !memoVisible"
          class="cursor-pointer"
          :class="{ 'opacity-0': !memo }"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          width="1000mm"
          height="1000mm"
          viewBox="0 0 1000 1000"
          style="max-width: 1.2em; height: auto"
        >
          <path
            id="path"
            style="opacity: 1; vector-effect: none; fill: #5cfd97; fill-opacity: 1"
            d="M 500 0C 224 0 0 224 0 500C 0 776 224 1000 500 1000C 776 1000 1000 776 1000 500C 1000 224 776 0 500 0C 500 0 500 0 500 0 M 501 191C 626 191 690 275 690 375C 690 475 639 483 595 513C 573 525 558 553 559 575C 559 591 554 602 541 601C 541 601 460 601 460 601C 446 601 436 581 436 570C 436 503 441 488 476 454C 512 421 566 408 567 373C 566 344 549 308 495 306C 463 303 445 314 411 361C 400 373 384 382 372 373C 372 373 318 333 318 333C 309 323 303 307 312 293C 362 218 401 191 501 191C 501 191 501 191 501 191M 500 625C 541 625 575 659 575 700C 576 742 540 776 500 775C 457 775 426 739 425 700C 425 659 459 625 500 625C 500 625 500 625 500 625"
            transform=""
          ></path>
        </svg>
      </div>
    </div>
    <div class="transaction-amount-mobile">{{ amount }} {{ amountSymbol }}</div>
    <div v-if="memo && memoVisible" class="transaction-memo">
      >
      {{ memo }}
    </div>
  </div>
</template>

<script setup>
import { DateTime } from 'luxon'

const props = defineProps({
  from: {
    type: String
  },
  to: {
    type: String
  },
  memo: {
    type: String
  },
  timestamp: {
    type: String
  },
  type: {
    type: String
  },
  amount: {
    type: Number
  },
  amountSymbol: {
    type: String
  },
  txId: {
    type: String
  }
})

const memoVisible = ref(false)

const formattedTimestamp = computed(() => {
  const dateTime = DateTime.fromISO(props.timestamp)

  return dateTime.toFormat('yyyy-MM-dd HH:mm:ss')
})
</script>

<style scoped>
.transaction {
  @apply mb-8 mt-4 mr-12 last:mb-0;
}

.transaction-timestamp {
  @apply block sm:hidden text-sm;
}

.transaction-contents {
  @apply flex gap-4;
}

.transaction-amount {
  @apply hidden sm:inline bg-green-100 text-green-800 text-[12px] 
  font-medium me-2 px-2.5 py-0.5 rounded;
}

.transaction-amount-mobile {
  @apply inline sm:hidden bg-green-100 text-green-800 text-[12px] font-medium 
  me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300;
}

.transaction-timestamp-desktop {
  @apply hidden sm:inline text-sm;
}

.transaction-row {
  @apply flex gap-4 justify-between;
}
.transaction-memo {
  @apply p-4 mt-3 mt-4 break-words;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
