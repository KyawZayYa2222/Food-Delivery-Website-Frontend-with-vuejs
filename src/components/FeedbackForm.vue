<template>
    <div class="fixed top-0 left-0">
        <div class="flex w-screen h-screen justify-center items-center backdrop-blur-md">
            <div class="w-full max-w-[600px] p-2 mx-1 sm:mx-0 bg-gray-100 border-2 border-gray-400 rounded-md">
                <p class="w-full px-2 py-3 rouded-md bg-green-400 bg-opacity-50 rounded-md text-center">
                    Your Order was successful.
                </p>
                <form method="post" @submit.prevent class="mt-4">
                    <label for="message" class="text-lg text-gray-700">
                        We want to hear your feedback. Please give us!
                    </label><br>
                    <textarea 
                    type="text" 
                    v-model="message" 
                    id="message"
                    class="input-two w-full h-28"
                    placeholder="Message"></textarea>
                    
                    <div class="flex justify-between">
                        <button class="orange-btn px-4" @click="send">Send</button>
                        <button class="gray-btn px-4" @click="close">Later</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { apiServiceWithAuth } from '@/apiService'

export default {
    name: 'FeedbackForm',
    data() {
        return {
            message: null,
        }
    },
    methods: {
        close() {
            this.$emit('close-modal')
        },
        send() {
            apiServiceWithAuth.post('/api/user/feedback/create', {'message': this.message})
            .then(() => {
                this.$toasted.show('Your feedback was sent. Thanks you.', {
                    className: ["alert-con", "!bg-green-500"]
                });
                this.close();
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>