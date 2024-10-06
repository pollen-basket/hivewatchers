<template>
  <div @keyup.enter="validateForm" class="form-wrapper">
    <div class="form-contents">
      <slot :updateValidity="updateValidity" />

      <PreloaderButton
        v-model="isFetching"
        @preloader-button-click="validateForm"
        button-position-pct="0"
        class="submit-button"
      >
        {{ buttonName }}
      </PreloaderButton>
      <div v-if="showIsValid && !isValid" class="form-error-message">
        Please fill in the required form fields marked with '*" with the appropriate format
      </div>
      <div v-if="errorMessage" class="form-error-message">
        {{ errorMessage }}
      </div>
      <div v-if="message" class="form-message">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  buttonName: {
    type: String,
    default: 'Submit form'
  },
  validity: {
    type: Object,
    default: () => {}
  }
})

const currentValidity = ref(props.validity)
const emit = defineEmits(['submit-form'])
const isFetching = defineModel({ default: false })
const errorMessage = defineModel('errorMessage', { default: '' })
const message = defineModel('message', { default: '' })

const updateValidity = (e) => {
  showIsValid.value = false
  currentValidity.value = { ...currentValidity.value, ...e }
}

const showIsValid = ref(false)

const isValid = computed(() => {
  return Object.values(currentValidity.value).every((value) => value === true)
})

const validateForm = () => {
  if (!props.validity || isValid.value) {
    emit('submit-form')
  } else {
    isFetching.value = false
    showIsValid.value = true
  }
}
</script>

<style scoped lang="postcss">
.form-wrapper {
  @apply w-full lg:w-1/2;
}

.form-contents {
  @apply flex flex-wrap justify-between pt-3 pb-5;
}

.submit-button {
  @apply w-full mt-6 md:mt-12 h-12 rounded-[24px] px-6 bg-green-700
  text-white font-medium uppercase tracking-[2px] text-[17px] text-center
  transition hover:bg-green-800 active:bg-green-700;
}

.form-error-message,
.form-message {
  @apply mt-2;
}

.form-error-message {
  @apply text-hive-secondary-lighten;
}
.form-message {
  @apply text-hive-success-lightest;
}
</style>
