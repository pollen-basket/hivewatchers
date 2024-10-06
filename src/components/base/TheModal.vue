<template>
  <teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="modal">
        <div @click.stop="isOpen = false" class="modal-wrapper"></div>
        <div
          :style="`width: ${geometry.width}; height: ${geometry.height}; top: ${geometry.top}`"
          class="modal-contents"
        >
          <div class="modal-contents-wrapper scrollbar">
            <div @click.stop="isOpen = false" class="modal-close">
              <close-icon :size="28" />
            </div>
            <div v-if="$slots.header" class="modal-header">
              <slot name="header"></slot>
            </div>
            <slot />
            <div v-if="$slots.footer" class="modal-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<script setup>
import CloseIcon from 'vue-material-design-icons/Close.vue'

const props = defineProps({
  width: {
    type: String,
    default: '768px'
  },
  height: {
    type: String,
    default: 'auto'
  },
  top: {
    type: String,
    default: '160px'
  }
})

const isOpen = defineModel({ default: false })
const currentWidth = ref(window.innerWidth)
const currentHeight = ref(window.innerHeight)
const geometry = ref()

const resizeHandler = (e) => {
  currentWidth.value = e.currentTarget.outerWidth
  currentHeight.value = e.currentTarget.outerHeight
}

watch(
  [() => currentWidth.value, () => currentHeight.value, () => isOpen.value],
  () => {
    let result = {
      width: props.width,
      height: '84vh',
      top: '150px'
    }

    if (currentHeight.value <= 1200) {
      result.top = '150px'
      result.height = '80vh'
    }

    if (currentHeight.value <= 1120) {
      result.top = '70px'
      result.height = '85vh'
    }

    if (currentHeight.value <= 640) {
      result.top = '0'
      result.height = '100vh'
    }

    if (currentWidth.value <= 768) {
      result = {
        width: '100%',
        height: '100%',
        top: 0
      }
    }

    geometry.value = result
  },
  { immediate: true }
)

onMounted(() => {
  window.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})
</script>

<style scoped>
.modal {
  @apply overflow-hidden;
}
.modal-wrapper {
  @apply absolute inset-0 z-[1000];
}

.modal-header {
  @apply border-b border-gray-400 pb-[1rem];
}

.modal-contents {
  @apply absolute z-[1000] left-[50%]
  -translate-x-2/4 text-white py-[2.5rem] px-[1rem] pb-[4rem];

  @media (min-width: 640px) {
    @apply rounded-[1rem] h-[80vh];
  }
  @media (max-height: 520px) {
    @apply rounded-[0px];
  }

  background: linear-gradient(
    180deg,
    rgba(24, 82, 126, 1) 0%,
    rgba(12, 54, 88, 1) 42%,
    rgba(2, 35, 68, 1) 100%
  );
}

.modal-contents-wrapper {
  @apply relative overflow-y-auto overflow-x-hidden h-full;
}

.modal-footer {
  @apply fixed bottom-0 w-full bg-black w-full relative right-2;
  @media (min-width: 640px) {
    @apply fixed bottom-[2px] right-[1.5rem] bg-black py-3 w-[95%];
  }
  @media (max-height: 520px) {
    @apply static;
  }
}

.modal-close {
  @apply fixed right-[0.6rem] top-[0.7rem] cursor-pointer hover:opacity-80 transition;
}
</style>
