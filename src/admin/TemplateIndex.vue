<template>
    <div>
        <div class="w-full min-h-screen flex">
            <!-- sidebar  -->
            <aside 
            :class="{'translate-x-[0%]': sidebarActive}"
            class="z-[1000] absolute min-h-screen w-72 transform translate-x-[-100%] transition all ease 
            duration-300 bg-gray-100 border-0 border-r-2 px-3 border-gray-300"
            style="box-shadow: 1px 0px 5px #c1c1c1;">
                <div class="flex items-center justify-between">
                    <figure>
                        <img src="@/assets/img/foodor-logo.png" alt="logo" class="w-28">
                    </figure>
                    <button @click="sidebarActive=false" class="block sm:hidden"><i class="fa-solid fa-xmark fa-xl"></i></button>
                </div>
                <ul class="mt-10 leading-10">
                    <li class="sidebar"
                    v-for="(link, index) in links"
                    :key="index">
                        <router-link :to="link.path">
                            <div 
                            :class="{
                                'bg-orange-600 text-white':$route.path==link.path,
                                'mb-6':index==0
                            }"
                            class="group relative bg-gray-200 mb-2 text-gray-900 text-center rounded-md 
                            border border-gray-300 hover:bg-orange-500 hover:text-white transition-all duration-150 delay-75">
                                <span v-html="link.icon" class="absolute left-3"></span>
                                {{link.name}}
                            </div>
                        </router-link>
                    </li>
                </ul>
            </aside>

            <!-- Main section  -->
            <main 
            :class="{'lg:ps-72': sidebarActive}"
            class="w-full ps-0 transition duration-300">
            <!-- navbar  -->
                <nav class="w-full flex justify-between items-center px-3 py-3 border-0 border-b-2 border-gray-300">
                    <button @click="sidebarToggle" class="ms-0 sm:ms-72 lg:ms-0">
                        <i class="fa-solid fa-bars fa-lg"></i>
                    </button>
                    <div class="flex">
                        <!-- notification  -->
                        <div class="relative mx-3 my-auto">
                            <button @click="showNotiPopover" title="notification">
                                <span class="absolute top-[-6px] right-[-8px] bg-orange-600 text-xs text-white px-1 rounded-full">2</span>
                                <i class="fa-regular fa-bell fa-lg"></i>
                            </button>

                            <!-- noti con  -->
                            <div 
                            v-show="notiCon"
                            class="absolute right-0 w-64 h-auto px-1 flex flex-col bg-gray-100 border border-gray-200 shadow-lg rounded-lg">
                                <div 
                                v-for="(notiCon, index) in notiCons"
                                :key="index"
                                class="w-full hover:bg-gray-200 border border-gray-200 rounded-lg my-1 px-2 py-1 text-left">
                                    <div class="flex">
                                        <div class="w-7 h-7 flex justify-center items-center bg-gray-300 rounded-full me-2">
                                            <p>{{notiCon.count}}</p>
                                        </div>
                                        <h2 class="text-md">{{notiCon.head}}</h2>
                                    </div>
                                    <p class="text-sm text-gray-600">{{notiCon.para}}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Profile  -->
                        <div class="relative">
                            <button @click="showProfPopover" title="profile">
                                <div class="flex justify-center items-center w-8 h-8 bg-gray-200 border border-gray-300 rounded-full mx-3 overflow-hidden">
                                    <img :src="user.image" class="w-full">
                                </div>
                            </button>
                            
                            <div 
                            v-show="profileCon"
                            class="absolute right-4 w-80 h-auto px-1 flex flex-col bg-gray-100 border border-gray-200 shadow-lg rounded-lg">
                                <div class="flex w-full mx-2 my-2 border-0 border-b py-2">
                                    <figure class="w-16 h-16 overflow-hidden me-2">
                                        <img :src="user.image" class="w-full">
                                    </figure>
                                    <div>
                                        <h1 class="text-2xl font-semibold">{{user.name}}</h1>
                                        <h2>{{user.email}}</h2>
                                    </div>
                                </div>

                                <router-link to="/logout"
                                class="w-full hover:bg-gray-200 border border-gray-200 rounded-lg my-1 px-2 py-1 text-center">
                                    <span>
                                        <i class="fa-solid fa-right-from-bracket"></i> Logout
                                    </span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </nav>
                <!-- route layout section  -->
                <router-view class="p-3"></router-view>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TemplateIndex',
    data() {
        return {
            sidebarActive: true,
            notiCon: false,
            profileCon: false,
            user: JSON.parse(localStorage.getItem('user-data')),
            links: [
                {path: '/admin', name: 'Dashboard', icon: '<i class="fa-solid fa-chart-simple"></i>'},
                {path: '/admin/category', name: 'Category', icon: '<i class="fa-solid fa-cubes"></i>'},
                {path: '/admin/giveaway', name: 'Giveaway', icon: '<i class="fa-solid fa-hand-holding-hand"></i>'},
                {path: '/admin/promotion/list', name: 'Promotion', icon: '<i class="fa-solid fa-tags"></i>'},
                {path: '/admin/product/list', name: 'Product', icon: '<i class="fa-solid fa-burger"></i>'},
                {path: '/admin/slideshow/list', name: 'Slideshow', icon: '<i class="fa-regular fa-newspaper"></i>'},
                {path: '/admin/payment', name: 'Payment', icon: '<i class="fa-solid fa-credit-card"></i>'},
                {path: '/admin/order', name: 'Order', icon: '<i class="fa-solid fa-cubes-stacked"></i>'},
                {path: '/admin/register', name: 'Registers', icon: '<i class="fa-solid fa-users"></i>'},
                {path: '/admin/contact', name: 'Contact', icon: '<i class="fa-regular fa-envelope"></i>'},
                {path: '/admin/feedback', name: 'Feedback', icon: '<i class="fa-solid fa-comments"></i>'},
            ],
            notiCons: [
                {count: 8, head: 'New Orders', para: 'You have new orders.'},
                {count: 4, head: 'New Registers', para: 'You have new registers.'},
                {count: 1, head: 'New Messages', para: 'You have new contact messages.'},
            ],
        }
    },

    methods: {
        sidebarToggle() {
            this.sidebarActive ? this.sidebarActive = false : this.sidebarActive = true
        },
        showNotiPopover() {
            this.profileCon = false
            this.notiCon ? this.notiCon = false : this.notiCon = true
        },
        showProfPopover() {
            this.notiCon = false
            this.profileCon ? this.profileCon = false : this.profileCon = true
        },
    }
}
</script>