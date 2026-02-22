<script setup lang="ts">
import { AVAILABLE_SOURCES } from '@/types/literature'
</script>

<template>
  <v-container class="py-8" style="max-width: 900px">
    <div class="text-center mb-8">
      <h1 class="text-h3 font-weight-bold mb-2">About DIP</h1>
      <p class="text-body-1 text-medium-emphasis">
        Digital Information Platform — a unified search interface for academic literature
      </p>
    </div>

    <v-card variant="outlined" class="mb-6 pa-6">
      <v-card-title class="text-h6 px-0 pt-0">
        <v-icon start>mdi-information-outline</v-icon>
        What is DIP?
      </v-card-title>
      <v-card-text class="text-body-1 px-0 pb-0">
        DIP lets you search for scientific papers across multiple academic databases with a single
        query. Instead of visiting each source individually, DIP aggregates and deduplicates results
        so you can discover relevant literature faster.
      </v-card-text>
    </v-card>

    <v-card variant="outlined" class="mb-6 pa-6">
      <v-card-title class="text-h6 px-0 pt-0">
        <v-icon start>mdi-database-search</v-icon>
        Supported Sources
      </v-card-title>
      <v-card-text class="px-0 pb-0">
        <div class="d-flex flex-wrap gap-2">
          <v-chip
            v-for="source in AVAILABLE_SOURCES"
            :key="source.id"
            color="primary"
            variant="tonal"
          >
            {{ source.name }}
          </v-chip>
        </div>
      </v-card-text>
    </v-card>

    <div class="text-center text-caption text-medium-emphasis mt-8">
      Built with Vue 3, Vuetify, and ASP.NET Core
    </div>
  </v-container>
</template>
