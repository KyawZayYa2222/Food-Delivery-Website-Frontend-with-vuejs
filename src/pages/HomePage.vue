<template>
    <div>
        <page-loader v-if="isLoading"/>

        <nav-bar></nav-bar>

        <div class="relative w-full md:min-h-[60rem] bg-gray-200">
            <div class="overflow-x-hidden w-full">
                <div class="z-20 w-full min-w-[1400px] flex items-center">
                    <div class="ms-6 sm:ms-20 lg:ms-36">
                        <div class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-none md:leading-snug font-sans font-bold mb-2 md:mb-3">
                            <h1>Deliver your best</h1>
                            <h1>food anytime.</h1>
                        </div>
                        <div class="text-lg text-gray-500 font-sans font-semibold">
                            <p>Our delicious food is waiting for you</p>
                            <p>We are always near to you with fresh food.</p>
                        </div>
                        <router-link 
                        to="/menu" 
                        class="text-white text-lg block w-fit mt-4 bg-orange-600 hover:bg-orange-700 px-8 py-3 
                        rounded-lg shadow-lg shadow-gray-300 transition ease-in-out duration-300">
                        Explore Food</router-link>
                    </div>
                    <img src="@/assets/img/shrink-plate-2.png" class="w-[500px] sm:w-[600px] mt-28 ms-auto me-20">
                </div>
            </div>
            <svg class="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" 
            fill-opacity="1" d="M0,224L60,197.3C120,171,240,117,360,117.3C480,117,600,171,720,202.7C840,
            235,960,245,1080,240C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,
            320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        </div>

        <home-category-sec/>

        <slideshow-sec class="mt-16"/>

        <home-feedback-sec class="mt-16"/>

        <footer-section class="mt-16"/>
    </div>
</template>

<script>
import NavBar from '../layout/NavBar.vue'
import FooterSection from '../layout/FooterSection.vue'
import HomeCategorySec from '@/components/HomeCategorySec.vue'
import SlideshowSec from '@/components/SlideshowSec.vue'
import HomeFeedbackSec from '@/components/HomeFeedbackSec.vue'
import PageLoader from '@/components/PageLoader.vue'

export default {
  components: { 
    NavBar,
    FooterSection,
    HomeCategorySec,
    SlideshowSec,
    HomeFeedbackSec,
    PageLoader,
    },
    name: 'HomePage',
    data() {
        return {
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