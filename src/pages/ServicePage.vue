<template>
    <div>
        <page-loader v-if="isLoading"/>
        <nav-bar></nav-bar>
        <div class="pt-20">
            <div 
            class="w-full h-96 bg-cover bg-no-repeat flex justify-center items-center" 
            :style="`background-image: url(${require('@/assets/img/service-header-bg.jpg')})`">
                <h1 class="text-5xl md:text-7xl font-semibold">What we offer ?</h1>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 mb-16">
                <!-- service card  -->
                <div v-for="(service, index) in services" :key="index">
                    <div class="border border-gray-300 shadow-lg w-80 xl:w-96 mx-auto mt-[60px] rounded-xl">
                        <div 
                        v-html="service.icon" 
                        class="text-5xl xl:text-6xl text-orange-600 flex justify-center items-center mx-auto mt-[-40px] 
                        w-24 xl:w-28 h-24 xl:h-28 bg-white border-2 border-gray-300 rounded-full shadow-lg"></div>

                        <h1 class="text-2xl font-semibold text-center">{{service.title}}</h1>
                        <p class="text-gray-600 text-center px-4 mb-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel expedita nam maxime, 
                            cum repellendus dolor alias nesciunt. Consectetur, dolorum aperiam commodi in ut iusto. 
                            Nisi quisquam error facere ad provident.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <footer-section></footer-section>
    </div>
</template>

<script>
import NavBar from '../layout/NavBar.vue'
import FooterSection from '../layout/FooterSection.vue'
import PageLoader from '@/components/PageLoader.vue'

export default {
    name: 'ServicePage',
    components: { 
        NavBar,
        FooterSection,
        PageLoader,
    },
    data() {
        return {
            services: [
                {
                    title: "Delicious Menu",
                    icon: `<i class="fa-solid fa-utensils"></i>`,
                    description: "About Delicious Menu blur blur blur"
                },
                {
                    title: "Fast Delivery",
                    icon: `<i class="fa-solid fa-truck-fast"></i>`,
                    description: "About Delicious Menu blur blur blur"
                },
                {
                    title: "Cash Back",
                    icon: `<i class="fa-solid fa-hand-holding-hand"></i>`,
                    description: "About Delicious Menu blur blur blur"
                },
            ],
            isLoading: false,
        }
    },
    mounted() {
        this.toggleLoader()
    },
    methods: {
        toggleLoader() {
          this.isLoading = true;
          setTimeout(() => {
            this.isLoading = false;
          }, 2000);
        },
    }
}
</script>