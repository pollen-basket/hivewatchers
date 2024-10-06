<template>
  <ViewContents
    wrapper-classes="justify-start text-left"
    title-classes="pt-8 xl:pt-24 text-left"
    view-title="Report Abuse"
    :view-sub-title="viewSubTitle"
  >
    <Transition name="fade">
      <FormWrapper
        v-if="!posted"
        v-model="isPosting"
        @submit-form="postReportAbuse"
        :validity="validity"
        button-name="Send report about abuse"
      >
        <template v-slot="{ updateValidity }">
          <TextField
            class="w-full lg:w-[48%]"
            @validity="updateValidity"
            v-model="form.reported_by_username"
            name="reported_by_username"
            label="Reported by"
            placeholder="Type your username"
            required
          />
          <TextField
            class="w-full lg:w-[48%]"
            @validity="updateValidity"
            v-model="form.post_url"
            name="post_url"
            label="Post URL"
            description="If reporting a comment please link directly to the comment"
            placeholder="Link to post containing abuse."
            required
            :regexp="urlRegex"
          />
          <TextField
            class="w-full lg:w-[48%]"
            v-model="form.supporting_link"
            name="supporting_link"
            label="Supporting link"
            description="Any link can support your report"
          />
          <SelectField
            class="w-full lg:w-[48%]"
            @validity="updateValidity"
            v-model="form.abuse_type"
            name="abuse_type"
            label="Abuse type"
            :options="options"
          />
          <TextAreaField
            class="w-full"
            v-model="form.details"
            name="details"
            placeholder="Type in incident details"
          />
        </template>
      </FormWrapper>
    </Transition>
    <SubmitMessage v-if="messageVisible" @click="resetForm" :isDenied="isDenied" />
  </ViewContents>
</template>

<script setup>
import { useMainStore } from '@/stores/mainStore.js'

const isPosting = ref(false)
const posted = ref(false)
const messageVisible = ref(false)
const store = useMainStore()
const isDenied = ref(false)

const form = reactive({
  reported_by_username: '',
  post_url: '',
  supporting_link: '',
  abuse_type: '',
  details: ''
})

const { postAbuse } = store

const options = [
  {
    name: 'Comment Spam',
    value: 'Comment Spam'
  },
  {
    name: 'Copy/Paste',
    value: 'Copy/Paste'
  },
  {
    name: 'Cybersecurity Threads',
    value: 'Cybersecurity Threads'
  },
  {
    name: 'Identity/Theft Deception',
    value: 'Identity/Theft Deception'
  },
  {
    name: 'Photo/Image Plagiarism',
    value: 'Photo/Image Plagiarism'
  },
  {
    name: 'Plagiarism',
    value: 'Plagiarism'
  },
  {
    name: 'Spam',
    value: 'Spam'
  },
  {
    name: 'Unverified Identity',
    value: 'Unverified Identity'
  },
  {
    name: 'Other',
    value: 'Other'
  }
]

const resetForm = () => {
  posted.value = false
  messageVisible.value = false
  form.reported_by_username = ''
  form.post_url = ''
  form.supporting_link = ''
  form.abuse_type = ''
  form.details = ''
}

const validity = ref({
  reported_by_username: false,
  post_url: false,
  abuse_type: false
})

const checkUrlForHivePlatforms = (url) => {
  const platforms = ['hive.blog', 'peakd.com', 'ecency.com']

  for (let platform of platforms) {
    if (url.includes(platform)) {
      return platform // Zwraca platformę, która została znaleziona
    }
  }

  return null
}

const urlRegex = /^https:\/\/([a-zA-Z0-9.-]+)\/.*\/@([a-zA-Z0-9._-]+)\/(.+)$/

const transformURL = (url) => {
  const match = url.match(urlRegex)

  const user = match[2]
  const rest = match[3]
  const newURL = `https://hive.blog/@${user}/${rest}`

  return { user, newURL }
}

const viewSubTitle = computed(() => {
  let subtitle = 'Provide abuse details to submit a report'

  if (posted.value) {
    subtitle = ''
  }

  return subtitle
})

const postReportAbuse = async () => {
  if (!checkUrlForHivePlatforms(form.post_url)) {
    isPosting.value = false
    validity.value.post_url = true
    return
  }

  isPosting.value = true

  const transformedURL = transformURL(form.post_url)

  const result = await postAbuse({
    ...form,
    post_url: transformedURL.newURL,
    author_username: transformedURL.user
  })

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
