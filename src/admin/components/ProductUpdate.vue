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
import axios from 'axios'
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
            let token = localStorage.getItem('access-token')

            axios.post('http://127.0.0.1:8000/api/admin/product/'+this.$route.params.id+'/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
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