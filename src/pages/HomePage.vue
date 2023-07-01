<template>
    <div>
        <nav-bar></nav-bar>

        <div class="relative w-full">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 h-[36rem]">
                <div class="sm:col-end-4 sm:col-span-2">
                    <img src="@/assets/img/shrink-plate-2.png" alt="..." class="w-full lg:w-[600px] mx-auto">
                </div>
            </div>
            <div class="absolute top-1/4 left-3 sm:left-10 md:left-28 mx-auto">
                <div class="text-5xl sm:text-6xl leading-none md:leading-snug font-[Stencil Std] font-bold mb-4">
                    <h1>Deliver your best</h1>
                    <h1>food anytime.</h1>
                </div>
                <div class="text-lg text-gray-500 font-semibold">
                    <p>Our delicious food is waiting for you,</p>
                    <p>We are always near to you with fresh item of food.</p>
                </div>
                <router-link 
                to="/menu" 
                class="text-white text-lg block w-fit mt-4 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg shadow-lg shadow-gray-300 transition ease-in-out duration-300">Explore Food</router-link>
            </div>
            <div class="container mx-auto">
                <div class="w-full xl:w-3/4 mx-2 min-[486px]:mx-5 xl:mx-auto">
                    <popular-menu-swiper class="cursor-pointer w-full"/>
                </div>
            </div>
            <!-- <div class="w-full xl:w-3/4 mx-2 min-[486px]:mx-5 xl:mx-auto">
                <popular-menu-swiper class="cursor-pointer w-full"/>
            </div> -->
        </div>
        <h2>hello</h2>
        <h2>hello</h2>
        <h2>hello</h2>
        <h2>hello</h2>
        <h2>hello</h2>
        <h2>hello</h2>
        <h2>hello</h2>

        <footer-section></footer-section>
    </div>
</template>

<script>
import NavBar from '../layout/NavBar.vue'
import FooterSection from '../layout/FooterSection.vue'
import PopularMenuSwiper from '@/components/PopularMenuSwiper.vue'

export default {
  components: { 
    NavBar,
    FooterSection,
    PopularMenuSwiper
    },
    name: 'HomePage',
}
</script>