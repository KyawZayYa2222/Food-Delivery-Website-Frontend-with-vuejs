<template>
    <div>
        <h2 class="text-xl text-gray-600 mt-2">Product/ List</h2>

        <div class="w-full">
            <router-link 
            to="/admin/product/create"
            class="blue-btn mb-4 float-right">
                <i class="fa-solid fa-plus"></i> Create product
            </router-link>
        </div>

        <table class="table-auto w-full border border-gray-300">
            <thead class="h-10 bg-gray-300">
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Short Description</th>
                    <th>Long Description</th>
                    <!-- <th>Promotion</th> -->
                    <th colspan="2">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr 
                v-for="(product, index) in products"
                :key="index"
                class="text-center border-0 border-b">
                    <td>{{index+=1}}</td>
                    <td>{{product.name}}</td>
                    <td><img :src="product.image" alt="img" class="w-24 mx-auto"></td>
                    <td>{{product.price}}</td>
                    <td>
                        <div class="group/seemore inline-block text-gray-700">
                            <i class="group-hover/seemore:text-gray-600 text-xl pe-1 fa-solid fa-circle-info"></i>
                            <p class="text-popup-one group-hover/seemore:block">{{product.short_desc}}</p>
                            <p class="inline-block w-72 truncate">{{product.short_desc}}</p>
                        </div>
                    </td>
                    <td>
                        <div class="group/seemore inline-block text-gray-700">
                            <i class="group-hover/seemore:text-gray-600 text-xl pe-1 fa-solid fa-circle-info"></i>
                            <p class="text-popup-one group-hover/seemore:block">{{product.long_desc}}</p>
                            <p class="inline-block w-72 truncate">{{product.long_desc}}</p>
                        </div>
                    </td>
                    <!-- <td>
                        <p v-if="product.promotion">
                            <p v-if="product.promotion.promotion_type==='discount'">{{product.promotion.discount}}</p>
                            <p v-else-if="product.promotion.promotion_type==='cashback'">{{product.promotion.cashback}}</p>
                            <p v-else>{{product.promotion.giveaway}}</p>
                        </p>
                        <p v-else class="text-gray-500 font-semibold">Null</p>
                    </td> -->
                    <td>
                        <router-link 
                        :to="product.id+'/update'" 
                        type="button"
                        class="blue-btn">Edit</router-link>
                    </td>
                    <td>
                        <button
                        @click="deleteProduct(product.id)"
                        class="red-btn">delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- paginator  -->
        <paginator-one 
        v-if="pagination" 
        :data="paginationData" 
        button-style="pagination-btn-blue"
        @changepage="fetchProduct"/>
    </div>
</template>

<script>
import PaginatorOne from '../components/PaginatorOne.vue'
import {apiService, apiServiceWithAuth} from '@/apiService'

export default {
    name: 'ProductList',
    components: {
        PaginatorOne
    },
    data() {
        return {
            products:null,
            paginationData: null,
            pagination: false,
        }
    },
    created() {
        this.fetchProduct()
    },
    methods: {
        fetchProduct(page=1) {
            let vm = this;
            apiService.get('/api/product/list?' + page)
            .then(resp => {
                console.log(resp)
                vm.products = resp.data.data;
                vm.pagination = true;
                vm.paginationData = resp.data;
            })
            .catch(err => console.log(err))
            .finally(() => {
                console.log('finished')
            })
        },
        deleteProduct(id) {
            apiServiceWithAuth.delete('/api/admin/product/'+id+'/delete')
            .then(resp => {
                console.log(resp)
                this.fetchProduct()
            })
            .catch(err => console.log(err))
        }
    }
}
</script>