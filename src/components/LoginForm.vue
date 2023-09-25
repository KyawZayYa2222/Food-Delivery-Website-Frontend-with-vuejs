<template>
    <div>
        <form @submit.prevent="login">
            <small v-show="errors.message" class="text-sm text-red-500 font-semibold px-2">{{errors.message}}</small>
            <small v-show="errors.email" class="text-sm text-red-500 font-semibold px-2">{{errors.email}}</small>
            <input 
            type="email" 
            ref="nameInput"
            v-model="email" 
            :class="{'border-red-600': errors.email, 'outline-red-600': errors.email}"
            class="w-full h-14 px-3 mb-4 border-2 border-gray-400 outline-2 outline-gray-600 rounded-md"
            placeholder="Email">

            <small v-show="errors.password" class="text-sm text-red-500 font-semibold px-2">{{errors.password}}</small>
            <input 
            type="password"
            v-model="password" 
            :class="{'border-red-600': errors.password}"
            class="w-full h-14 px-3 mb-4 border-2 border-gray-400 outline-2 outline-gray-600 rounded-md"
            placeholder="Password">
                
            <button 
            type="submit" 
            class="w-full inline bg-gray-950 text-white text-md p-4 mb-4 hover:bg-gray-800 
            transition delay-75 duration-150">
            <svg 
            v-show="loader"
            class="animate-spin inline-block h-5 w-5 mr-3 border-2 border-gray-600 border-t-white 
            border-b-white rounded-md" viewBox="0 0 24 24"></svg>
            <span class="inline-block">Sign In</span>
            </button>
        </form>
    </div>
</template>

<script>
import {apiService} from '@/apiService'
import {emailValidate, storeAuthInfo} from '@/formHandler.js'

export default {
    name: 'LoginForm',
    data() {
        return {
            email: null,
            password: null,
            loader: false,
            errors: {
                email: null,
                password: null,
                message: null,
            }
        }
    },
    mounted() {
        this.$refs.nameInput.focus();
    },
    methods: {
        login() {
            const vm = this;

            !this.email ? this.errors.email = 'Email is required.' : this.errors.email = null
            !this.password ? this.errors.password = 'Password is required.' : this.errors.password = null

            if(!this.errors.email && !this.errors.password) {
                this.loader = true;
                apiService.post('/api/login', {
                    email: this.email,
                    password: this.password
                })
                .then(response => {
                    let userData = response.data.userData;
                    let token = response.data.token;
                    storeAuthInfo(userData, token);
                    this.$nextTick(() => {
                        this.$router.push('/menu');
                    })
                })
                .catch(error => {
                    error.response.status===401 ? vm.errors.message = error.response.data.message : null;
                })
                .finally(() => {
                    vm.loader = false;
                });
            }
        }
    },
    watch: {
        email(value) {
            this.email = value
            this.errors.email = emailValidate(value)
        }
    }
}
</script>