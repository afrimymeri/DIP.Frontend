<template>
  <AuthForm title="Sign Up">
    <form @submit.prevent="handleSignup">
      <InputField
        v-model="name"
        label="Name"
        prepend-inner-icon="mdi-account-outline"
        class="mb-2"
      />
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

      <v-btn
        type="submit"
        :loading="auth.loading"
        color="primary"
        size="large"
        block
        elevation="2"
        class="text-none font-weight-bold mt-4"
      >
        Sign Up
      </v-btn>

      <div class="text-center mt-6 text-body-2">
        Already have an account?
        <router-link to="/login" class="text-primary text-decoration-none font-weight-bold">
          Login
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
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')

async function handleSignup() {
  try {
    await auth.signup({ name: name.value, email: email.value, password: password.value })
    router.push('/') // redirect
  } catch (err) {}
}
</script>
