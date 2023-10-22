<template>
    <div>
        <h1 class="text-3xl text-gray-600">Payment</h1>
        <h2 class="text-xl text-gray-600 mt-1 mb-4">Payment/ List</h2>
        <div class="overflow-x-scroll">
            <table class="table-auto w-[1200px] xl:w-full border border-gray-300">
                <thead class="h-10 bg-gray-300">
                    <tr>
                        <th>No</th>
                        <th>Payment Type</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(payment, index) in payments" :key="index" class="text-center">
                        <td>{{index+1}}</td>
                        <td>{{payment.payment_type}}</td>
                        <td>{{payment.created_at}}</td>
                        <td>
                            <p class="py-1 rounded-full"
                             :class="{
                                'bg-blue-200':payment.status==='pending',
                                'bg-green-200':payment.status==='verified',
                                'bg-red-200':payment.status==='rejected',
                            }">
                                {{payment.status}}
                            </p>
                        </td>
                        <td>
                            <button type="button"
                            class="green-btn mb-1 me-2"
                            @click="acceptPayment(payment.id)">Verify</button>
                            <button type="button"
                            class="yellow-btn mb-1 me-2"
                            @click="rejectPayment(payment.id)">Reject</button>
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
        @changepage="fetchPayment"/>
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
            payments: null,
            pagination: false,
            paginationData: null,
        }
    },
    created() {
        this.fetchPayment()
    },
    methods: {
        fetchPayment(page) {
            apiServiceWithAuth.get('/api/admin/payment/list?page' + page)
            .then(resp => {
                console.log(resp)
                this.pagination = true;
                this.paginationData = resp.data;
                this.payments = resp.data.data;
            })
            .catch(err => console.log(err))
        },
        acceptPayment(id) {
            apiServiceWithAuth.get('/api/admin/payment/'+id+'/verify')
            .then(resp => {
                this.fetchPayment();
                this.$toasted.show(resp.data.message, {
                    className: ["alert-con", "!bg-green-500"]
                });
            })
            .catch(err => console.log(err))
        },
        rejectPayment(id) {
            apiServiceWithAuth.get('/api/admin/payment/'+id+'/reject')
            .then(resp => {
                this.fetchPayment();
                this.$toasted.show(resp.data.message, {
                    className: ["alert-con", "!bg-green-500"]
                });
            })
            .catch(err => console.log(err))
        }
    }
}
</script>