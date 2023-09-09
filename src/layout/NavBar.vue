<template>
    <div>
        <nav :class="{'bg-white': bgActive, 'shadow-md': bgActive}" class="z-[1000] w-full mx-auto fixed px-10 py-2 flex justify-between items-center transition duration-400">
            <div>
                <img src="@/assets/img/foodor-logo.png" alt="logo" class="w-28">
            </div>
            <div class="flex items-center">
                <div v-show="menu" class="absolute md:relative top-14 md:top-0 block right-1 bg-white md:bg-transparent rounded-md shadow-md md:shadow-none w-48 md:w-auto">
                    <ul class="md:flex block text-black text-md py-2 md:py-0">
                        <li
                        v-for="(link, index) in links"
                        :key="index" 
                        class="nav-link px-4 lg:px-5 my-3 md:my-0 w-fit">
                            <router-link 
                            :to="link.path" 
                            class="cursor-pointer pb-1 hover:text-orange-500 border-0 transition ease-in-out duration-200">
                            {{link.name}}</router-link>
                        </li>
                        
                        <!-- login or profile link  -->
                        <li class="nav-link lg:ms-20 ps-4 lg:ps-5 my-3 md:my-0">
                            <router-link 
                            :to="LoginOrProfileLink.path" 
                            class="cursor-pointer pb-1 hover:text-orange-500 transition ease-in-out duration-200">
                            {{LoginOrProfileLink.name}}</router-link>
                        </li>

                        <!-- register or logout link  -->
                        <li class="ps-4 lg:ps-5 my-3 md:my-0 md:me-3">
                            <router-link 
                            :to="RegOrLogoutLink.path" 
                            class="cursor-pointer pb-1 md:bg-orange-600 text-black md:text-white md:px-3 
                            md:py-2 md:rounded-md md:hover:bg-orange-700 transition ease-in-out duration-200">
                            {{RegOrLogoutLink.name}}</router-link>
                        </li>
                    </ul>
                </div>
                
                <router-link to="/cart" class="mx-5 text-xl">
                    <div class="relative">
                        <span class="absolute top-[-4px] right-[-5px] z-10 text-xs text-white px-1 py-0 bg-orange-600 rounded-lg">{{cartItemCount}}</span>
                        <i class="fa fa-solid fa-bag-shopping"></i>
                    </div>
                </router-link>
                
                <button class="block md:hidden text-xl text-black" @click="showMenu()">
                    <i class="fa-solid fa-bars"></i>
                </button>
            </div>
        </nav>
    </div>
</template>


<script>
// import { cartList } from '@/cartList.js'
import apiService from '@/apiService'

export default {
    name: 'NavBar',
    data() {
        return {
            bgActive: false,
            menu: true,
            screenWidth: window.innerWidth,
            auth: localStorage.getItem('access-token'),
            cartItemCount: null,
            LoginOrProfileLink: {
                path: '/login',
                name: 'Login'
            },
            RegOrLogoutLink: {
                path: '/register',
                name: 'Register'
            },
            links: [
                {
                    path: '/',
                    name: 'Home'
                },
                {
                    path: '/menu',
                    name: 'Menu'
                },
                {
                    path: '/service',
                    name: 'Service'
                },
                {
                    path: '/contact',
                    name: 'Contact Us'
                },
            ]
        }
    },

    mounted() {
        window.addEventListener('resize', this.updateScreenWidth);
        window.addEventListener('scroll', this.navbarWhite);
        this.performMenu();
        this.getItemCount();
    },

    created() {
        // showing links according to auth 
        if(this.auth) {
            this.LoginOrProfileLink.path = '/profile'
            this.LoginOrProfileLink.name = 'Profile'
            this.RegOrLogoutLink.path = '/logout'
            this.RegOrLogoutLink.name = 'Logout'
        }
    },

    beforeDestory() {
        window.removeEventListener('resize', this.updateScreenWidth);
    },

    methods: {
        navbarWhite() {
            if(scrollY >= 3) {
                this.bgActive = true
            } else {
                this.bgActive = false
            }
        },
        showMenu() {
            this.menu ? this.menu = false : this.menu = true;
        },
        hideMenu() {
            this.menu = false;
        },
        updateScreenWidth() {
            this.screenWidth = window.innerWidth;
        },
        performMenu() {
            this.screenWidth > 768 ? this.menu = true : this.menu = false;
        },
        getItemCount() {
            if(this.auth) {
                let config = { headers : {'Authorization' : `Bearer ${this.auth}`} };

                apiService.get('/api/user/cart/list', config)
                .then(resp => {
                    this.cartItemCount = resp.data.length
                    console.log(resp)
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
    },

    watch: {
        screenWidth() {
            this.performMenu()
        }
    }
}
</script>

<style>
.nav-link .router-link-exact-active {
    position: relative;
}
.nav-link .router-link-exact-active::after {
    position: absolute;
    left: 0%;
    bottom: 0%;
    content: '';
    width: 100%;
    height: 3px;
    border-radius: 6px;
    background: rgb(255, 119, 0);
    animation: 0.7s borderbottom;
}
@keyframes borderbottom {
    0% {
        width: 0%;
    }
    100% {
        width: 100%;
    }
}
</style>