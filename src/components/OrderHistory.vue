<template>
    <div>
        <h1 class="text-2xl font-semibold mb-2">Order History</h1>
        <div class="relative"
        v-for="order in orders" :key="order.id">
            <div class="flex bg-gray-100 p-2 border border-gray-200">
                <div class="bg-gray-300">
                    <img :src="order.image" alt="..." class="w-48 sm:w-28">
                </div>
                <div class="w-full flex flex-col sm:flex-row justify-between text-gray-700 sm:items-center ms-2">
                    <div class="flex sm:block items-center">
                        <p class="ordh-hfont">Items:</p>
                        <p>{{order.name}}</p>
                    </div>
                    <div class="flex sm:block items-center">
                        <p class="ordh-hfont">Quantity:</p>
                        <p>{{order.product_count}}</p>
                    </div>
                    <div class="flex sm:block items-center">
                        <p class="ordh-hfont">Promotion:</p>
                        <p v-if="order.promotion_type==='discount'">{{order.discount}} discount</p>
                        <p v-else-if="order.promotion_type==='cashback'">{{order.cashback}} cashback</p>
                        <p v-else-if="order.promotion_type==='giveaway'">{{order.giveaway}} giveaway</p>
                        <p v-else>Null</p>
                    </div>
                    <div class="flex sm:block items-center">
                        <p class="ordh-hfont">Total:</p>
                        <p>{{order.total_cost}}</p>
                    </div>
                    <div class="flex sm:block items-center">
                        <p class="ordh-hfont">Date:</p>
                        <p>2/23/2023</p>
                    </div>
                </div>
            </div>
            <div v-if="order.status==='pending'" class="ordh-statsu bg-yellow-500">
                <p class="text-white text-xs">Pending</p>
            </div>
            <div v-else-if="order.status==='accepted'" class="ordh-statsu bg-green-500">
                <p class="text-white text-xs">Accepted</p>
            </div>
            <div v-else class="ordh-statsu bg-red-500">
                <p class="text-white text-xs">Rejected</p>
            </div>
        </div>
    </div>
</template>

<script>
import apiService from '@/apiService'

export default {
    name: 'OrderHistory',
    data() {
        return {
            orders: null,
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
            apiService.get('/api/user/order/list', this.config)
            .then(response => {
                console.log(response)
                this.orders = response.data;
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>