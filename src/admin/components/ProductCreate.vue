<template>
    <div>
        <h2 class="text-xl text-gray-600 mt-2">Product/ Create</h2>

        <!-- form  -->
        <product-c-u-form 
        method="create"
        :errors="this.errors"
        @submitForm="createProduct"/>
    </div>
</template>

<script>
import {apiServiceWithAuth} from '@/apiService'
import ProductCUForm from './ProductCUForm.vue'

export default {
    name: 'ProductCreate',
    components: {
        ProductCUForm,
    }, 
    data() {
        return {
            errors: null,
        }
    },
    methods: {
        createProduct(formData) {
            apiServiceWithAuth.post('/api/admin/product/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((response) => {
                console.log(response)
                this.$router.push('list')
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