<template>
    <div>
        <div class="flex justify-end">
            <router-link to="/admin/product/list" class="gray-btn me-4">Back to list</router-link>
        </div>

        <form @submit.prevent="submit" class="mt-2 flex flex-col">
        <!-- Choose Category -->
            <div class="md:flex">
                <div class="flex flex-col">
                    <h3 class="text-lg text-gray-700">Choose A Category</h3>
                    <small 
                    class="error-text" 
                    v-if="errors && errors.category_id">{{errors.category_id[0]}}</small>

                    <div class="md:w-96 w-full px-2 py-1 mb-3 border border-gray-700 rounded-md shadow-md">
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
                </div>

                <!-- Name  -->
                <div class="flex flex-col md:ms-5">
                    <label for="pro-name" class="text-gray-700 pt-1">Product Name</label>
                    <small 
                    class="error-text" 
                    v-if="errors && errors.name">{{errors.name[0]}}</small>
                    <input 
                    type="text"
                    v-model="productName"
                    id="pro-name"
                    class="md:w-96 w-full input-one"
                    placeholder="Pizza">

                <!-- Price  -->
                    <label for="price" class="text-gray-700">Price</label>
                    <small 
                    class="error-text" 
                    v-if="errors && errors.price">{{errors.price[0]}}</small>
                    <input 
                    type="number" 
                    v-model.number="price" 
                    id="price"
                    class="md:w-96 w-full input-one"
                    placeholder="2000">
                </div>
            </div>

        <!-- short description  -->
            <label for="short-desc" class="text-gray-700">Short Description</label>
            <small 
            class="error-text" 
            v-if="errors && errors.short_desc">{{errors.short_desc[0]}}</small>
            <input 
            type="text"
            v-model="shortDesc"
            id="short-desc"
            class="w-full md:w-[790px] input-one"
            placeholder="Sharp & short description">

        <!-- long description  -->
            <label for="long-desc" class="text-gray-700">Long Description</label>
            <small 
            class="error-text" 
            v-if="errors && errors.long_desc">{{errors.long_desc[0]}}</small>
            <textarea 
            rows="6"
            v-model="longDesc"
            class="w-full md:w-[790px] px-3 py-2 mb-3 bg-white border border-gray-500 outline-gray-500 rounded-md"
            placeholder="Long & perfect Description"></textarea>

        <!-- Insert promotion  -->
            <div class="mb-1">
                <div class="flex items-center">
                    <label for="checkbox" class="text-gray-800">Insert A Promotion</label>
                    <input type="checkbox" v-model="promotionChecked" id="checkbox" class="ms-10 w-4 h-4">
                </div>
            </div>
            <transition name="fade">
                <div v-if="promotionChecked" 
                class="md:w-96 w-full px-2 py-1 mb-1 border border-gray-700 rounded-md shadow-md">
                    <ul class="max-h-32 overflow-y-scroll">
                        <li 
                        v-for="promotion in promotions"
                        :key="promotion.id">
                            <input 
                            type="radio" 
                            :id="promotion.id" 
                            :value="promotion.id" 
                            v-model="selectedPromotion"> &nbsp;
                            <label :for="promotion.id" class="text-gray-700">
                                <span v-if="promotion.giveaway">{{promotion.giveaway.name}}</span>
                                <span v-else-if="promotion.discount">{{promotion.discount}}</span>
                                <span v-else>{{promotion.cashback}}</span>
                                <span class="text-gray-500 ms-2">({{promotion.promotion_type}})</span>
                            </label>
                        </li>
                    </ul>
                </div>
            </transition>

        <!-- image and submit  -->
            <div class="sm:flex w-full md:w-[790px] justify-between mt-3">
                <div>
                    <label for="pro-img" class="text-gray-700 mb-1">Insert product image</label><br>
                    <small 
                    class="error-text" 
                    v-if="errors && errors.image">{{errors.image[0]}}</small>
                    <input type="file" @change="handleFileInput">
                </div>
                <button 
                type="submit" 
                class="sm:w-fit w-full block blue-btn ms-2 mt-2">
                    {{method}}
                </button>
            </div>
        </form>
    </div>
</template>


<script>
import {apiService, apiServiceWithAuth} from '@/apiService'

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
            promotionChecked: false,
            promotions: null,
            selectedPromotion: null,
        }
    },
    created() {
        this.fetchCategory()
        this.fetchPromotion()
    },
    methods: {
        fetchCategory() {
            apiService.get('/api/category/list')
            .then(response => {
                this.categories = response.data
            })
            .catch(error => {
                console.log(error)
            })
        },
        fetchPromotion() {
            apiServiceWithAuth.get('/api/admin/promotion/list/active')
            .then(response => {
                this.promotions = response.data
            })
            .catch(error => {
                console.log(error)
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
            this.selectedPromotion != null ? formData.append('promotion_id', this.selectedPromotion) : null;

            this.$emit('submitForm',formData);
        }
    }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>