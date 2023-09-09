<template>
    <div>
        <form @submit.prevent="searchProduct">
            <div class="w-full sm:w-fit sm:ms-10 flex border-2 border-gray-300 rounded-md focus-within:shadow-md transition delay-75 duration-200">
                <input 
                type="text" 
                v-model="searchKey"
                class="w-full sm:w-96 h-10 rounded-s-md outline-none px-3"
                placeholder="search . .">
                <button class="text-orange-600 text-lg px-2 rounded-e-md" type="submit">
                    <i class="fa fa-solid fa-search"></i>
                </button>
            </div>
        </form>
    </div>
</template>


<script>
import apiService from '@/apiService';

export default {
    name: 'SearchMenu',
    data() {
        return {
            searchKey: null,
        }
    },
    methods: {
        searchProduct() {
            let vm = this;
            apiService.get('/api/product/list?search='+this.searchKey)
            .then(response => {
                vm.$emit('searchProduct', response);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}
</script>