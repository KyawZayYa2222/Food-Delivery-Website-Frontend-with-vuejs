<template>
    <div class="w-full">
        <h1 class="text-3xl mb-3 text-gray-600">Product</h1>
        <div class="w-full">
            <router-link 
            to="/admin/product/create"
            class="bg-blue-600 text-white hover:bg-blue-700 border-blue-700 px-4 py-2 mb-3 
            rounded-md float-right">
                <i class="fa-solid fa-plus"></i> Create product
            </router-link>
        </div>

        <table class="table-auto w-full border border-gray-300">
            <thead class="h-10 bg-gray-300">
                <tr>
                    <th>No.</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Short Description</th>
                    <th>Long Description</th>
                    <th colspan="2">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center">
                    <td>1.</td>
                    <td><img src="@/assets/img/burger-img.png" alt="img" class="w-24 mx-auto"></td>
                    <td>Burger burger</td>
                    <td>20$</td>
                    <td>nice sheet huge delicious burger</td>
                    <td class="w-[500px]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus officia nemo 
                        repellendus illo nihil voluptas asperiores at, numquam totam sequi tenetur omnis 
                        iure est error iusto necessitatibus, eveniet ipsum excepturi?
                    </td>
                    <td>
                        <button title="edit" class="bg-blue-600 text-white px-2 py-1 rounded-md border border-blue-600 hover:bg-blue-700">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </td>
                    <td>
                        <button title="delete" class="bg-red-600 text-white px-2 py-1 rounded-md border border-red-600 hover:bg-red-700">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'ProductLayout',
}
</script>