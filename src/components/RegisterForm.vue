<template>
    <form @submit.prevent="register">
        <small v-show="errors.message" class="text-sm text-red-500 font-semibold px-2">{{errors.message}}</small>
        <small v-show="errors.name" class="text-sm text-red-500 font-semibold px-2">{{errors.name}}</small>
        <input type="text" ref="nameInput"
        v-model="name" 
        :class="{'border-red-600': errors.name, 'outline-red-600': errors.name}"
        class="w-full h-14 px-3 mb-4 border-2 border-gray-400 outline-2 outline-gray-600 rounded-md"
        placeholder="Name">

        <small v-show="errors.email" class="text-sm text-red-500 font-semibold px-2">{{errors.email}}</small>
        <input type="text" 
        v-model="email" 
        :class="{'border-red-600': errors.email, 'outline-red-600': errors.email}"
        class="w-full h-14 px-3 mb-4 border-2 border-gray-400 outline-2 outline-gray-600 rounded-md"
        placeholder="Email">

        <small v-show="errors.password" class="text-sm text-red-500 font-semibold px-2">{{errors.password}}</small>
        <input type="password" 
        v-model="password" 
        :class="{'border-red-600': errors.password, 'outline-red-600': errors.password}"
        class="w-full h-14 px-3 mb-4 border-2 border-gray-400 outline-2 outline-gray-600 rounded-md"
        placeholder="Password">

        <small v-show="errors.confirmPassword" class="text-sm text-red-500 font-semibold px-2">{{errors.confirmPassword}}</small>
        <input type="password" 
        v-model="confirmPassword" 
        :class="{'border-red-600': errors.confirmPassword, 'outline-red-600': errors.confirmPassword}"
        class="w-full h-14 px-3 mb-4 border-2 border-gray-400 outline-2 outline-gray-600 rounded-md"
        placeholder="Confirm Password">
                
        <button 
        type="submit" 
        class="w-full inline bg-gray-950 text-white text-md p-4 mb-4 hover:bg-gray-800 transition delay-75 duration-150"
        ><svg 
        v-show="loader"
        class="animate-spin inline-block h-5 w-5 mr-3 border-2 border-gray-600 border-t-white 
        border-b-white rounded-md" viewBox="0 0 24 24"></svg><span class="inline-block">Sign Up</span></button>
    </form>
</template>

<script>
import axios from 'axios'
import {emailValidate, storeAuthInfo} from '@/formHandler.js'

export default {
    name: 'RegisterForm',
    data() {
        return {
            name: null,
            email: null,
            password: null,
            confirmPassword: null,
            loader: false,
            errors: {
                name: null,
                email: null,
                password: null,
                confirmPassword: null,
                message: null,
            }
        }
    },
    mounted() {
        this.$refs.nameInput.focus()
    },
    methods: {
        register() {
            const vm = this;
            
            !this.name ? this.errors.name = 'Name is required.' : this.errors.name = null
            !this.email ? this.errors.email = 'Email is required.' : this.errors.email = null
            !this.password ? this.errors.password = 'Password is required.' : this.errors.password = null
            !this.confirmPassword ? this.errors.confirmPassword = 'Confirm Password is required.' : this.errors.confirmPassword = null

            if(!this.errors.name && !this.errors.email && 
            !this.errors.password && !this.errors.confirmPassword) {
                this.loader = true;

                axios.post('http://127.0.0.1:8000/api/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.confirmPassword,
                })
                .then(response => {
                    let userData = response.data.userData;
                    let token = response.data.token;
                    storeAuthInfo(userData, token);
                    this.$router.push('/menu');
                })
                .catch(error => {
                    console.log(error)
                    error.response.status===422 ? vm.errors.message = error.response.data.message: null;
                })
                .finally(() => {
                    this.loader = false;
                })
            }
        }
    },
    watch: {
        email(value) {
            this.errors.email = emailValidate(value);
        },
        password(value) {
            value.length < 8 ? this.errors.password = 'Password need at least 8 characters.' : this.errors.password = null;
        },
        confirmPassword(value) {
            value != this.password ? this.errors.confirmPassword = 'Password does not match.' : this.errors.confirmPassword = null;
        }
    }
}
</script>