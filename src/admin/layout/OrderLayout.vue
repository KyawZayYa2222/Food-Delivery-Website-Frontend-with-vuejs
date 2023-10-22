<template>
    <div>
        <h1 class="text-3xl text-gray-600">Order</h1>
        <h2 class="text-xl text-gray-600 mt-1 mb-4">Order/ List</h2>
        <div class="overflow-x-scroll">
            <table class="table-auto w-[1200px] xl:w-full border border-gray-300">
                <thead class="h-10 bg-gray-300">
                    <tr>
                        <th>No</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Promotion</th>
                        <th>Total</th>
                        <th>Customer</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order, index) in orders" :key="index" class="text-center">
                        <td>{{index+1}}</td>
                        <td>{{order.product_name}}</td>
                        <td>{{order.product_count}}</td>
                        <td>
                            <p v-if="order.promotion_type === 'discount'">{{order.discount}}</p>
                            <p v-else-if="order.promotion_type === 'cashback'">{{order.cashback}}</p>
                            <p v-else>{{order.giveaway_name}}</p>
                        </td>
                        <td>{{order.total_cost}}</td>
                        <td>{{order.user_name}}</td>
                        <td>{{order.location}}</td>
                        <td>
                            <p class="py-1 rounded-full"
                             :class="{
                                'bg-blue-200':order.status=='pending',
                                'bg-green-200':order.status=='accepted',
                                'bg-red-200':order.status=='rejected',
                            }">
                                {{order.status}}
                            </p>
                        </td>
                        <td>
                            <button type="button"
                            class="green-btn mb-1 me-2"
                            @click="acceptOrder(order.id)">Accept</button>
                            <button type="button"
                            class="yellow-btn mb-1 me-2"
                            @click="rejectOrder(order.id)">Reject</button>
                            <button type="button"
                            class="red-btn mb-1"
                            @click="deleteOrder(order.id)">Delete</button>
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
import {apiServiceWithAuth} from '@/apiService'
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
        }
    },
    created() {
        this.fetchOrder()
    },
    methods: {
        fetchOrder(page) {
            apiServiceWithAuth.get('/api/admin/order/list?page=' + page)
            .then(resp => {
                console.log(resp)
                this.pagination = true;
                this.paginationData = resp.data;
                this.orders = resp.data.data;
            })
            .catch(err => console.log(err))
        },
        acceptOrder(id) {
            apiServiceWithAuth.put('/api/admin/order/'+id+'/accept')
            .then(resp => {
                this.fetchOrder();
                this.$toasted.show(resp.data.message, {
                    className: ["alert-con", "!bg-green-500"]
                });
            })
            .catch(err => console.log(err))
        },
        rejectOrder(id) {
            apiServiceWithAuth.put('/api/admin/order/'+id+'/reject')
            .then(resp => {
                this.fetchOrder();
                this.$toasted.show(resp.data.message, {
                    className: ["alert-con", "!bg-green-500"]
                });
            })
            .catch(err => console.log(err))
        },
        deleteOrder(id) {
            apiServiceWithAuth.put('/api/admin/order/'+id+'/delete')
            .then(resp => {
                this.fetchOrder();
                this.$toasted.show(resp.data.message, {
                    className: ["alert-con", "!bg-red-500"]
                });
            })
            .catch(err => console.log(err))
        }
    }
}
</script>