<template>
    <div>
        <h1 class="text-3xl text-gray-600">Dashboard</h1>
        <div class="max-w-[1500px] mx-auto">
            <div class="grid md:grid-cols-3 gap-8 mt-5">
                <div v-for="(board, index) in boards" :key="index" :class="board.color"
                class="w-full h-56 mx-auto px-4 py-2 text-white rounded-md">
                    <div class="flex justify-between">
                        <div>
                            <h2 class="text-xl leading-tight">Total</h2>
                            <h2 class="text-4xl">{{board.name}}</h2>
                        </div>
                        <span class="text-4xl" v-html="board.icon"></span>
                    </div>
                    <div class="w-full mt-4 text-6xl font-semibold">
                        <h1 v-if="index==0">{{totalIncome}} Ks</h1>
                        <h1 v-if="index==1">{{totalOrder}}</h1>
                        <h1 v-if="index==2">{{totalProduct}}</h1>
                        <h1 v-if="index==3">{{totalRegister}}</h1>
                    </div>
                </div>

                <div class="md:col-span-2 w-full h-96">
                    <recent-sale/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { apiServiceWithAuth } from '@/apiService'
import RecentSale from '../components/RecentSale.vue'

export default {
    name: 'DashboardLayout',
    components: {
        RecentSale,
    },
    data() {
        return {
            totalIncome: null,
            totalProduct: null,
            totalOrder: null,
            totalRegister: null,
            boards: [
                {color: 'bg-orange-400', name: 'Income', icon: '<i class="fa-solid fa-sack-dollar"></i>'},
                {color: 'bg-red-400', name: 'Order', icon: '<i class="fa-solid fa-burger"></i>'},
                {color: 'bg-green-400', name: 'Product', icon: '<i class="fa-solid fa-pizza-slice"></i>'},
                {color: 'bg-gray-400', name: 'Register', icon: '<i class="fa-solid fa-users"></i>'},
            ]
        }
    },
    created() {
        this.getTotalIncome()
        this.getTotalProduct()
        this.getTotalOrder()
        this.getTotalRegister()
    },
    methods: {
        getTotalIncome() {
            apiServiceWithAuth.get('api/admin/dashboard/total-income')
            .then(resp => this.totalIncome = resp.data.totalIncome)
            .catch(err => console.log(err))
        },
        getTotalProduct() {
            apiServiceWithAuth.get('api/admin/dashboard/total-product')
            .then(resp => this.totalProduct = resp.data.totalProduct)
            .catch(err => console.log(err))
        },
        getTotalOrder() {
            apiServiceWithAuth.get('api/admin/dashboard/total-order')
            .then(resp => this.totalOrder = resp.data.totalOrder)
            .catch(err => console.log(err))
        },
        getTotalRegister() {
            apiServiceWithAuth.get('api/admin/dashboard/total-register')
            .then(resp => this.totalRegister = resp.data.totalRegister)
            .catch(err => console.log(err))
        }
    }
}
</script>