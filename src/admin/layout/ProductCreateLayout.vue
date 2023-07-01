<template>
    <div class="w-full">
        <h1 class="text-3xl mb-3 inline text-gray-600">Product/</h1><span class="inline-block text-xl text-gray-500">Create</span>

        <form class="mt-5 flex flex-col w-[600px]">
            <label for="pro-name" class="text-gray-600">Product Name</label>
            <input 
            type="text"
            v-model="productName"
            id="pro-name"
            class="w-80 h-10 px-3 mb-3 bg-white border border-gray-500 outline-gray-500 rounded-md"
            placeholder="Pizza">

            <label for="price" class="text-gray-600">Price</label>
            <input 
            type="number" 
            v-model.number="price" 
            id="price"
            class="w-60 h-10 px-3 mb-3 bg-white border border-gray-500 outline-gray-500 rounded-md"
            placeholder="20">

            <label for="short-desc" class="text-gray-600">Short Description</label>
            <input 
            type="text"
            v-model="shortDesc"
            id="short-desc"
            class="w-full h-10 px-3 mb-3 bg-white border border-gray-500 outline-gray-500 rounded-md"
            placeholder="Sharp & short description">

            <label for="long-desc" class="text-gray-600">Long Description</label>
            <textarea 
            rows="6"
            v-model="longDesc"
            class="w-full px-3 py-2 mb-3 bg-white border border-gray-500 outline-gray-500 rounded-md"
            placeholder="Long & perfect Description"></textarea>

            <div>
                <label for="pro-img" class="text-gray-600 mb-1">Insert product image</label><br>
                <input type="file" @change="handleFileInput">
                <button 
                type="submit" 
                class="w-fit inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white ms-2">
                    Create
                </button>
            </div>
            
        </form>
    </div>
</template>

<script>
export default {
    name: 'ProductCreateLayout',
    data() {
        return {
            productName: null,
            price: null,
            shortDesc: null,
            longDesc: null,
            productImg: null,
        }
    },
    methods: {
        handleFileInput(e) {
            this.productImg = e.target.files[0];
        }
    }
}
</script>