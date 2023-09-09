<template>
    <div class="md:col-span-2">
        <div class="w-full lg:w-96 border border-gray-400 rounded-md overflow-hidden">
            <h2 class="text-2xl px-3 py-1 bg-gray-300">Summary</h2>
            <div class="px-3">
                <div class="flex justify-between my-2">
                    <p class="text-gray-700">Total items: </p>
                    <p class="text-gray-900 font-semibold">{{totalItem}} items</p>
                </div>
                <div class="flex justify-between my-2">
                    <p class="text-gray-700">Total cost: </p>
                    <p class="text-gray-900 font-semibold">{{totalCost}}</p>
                </div>

                <p class="text-gray-700">Delivery Address</p>
                <input type="text" 
                v-model="deliveryAddress" 
                class="input-one w-full" 
                placeholder="Street, Township">

                <p class="text-gray-700">Choose payment</p>
                <div class="flex mb-2">
                    <div
                    v-for="(paymentType, index) in paymentTypes"
                    :key="index">
                        <input 
                        type="radio"
                        :value="paymentType.type"
                        v-model="payment"
                        class="hidden"
                        :id="paymentType.type">
                        <label
                        :for="paymentType.type" 
                        class="cursor-pointer text-4xl text-gray-700 transition duration-150 px-1"
                        :class="{'text-orange-600': payment==paymentType.type}">
                            <span v-html="paymentType.icon"></span>
                        </label>
                    </div>
                </div>
            </div>
            <button @click="paymentSubmit()" 
            class="w-full py-3 text-white bg-orange-600 hover:bg-orange-700 transition duration-150">Checkout Payment</button>
        </div>
    </div>
</template>

<script>
// import { cartList } from '@/cartList'
import apiService from '@/apiService'

export default {
    name: 'PaymentCheckout',
    props: ['totalItem'],
    data() {
        return {
            payment: 'paypal',
            // totalItem: null,
            totalCost: null,
            deliveryAddress: '',
            token: localStorage.getItem('access-token'),
            paymentTypes: [
                {
                    type: 'paypal',
                    icon: `<i class="fa-brands fa-cc-paypal"></i>`,
                },
                {
                    type: 'visa',
                    icon: `<i class="fa-brands fa-cc-visa"></i>`,
                },
                {
                    type: 'master',
                    icon: `<i class="fa-brands fa-cc-mastercard"></i>`,
                },
                {
                    type: 'stripe',
                    icon: `<i class="fa-brands fa-cc-stripe"></i>`,
                }
            ]
        }
    },
    mounted() {
        // this.getItemCount();
        this.getTotalCost();
    },
    computed: {
        config: function() {
            return { headers : {'Authorization' : `Bearer ${this.token}`} };
        },
    },
    methods: {
        getTotalCost() {
            apiService.get('/api/user/cart/total-cost', this.config)
            .then(response => {
                this.totalCost = response.data;
            })
        },
        paymentSubmit() {
            apiService.post('/api/user/order/create', {
                'payment_type': this.payment,
                'location': this.deliveryAddress
                }, this.config)
            .then(response => {
                console.log(response);
                this.$emit('orderSubmitted');
                this.$toasted.show(response.data.message, {
                    className: ["alert-con", "!bg-green-500"]
                });
            })
            .catch(error => {
                console.log(error)
                this.$toasted.show(error.response.data.message, {
                    className: ["alert-con", "!bg-red-500"]
                });
            })
        }
    }
}
</script>