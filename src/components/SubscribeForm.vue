<template>
    <div>
        <h1 class="text-xl mb-3">Get News: </h1>
        <form>
            <input 
            type="text" 
            v-model="email" 
            class="px-2 py-1 w-72 bg-transparent border border-white">
        </form>
    </div>
</template>

<script>
export default {
    name: 'SubscribeForm',
    data() {
        return {
            email: null,
        }
    }
}
</script>