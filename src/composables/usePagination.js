import { ref, computed } from 'vue'

export default function usePagination(results, itemsPerPage) {
  const currentPage = ref(1)

  const currentResults = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value
    const endIndex = startIndex + itemsPerPage.value
    return results.slice(startIndex, endIndex)
  })

  return {
    currentPage,
    currentResults
  }
}
