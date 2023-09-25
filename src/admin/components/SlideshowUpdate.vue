<template>
    <div>
        <h2 class="text-xl text-gray-600 mt-1 mb-4">Slideshow/ List</h2>
        {{slideshow.id}}

        <slideshow-c-u-form 
        method="update" 
        :errors="errors"
        :updateItem="slideshow"
        @formSubmitted="updateSlideshow"/>
    </div>
</template>

<script>
import { apiServiceWithAuth } from '@/apiService'
import SlideshowCUForm from './SlideshowCUForm.vue'

export default {
    name: 'SlideshowUpdate',
    props: [
        'slideshow',
    ],
    components: {
        SlideshowCUForm,
    },
    data() {
        return {
            errors: null,
        }
    },
    methods: {
        updateSlideshow(formData) {
            apiServiceWithAuth.post('/api/admin/slideshow/'+this.slideshow.id+'/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(() => {
                this.$router.push('list');
            })
            .catch(err => {
                console.log(err)
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