<template>
    <div>
        <h2 class="text-xl text-gray-600 mt-1 mb-4">Slideshow/ create</h2>

        <slideshow-c-u-form 
        method="create"
        :errors="errors"
        @formSubmitted="createSlideshow"/>
    </div>
</template>

<script>
import { apiServiceWithAuth } from '@/apiService'
import SlideshowCUForm from './SlideshowCUForm.vue'

export default {
    name: 'SlideshowCreate',
    components: {
        SlideshowCUForm,
    },
    data() {
        return {
            errors: null,
        }
    },
    methods: {
        createSlideshow(formData) {
            console.log(formData);
            apiServiceWithAuth.post('/api/admin/slideshow/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(() => {
                this.$router.push('list');
            })
            .catch(err => {
                if(err.response.data.errors) {
                    this.errors = err.response.data.errors;
                } else {
                    this.errors = {invalidDate: err.response.data.message};
                }
            })
        }
    }
}
</script>