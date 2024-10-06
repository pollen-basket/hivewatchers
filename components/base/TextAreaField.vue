<template>
  <div class="form-textarea-field">
    <FormLabel :name="name" :label="label" :required="required" />

    <div class="field-container" :class="{ 'mt-5': !label }">
      <textarea
        :rows="rows"
        @blur.stop="updateValidity"
        :class="{ invalid: !fieldIsValid }"
        :id="name"
        :name="name"
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
  rows: {
    type: String,
    default: '4'
  }
})

const model = defineModel()
const emit = defineEmits(['validity'])

const requiredRule = (value) => !!value
const fieldIsValid = ref(true)

const updateValidity = () => {
  if (props.required) {
    fieldIsValid.value = requiredRule(model.value)
  }
}

watch(model, () => {
  updateValidity()
  emit('validity', { [props.name]: fieldIsValid.value })
})
</script>

<style scoped>
.form-textarea-field {
  @apply py-4 -mb-4;

  .field-container,
  textarea {
    @apply w-full relative bottom-[5px];
  }

  textarea {
    @apply rounded-[24px] px-6 py-3 text-[18px] focus:outline-none text-gray-600 focus:outline-0;
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
