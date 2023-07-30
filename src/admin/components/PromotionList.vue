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
                    <th>Status</th>
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
                    <td>{{promotion.discount}}</td>
                    <td>
                        <div v-if="promotion.active" class="w-4 h-4 mx-auto rounded-full bg-green-700 border-4 border-green-600"></div>
                        <div v-else class="w-4 h-4 mx-auto rounded-full bg-red-700 border-4 border-red-600"></div>
                    </td>
                    <td>{{promotion.start_date}}</td>
                    <td>{{promotion.end_date}}</td>
                    <td>
                        <button 
                        @click="showUpdFormModal(promotion)"
                        class="bg-blue-600 text-white px-3 py-2 rounded-md border border-blue-600 hover:bg-blue-700">
                            update
                        </button>
                    </td>
                    <td>
                        <button 
                        @click="deletePromotion(promotion.id)"
                        class="bg-red-600 text-white px-3 py-2 rounded-md border border-red-600 hover:bg-red-700">
                            delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
import axios from 'axios'

export default {
    name: 'PromotionList',
    data() {
        return {
            promotions: null,
        }
    },
    mounted() {
        this.fetchPromotion()
    },
    methods: {
        fetchPromotion(page=1) {
            let vm = this;
            const token = localStorage.getItem('access-token');
            let config = { headers : {'Authorization' : `Bearer ${token}`} };

            axios.get('http://127.0.0.1:8000/api/admin/promotion/list?' + page, config)
            .then(response => {
                vm.promotions = response.data.data;
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                console.log('finished')
            })
        },
        
        deletePromotion() {

        },

        showUpdFormModal() {

        }
    }
}
</script>