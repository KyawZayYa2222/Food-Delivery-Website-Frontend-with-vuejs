<template>
    <div>
        <div class="w-full xl:w-2/3 px-3">
            <form @submit="contact">
                <input type="text"
                v-model="name" 
                class="w-full h-14 px-3 mb-4 border-2 border-gray-400 outline-2 outline-gray-600 rounded-md"
                placeholder="Your Name">

                <input type="text"
                v-model="email" 
                class="w-full h-14 px-3 mb-4 border-2 border-gray-400 outline-2 outline-gray-600 rounded-md"
                placeholder="Your Email">

                <textarea 
                v-model="message" 
                class="w-full h-40 px-3 py-2 mb-4 border-2 border-gray-400 outline-2 outline-gray-600 rounded-md"
                placeholder="Message"></textarea>

                <button 
                type="submit" 
                class="text-white bg-orange-600 px-8 py-3 rounded-md hover:bg-orange-700 transition delay-75 duration-150">Send</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContactForm',
    data() {
        return {
            name: null,
            email: null,
            message: null,
        }
    },
    methods: {
        contact(e) {
            e.preventDefault()
            console.log('contact')
        }
    }
}
</script>