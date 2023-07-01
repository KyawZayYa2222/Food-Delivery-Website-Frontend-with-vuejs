<template>
    <div>
        <nav-bar></nav-bar>
        <div class="min-h-screen flex items-center sm:bg-gradient-to-bl sm:from-white sm:to-orange-500 sm:from-75% sm:to-75%">
            <div class="grid grid-cols-1 md:grid-cols-2 mx-auto">
                <div class="mx-auto w-fit mb-5">
                    <h1 class="text-6xl font-light text-gray-950 mb-5">Contact Us</h1>
                    <div class="text-md font-semibold text-gray-700 mb-5">
                        <p>Our Company Address is:</p>
                        <p>B-64 street, Losangle</p>
                        <p>Email: hr@foodor.com</p>
                        <p>Phone: 705-742-322</p>
                    </div>
                    <div class="flex text-2xl">
                        <a href="#facebook" class="pe-2">
                            <i class="fa-brands fa-facebook"></i>
                        </a>
                        <a href="#instagram" class="pe-2">
                            <i class="fa-brands fa-instagram"></i>
                        </a>
                        <a href="#twitter" class="pe-2">
                            <i class="fa-brands fa-twitter"></i>
                        </a>
                    </div>
                </div>
                <div>
                    <contact-form></contact-form>
                </div>
            </div>
        </div>
        <footer-section></footer-section>
    </div>
</template>

<script>
import NavBar from '../layout/NavBar.vue'
import FooterSection from '../layout/FooterSection.vue'
import ContactForm from '@/components/ContactForm.vue'

export default {
    name: 'ContactPage',
    components: { 
        NavBar,
        FooterSection,
        ContactForm,
    },
}
</script>