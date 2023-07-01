<template>
    <div>
        <nav-bar></nav-bar>

        <div class="container mx-auto min-h-screen pt-20">
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-5 mx-auto">
                <div class="xl:col-span-2">
                    <div class="bg-gray-100 w-full xl:w-96 ms-auto">
                        <div class="flex border-0 border-b-2 bg-gray-200 border-gray-300 p-2 pb-5">
                            <div class="relative">
                                <img src="@/assets/img/profile.jpg" class="w-28 rounded-full border border-gray-400">
                                <button 
                                class="absolute bottom-1 right-3 w-8 h-8 text-white bg-gray-600 rounded-full border border-gray-700"
                                @click="showUploadModal=true">
                                    <i class="fa-solid fa-camera"></i>
                                </button>
                            </div>
                            <div class="ps-2 pt-4">
                                <h1 class="text-2xl font-semibold text-gray-700">HTET HTET LINN LATT</h1>
                                <h3 class="w-60 text-md font-semibold text-gray-600">Hledan, Kamayaut Township, Yangon</h3>
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

                <div class="xl:col-span-3 p-2">
                    <component :is="currentComponent"></component>
                </div>
            </div>
        </div>

        <upload-image 
        v-show="showUploadModal" 
        class="z-[1010]"
        @close-modal="showUploadModal=false"></upload-image>

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
    methods: {
        
    }
}
</script>