<template>
    <div>
        <nav-bar></nav-bar>

        <div class="w-full min-h-screen px-3 pt-16">
            <div class="w-full sm:w-fit sm:ms-10 flex border-2 border-gray-300 rounded-md focus-within:shadow-md transition delay-75 duration-200">
                <input 
                type="text" 
                v-model="searchKey"
                class="w-full sm:w-96 h-10 rounded-s-md outline-none px-3"
                placeholder="search . .">
                <button class="text-orange-600 text-lg px-2 rounded-e-md">
                    <i class="fa fa-solid fa-search"></i>
                </button>
            </div>
            <h1 class="text-2xl text-center font-semibold my-2">Tasty Menu</h1>
            <div class="relative container mx-auto">
                <button class="absolute end-0 me-2"><i class="fa-solid fa-list fa-beat fa-lg"></i></button>
                <ul class="absolute md:relative md:flex md:justify-center">
                    <li class="px-3">Juice & Drink</li>
                    <li class="px-3">Fried Food</li>
                    <li class="px-3">Seafood</li>
                    <li class="px-3">Breakfast</li>
                    <li class="px-3">Pizza</li>
                    <li class="px-3">Burger</li>
                    <li class="px-3">Soup</li>
                </ul>
            </div>
            <div class="container mx-auto xl:px-10 pt-3 pb-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                    <div v-for="(product, index) in products" :key="index" class="mx-auto">
                        <div class="w-full max-w-[300px] sm:w-56 xl:w-64 bg-white border-2 border-gray-300 shadow-md rounded-xl mt-[60px]">
                            <img :src="product.img" alt="..." class="w-full mx-auto mt-[-70px]" title="image">
                            <h2 class="text-xl font-bold text-center text-gray-900">{{product.name}}</h2>
                            <p class="text-sm text-gray-500 px-2 my-2">Hey taste this is so good nice food hello taste this.</p>
                            <div class="flex justify-between px-2 pb-2">
                                <p class="text-lg font-bold text-gray-500">{{product.price}}$</p>
                                <button class="bg-orange-600 text-white w-7 h-7 rounded-full hover:translate-y-[-2px] hover:shadow-md hover:shadow-orange-400 transition duration-150">
                                    <i class="fa fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
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
export default {
    name: 'MenuPage',
    components: { 
        NavBar,
        FooterSection,
    },
    data() {
        return {
            searchKey: null,
            products: [
                {name: 'product-one', price: 20, img: require('@/assets/img/welcome-img.png')},
                {name: 'product-two', price: 30, img: require('@/assets/img/burger-img-2.png')},
                {name: 'product-three', price: 60, img: require('@/assets/img/shrink-plate.png')},
                {name: 'product-four', price: 15, img: require('@/assets/img/burger-img-2.png')},
                {name: 'product-one', price: 20, img: require('@/assets/img/welcome-img.png')},
                {name: 'product-two', price: 30, img: require('@/assets/img/burger-img-2.png')},
                {name: 'product-three', price: 60, img: require('@/assets/img/shrink-plate.png')},
                {name: 'product-four', price: 15, img: require('@/assets/img/burger-img-2.png')},
            ]
        }
    }
}
</script>