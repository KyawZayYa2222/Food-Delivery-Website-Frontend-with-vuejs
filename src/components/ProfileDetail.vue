<template>
    <div class="w-full xl:w-[600px]">
        <h1 class="text-2xl font-semibold mb-2">Profile Details</h1>
        <form @submit.prevent>
            <label for="name" class="ps-2 text-gray-500 font-semibold">Full Name</label>
            <input 
            id="name"
            v-model="name"
            class="w-full h-12 px-3 mb-3 border-2 border-gray-300 outline-2 outline-gray-500 rounded-md"
            type="text"
            placeholder="User Name">

            <label for="email" class="ps-2 text-gray-500 font-semibold">Email</label>
            <input 
            id="email"
            v-model="email"
            class="w-full h-12 px-3 mb-3 border-2 border-gray-300 outline-2 outline-gray-500 rounded-md"
            type="email"
            placeholder="user@gmail.com">

            <label for="phone" class="ps-2 text-gray-500 font-semibold">Phone</label>
            <input 
            id="phone"
            v-model="phone"
            class="w-full h-12 px-3 mb-3 border-2 border-gray-300 outline-2 outline-gray-500 rounded-md"
            type="text"
            placeholder="09463287664">

            <label for="address" class="ps-2 text-gray-500 font-semibold">Address</label>
            <input 
            id="address"
            v-model="address"
            class="w-full h-12 px-3 mb-3 border-2 border-gray-300 outline-2 outline-gray-500 rounded-md"
            type="text"
            placeholder="Street, Township">

            <label for="city" class="ps-2 text-gray-500 font-semibold">City</label>
            <input 
            id="city"
            v-model="city"
            class="w-full h-12 px-3 mb-3 border-2 border-gray-300 outline-2 outline-gray-500 rounded-md"
            type="text"
            placeholder="Living City">

            <div class="flex ms-auto mt-1 mb-3">
                <button 
                @click="cancelUpd"
                :disabled="formDisabled"
                :class="{'opacity-50': formDisabled}"
                class="px-3 py-2 me-2 bg-gray-600 text-white hover:bg-gray-500  
                rounded-md shadow-md shadow-gray-400 transition duration-150">Cancel</button>
                <button 
                @click="update"
                :disabled="formDisabled"
                :class="{'opacity-50': formDisabled}"
                class="px-3 py-2 bg-blue-700 text-white hover:bg-blue-600
                rounded-md shadow-md shadow-gray-400 transition duration-150">Save Changes</button>
            </div>
        </form>
    </div>
</template>


<script>
export default {
    name: 'ProfileDetail',
    data() {
        return {
            name: 'Htet Htet Linn Latt',
            email: 'htethtet@gmail.com',
            phone: '095473629762',
            address: 'Hleden, Kamayut Township',
            city: 'Yangon',
            formDisabled: true,
        }
    },
    methods: {
        updateProfile() {
            console.log('update')
        },
        cancelUpd() {
            console.log('cancel')
        },
        update() {
            console.log('update')
        },
        formEnable() {
            this.formDisabled = false;
        }
    },
    computed: {
        formData() {
            return {
                name: this.name,
                email: this.email,
                phone: this.phone,
                address: this.address,
                city: this.city,
            }
        }
    },
    watch: {
        formData: {
            handler() {
                this.formEnable()
            },
            deep: true,
        }
    }
}
</script>