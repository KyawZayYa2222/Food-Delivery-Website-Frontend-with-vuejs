<template>
    <div class="flex justify-center items-center w-screen h-screen">
        <div class="w-96 px-2">
            <router-link to="/">
                <img src="@/assets/img/foodor-logo.png" alt="logo" class="w-32 mx-auto">
            </router-link>
            <h2 class="text-2xl font-bold text-black text-center">Welcome back!</h2>
            <p class="text-md text-gray-500 text-center mb-6">Sign in to your account.</p>
            
            <login-form></login-form>

            <p class="text-xl text-gray-500 text-center mb-3">or</p>
            
            <button class="w-full border-2 border-gray-400 py-1 text-gray-700 font-semibold flex items-center 
            justify-center hover:border-black transition delay-75 duration-150">
                <img src="@/assets/img/google-icon.png" alt="google-icon" class="w-12">
                Continue with google
            </button>
        </div>
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
    name: 'LoginPage',
    components: {
        LoginForm,
    },
    data() {
        return {
            
        }
    }
}
</script>