<template>
    <div>
        <div class="relative container mx-auto">
            <ul align="center">
                <li
                v-for="category in categories"
                :key="category.id"
                class="inline-block">
                    <button 
                    @click="fetchProduct(category.id)"
                    class="flex items-center px-2 mx-1 border-2 border-gray-300
                    rounded-full overflow-hidden hover:bg-gray-200 transition-all duration-75">
                        <img :src="category.image" width="50px">
                        <p class="ps-1">{{category.name}}</p>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'CategoryCon',
    data() {
        return {
            categories: null,
        }
    },
    mounted() {
        this.fetchCategory();
    },
    methods: {
        fetchCategory() {
            axios.get('http://127.0.0.1:8000/api/category/list')
            .then(response => {
                this.categories = response.data;
            })
            .catch(error => {
                console.log(error);
            })
        },
        fetchProduct(categoryId) {
            let vm = this;
            axios.get('http://127.0.0.1:8000/api/product/list?category_id='+categoryId)
            .then(response => {
                vm.$emit('fetchByCate', response);
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>