<template>
    <div>
        <nav-bar></nav-bar>

        <div class="w-full pt-20 min-h-screen">
            <h2 class="text-3xl text-gray-800 text-center mb-5">Food Collection</h2>
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4 px-3">
                <!-- collection  -->
                <div class="md:col-span-3">
                    <div class="flex w-full mb-2 lg:w-[600px] border border-gray-400 ms-auto rounded-md overflow-hidden">
                        <figure class="bg-gray-200 w-44 sm:w-64">
                            <img src="@/assets/img/burger-img.png" class="w-28 sm:w-36 mx-auto">
                        </figure>
                        <div class="w-full px-3 py-2 flex flex-col justify-between">
                            <h3 class="text-xl font-semibold">Huge delicious burger</h3>
                            <h3 class="text-lg">Price: $20</h3>

                            <div class="flex justify-between">
                                <div class="flex">
                                    <h3 class="text-lg me-2">Quantity:</h3>
                                    <div class="flex items-center border-2 border-gray-400 rounded-md overflow-hidden">
                                        <button class="bg-gray-400 px-2 py-1 text-white hover:bg-gray-500">
                                            <i class="fa-solid fa-minus"></i>
                                        </button>
                                        <span class="px-3">3</span>
                                        <button class="bg-gray-400 px-2 py-1 text-white hover:bg-gray-500">
                                            <i class="fa-solid fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <button title="remove" class="bg-red-600 text-white px-2 py-1 rounded-md border border-red-600 hover:bg-red-700">
                                    <i class="fa-regular fa-trash-can"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Checkout  -->
                <div class="md:col-span-2">
                    <div class="w-full lg:w-96 border border-gray-400 rounded-md overflow-hidden">
                        <h2 class="text-2xl px-3 py-1 bg-gray-300">Summary</h2>
                        <div class="px-3">
                            <div
                            v-for="(checkoutInfo, index) in checkoutInfos"
                            :key="index" 
                            class="flex justify-between my-2">
                                <p class="text-gray-700">{{checkoutInfo.name}}</p>
                                <p class="text-gray-900 font-semibold">{{checkoutInfo.value}}</p>
                            </div>

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
                        <button class="w-full py-3 text-white bg-orange-600 hover:bg-orange-700 transition duration-150">Checkout Payment</button>
                    </div>
                </div>
            </div>
        </div>

        <footer-section></footer-section>
    </div>
</template>

<script>
import NavBar from '@/layout/NavBar.vue'
import FooterSection from '@/layout/FooterSection.vue'

export default {
    name: 'CartPage',
    components: {
        NavBar,
        FooterSection,
    },
    data() {
        return {
            payment: null,
            checkoutInfos: [
                {
                    name: 'Total items',
                    value: '1'
                },
                {
                    name: 'Total cost',
                    value: '20$'
                },
                {
                    name: 'Shipping',
                    value: 'free'
                },
                {
                    name: 'Discounts',
                    value: 'none'
                },
            ],
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
    watch: {
        payment(value) {
            console.log(value)
        }
    }
}
</script>