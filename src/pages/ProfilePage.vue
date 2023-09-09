<template>
    <div>
        <nav-bar></nav-bar>

        <div class="container mx-auto min-h-screen pt-20 lg:pt-40">
            <div class="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-10 gap-5 mx-auto">
                <div class="xl:col-span-4 lg:col-span-2">
                    <div class="bg-gray-100 w-full xl:w-96 ms-auto">
                        <div class="flex border-0 border-b-2 bg-gray-200 border-gray-300 p-2 pb-5">
                            <div class="relative">
                                <img v-if="image" :src="userData.image" class="w-28 rounded-full border border-gray-400">
                                <img v-else src="@/assets/img/profile-icon.jpg" class="w-28 rounded-full border border-gray-400">
                                <label for="fileinput"
                                class="absolute cursor-pointer bottom-1 right-3 w-8 h-8 text-white bg-gray-600 text-center rounded-full border border-gray-700 d-flex justify-center items-center">
                                    <i class="fa-solid fa-camera align-middle"></i>
                                </label>
                                <input type="file" @change="handleFile" id="fileinput" class="hidden">

                                <!-- <button 
                                class="absolute bottom-1 right-3 w-8 h-8 text-white bg-gray-600 rounded-full border border-gray-700"
                                @click="showUploadModal=true">
                                    <i class="fa-solid fa-camera"></i>
                                </button> -->
                            </div>
                            <div class="ps-2 pt-4">
                                <h1 class="text-2xl font-semibold text-gray-700">{{name ? name : "Your Name"}}</h1>
                                <h3 class="w-60 text-md font-semibold text-gray-600">
                                    {{address ? address : "Your address"}}
                                </h3>
                            </div>
                        </div>
                        <ul class="flex flex-col mt-4">
                            <li 
                            v-for="(componentLink, index) in componentLinks"
                            :key="index">
                                <button 
                                @click="currentComponent=componentLink.component"
                                :class="{'border-2': currentComponent==componentLink.component}"
                                class="w-full py-4 border-gray-300 hover:bg-gray-300 transition duration-150">{{componentLink.name}}</button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="xl:col-span-6 lg:col-span-4 p-2">
                    <component :is="currentComponent"></component>
                </div>
            </div>
        </div>

        <upload-image 
        v-if="showUploadModal"
        class="z-[1010]"
        :uploadImg="uploadImg"
        @close-modal="closeUploadModal"></upload-image>

        <footer-section></footer-section>
    </div>
</template>

<script>
import NavBar from '@/layout/NavBar.vue'
import FooterSection from '@/layout/FooterSection.vue'
import ProfileDetail from '@/components/ProfileDetail.vue'
import OrderHistory from '@/components/OrderHistory.vue'
import ChangePassword from '@/components/ChangePassword.vue'
import UploadImage from '@/components/UploadImage.vue'
import axios from 'axios'

export default {
    name: 'ProfilePage',
    components: {
        NavBar,
        FooterSection,
        ProfileDetail,
        OrderHistory,
        ChangePassword,
        UploadImage,
    },
    data() {
        return {
            currentComponent: 'ProfileDetail',
            showUploadModal: false,
            userData: null,
            token: localStorage.getItem('access-token'),
            uploadImg: null,
            componentLinks: [
                {
                    name: 'Profile Details',
                    component: 'ProfileDetail'
                },
                {
                    name: 'Order History',
                    component: 'OrderHistory'
                },
                {
                    name: 'Change Password',
                    component: 'ChangePassword'
                },
            ]
        }
    },
    computed: {
        name: function() {
            return this.userData ? this.userData.name : null
        },
        address: function() {
            return this.userData ? this.userData.address : null
        },
        image: function() {
            return this.userData ? this.userData.image : null
        },
    },
    mounted() {
        this.fetchUserData()
    },
    methods: {
        fetchUserData() {
            let config = { headers : {'Authorization' : `Bearer ${this.token}`} };

            axios.get('http://127.0.0.1:8000/api/user/details', config)
            .then(response => {
                // console.log(response)
                this.userData = response.data;
            })
            .catch(error => {
                console.log(error)
            })
        },
        handleFile(e) {
            // console.log(this.showUploadModal)
            this.uploadImg = e.target.files[0]
            this.showUploadModal = true
        },
        closeUploadModal() {
            this.showUploadModal = false
            this.fetchUserData()
        }
    }
}
</script>