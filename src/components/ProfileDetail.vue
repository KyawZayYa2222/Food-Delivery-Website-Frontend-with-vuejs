<template>
    <div class="w-full xl:w-[600px]">
        <h1 class="text-2xl font-semibold mb-2">Profile Details</h1>
        <form @submit.prevent>
            <label for="name" class="ps-2 text-gray-500 font-semibold">Full Name</label>
            <input 
            id="name"
            v-model="name"
            :class="{'border-red-600': errors && errors.name}"
            class="input-two"
            type="text"
            placeholder="User Name">

            <label for="email" class="ps-2 text-gray-500 font-semibold">Email</label>
            <input 
            id="email"
            v-model="email"
            :class="{'border-red-600': errors && errors.email}"
            class="input-two"
            type="email"
            placeholder="user@gmail.com">

            <label for="phone" class="ps-2 text-gray-500 font-semibold">Phone</label>
            <input 
            id="phone"
            v-model="phone"
            :class="{'border-red-600': errors && errors.phone}"
            class="input-two"
            type="text"
            placeholder="Fill your phone number">

            <label for="address" class="ps-2 text-gray-500 font-semibold">Address</label>
            <input 
            id="address"
            v-model="address"
            :class="{'border-red-600': errors && errors.address}"
            class="input-two"
            type="text"
            placeholder="Fill your address">

            <!-- <div class="flex ms-auto mt-1 mb-3">
                <button 
                @click="cancelUpd"
                class="gray-btn me-3">Cancel</button>
                <button 
                @click="update"
                class="blue-btn">Save Changes</button>
            </div> -->
            <button 
            @click="update"
            class="blue-btn float-right mt-1">Save Changes</button>
        </form>
    </div>
</template>


<script>
import {apiServiceWithAuth} from '@/apiService'

export default {
    name: 'ProfileDetail',
    data() {
        return {
            name: '',
            email: '',
            phone: '',
            address: '',
            errors: null,
            // formDisabled: true,
        }
    },
    computed: {
        formData() {
            return {
                name: this.name,
                email: this.email,
                phone: this.phone,
                address: this.address,
            }
        }
    },
    created() {
        this.getUserData();
    },
    methods: {
        getUserData() {
            apiServiceWithAuth.get('/api/user/details')
            .then(response => {
                console.log(response)
                this.name = response.data.name
                this.email = response.data.email
                this.phone = response.data.phone
                this.address = response.data.address
                this.image = response.data.image
            })
            .catch(error => {
                console.log(error)
            })
        },
        // updateProfile() {
        //     console.log('update')
        // },
        cancelUpd() {
            console.log('cancel')
        },
        update() {
            apiServiceWithAuth.put('/api/user/profile-info/update', this.formData)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
                this.errors = error.response.data.errors
            })
        },
        // formEnable() {
        //     this.formDisabled = false;
        // }
    },
    // watch: {
    //     formData: {
    //         handler() {
    //             this.formEnable()
    //         },
    //         deep: true,
    //     }
    // }
}
</script>