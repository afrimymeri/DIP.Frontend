<script setup lang="ts">
defineProps<{
  title: string
  abstract: string
}>()

const modelValue = defineModel<boolean>({ required: true })
</script>

<template>
  <v-dialog v-model="modelValue" max-width="700" scrollable>
    <v-card>
      <v-card-title class="text-wrap">{{ title }}</v-card-title>
      <v-card-text class="text-body-2">{{ abstract }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="modelValue = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
