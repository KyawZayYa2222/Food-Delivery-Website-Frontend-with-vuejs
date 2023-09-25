<template>
    <div>
        <h2 class="text-xl mb-2">Recent Sales</h2>
        <table class="w-full text-center">
            <thead class="border-0 border-b">
                <th>No</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
            </thead>
            <tr v-for="(sale, index) in recentSales" :key="index"
            class="my-1 border-0 border-b">
                <td>{{index+1}}</td>
                <td>{{sale.product_name}}</td>
                <td>{{sale.product_count}}</td>
                <td>{{sale.total_cost}}</td>
                <td class="py-1">
                    <p class="py-2 rounded-full"
                     :class="{
                        'bg-blue-200':sale.status=='pending',
                        'bg-green-200':sale.status=='accepted',
                        'bg-red-200':sale.status=='rejected',
                    }">
                        {{sale.status}}
                    </p>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { apiServiceWithAuth } from '@/apiService'

export default {
    name: 'RecentSale',
    data() {
        return {
            recentSales: null,
        }
    },
    created() {
        this.getRecentSale()
    },
    methods: {
        getRecentSale() {
            apiServiceWithAuth.get('/api/admin/dashboard/recent-sales')
            .then(resp => this.recentSales=resp.data)
            .catch(err => console.log(err))
        }
    }
}
</script>