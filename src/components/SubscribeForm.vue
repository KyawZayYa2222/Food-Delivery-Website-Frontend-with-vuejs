<template>
    <div>
        <h1 class="text-xl mb-3">Get Newsletter: </h1>
        <form @submit.prevent="subscribe" class="w-72 px-1">
            <input 
            type="text" 
            v-model="email" 
            class="w-full px-2 py-1 h-10 mb-2 bg-transparent border border-white"><br>
            <button type="submit" class="w-full py-2 border border-white bg-orange-700
            hover:bg-orange-600">Subscribe</button>
        </form>
    </div>
</template>

<script>
import { apiService } from '@/apiService'

export default {
    name: 'SubscribeForm',
    data() {
        return {
            email: null,
        }
    },
    methods: {
        subscribe() {
            apiService.post('/api/subscriber/create', {'email': this.email})
            .then(resp => {
                this.$toasted.show(resp.data.message, {
                    className: ["alert-con", "!bg-green-500"]
                });
            })
            .catch(err => {
                console.log(err)
                this.$toasted.show(err.response.data.message, {
                    className: ["alert-con", "!bg-red-500"]
                });
            })
        }
    }
}
</script>