<template>
  <div v-if="options.length" class="form-select-field">
    <FormLabel :name="name" :label="label" :required="required" />

    <div class="field-container">
      <div
        @click.stop="dropdownVisible = !dropdownVisible"
        :class="{ invalid: !fieldIsValid }"
        class="field"
      >
        <div :class="{ 'text-center': centered }">
          {{ `${model ? currentOption : options[defaultOption].name}` }}
        </div>
        <div
          v-show="dropdownVisible"
          :class="{ 'text-center': centered }"
          :style="dropdownWidth && `width: ${dropdownWidth}`"
          class="field-dropdown"
        >
          <div
            @click="
              () => {
                model = option.value
                currentOption = option.name
              }
            "
            v-for="(option, idx) in options"
            class="field-dropdown-option"
            :key="idx"
          >
            {{ option.name }}
          </div>
        </div>
      </div>
      <FieldDescription v-if="description">{{ description }}</FieldDescription>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String
  },
  label: {
    type: String
  },
  required: {
    type: Boolean,
    default: false
  },
  description: {
    type: String
  },
  defaultOption: {
    type: String,
    default: '0'
  },
  options: {
    type: Array,
    default: () => []
  },
  centered: {
    type: Boolean,
    default: false
  },
  dropdownWidth: {
    type: String
  }
})

const model = defineModel({ default: '' })
const currentOption = ref('')
const emit = defineEmits(['validity'])

const requiredRule = (value) => !!value
const fieldIsValid = ref(true)

const updateValidity = () => {
  if (props.required) {
    fieldIsValid.value = requiredRule(model.value)
  }
}

const dropdownVisible = ref(false)

watch(model, () => {
  updateValidity()
  emit('validity', { [props.name]: fieldIsValid.value })
})

const globalClickHandler = () => {
  dropdownVisible.value = false
  updateValidity()
}

onMounted(() => {
  currentOption.value = props.options[props.defaultOption].name
  model.value = props.options[props.defaultOption].value
  window.addEventListener('click', globalClickHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', globalClickHandler)
})
</script>

<style scoped>
.form-select-field {
  @apply py-4 -mb-4;

  .field-container,
  .field {
    @apply w-full relative bottom-[5px];
  }

  .field {
    @apply h-12 leading-[48px] rounded-[24px] px-6 text-[18px] text-gray-600 bg-white cursor-pointer;
    &.invalid {
      @apply outline outline-hive-secondary -outline-offset-[3px];
    }

    .field-dropdown {
      @apply absolute py-2 bg-white left-2 right-2 top-[4rem] z-10 bg-gray-100 text-gray-600;
    }

    .field-dropdown-option {
      @apply px-4 hover:text-white hover:bg-hive-primary cursor-pointer;
    }
  }

  .field-container {
    .field-description {
      @apply text-[14px] text-gray-300 pl-2;
    }
  }
}
</style>
