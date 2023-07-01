<template>
    <div class="w-full xl:w-[600px]">
        <h1 class="text-2xl font-semibold mb-2">Change Password</h1>
        <form @submit.prevent>
            <label for="current-pass" class="ps-2 text-gray-500 font-semibold">Current Password</label>
            <input 
            :type="inputType" 
            v-model="currentPass"
            class="w-full h-12 px-3 mb-3 border-2 border-gray-300 outline-2 outline-gray-500 rounded-md"
            id="current-pass">

            <label for="new-pass" class="ps-2 text-gray-500 font-semibold">New Password</label>
            <input 
            :type="inputType" 
            v-model="newPass"
            class="w-full h-12 px-3 mb-3 border-2 border-gray-300 outline-2 outline-gray-500 rounded-md"
            id="new-pass">

            <label for="confirm-pass" class="ps-2 text-gray-500 font-semibold">Confirm New Password</label>
            <input 
            :type="inputType" 
            v-model="newConfirmPass"
            class="w-full h-12 px-3 mb-3 border-2 border-gray-300 outline-2 outline-gray-500 rounded-md"
            id="confirm-pass">

            <input 
            type="checkbox" 
            v-model="showPass"
            class="w-4 h-4"> show password

            <div class="flex mt-3">
                <button 
                class="px-3 py-2 me-2 bg-gray-600 text-white hover:bg-gray-500  
                rounded-md shadow-md shadow-gray-400 transition duration-150">Cancel</button>

                <button
                class="px-3 py-2 bg-blue-700 text-white hover:bg-blue-600
                rounded-md shadow-md shadow-gray-400 transition duration-150">Change Password</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'ChangePassword',
    data() {
        return {
            currentPass: null,
            newPass: null,
            newConfirmPass: null,
            inputType: 'password',
            showPass: null,
        }
    },
    mounted() {
        // .. 
    },
    watch: {
        showPass(value) {
            this.showPass = value
            value ? this.inputType = 'text' : this.inputType = 'password'
        }
    }
}
</script>