<template>
    <div>
        <router-link to="/admin/product/list" class="gray-btn float-right me-4">Back to list</router-link>

        <form @submit.prevent="submit" class="mt-5 flex flex-col w-[600px]">
            <h3 class="text-lg text-gray-700">Choose A Category</h3>

            <small 
            class="text-red-600 font-semibold" 
            v-if="errors && errors.category_id">{{errors.category_id[0]}}</small>

            <div class="w-80 px-2 py-1 mb-3 border border-gray-700 rounded-md shadow-md">
                <ul class="max-h-32 overflow-y-scroll">
                    <li 
                    v-for="category in categories"
                    :key="category.id">
                        <input 
                        type="radio" 
                        :id="category.name" 
                        :value="category.id" 
                        v-model="selectedCategory"> &nbsp;
                        <label :for="category.name" class="text-gray-700">{{category.name}}</label>
                    </li>
                </ul>
            </div>

            <label for="pro-name" class="text-gray-700">Product Name</label>
            <small 
            class="text-red-600 font-semibold" 
            v-if="errors && errors.name">{{errors.name[0]}}</small>
            <input 
            type="text"
            v-model="productName"
            id="pro-name"
            class="w-80 input-one"
            placeholder="Pizza">

            <label for="price" class="text-gray-700">Price</label>
            <small 
            class="text-red-600 font-semibold" 
            v-if="errors && errors.price">{{errors.price[0]}}</small>
            <input 
            type="number" 
            v-model.number="price" 
            id="price"
            class="w-80 input-one"
            placeholder="20">

            <label for="short-desc" class="text-gray-700">Short Description</label>
            <small 
            class="text-red-600 font-semibold" 
            v-if="errors && errors.short_desc">{{errors.short_desc[0]}}</small>
            <input 
            type="text"
            v-model="shortDesc"
            id="short-desc"
            class="w-full input-one"
            placeholder="Sharp & short description">

            <label for="long-desc" class="text-gray-700">Long Description</label>
            <small 
            class="text-red-600 font-semibold" 
            v-if="errors && errors.long_desc">{{errors.long_desc[0]}}</small>
            <textarea 
            rows="6"
            v-model="longDesc"
            class="w-full px-3 py-2 mb-3 bg-white border border-gray-500 outline-gray-500 rounded-md"
            placeholder="Long & perfect Description"></textarea>

            <div>
                <label for="pro-img" class="text-gray-700 mb-1">Insert product image</label><br>
                <small 
                class="text-red-600 font-semibold" 
                v-if="errors && errors.image">{{errors.image[0]}}</small>
                <input type="file" @change="handleFileInput">
                <button 
                type="submit" 
                class="w-fit inline-block blue-btn ms-2">
                    {{method}}
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ProductCUForm',
    props: [
        'method',
        'errors'
    ],
    data() {
        return {
            categories: null,
            productName: null,
            price: null,
            shortDesc: null,
            longDesc: null,
            productImg: null,
            selectedCategory: null,
            category: null,
        }
    },
    computed: {

    },
    mounted() {
        this.fetchCategory()
    },
    methods: {
        fetchCategory() {
            axios.get('http://127.0.0.1:8000/api/category/list')
            .then(response => {
                this.categories = response.data
            })
        },
        handleFileInput(e) {
            this.productImg = e.target.files[0];    
        },
        submit() {
            let formData = new FormData;
            this.productName != null ? formData.append('name', this.productName) : null;
            this.price != null ? formData.append('price', this.price) : null;
            this.productImg != null ? formData.append('image', this.productImg): null;
            this.shortDesc != null ? formData.append('short_desc', this.shortDesc) : null;
            this.longDesc != null ? formData.append('long_desc', this.longDesc) : null;
            this.selectedCategory != null ? formData.append('category_id', this.selectedCategory) : null;

            this.$emit('submitForm',formData);
        }
    }
}
</script>