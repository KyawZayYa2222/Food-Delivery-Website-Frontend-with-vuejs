<template>
    <div class="mt-3">
        <h2 class="text-xl text-gray-600 mb-1">Giveaway/ Create</h2>
        <form @submit.prevent="createGiveaway">
            <div class="text-green-600">
                <p 
                v-show="message"
                class="font-semibold mb-1"
                :class="{'text-red-600': error}">{{message}}</p>
            </div>

            <input 
            type="text"
            v-model="giveawayName"
            class="w-96 input-one shadow-md"
            placeholder="Giveaway Name"><br>
            <input type="file" @change="handleFileInput">

            <button type="submit" class="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white ms-2">Create</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'GiveawayCreateForm',
    data() {
        return {
            giveawayName: '',
            imageFile: null,
            error: false,
            message: null,
        }
    },
    methods: {
        handleFileInput(e) {
            this.imageFile = e.target.files[0];
        },
        createGiveaway() {
            const vm = this;
            const token = localStorage.getItem('access-token');
            const formData = new FormData();
            formData.append('name', this.giveawayName);
            formData.append('image', this.imageFile);

            axios.post('http://127.0.0.1:8000/api/admin/giveaway/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response)
                this.giveawayName = null;
                this.imageFile = null;
                vm.error = false;
                this.message = response.data.message;
                vm.$emit('addGiveaway');
            })
            .catch(error => {
                console.log(error)
                vm.error = true;
                error.response.status === 422 ? this.message = error.response.data.message : null;
            })
        }
    }
}
</script>