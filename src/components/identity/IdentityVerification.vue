<template>
  <ViewContents
    wrapper-classes="justify-start text-left"
    title-classes="pt-8 xl:pt-24 text-left"
    view-title="Content / Identity verification"
    :view-sub-title="viewSubTitle"
  >
    <template v-slot:prepend>
      <div class="search-title">Search verified users</div>
      <SearchForm
        v-if="shouldDisplaySearchUsers"
        v-model:isFetching="isFetching"
        v-model:searchValue="searchValue"
        name="search-user"
        buttonPositionPct="13%"
        class="flex w-[500px]"
        :message="
          verifiedUsersResultsDesktopVisible
            ? `Number of results: ${verifiedUsers?.length || '0'}`
            : ''
        "
        @search="fetchVerifiedUsers"
      />
    </template>

    <Transition name="fade">
      <FormWrapper
        v-if="!posted"
        v-model="isPosting"
        @submit-form="postUserVerification"
        :validity="validity"
        button-name="Send verification"
      >
        <template v-slot="{ updateValidity }">
          <TextField
            class="w-full lg:w-[48%]"
            @validity="updateValidity"
            v-model="form.username"
            name="username"
            label="Username"
            description="Do not include @ symbol"
            placeholder="Type your username"
            required
          />
          <TextField
            class="w-full lg:w-[48%]"
            v-model="form.steemit_post"
            name="steemit_post"
            label="Hive Post"
            description="Only the link to the post. Do not link directly to comments"
          />
          <TextField
            class="w-full"
            v-model="form.media_link"
            name="media_link"
            label="Media link"
            description="Provide a direct link to the page, post or tweet where the user has been verified"
          />
          <TextAreaField
            class="w-full"
            v-model="form.additional_information"
            name="additional_information"
            placeholder="Type in additional information"
          />
        </template>
      </FormWrapper>
    </Transition>
    <SubmitMessage v-if="messageVisible" @click="resetForm" :isDenied="isDenied" />
  </ViewContents>
  <VerifiedUsersResults v-model="verifiedUsersResultsDesktopVisible" />
</template>

<script setup>
import { useMainStore } from '@/stores/mainStore.js'

const route = useRoute()
const store = useMainStore()

const shouldDisplaySearchUsers = computed(() => route.name === 'identity-verification')

const { getVerifiedUsers, postVerification } = store
const { verifiedUsers } = storeToRefs(store)

const verifiedUsersResultsDesktopVisible = ref(false)
const isFetching = ref(false)
const searchValue = ref('')
const isDenied = ref(false)

const fetchVerifiedUsers = async () => {
  isFetching.value = true

  await getVerifiedUsers(searchValue.value)

  if (!verifiedUsers.value?.length) {
    isFetching.value = false
    return
  }

  verifiedUsersResultsDesktopVisible.value = true
  isFetching.value = false
}

const isPosting = ref(false)
const posted = ref(false)
const messageVisible = ref(false)

const form = reactive({
  username: '',
  steemit_post: '',
  media_link: '',
  additional_information: ''
})

const resetForm = () => {
  messageVisible.value = false
  form.username = ''
  form.steemit_post = ''
  form.media_link = ''
  form.additional_information = ''
  posted.value = false
}

const validity = ref({
  username: false
})

const viewSubTitle = computed(() => {
  let subtitle = 'Submit a form for identity verification'

  if (posted.value) {
    subtitle = ''
  }

  return subtitle
})

const postUserVerification = async () => {
  isPosting.value = true
  const result = await postVerification(form)
  isPosting.value = false
  posted.value = true
  setTimeout(() => {
    if (typeof result === 'boolean') {
      isDenied.value = result
    }
    messageVisible.value = true
  }, 600)
}
</script>
<style>
.search-title {
  @apply mt-4 text-[18px] text-hive-success-lightest leading-[24px] font-thin lg:max-w-[550px];
}
</style>
