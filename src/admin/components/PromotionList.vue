<template>
    <div>
        <h2 class="text-xl text-gray-600 mt-2">Promotion/ List</h2>

        <div class="w-full">
            <router-link 
            to="/admin/promotion/create"
            class="blue-btn mb-3 float-right">
                <i class="fa-solid fa-plus"></i> Create promotion
            </router-link>
        </div>

        <!-- promotion fetching  -->
        <table class="table-auto w-full border border-gray-300 mt-4">
            <thead class="bg-gray-300 h-14">
                <tr>
                    <th>No.</th>
                    <th>Promotion Type</th>
                    <th>Promotion</th>
                    <th>Active</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th colspan="2">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-gray-200">
                <tr 
                v-for="(promotion, index) in promotions"
                :key="promotion.id"
                class="text-center border-0 border-b-2 border-gray-300">
                    <td>{{index+1}}</td>
                    <td>{{promotion.promotion_type}}</td>
                    <td v-if="promotion.cashback!=null">{{promotion.cashback}}</td>
                    <td v-else-if="promotion.discount!=null">{{promotion.discount}}</td>
                    <td v-else>{{promotion.giveaway.name}}</td>
                    <td>
                        <div v-if="promotion.active" class="status-active"></div>
                        <div v-else class="status-unactive"></div>
                    </td>
                    <td>{{promotion.start_date}}</td>
                    <td>{{promotion.end_date}}</td>
                    <td>
                        <router-link 
                        :to="promotion.id+'/update'" 
                        type="button"
                        class="blue-btn">update</router-link>
                    </td>
                    <td>
                        <button 
                        @click="deletePromotion(promotion.id)"
                        class="red-btn">
                            delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- paginator  -->
        <paginator-one 
        v-if="pagination" 
        :data="paginationData" 
        button-style="pagination-btn-blue"
        @changepage="fetchPromotion"/>
    </div>
</template>


<script>
import {apiServiceWithAuth} from '@/apiService'
import PaginatorOne from '../components/PaginatorOne.vue'

export default {
    name: 'PromotionList',
    components: {
        PaginatorOne
    },
    data() {
        return {
            promotions: null,
            message: null,
            paginationData: null,
            pagination: false,
        }
    },
    created() {
        this.fetchPromotion()
    },
    methods: {
        fetchPromotion(page=1) {
            let vm = this;
            apiServiceWithAuth.get('/api/admin/promotion/list/all?' + page)
            .then(response => {
                vm.promotions = response.data.data;
                vm.pagination = true;
                vm.paginationData = response.data;
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                // console.log('finished')
            })
        },
        
        deletePromotion(id) {
            apiServiceWithAuth.delete('/api/admin/promotion/'+id+'/delete')
            .then(() => {
                this.fetchPromotion()
            })
            .catch(error => {
                console.log(error)
            })
        },
    }
}
</script>