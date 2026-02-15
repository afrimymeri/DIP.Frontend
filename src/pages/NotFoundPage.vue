<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" class="text-center">
        <div class="text-h1 font-weight-bold text-primary mb-4">404</div>
        <div class="text-h5 mb-2">Page Not Found</div>
        <div class="text-body-1 text-medium-emphasis mb-8">
          The page you're looking for doesn't exist or has been moved.
        </div>
        <v-btn color="primary" size="large" :to="{ name: 'home' }" class="text-none">
          <v-icon start>mdi-home</v-icon>
          Back to Home
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>
