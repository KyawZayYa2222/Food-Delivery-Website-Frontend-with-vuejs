<template>
    <div>
        <h2 class="text-xl text-gray-600 mt-2">Product/ Update</h2>

        <!-- form  -->
        <product-c-u-form 
        method="update"
        :errors="this.errors"
        @submitForm="updateProduct"/>
    </div>
</template>

<script>
import {apiServiceWithAuth} from '@/apiService'
import ProductCUForm from './ProductCUForm.vue'

export default {
    name: 'ProductUpdate',
    components: {
        ProductCUForm,
    },
    data() {
        return {
            errors: null,
        }
    },
    methods: {
        updateProduct(formData) {
            apiServiceWithAuth.post('/api/admin/product/'+this.$route.params.id+'/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(() => {
                this.$router.push('/admin/product/list');
            })
            .catch(error => {
                console.log(error)
                if(error.response.data.errors) {
                    this.errors = error.response.data.errors;
                }
            })
        }
    }
}
</script>