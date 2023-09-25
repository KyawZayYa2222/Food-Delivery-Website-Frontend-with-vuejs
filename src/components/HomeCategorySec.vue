<template>
    <div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl mx-auto w-fit text-gray-900">Our Categories</h1>
        <div class="w-fit grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mx-auto mt-10">
            <div v-for="category in categories" :key="category.id"
            class="w-64 bg-gray-100 text-center p-2 rounded-xl">
                <div class="w-56 h-56">
                    <img :src="category.image" class="w-full">
                </div>
                <h3 class="text-lg">{{category.name}}</h3>
                <h4 class="">{{category.product_count}} Products</h4>
            </div>
        </div>
    </div>
</template>

<script>
import { apiService } from '@/apiService'

export default {
    name: 'HomeCategorySection',
    data() {
        return {
            categories: null,
        }
    },
    created() {
        this.fetchCategory()
    },
    methods: {
        fetchCategory() {
            let vm = this;
            apiService.get('/api/category/list')
            .then(resp => {
                vm.categories = resp.data;
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>