<template>
  <AuthForm title="Welcome Back">
    <form @submit.prevent="handleLogin">
      <InputField
        v-model="email"
        label="Email"
        type="email"
        prepend-inner-icon="mdi-email-outline"
        class="mb-2"
      />

      <InputField
        v-model="password"
        label="Password"
        type="password"
        prepend-inner-icon="mdi-lock-outline"
      />

      <div class="d-flex justify-end mb-4">
        <a href="#" class="text-caption text-decoration-none text-primary font-weight-medium">
          Forgot password?
        </a>
      </div>

      <v-btn
        type="submit"
        :loading="auth.loading"
        color="primary"
        size="large"
        block
        elevation="2"
        class="text-none font-weight-bold"
      >
        Login
      </v-btn>

      <div class="text-center mt-6 text-body-2">
        Don't have an account?
        <router-link to="/signup" class="text-primary text-decoration-none font-weight-bold">
          Sign up
        </router-link>
      </div>

      <v-expand-transition>
        <v-alert v-if="auth.error" type="error" variant="tonal" class="mt-4" density="compact">
          {{ auth.error }}
        </v-alert>
      </v-expand-transition>
    </form>
  </AuthForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AuthForm from '@/components/Auth/AuthForm.vue'
import InputField from '@/components/InputField.vue'
import { useRouter, useRoute } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')

async function handleLogin() {
  try {
    await auth.login({ email: email.value, password: password.value })
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch {
    // Error is already set in the store
  }
}
</script>
