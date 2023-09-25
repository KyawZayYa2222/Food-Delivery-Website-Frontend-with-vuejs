<template>
    <div class="bg-black pt-10">
        <div class="w-full px-5 mb-10 min-h-60">
            <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 text-white">
                <div class="mx-auto">
                    <h2 class="text-xl border-b-2 border-white pb-2 px-3 mb-3">Related</h2>
                    <ul>
                        <li>
                            <router-link to="/">Home</router-link>
                        </li>
                        <li>
                            <router-link to="/menu">Menu</router-link>
                        </li>
                        <li>
                            <router-link to="/service">Service</router-link>
                        </li>
                        <li>
                            <router-link to="/contact">Contact Us</router-link>
                        </li>
                    </ul>
                </div>
                <div class="mx-auto">
                    <h2 class="text-xl border-b-2 border-white pb-2 px-3 mb-3">Service</h2>
                    <ul>
                        <li>Delicious Food</li>
                        <li>Delivery</li>
                        <li>Cashback</li>
                        <li>Promotions</li>
                        <li>Fresh ingredient</li>
                    </ul>
                </div>
                <div class="mx-auto">
                    <h2 class="text-xl border-b-2 border-white pb-2 px-3 mb-3">Contact Us</h2>
                    <ul>
                        <li>Address:</li>
                        <li>B-64 street, Losangle</li>
                        <li>Email: hr@foodor.com</li>
                        <li>Phone: 705-742-322</li>
                        <li>
                            <div class="flex text-xl">
                                <a href="#facebook" class="pe-2">
                                    <i class="fa-brands fa-facebook"></i>
                                </a>
                                <a href="#instagram" class="pe-2">
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                                <a href="#twitter" class="pe-2">
                                    <i class="fa-brands fa-twitter"></i>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="mx-auto">
                    <subscribe-form />
                </div>
            </div>
        </div>
        <div class="mt-4 py-4 mx-2 bg-black border border-r-0 border-l-0 border-b-0 border-white">
            <p class="text-white text-center text-md">
                &copy;copyright 2023-{{new Date().getFullYear()}}. Designed & developed by KyawZayYa
            </p>
        </div>
    </div>
</template>

<script>
import SubscribeForm from '@/components/SubscribeForm.vue'

export default {
    name: 'FooterSection',
    components: {
        SubscribeForm,
    }
}
</script>