<script setup lang="ts">
defineProps<{
  loading: boolean
}>()

const query = defineModel<string>('query', { required: true })

const emit = defineEmits<{
  search: []
}>()

function handleSearch() {
  if (query.value?.trim()) {
    emit('search')
  }
}
</script>

<template>
  <v-text-field
    v-model="query"
    placeholder="Search papers by title or authors..."
    prepend-inner-icon="mdi-magnify"
    variant="outlined"
    density="comfortable"
    clearable
    hide-details
    class="mb-4"
    @keyup.enter="handleSearch"
    @click:clear="query = ''"
  >
    <template #append-inner>
      <v-btn
        color="primary"
        variant="flat"
        :loading="loading"
        :disabled="!query?.trim()"
        @click="handleSearch"
      >
        Search
      </v-btn>
    </template>
  </v-text-field>
</template>
