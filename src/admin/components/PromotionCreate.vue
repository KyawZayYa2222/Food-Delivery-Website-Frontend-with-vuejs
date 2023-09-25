<template>
    <div>
        <h2 class="text-xl text-gray-600 mt-2">Promotion/ Create</h2>

        <!-- form  -->
        <promotion-c-u-form 
        method="update"
        :errors="errors"
        @submitForm="createPromotion"/>
    </div>
</template>


<script>
import {apiServiceWithAuth} from '@/apiService'
import PromotionCUForm from './PromotionCUForm.vue'

export default {
    name: 'PromotionCreate',
    components: {
        PromotionCUForm
    },
    data() {
        return {
            errors: null,
        }
    },
    methods: {
        createPromotion(createdData) {

            apiServiceWithAuth.post('/api/admin/promotion/create', createdData)
            .then(() => {
                this.$router.push('list')
            })
            .catch(error => {
                if(error.response.data.errors) {
                    this.errors = error.response.data.errors;
                } else {
                    this.errors = {invalidDate: error.response.data.message};
                }
            })
        }
    },
}
</script>