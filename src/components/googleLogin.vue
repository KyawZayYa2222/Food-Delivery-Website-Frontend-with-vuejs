<template>
    <button 
    @click="loginWithGoogle()"
    class="w-full border-2 border-gray-400 py-1 text-gray-700 font-semibold flex items-center 
    justify-center hover:border-black transition delay-75 duration-150">
        <img src="@/assets/img/google-icon.png" alt="google-icon" class="w-12">
        Continue with google
    </button>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {apiService} from '@/apiService';
import {storeAuthInfo} from '@/formHandler.js'

export default {
    name: 'googleLogin',
    methods: {
        async loginWithGoogle() {
            try {
                const provider = new GoogleAuthProvider();
                const auth = getAuth()
                await signInWithPopup(auth, provider)
                .then((result) => {
                    var user = result.user;
                    let formData = {
                        'uid': user.uid,
                        'name': user.displayName,
                        'email': user.email,
                        'image': user.photoURL,
                    };
                    console.log(formData)

                    apiService.post('/api/google-login', formData)
                    .then(resp => {
                        console.log(resp)
                        let userData = resp.data.userData;
                        let token = resp.data.token;
                        storeAuthInfo(userData, token);
                        this.$nextTick(() => {
                            this.$router.push('/menu');
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
            } catch (err) {
                console.error(err);
            }
        },
    }
}
</script>