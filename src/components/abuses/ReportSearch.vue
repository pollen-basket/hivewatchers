<template>
  <ViewContents
    wrapper-classes="justify-start text-left"
    title-classes="pt-8 xl:pt-24 text-left"
    view-title="Search Report"
    view-sub-title="Enter search criteria for reports"
  >
    <Transition name="fade">
      <FormWrapper
        v-if="!posted"
        v-model="isPosting"
        v-model:errorMessage="formErrorMessage"
        v-model:message="formMessage"
        @submit-form="search"
        button-name="Search reports"
      >
        <TextField
          class="w-full lg:w-[48%]"
          v-model="form.reportedBy"
          name="reportedBy"
          label="Reported by"
          placeholder="Type your username"
        />
        <TextField
          class="w-full lg:w-[48%]"
          v-model="form.postURL"
          name="postURL"
          label="Post URL"
          description="If reporting a comment please link directly to the comment"
          placeholder="Link to post containing abuse."
        />
        <TextField
          class="w-full lg:w-[48%]"
          v-model="form.supportingLink"
          name="supportingLink"
          label="Supporting link"
          description="Any link can support your report"
        />
        <SelectField
          class="w-full lg:w-[48%]"
          v-model="form.abuseType"
          name="abuseType"
          label="Abuse type"
          :options="options"
        />
        <TextAreaField
          class="w-full"
          v-model="form.incidentDetails"
          name="incidentDetails"
          placeholder="Type in incident details"
        />
      </FormWrapper>
    </Transition>
  </ViewContents>
  <SearchReportsResults v-model="searchResultsVisible" />
  <div class=""></div>
</template>

<script setup>
import { useMainStore } from '@/stores/mainStore.js'

const isPosting = ref(false)
const posted = ref(false)
const searchResultsVisible = ref(false)
const formMessage = ref('')
const formErrorMessage = ref('')
const store = useMainStore()
const { searchReports } = store
const { reports } = storeToRefs(store)

const form = reactive({
  reportedBy: '',
  postURL: '',
  supportingLink: '',
  abuseType: '',
  incidentDetails: ''
})

const options = [
  {
    name: 'All',
    value: 'all'
  },
  {
    name: 'Option 1',
    value: 'Option 1'
  },
  {
    name: 'Option 2',
    value: 'Option 2'
  },
  {
    name: 'Option 3',
    value: 'Option 3'
  }
]

watch(searchResultsVisible, () => {
  if (searchResultsVisible.value === false) {
    formMessage.value = ''
    reports.value = []
  }
})

const search = async () => {
  await searchReports({ ...form })

  formErrorMessage.value = ''
  formMessage.value = ''

  if (reports?.value?.length) {
    formMessage.value = `Number of items found: ${reports.value.length}`
    searchResultsVisible.value = true
  } else {
    formErrorMessage.value = 'No items found.'
  }

  isPosting.value = false
}

onMounted(() => {
  reports.value = []
})
</script>
