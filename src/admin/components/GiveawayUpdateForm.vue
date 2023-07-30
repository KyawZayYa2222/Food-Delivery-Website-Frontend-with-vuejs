<template>
    <div class="flex justify-center items-center">
        <div class="bg-gray-100 p-2 border border-gray-600 rounded-md">
            <h2 class="text-xl text-gray-700 mb-2">Giveaway/ Update</h2>

            <div class="text-green-600">
                <p 
                v-show="errorMsg.image"
                class="font-semibold text-red-600 mb-1">{{errorMsg.image}}</p>
            </div>

            <figure class="mb-2">
                <img :src="previewImgSrc" alt="product-img" class="w-96 bg-gray-400 border border-gray-800 rounded-md mx-auto">
            </figure>

            <form @submit.prevent>
                <div class="text-green-600">
                    <p 
                    v-show="errorMsg.name"
                    class="font-semibold text-red-600 mb-1">{{errorMsg.name}}</p>
                </div>
                
                <input 
                type="text"
                v-model="giveawayName"
                class="w-96 input-one shadow-md"
                placeholder="Giveaway Name"><br>
                <input type="file" @change="handleFileInput">

                <div class="flex justify-between mt-2">
                    <button @click="closeForm" class="gray-btn">Cancel</button>
                    <button @click="update" class="blue-btn">Update</button>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'GiveawayUpdateForm',
    props: ['updateItem'],
    data() {
        return {
            giveawayName: null,
            imageFile: null,
            errorMsg: {
                name: null,
                image: null
            },
            previewImgSrc: null,
            updItemId: null,

        }
    },

    methods: {
        handleFileInput(e) {
            const vm = this;
            this.imageFile = e.target.files[0];
            if(this.imageFile) {
                let reader = new FileReader();
                reader.onload = function() {
                    let src = reader.result;
                    vm.previewImgSrc = src;
                }
                reader.readAsDataURL(vm.imageFile);
            }
        },

        handleUpdateItem() {
            if(this.updateItem != null) {
                this.updItemId = this.updateItem.id;
                this.giveawayName = this.updateItem.name;
                this.previewImgSrc = this.updateItem.image;
            }
        },

        closeForm() {
            this.errorMsg.name = null;
            this.errorMsg.image = null;
            this.$emit('closeform');
        },

        update() {
            const token = localStorage.getItem('access-token');
            let formData = new FormData();
            formData.append('name', this.giveawayName);
            formData.append('image', this.imageFile);
            // console.log(formData);
            
            axios.post('http://127.0.0.1:8000/api/admin/giveaway/'+this.updItemId+'/update', formData, {
                headers : {
                    'Content-Type': 'multipart/form-data',
                    'Authorization' : `Bearer ${token}`,
                }
            })
            .then((response) => {
                console.log(response)
                this.closeForm();
            })
            .catch(error => {
                console.log(error)
                let errorResp = error.response.data.errors; 

                this.errorMsg.name = errorResp.name ? errorResp.name[0] : null;
                this.errorMsg.image = errorResp.image ? errorResp.image[0] : null;
            })
        }
    },
    
    watch: {
        updateItem() {
            this.handleUpdateItem();
        }
    }
}
</script>