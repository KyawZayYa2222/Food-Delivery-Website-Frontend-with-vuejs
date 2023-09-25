<template>
    <div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl mx-auto w-fit text-gray-900">Our Feedbacks</h1>
        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-10">
            <div
            v-for="feedback in feedbacks" :key="feedback.id" 
            class="w-80 mx-auto">
                <div class="w-28 h-28 overflow-hidden mx-auto rounded-full">
                    <img v-if="feedback.user_image" :src="feedback.user_image" class="w-full">
                    <img v-else src="@/assets/img/profile-icon.jpg" class="w-full">
                </div>
                <h1 class="text-xl text-center">{{feedback.user_name}}</h1>
                <p class="text-center text-gray-700">{{feedback.message}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { apiService } from '@/apiService'

export default {
    name: 'HomeFeedbackSec',
    data() {
        return {
            feedbacks: null,
        }
    },
    created() {
        this.fetchFeedback();
    },
    methods: {
        fetchFeedback() {
            apiService.get('/api/feedback/public-list')
            .then(resp => {
                this.feedbacks = resp.data;
            })
            .catch(err => console.log(err))
        }
    }
}
</script>