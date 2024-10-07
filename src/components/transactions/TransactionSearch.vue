<template>
  <ViewContents
    wrapper-classes="justify-start text-left"
    title-classes="pt-8 xl:pt-24 text-left"
    view-title="Transaction Search"
    view-sub-title="Enter search criteria for transactions"
  >
    <FormWrapper button-name="Search" @submit-form="postSearchTransactions" v-model="isPosting">
      <SelectField
        class="w-full lg:w-[48%]"
        v-model="form.type"
        @input="form.type = $event"
        name="type"
        label="Type"
        description="Transfer type used for filtering results"
        :options="typeOptions"
      />

      <div class="w-full lg:w-[48%]">
        <FormLabel label="Order By" />
        <div class="flex justify-between">
          <SelectField
            class="flex-1 w-[48%] lg:w-[22%] mr-4"
            v-model="form.orderBy"
            @input="form.orderBy = $event"
            name="orderBy"
            description="Ordering search results"
            :options="orderByOptions"
          />
          <SelectField
            class="flex-1 w-[48%] lg:w-[22%]"
            v-model="form.orderDirection"
            @input="form.orderDirection = $event"
            name="orderDirection"
            :options="orderDirectionOptions"
          />
        </div>
      </div>
      <TextField
        class="w-full lg:w-[48%]"
        v-model="form.fromAccount"
        name="fromAccount"
        label="From"
      />
      <TextField class="w-full lg:w-[48%]" v-model="form.toAccount" name="toAccount" label="To" />
      <TextField class="w-full lg:w-[48%]" v-model="form.memoId" name="memoId" label="Memo Id" />
      <TextField
        class="w-full lg:w-[48%]"
        v-model="form.requestId"
        name="requestId"
        label="Request Id"
      />
      <div class="w-full lg:w-[48%]">
        <FormLabel label="Date Range" />
        <div class="flex justify-between gap-[16px]">
          <datepicker class="w-[95%] datepicker-field" v-model="form.dateFrom"></datepicker>
          <datepicker class="w-[95%] datepicker-field" v-model="form.dateTo"></datepicker>
        </div>
        <FieldDescription>Dates to filter search results</FieldDescription>
      </div>
      <div class="w-full lg:w-[48%]">
        <FormLabel label="Amount" />
        <div class="flex justify-between">
          <SelectField
            centered
            class="w-[70px] mr-4"
            v-model="form.operator"
            @input="form.operator = $event"
            name="operator"
            :options="operatorOptions"
          />
          <TextField class="flex-1 mr-4" v-model="form.amount" name="amount" />
          <SelectField
            centered
            class="w-[95px]"
            v-model="form.currencyUnit"
            @input="form.currencyUnit = $event"
            name="currencyUnit"
            dropdown-width="80px"
            :options="unitOptions"
          />
        </div>
        <FieldDescription>Condition for the amount value</FieldDescription>
      </div>
    </FormWrapper>
    <TransactionsResults
      @page="fetchResults"
      v-model:is-page-loading="isPageLoading"
      v-model="resultVisible"
    ></TransactionsResults>
  </ViewContents>
</template>

<script setup>
import { useMainStore } from '@/stores/mainStore.js'
import datepicker from 'vue3-datepicker'
import TransactionsResults from '@/components/transactions/TransactionsResults.vue'

const isPosting = ref(false)
const isPageLoading = ref(false)
const store = useMainStore()

const { searchTransactions } = store
const resultVisible = ref(false)

const date = new Date();
date.setFullYear(date.getFullYear() - 1);
const isoDate = date.toISOString();


const form = reactive({
  type: '',
  orderBy: '',
  orderDirection: '',
  fromAccount: '',
  toAccount: '',
  memoId: '',
  requestId: '',
  dateFrom: isoDate,
  dateTo: new Date(),
  operator: '',
  amount: '',
  currencyUnit: ''
})

const typeOptions = [
  {
    name: 'Normal Transfer',
    value: 'transfer'
  },
  {
    name: 'Transfer To Vesting',
    value: 'transfer_to_vesting'
  },
  {
    name: 'Transfer To Savings',
    value: 'transfer_to_savings'
  },
  {
    name: 'Transfer From Savings',
    value: 'transfer_from_savings'
  },
  {
    name: 'Cancel Transfer From Savings',
    value: 'cancel_transfer_from_savings'
  },
  {
    name: 'Delegate Vesting Shares',
    value: 'delegate_vesting_shares'
  }
]

const orderByOptions = [
  {
    name: 'Date',
    value: 'timestamp'
  },
  {
    name: 'Amount',
    value: 'amount'
  }
]

const orderDirectionOptions = [
  {
    name: 'Desc.',
    value: 'desc'
  },
  {
    name: 'Asc.',
    value: 'asc'
  }
]

const operatorOptions = [
  {
    name: '=',
    value: '='
  },
  {
    name: '>=',
    value: '>='
  },
  {
    name: '<=',
    value: '<='
  }
]

const unitOptions = [
  {
    name: 'HIVE',
    value: 'hive'
  },
  {
    name: 'HBD',
    value: 'hbd'
  },
  {
    name: 'VESTS',
    value: 'vests'
  },
  {
    name: 'HP',
    value: 'hp'
  }
]

const postSearchTransactions = async () => {
  isPosting.value = true
  await searchTransactions(form)

  isPosting.value = false
  resultVisible.value = true
}

const fetchResults = async (page) => {
  isPageLoading.value = true
  await searchTransactions({ ...form, page })
  isPageLoading.value = false
}
</script>

<style>
.datepicker-field {
  @apply py-4 mt-3 w-full relative bottom-[5px] h-12 rounded-[24px] px-6 text-[18px] focus:outline-none text-gray-600 focus:outline-0;
}
</style>
