<template>
    <div>
        <page-loader v-if="isLoading"/>

        <nav-bar ref="nav"></nav-bar>

        <product-detail-modal 
        v-if="detailModal" 
        :product="detailProduct"
        @closeModal="detailModal=false"
        @addCart="addToCart"/>

        <div class="w-full min-h-screen px-3 pt-16">
            <search-menu @searchProduct="fetchProductBySearch"/>
            <h1 class="text-2xl text-center font-semibold my-2">Tasty Menu</h1>
            <!-- <button class="absolute end-0 me-2"><i class="fa-solid fa-list fa-beat fa-lg"></i></button> -->
            <category-con @fetchByCate="fetchProductByCate"/>
            
            <div class="container mx-auto xl:px-10 pt-6 pb-6 mt-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                    <div v-for="(product, index) in products" :key="index" class="mx-auto">
                        <div class="cursor-pointer relative">
                            <div @click="showDetail(product)" class="w-full max-w-[300px] sm:w-56 xl:w-64 mt-[50px] bg-white border-2
                            border-gray-300 shadow-lg rounded-xl hover:shadow-gray-300 hover:shadow-xl transition-all duration-100">
                                <img :src="product.image" alt="..." class="w-full mx-auto mt-[-70px]" title="image">
                                <h2 class="text-xl font-bold text-center text-gray-900">{{product.name}}</h2>
                                <p class="text-sm text-gray-500 px-2 mt-1 mb-2 line-clamp-2">{{product.short_desc}}</p>
                                <p class="text-lg font-bold text-gray-500 mb-1 px-2">{{product.price}}</p>
                            </div>
                            <button 
                            @click="addToCart(product.id)"
                            class="z-10 absolute bottom-2 right-2 bg-orange-600 text-white w-7 h-7 rounded-md 
                            hover:translate-y-[-2px] hover:shadow-md hover:shadow-orange-400 transition duration-150">
                                <i class="fa fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- paginator  -->
            <paginator-one 
            class="mb-2"
            v-if="pagination" 
            :data="paginationData"
            button-style="pagination-btn-orange"
            @changepage="fetchProduct"/>
        </div>

        <footer-section class="mt-10"></footer-section>
    </div>
</template>

<script>
import NavBar from '../layout/NavBar.vue'
import FooterSection from '../layout/FooterSection.vue'
import CategoryCon from '@/components/CategoryCon.vue'
import PaginatorOne from '@/admin/components/PaginatorOne.vue'
import SearchMenu from '@/components/SearchMenu.vue'
import ProductDetailModal from '@/components/ProductDetailModal.vue'
import {apiService, apiServiceWithAuth} from '@/apiService'
import PageLoader from '@/components/PageLoader.vue'


export default {
    name: 'MenuPage',
    components: { 
        NavBar,
        FooterSection,
        CategoryCon,
        PaginatorOne,
        SearchMenu,
        ProductDetailModal,
        PageLoader,
    },
    data() {
        return {
            searchKey: null,
            products: null,
            paginationData: null,
            pagination: false,
            detailModal: false,
            detailProduct: null,
            isLoading: false,
        }
    },
    created() {
        this.fetchProduct();
        this.toggleLoader();
    },
    methods: {
        toggleLoader() {
          this.isLoading = true;
          setTimeout(() => {
            this.isLoading = false;
          }, 2000);
        },
        fetchProduct(page) {
            let vm = this;
            apiService.get('/api/product/list?page=' + page)
            .then(resp => {
                this.products = resp.data.data;
                vm.pagination = true;
                vm.paginationData = resp.data;
            })
        },
        fetchProductByCate(resp) {
            this.products = resp.data.data;
            this.pagination = false;
        },
        fetchProductBySearch(resp) {
            this.products = resp.data.data;
            this.pagination = false;
        },
        showDetail(product) {
            this.detailModal = true;
            this.detailProduct = product;
        },
        addToCart(productId) {
            apiServiceWithAuth.post('/api/user/cart/create', {'product_id': productId})
            .then(resp => {
                this.$refs.nav.getItemCount();
                this.$toasted.show(resp.data.message, {
                    className: ["alert-con", "!bg-green-500"]
                });
            })
            .catch(error => {
                console.log(error);
            })
        },
    }
}
</script>

<style>
.custom-toast {
    font-size: 30px !important;
    padding: 10px !important;
}
</style>