<template>
    <div class="fixed top-0 left-0">
        <div class="flex w-screen h-screen justify-center items-center backdrop-blur-md">
            <div class="w-full sm:w-96 p-2 mx-1 sm:mx-0 bg-gray-100 border-2 border-gray-400 rounded-md">
                <div class="w-full">
                    <button 
                    @click="closeModal"
                    class="block ms-auto transform hover:rotate-90 transition delay-75 duration-200">
                    <i class="fa-solid fa-xmark fa-lg"></i></button>
                    
                    <!-- Image cropping  -->
                    <div ref="cropImageCon" class="border-2 border-gray-300">
                        <!-- crop image  -->
                    </div>
                </div>
                <!-- Image file input  -->
                <!-- <input ref="fileInput" type="file" @change="handleFile" class="mt-2"> -->

                <div class="flex justify-between mt-2">
                    <button
                    @click="closeModal"
                    class="py-1 px-2 text-white bg-gray-400 border border-gray-500 
                    rounded-md hover:bg-gray-500 transition duration-150">Cancel</button>
                    <button
                    @click="uploadImage"
                    class="py-1 px-2 text-white bg-blue-500 border border-blue-500 
                    rounded-md hover:bg-blue-600 transition duration-150">Upload</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import axios from 'axios'


export default {
    name: 'UploadImage',
    props: ['uploadImg'],
    components: {
        
    },
    mounted() {
        this.cropImage()
    },
    data() {
        return {
            croppedImageFile: null,
            token: localStorage.getItem('access-token')
        }
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        cropImage() {
            const cropImageCon = this.$refs.cropImageCon;
            const file = this.uploadImg;
            const imageSrc = URL.createObjectURL(file);
            const image = new Image();
            const vm = this;

            image.onload = function() {
                cropImageCon.innerHTML = '';
                cropImageCon.append(image);

                const cropper = new Cropper(image, {
                    aspectRatio: 1/1,
                    strict: true,
                    zoomable: false,
                    autoCropArea: 0.9,
                    crop:() => {
                        const croppedCanvas = cropper.getCroppedCanvas();
                        const croppedImageData = croppedCanvas.toDataURL('image/png');
                        vm.croppedImageFile = croppedImageData;
                    }
                })
            }
            image.src = imageSrc;
        },
        
        // change dataurl to blob 
        dataURItoBlob(dataURI) {
            const byteString = atob(dataURI.split(',')[1]);
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        },
        uploadImage() {
            const blob = this.dataURItoBlob(this.croppedImageFile);
            let formData = new FormData()
            formData.append('image', blob, '.png')
            
            axios.post('http://127.0.0.1:8000/api/user/profile-picture/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(response => {
                console.log(response.data)
                this.closeModal()
            })
            .catch(error => {
                console.log(error)
            })
        },
    }
}
</script>