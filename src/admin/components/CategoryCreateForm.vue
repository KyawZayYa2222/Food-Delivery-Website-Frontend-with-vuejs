<template>
    <div class="mt-1">
        <h2 class="text-lg text-gray-600 mb-1">Category/ Create</h2>
        <form @submit.prevent="createCategory">
            <div class="text-green-600">
                <p 
                v-show="message"
                class="font-semibold mb-1"
                :class="{'text-red-600': error}">{{message}}</p>
            </div>

            <input 
            type="text"
            id="name-input"
            v-model="categoryName"
            class="w-96 input-one shadow-md"
            placeholder="Category Name"><br>
            <input type="file" @change="handleFileInput">

            <button type="submit" class="blue-btn inline-block ms-2">Create</button>
        </form>
    </div>
</template>

<script>
import {apiServiceWithAuth} from '@/apiService'

export default {
    name: 'CategoryCreateForm',
    data() {
        return {
            categoryName: null,
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
            const formData = new FormData();
            this.categoryName != null ? formData.append('name', this.categoryName) : null;
            this.imageFile != null ? formData.append('image', this.imageFile) : null;

            apiServiceWithAuth.post('/api/admin/category/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
                error.response.status === 422 ? this.message = error.response.data.message : null;
            })
        }
    }
}
</script>