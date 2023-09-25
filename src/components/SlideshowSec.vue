<template>
    <div>
        <swiper class="swiper"
        :options="swiperOptions" 
        :pagination="{ clickable: true }">
            <swiper-slide 
            v-for="slideshow in slideshows" :key="slideshow.id"
            class="slide">
                <div class="relative overflow-hidden w-full h-[32rem]">
                    <div class="absolute">
                        <img :src="slideshow.image" class="min-w-[1200px]">
                    </div>
                    <div class="absolute w-full h-full bg-gray-950 bg-opacity-40 flex justify-center items-center">
                        <div class="text-gray-100 max-w-[460px] px-2">
                            <h1 class="text-5xl">{{slideshow.title}}</h1>
                            <h2 class="text-4xl">{{slideshow.sub_title}}</h2>
                            <p class="text-justify mt-2">{{slideshow.description}}</p>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { apiService } from '@/apiService'

export default {
    name: 'SlideshowSec',
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            swiperOptions: {
                slidesPerView: 1,
                spaceBetween: 2,
                autoplay: 5000,
            },
            slideshows: null,
        }
    },
    created() {
        this.fetchSlideshow();
    },
    methods: {
        fetchSlideshow() {
            apiService.get('/api/slideshow/active-list')
            .then(resp => {
                this.slideshows = resp.data;
            })
            .catch(err => console.log(err))
        }
    }
}
</script>