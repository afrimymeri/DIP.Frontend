<template>
  <v-navigation-drawer expand-on-hover permanent rail>
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/lego/1.jpg"
        :subtitle="user?.email || 'Guest'"
        :title="user?.name || 'Guest User'"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-home" title="Home" to="/"></v-list-item>
      <v-list-item prepend-icon="mdi-information" title="About" to="/about"></v-list-item>

      <v-divider class="my-2"></v-divider>

      <template v-if="!isAuthenticated">
        <v-list-item prepend-icon="mdi-login" title="Login" to="/login"></v-list-item>
        <v-list-item prepend-icon="mdi-account-plus" title="Sign Up" to="/signup"></v-list-item>
      </template>
      <template v-else>
        <v-list-item prepend-icon="mdi-logout" title="Logout" @click="logout"></v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const { user, isAuthenticated } = storeToRefs(authStore)
const router = useRouter()

async function logout() {
  await authStore.logout()
  router.push('/login')
}
</script>
