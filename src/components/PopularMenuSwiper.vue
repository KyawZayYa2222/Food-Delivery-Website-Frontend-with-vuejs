<template>
    <div class="popular-menu">
        <h2 class="text-2xl font-bold font-[Monoca]">Popular Menu</h2>
        <swiper :options="swiperOptions">
            <swiper-slide 
            v-for="(product, index) in products" 
            :key="index">
            <div class="w-40 min-[486px]:w-52 bg-white border-2 border-gray-300 shadow-md rounded-xl mt-[65px]">
                <img :src="product.img" alt="..." class="w-full mx-auto mt-[-80px]" title="image">
                <h2 class="text-xl font-bold text-center text-gray-900">{{product.name}}</h2>
                <p class="text-sm text-gray-500 px-2 my-2">Hey taste this is so good nice food hello taste this.</p>
                <div class="flex justify-between px-2 pb-2">
                    <p class="text-lg font-bold text-gray-500">{{product.price}}$</p>
                    <button class="bg-orange-600 text-white w-7 h-7 rounded-full hover:translate-y-[-2px] hover:shadow-md hover:shadow-orange-400 transition duration-150">
                        <i class="fa fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
export default {
    name: 'PopularMenuSwiper',
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            screenWidth: window.innerWidth,
            swiperOptions: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
            products: [
                {name: 'product-one', price: 20, img: require('@/assets/img/welcome-img.png')},
                {name: 'product-two', price: 30, img: require('@/assets/img/burger-img-2.png')},
                {name: 'product-three', price: 60, img: require('@/assets/img/shrink-plate.png')},
                {name: 'product-four', price: 15, img: require('@/assets/img/burger-img-2.png')},
                {name: 'product-five', price: 37, img: require('@/assets/img/shrink-plate.png')},
                {name: 'product-six', price: 42, img: require('@/assets/img/burger-img.png')}
            ],
        }
    },
    mounted() {
        window.addEventListener('resize', this.updateScreenWidth)
        this.updateScreenWidth()
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateScreenWidth)
    },
    methods: {
        updateScreenWidth() {
            this.screenWidth = window.innerWidth;
        },
        responsiveSlideItem() {
            if(this.screenWidth <= 1024 && this.screenWidth >= 769) {
                this.swiperOptions.slidesPerView = 3
            } else if(this.screenWidth < 769) {
                this.swiperOptions.slidesPerView = 2
            } else {
                this.swiperOptions.slidesPerView = 4
            }
        }
    },
    watch: {
        screenWidth() {
            this.responsiveSlideItem()
        }
    }
}
</script>