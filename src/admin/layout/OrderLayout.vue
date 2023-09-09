<template>
    <div>
        <h1 class="text-3xl text-gray-600">Order</h1>
        <h2 class="text-xl text-gray-600 mt-1 mb-4">Order/ List</h2>
        <div class="overflow-x-scroll">
            <table class="table-auto w-[1200px] xl:w-full border border-gray-300">
                <thead class="h-10 bg-gray-300">
                    <tr>
                        <th>No</th>
                        <th>Product Name</th>
                        <th>Product Count</th>
                        <th>Promotion</th>
                        <th>Customer Name</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th colspan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order, index) in orders" :key="index" class="text-center">
                        <td>{{index+1}}</td>
                        <td>{{order.product_name}}</td>
                        <td>{{order.product_count}}</td>
                        <td>{{order.promotion_type}}</td>
                        <td>{{order.user_name}}</td>
                        <td>{{order.location}}</td>
                        <td>{{order.status}}</td>
                        <td>
                            <button type="button"
                            class="green-btn mb-1">Accept</button>
                        </td>
                        <td>
                            <button type="button"
                            class="red-btn mb-1">Reject</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- paginator  -->
        <paginator-one 
        v-if="pagination" 
        :data="paginationData" 
        button-style="pagination-btn-blue"
        @changepage="fetchOrder"/>
    </div>
</template>

<script>
import apiService from '@/apiService'
import PaginatorOne from '../components/PaginatorOne.vue'

export default {
    name: 'OrderLayout',
    components: {
        PaginatorOne,
    },
    data() {
        return {
            orders: null,
            pagination: false,
            paginationData: null,
            token: localStorage.getItem('access-token'),
        }
    },
    mounted() {
        this.fetchOrder()
    },
    computed: {
        config: function() {
            return { headers : {'Authorization' : `Bearer ${this.token}`} }
        }
    },
    methods: {
        fetchOrder() {
            apiService.get('/api/admin/order/list', this.config)
            .then(response => {
                console.log(response)
                this.pagination = true;
                this.paginationData = response.data;
                this.orders = response.data.data;
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}
</script>