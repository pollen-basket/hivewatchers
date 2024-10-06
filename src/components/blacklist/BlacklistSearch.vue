<template>
  <ViewContents
    wrapper-classes="justify-start text-left"
    title-classes="pt-8 xl:pt-24 text-left"
    view-title="Blacklist search"
  >
    <div class="w-[600px]">
      <SearchForm
        v-model:isFetching="isFiltering"
        v-model:searchValue="filterValue"
        name="filter-blacklist"
        class="flex"
        button-position-pct="10%"
        button-type="primary"
        button-title="Filter"
        :message="`Number of results: ${totalItems || '0'}`"
        @search="filterUsers"
      />
    </div>

    <SearchResults
      v-if="!isBlacklistUserFetching"
      class="relative mt-10 h-full sm:mt-4 sm:h-[600px]"
    >
      <BlacklistUser @fetch-user="fetchUser" :users="currentVisible" />
      <div class="pagination absolute bottom-6 pb-4 sm:bottom-0 w-full">
        <vue-awesome-paginate
          v-model="page"
          :total-items="totalItems"
          :items-per-page="itemsPerPage"
          :max-pages-shown="5"
          :hide-prev-next-when-ends="true"
          :show-breakpoint-buttons="false"
          prev-button-content=""
          next-button-content="next"
        />
      </div>
    </SearchResults>
    <TheModal width="768px" v-model="userDetailsOpened">
      <BlacklistSearchResultsUser
        :results="blacklistUserData"
        :comments="(comments && comments.data) || []"
      />
    </TheModal>
  </ViewContents>

  <TheOverlay v-model="isUserDataFetching" />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/mainStore.js'
import usePagination from '@/composables/usePagination.js'

const filterValue = ref('')
const isFiltering = ref(false)
const userDetailsOpened = ref(false)
const store = useMainStore()
const { blacklistUsers, blacklistUserData, isBlacklistUserFetching, isUserDataFetching, comments } =
  storeToRefs(store)
const { fetchUserStats } = store
const itemsPerPage = ref(8)

let currentVisible
let page = 1

const currentFilter = ref('')
const totalItems = ref(0)

const filteredUsers = computed(() => {
  let result = blacklistUsers.value
  if (currentFilter.value) {
    result = blacklistUsers.value.filter((user) => user.includes(currentFilter.value))
  }

  totalItems.value = result?.length || 0

  return result
})

watch(
  [isBlacklistUserFetching, filteredUsers],
  () => {
    if (!isBlacklistUserFetching.value) {
      const { currentResults, currentPage } = usePagination([...filteredUsers.value], itemsPerPage)

      page = currentPage
      currentVisible = currentResults
    }
  },
  { immediate: true }
)

const filterUsers = () => {
  currentFilter.value = filterValue.value
  isFiltering.value = false
}

const fetchUser = async (username) => {
  await fetchUserStats(username)

  userDetailsOpened.value = true
}
</script>
