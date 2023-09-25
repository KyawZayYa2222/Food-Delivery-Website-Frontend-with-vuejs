<template>
    <div>
        <div class="w-full xl:w-2/3 px-3">
            <div 
            v-if="successMesg"
            class="bg-green-200 py-3 px-1 w-full text-center rounded-md mb-3">
            Your message sent successfully.
            <button @click="successMesg=false" class="pe-2 float-right"><i class="fa-solid fa-xmark"></i></button>
            </div>

            <form @submit.prevent="createContact">
                <small 
                v-if="errors && errors.name"
                class="text-red-600 font-semibold">{{errors.name[0]}}</small>
                <input type="text"
                v-model="name" 
                :class="{'border-red-600':errors&&errors.name}"
                class="w-full h-14 px-3 mb-4 border-2 border-gray-400 outline-2 outline-gray-600 rounded-md"
                placeholder="Your Name">

                <small 
                v-if="errors && errors.email"
                class="text-red-600 font-semibold">{{errors.email[0]}}</small>
                <input type="text"
                v-model="email" 
                :class="{'border-red-600':errors&&errors.email}"
                class="w-full h-14 px-3 mb-4 border-2 border-gray-400 outline-2 outline-gray-600 rounded-md"
                placeholder="Your Email">

                <small 
                v-if="errors && errors.message"
                class="text-red-600 font-semibold">{{errors.message[0]}}</small>
                <textarea 
                v-model="message" 
                :class="{'border-red-600':errors&&errors.message}"
                class="w-full h-40 px-3 py-2 mb-4 border-2 border-gray-400 outline-2 outline-gray-600 rounded-md"
                placeholder="Message"></textarea>

                <button 
                type="submit" 
                class="text-white bg-orange-600 px-8 py-3 rounded-md hover:bg-orange-700 transition delay-75 duration-150">Send</button>
            </form>
        </div>
    </div>
</template>

<script>
import {apiService} from '@/apiService'

export default {
    name: 'ContactForm',
    data() {
        return {
            name: null,
            email: null,
            message: null,
            errors: null,
            successMesg: false,
        }
    },
    computed: {
        formData: function () {
            return {
                name: this.name,
                email: this.email,
                message: this.message
            }
        }
    },
    methods: {
        createContact() {
            apiService.post('/api/contact/create', this.formData)
            .then(response => {
                this.successMesg = true
                console.log(response)
            })
            .catch(error => {
                console.log(error)
                this.errors = error.response.data.errors;
            })
        }
    }
}
</script>