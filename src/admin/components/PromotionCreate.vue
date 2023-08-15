<template>
    <div>
        <h2 class="text-xl text-gray-600 mt-2">Promotion/ Create</h2>

        <!-- form  -->
        <promotion-c-u-form 
        method="update"
        :errors="this.errors"
        @submitForm="createPromotion"/>
    </div>
</template>


<script>
import axios from 'axios'
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
            let token = localStorage.getItem('access-token');
            let config = { headers : {'Authorization' : `Bearer ${token}`} };

            axios.post('http://127.0.0.1:8000/api/admin/promotion/create', createdData, config)
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