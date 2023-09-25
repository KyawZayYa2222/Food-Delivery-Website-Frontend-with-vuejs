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
            
            <google-login/>
        </div>
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import googleLogin from '@/components/googleLogin.vue'

export default {
    name: 'LoginPage',
    components: {
        LoginForm,
        googleLogin,
    },
}
</script>