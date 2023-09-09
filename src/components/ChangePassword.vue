<template>
    <div class="w-full xl:w-[600px]">
        <h1 class="text-2xl font-semibold mb-2">Change Password</h1>
        <form @submit.prevent>
            <small 
            v-if="errors && errors.current_password"
            class="ps-2 text-red-600">{{errors.current_password[0]}}</small>
            <label 
            v-else
            for="current-pass" 
            class="ps-2 text-gray-500 font-semibold">Current Password</label>
            <input 
            :type="inputType" 
            v-model="currentPass"
            :class="{'border-red-600': errors && errors.current_password}"
            class="input-two"
            id="current-pass">

            <small 
            v-if="errors && errors.new_password"
            class="ps-2 text-red-600">{{errors.new_password[0]}}</small>
            <label 
            v-else
            for="new-pass" 
            class="ps-2 text-gray-500 font-semibold">New Password</label>
            <input 
            :type="inputType" 
            v-model="newPass"
            :class="{'border-red-600': errors && errors.new_password}"
            class="input-two"
            id="new-pass">

            <label for="confirm-pass" class="ps-2 text-gray-500 font-semibold">Confirm New Password</label>
            <input 
            :type="inputType" 
            v-model="newConfirmPass"
            class="input-two"
            id="confirm-pass">

            <input 
            type="checkbox" 
            v-model="showPass"
            class="w-4 h-4"> show password

            <div class="flex mt-3">
                <!-- <button 
                class="px-3 py-2 me-2 bg-gray-600 text-white hover:bg-gray-500  
                rounded-md shadow-md shadow-gray-400 transition duration-150">Cancel</button> -->

                <button
                @click="passwordUpdate"
                class="blue-btn">Change Password</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ChangePassword',
    data() {
        return {
            currentPass: null,
            newPass: null,
            newConfirmPass: null,
            inputType: 'password',
            showPass: null,
            token: localStorage.getItem('access-token'),
            errors: null,
        }
    },
    computed: {
        config: function() {
            return { headers : {'Authorization' : `Bearer ${this.token}`} };
        },
        formData: function() {
            return {
                current_password: this.currentPass,
                new_password: this.newPass,
                new_password_confirmation: this.newConfirmPass,
            }
        },
    },
    mounted() {
        // .. 
    },
    methods: {
        passwordUpdate() {
            axios.post('http://127.0.0.1:8000/api/user/password/update', this.formData, this.config)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
                this.errors = error.response.data.errors
            })
        }
    },
    watch: {
        showPass(value) {
            this.showPass = value
            value ? this.inputType = 'text' : this.inputType = 'password'
        }
    }
}
</script>