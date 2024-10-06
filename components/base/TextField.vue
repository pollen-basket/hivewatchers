<template>
  <div class="form-text-field">
    <FormLabel :name="name" :label="label" :required="required" />

    <div class="field-container">
      <input
        @blur.stop="updateValidity"
        :class="{ invalid: !fieldIsValid }"
        :id="name"
        :name="name"
        type="text"
        :placeholder="placeholder"
        v-model="model"
      />
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
  placeholder: {
    type: String
  },
  regexp: {
    type: RegExp
  }
})

const model = defineModel()
const emit = defineEmits(['validity'])

const requiredRule = (value) => !!value
const regexpRule = (value) => {
  let regexp = new RegExp(props.regexp)

  return regexp.test(value)
}
const fieldIsValid = ref(true)

const updateValidity = () => {
  if (props.required) {
    fieldIsValid.value = requiredRule(model.value)
  }

  if (props.regexp) {
    fieldIsValid.value = regexpRule(model.value)
  }
}

watch(model, () => {
  updateValidity()
  emit('validity', { [props.name]: fieldIsValid.value })
})
</script>

<style scoped>
.form-text-field {
  @apply py-4 -mb-4;

  .field-container,
  input {
    @apply w-full relative bottom-[5px];
  }

  input {
    @apply h-12 rounded-[24px] px-6 text-[18px] focus:outline-none text-gray-600 focus:outline-0;
    &.invalid {
      @apply outline outline-hive-secondary -outline-offset-[3px];
    }
  }

  .field-container {
    .field-description {
      @apply text-[14px] text-gray-300 pl-2;
    }
  }
}
</style>
