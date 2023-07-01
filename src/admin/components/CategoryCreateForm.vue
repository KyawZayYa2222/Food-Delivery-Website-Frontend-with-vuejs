<template>
    <div class="mt-3">
        <form @submit.prevent="createCategory">
            <div class="text-green-600">
                <p 
                v-show="message"
                class="font-semibold mb-1"
                :class="{'text-red-600': error}">{{message}}</p>
            </div>

            <input 
            type="text"
            v-model="categoryName"
            class="w-96 h-10 px-3 mb-3 bg-white border border-gray-400 outline-gray-500 rounded-md shadow-md"
            placeholder="Category"><br>
            <input type="file" @change="handleFileInput">

            <button type="submit" class="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white ms-2">Create</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CategoryCreateForm',
    data() {
        return {
            categoryName: '',
            imageFile: null,
            error: false,
            message: null,
        }
    },
    methods: {
        handleFileInput(e) {
            this.imageFile = e.target.files[0];
        },
        createCategory() {
            const vm = this;
            const token = localStorage.getItem('access-token');
            const formData = new FormData();
            formData.append('name', this.categoryName);
            formData.append('image', this.imageFile);

            axios.post('http://127.0.0.1:8000/api/category/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                this.categoryName = null;
                this.imageFile = null;
                vm.error = false;
                this.message = response.data.message;
                vm.$emit('addCategory');
            })
            .catch(error => {
                vm.error = true;
                console.log(this.error)
                error.response.status === 422 ? this.message = error.response.data.message : null;
            })
            .finally(() => {
                console.log('finished')
            })
        }
    }
}
</script>