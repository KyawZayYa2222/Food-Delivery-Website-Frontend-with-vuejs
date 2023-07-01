<template>
    <div>
        <h1 class="text-2xl font-semibold mb-2">Order History</h1>
        <div>
            <div class="flex flex-col sm:flex-row justify-between sm:items-center bg-gray-100 p-2 border border-gray-200">
                <img src="@/assets/img/welcome-img.png" alt="..." class="w-28 bg-gray-300">
                <p class="min-w-80">Delicious Cheese Burger</p>
                <div class="flex">
                    <p class="block sm:hidden me-1">Items:</p>
                    <p>2</p>
                </div>
                <div class="flex">
                    <p class="block sm:hidden me-1">Quantity:</p>
                    <p>23$</p>
                </div>
                <div class="flex">
                    <p class="block sm:hidden me-1">Date:</p>
                    <p>2/2/2023</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OrderHistory',
}
</script>