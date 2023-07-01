<template>
    <div class="flex justify-center items-center">
        <div class="bg-gray-100 p-2 border border-gray-600 rounded-md">
            <h2 class="text-2xl mb-2">Update form</h2>
            <figure class="mb-2">
                <img :src="previewImgSrc" alt="product-img" class="w-96 bg-gray-400 border border-gray-800 rounded-md mx-auto">
            </figure>
            <form @submit.prevent="">
                <div class="text-green-600">
                    <p 
                    v-show="message"
                    class="font-semibold mb-1"
                    :class="{'text-red-600': error}">{{message}}</p>
                </div>

                <input 
                type="text"
                v-model="categoryName"
                class="w-96 h-10 px-3 mb-3 bg-white border border-gray-400 outline-gray-500 rounded-md shadow-md"
                placeholder="Category"><br>
                <input type="file" @change="handleFileInput">

                <div class="flex justify-between mt-2">
                    <button class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white">Update</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CategoryUpdateForm',
    data() {
        return {
            categoryName: null,
            imageFile: null,
            error: false,
            message: null,
            previewImgSrc: null,
        }
    },
    methods: {
        handleFileInput(e) {
            const vm = this;
            this.imageFile = e.target.files[0];
            if(this.imageFile) {
                let reader = new FileReader();
                reader.onload = function() {
                    let src = reader.result;
                    console.log(src)
                    vm.previewImgSrc = src;
                }
                reader.readAsDataURL(vm.imageFile);
            }
            console.log(this.previewImgSrc)
        },
    },
    watch: {

    }
}
</script>