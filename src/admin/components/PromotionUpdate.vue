<template>
    <div>
        <h2 class="text-xl text-gray-600 mt-2">Promotion/ Update</h2>

        <!-- form  -->
        <promotion-c-u-form 
        method="update"
        :errors="this.errors"
        @submitForm="updatePromotion"/>
    </div>
</template>

<script>
import axios from 'axios'
import PromotionCUForm from './PromotionCUForm.vue'

export default {
    name: 'PromotionUpdate',
    // props: ['updatedId'],
    components: {
        PromotionCUForm
    },
    data() {
        return {
            errors: null,
        }
    },
    // mounted() {
    //     console.log(this.$route.params)
    // },
    methods: {
        updatePromotion(updatedData) {
            let token = localStorage.getItem('access-token')
            let config = { headers : {'Authorization' : `Bearer ${token}`} };

            axios.put('http://127.0.0.1:8000/api/admin/promotion/'+this.$route.params.id+'/update', updatedData, config)
            .then(() => {
                this.$router.push('/admin/promotion/list')
            })
            .catch(error => {
                if(error.response.data.errors) {
                    this.errors = error.response.data.errors;
                } else {
                    this.errors = {invalidDate: error.response.data.message};
                }
            })
        }
    }
}
</script>