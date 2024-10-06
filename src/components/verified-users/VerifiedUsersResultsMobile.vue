<template>
  <TheModal height="100%" width="100%" top="0" v-model="isVisible">
    <template #header>
      <div class="results-header-logo">
        <svg viewBox="0 0 666.66669 666.66669" xmlns="http://www.w3.org/2000/svg">
          <g
            id="g8"
            transform="matrix(1.3333332538604736, 0, 0, -1.3333332538604736, 0, 666.6666870117188)"
          >
            <g id="g10" transform="scale(0.1)">
              <path
                d="M 5000 0 L 0 0 L 0 5000 L 4995.954 5012.136 L 5000 0"
                style="fill: transparent; fill-opacity: 1; fill-rule: nonzero; stroke: none"
                id="path12"
              />
              <path
                d="m 3657.03,1899.58 c -20.06,86.36 -70.65,153.92 -150.52,201.02 -63.09,37.02 -132.88,67.55 -206.64,99.73 -323.18,141.14 -253.35,139.2 -425.35,234.25 l 15.85,172.43 c 26.56,32.29 50.4,67.07 71.24,103.42 27.53,48.17 49.83,98.87 66.59,149.46 19.67,6.88 41.67,61.84 51.27,130.74 5.81,42.36 5.81,80.93 0.87,107.2 138.51,457.29 -94.11,634.46 -249.19,699.79 -281.65,118.73 -686.5,39.15 -759.09,-106.23 -12.02,-24.13 -21.33,-62.9 6.49,-107.59 2.62,-4.26 1.17,-9.88 -2.91,-12.7 -46.62,-32.17 -90.43,-82.09 -115.43,-133.65 -47.69,-97.61 -29.57,-225.93 4.94,-282.14 v -0.1 l 2.53,-27.33 c -1.95,2.72 -10.86,5.14 -13.09,4.84 -20.84,-2.91 -29.38,-66.49 -18.91,-142.09 7.38,-52.43 21.81,-96.82 37.03,-118.14 23.94,-101.68 70.76,-195.11 137.53,-272.45 l 15.19,-165.49 c -171.42,-94.72 -102.09,-93.08 -425.26,-234.22 -73.76,-32.18 -143.55,-62.71 -206.64,-99.73 -79.87,-47.1 -130.46,-114.66 -150.52,-201.02 -43.43,-187.55 70.16,-410.96 119.6,-496.35 13.38,-22.97 33.43,-41.38 57.66,-52.33 114.95,-52.25 493.34,-205.38 979.7,-206.06 486.36,0.68 864.75,153.81 979.8,206.06 24.22,10.95 44.19,29.36 57.56,52.33 49.44,85.39 163.03,308.8 119.7,496.35"
                style="fill-opacity: 1; fill-rule: nonzero; stroke: none; fill: rgb(15, 109, 146)"
                id="path14"
              />
              <path
                d="m 4293.05,1527.77 c 0,-470.67 -381.57,-852.231 -852.24,-852.231 -470.67,0 -852.23,381.561 -852.23,852.231 0,470.68 381.56,852.23 852.23,852.23 470.67,0 852.24,-381.55 852.24,-852.23"
                style="fill-opacity: 1; fill-rule: nonzero; stroke: none; fill: rgb(133, 196, 45)"
                id="path16"
              />
              <path
                d="m 4136.63,1527.77 c 0,-384.29 -311.52,-695.821 -695.82,-695.821 -384.29,0 -695.81,311.531 -695.81,695.821 0,384.29 311.52,695.81 695.81,695.81 384.3,0 695.82,-311.52 695.82,-695.81"
                style="fill-opacity: 1; fill-rule: nonzero; stroke: none; fill: rgb(255, 255, 255)"
                id="path18"
              />
              <path
                d="m 3325.72,1208.71 c -30.01,0 -58.24,11.7 -79.48,32.94 l -183.1,183.1 c -43.81,43.82 -43.81,115.12 0,158.95 21.24,21.24 49.47,32.93 79.48,32.93 30,0 58.22,-11.69 79.46,-32.92 l 103.64,-103.63 333.81,333.81 c 21.24,21.24 49.46,32.94 79.47,32.94 30.01,0 58.25,-11.7 79.49,-32.94 43.81,-43.83 43.81,-115.13 0,-158.96 L 3405.2,1241.65 c -21.24,-21.24 -49.48,-32.94 -79.48,-32.94"
                style="fill-opacity: 1; fill-rule: nonzero; stroke: none; fill: rgb(133, 196, 45)"
                id="path20"
              />
            </g>
          </g>
        </svg>
      </div>
      <div class="results-header">List of verified users</div>
      <div class="results-mobile-search">
        <SearchForm
          v-model:isFetching="isFetching"
          v-model:searchValue="searchValue"
          name="search-user"
          title="Search verified users"
          class="flex sm:hidden"
          button-position-pct="0"
          button-type="success"
          button-full
          @search="fetchVerifiedUsers"
        />
      </div>
    </template>

    <div v-if="resultsVisible" class="results-container">
      <VerifiedUsersUser
        v-for="({ username, urls, method }, idx) in currentResults"
        :key="idx"
        :username="username"
        :urls="urls"
        :method="method"
      />
    </div>
    <template #footer>
      <div v-if="resultsVisible" class="pagination">
        <vue-awesome-paginate
          v-model="currentPage"
          :total-items="verifiedUsers.length"
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

const isVisible = defineModel(false)
const isFetching = ref(false)
const resultsVisible = ref(false)
const searchValue = ref('')

const fetchVerifiedUsers = () => {
  if (searchValue.value) {
    isFetching.value = true
    // TODO: Must be fetched from API

    setTimeout(() => {
      resultsVisible.value = true
      isFetching.value = false
    }, 1500)
  } else {
    isFetching.value = false
  }
}

// TODO: Temporary solution

const verifiedUsers = [
  {
    username: 'cryptomarks',
    urls: ['https://steemit.com/@cryptomarks', 'https://medium.com/@VidrihMarko'],
    method: 'Steemit link was in a post'
  },
  {
    username: 'octogang',
    urls: ['https://steemit.com/@octogang'],
    method: 'Steemit link was in a post'
  },
  {
    username: 'sharpshot',
    urls: ['https://steemit.com/@sharpshot', 'https://shutterstock.com/g/britishstock'],
    method: 'Verified in Discord'
  },
  {
    username: 'octogang',
    urls: ['https://steemit.com/@octogang'],
    method: 'Steemit link was in a post'
  },
  {
    username: 'octogang',
    urls: ['https://steemit.com/@octogang'],
    method: 'Steemit link was in a post'
  },
  {
    username: 'cryptomarks2',
    urls: ['https://steemit.com/@cryptomarks', 'https://medium.com/@VidrihMarko'],
    method: 'Steemit link was in a post'
  }
]

const itemsPerPage = ref(3)
const { currentResults, currentPage } = usePagination(verifiedUsers, itemsPerPage)

defineExpose({ isVisible })
</script>

<style scoped>
.results-header-logo {
  @apply mx-auto w-[120px];
}
.results-header {
  @apply text-center text-[27px] font-semibold uppercase;
}

.results-mobile-search {
  @apply flex justify-start w-full;
}

.results-container {
  @apply py-6 sm:pl-12;
}
</style>
