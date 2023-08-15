<template>
    <div class="w-full xl:w-[600px]">
        <h1 class="text-2xl font-semibold mb-2">Profile Details</h1>
        <form @submit.prevent>
            <label for="name" class="ps-2 text-gray-500 font-semibold">Full Name</label>
            <input 
            id="name"
            v-model="name"
            class="input-two"
            type="text"
            placeholder="User Name">

            <label for="email" class="ps-2 text-gray-500 font-semibold">Email</label>
            <input 
            id="email"
            v-model="email"
            class="input-two"
            type="email"
            placeholder="user@gmail.com">

            <label for="phone" class="ps-2 text-gray-500 font-semibold">Phone</label>
            <input 
            id="phone"
            v-model="phone"
            class="input-two"
            type="text"
            placeholder="09463287664">

            <label for="address" class="ps-2 text-gray-500 font-semibold">Address</label>
            <input 
            id="address"
            v-model="address"
            class="input-two"
            type="text"
            placeholder="Street, Township">

            <label for="city" class="ps-2 text-gray-500 font-semibold">City</label>
            <input 
            id="city"
            v-model="city"
            class="input-two"
            type="text"
            placeholder="Living City">

            <div class="flex ms-auto mt-1 mb-3">
                <button 
                @click="cancelUpd"
                :disabled="formDisabled"
                :class="{'opacity-50': formDisabled}"
                class="gray-btn me-3">Cancel</button>
                <button 
                @click="update"
                :disabled="formDisabled"
                :class="{'opacity-50': formDisabled}"
                class="blue-btn">Save Changes</button>
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