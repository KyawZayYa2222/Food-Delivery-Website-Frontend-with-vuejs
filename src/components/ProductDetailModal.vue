<template>
    <div class="fixed z-50 top-0 left-0">
        <div class="flex w-screen h-screen justify-center items-center backdrop-blur-md">
            <div class="w-full sm:w-auto py-2 px-3 mx-1 sm:mx-0 bg-white border-2 border-gray-400 rounded-md">
                <button 
                @click="close"
                class="block ms-auto transform hover:rotate-90 transition delay-75 duration-200">
                <i class="fa-solid fa-xmark fa-lg"></i></button>

                <div class="flex md:flex-row flex-col">
                    <figure class="flex justify-center">
                        <img :src="product.image" class="w-96">
                    </figure>
                    <div class="sm:w-96 font-san">
                        <p class="text-3xl font-semibold mb-2">{{product.name}}</p>
                        <p class="text-md text-justify">{{product.long_desc}}</p>
                        <div class="flex justify-between mt-4">
                            <button class="gray-btn px-4" @click="close">Back</button>
                            <button class="orange-btn" @click="addCart(product.id)">Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductDetailModal',
    props: ['product'],
    data() {
        return {
            
        }
    }, 
    methods: {
        close() {
            this.$emit('closeModal')
        }, 
        addCart(productId) {
            this.$emit('addCart', productId)
        }
    }
}
</script>