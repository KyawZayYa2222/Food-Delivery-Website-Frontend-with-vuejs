<template>
    <div>
        <nav-bar></nav-bar>

        <div class="w-full pt-20 min-h-screen">
            <h2 class="text-3xl text-gray-800 text-center mb-5">Food Collection</h2>
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4 px-3">
                <!-- collection  -->
                <div class="md:col-span-3">
                    <div 
                    v-for="(item, index) in cartItems" :key="index"
                    class="flex w-full mb-2 lg:w-[600px] border border-gray-400 ms-auto rounded-md overflow-hidden">
                        <figure class="bg-gray-200 w-44 sm:w-64">
                            <img :src="item.image" class="w-28 sm:w-36 mx-auto">
                        </figure>
                        <div class="w-full px-3 py-2 flex flex-col justify-between">
                            <h3 class="text-xl font-semibold">{{item.name}}</h3>
                            <h3 class="text-lg">Price: {{item.price}}</h3>

                            <div class="flex justify-between">
                                <div class="flex">
                                    <h3 class="text-lg me-2">Quantity:</h3>
                                    <div class="flex items-center border-2 border-gray-400 rounded-md overflow-hidden">
                                        <button @click="decreaseCount(item.id)" class="bg-gray-400 px-2 py-1 text-white hover:bg-gray-500">
                                            <i class="fa-solid fa-minus"></i>
                                        </button>
                                        <span class="px-3">{{item.product_count}}</span>
                                        <button @click="increaseCount(item.id)" class="bg-gray-400 px-2 py-1 text-white hover:bg-gray-500">
                                            <i class="fa-solid fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <button 
                                @click="removeItem(item.id)"
                                title="remove" 
                                class="bg-red-600 text-white px-2 py-1 rounded-md border border-red-600 hover:bg-red-700">
                                    <i class="fa-regular fa-trash-can"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Checkout  -->
                <payment-checkout v-if="payment" ref="payment" :totalItem="totalItem" @orderSubmitted="fetchCartItem"/>
            </div>
        </div>

        <footer-section></footer-section>
    </div>
</template>

<script>
import NavBar from '@/layout/NavBar.vue'
import FooterSection from '@/layout/FooterSection.vue'
// import { cartList } from '@/cartList.js'
import apiService from '@/apiService'
import PaymentCheckout from '@/components/PaymentCheckout.vue'


export default {
    name: 'CartPage',
    components: {
        NavBar,
        FooterSection,
        PaymentCheckout,
    },
    data() {
        return {
            cartItems: null,
            token: localStorage.getItem('access-token'),
            payment: false,
            totalItem: null,
        }
    },
    computed: {
        config: function() {
            return { headers : {'Authorization' : `Bearer ${this.token}`} };
        },
    },
    mounted() {
        this.fetchCartItem();
    },
    methods: {
        fetchCartItem() {
            apiService.get('/api/user/cart/list', this.config)
            .then(resp => {
                this.totalItem = resp.data.length
                this.cartItems = resp.data
                this.payment = true
            })
            .catch(err => {
                console.log(err)
            })
        },
        increaseCount(id) {
            apiService.post('api/user/cart/'+id+'/increasecount', null,this.config)
            .then(() => {
                this.fetchCartItem();
                this.$refs.payment.getTotalCost();
            })
        },
        decreaseCount(id) {
            apiService.post('api/user/cart/'+id+'/decreasecount', null, this.config)
            .then(() => {
                this.fetchCartItem();
                this.$refs.payment.getTotalCost();
            })
        },
        removeItem(id) {
            apiService.delete('/api/user/cart/'+id+'/remove', this.config)
            .then(response => {
                this.fetchCartItem();
                this.$refs.payment.getTotalCost();
                this.$toasted.show(response.data.message, {
                    className: ["alert-con", "!bg-red-500"]
                });
            })
        }
    },
    watch: {
        payment(value) {
            console.log(value)
        }
    }
}
</script>

<style>
.error-alert {
    color: black !important;
}
</style>