<template>
  <v-text-field
    v-model="modelValueLocal"
    :label="label"
    :type="type"
    :error-messages="error ? [error] : []"
    :prepend-inner-icon="prependInnerIcon"
    variant="outlined"
    density="comfortable"
    color="primary"
    clearable
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label?: string
  type?: string
  error?: string | null
  prependInnerIcon?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const modelValueLocal = computed<string>({
  get: () => props.modelValue ?? '',
  set: (v: string) => emit('update:modelValue', v),
})
</script>
