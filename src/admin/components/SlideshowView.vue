<template>
    <div>
        <h2 class="text-xl text-gray-600 mt-1 mb-4">Slideshow/ View</h2>

        <div class="w-full text-right">
            <router-link to="/admin/slideshow/list" type="button" class="gray-btn">Back to list</router-link>
        </div>

        <div class="relative overflow-hidden w-full h-[32rem] mt-4">
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
    </div>
</template>

<script>
export default {
    name: 'SlideshowView',
    props: [
        'slideshow'
    ]
}
</script>