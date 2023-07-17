<template>
    <div>
        <h1 class="text-3xl text-gray-600">Category</h1>
        <!-- category create form  -->
        <category-create-form @addCategory="fetchCategory"></category-create-form>

        <!-- category update form modal  -->
        <category-update-form 
        :update-item="updateCategoryItem"
        v-show="categoryUpdForm"
        class="fixed top-0 left-0 z-[1000] w-full h-screen backdrop-blur-sm"></category-update-form>
        <!-- category fetching  -->
        <table class="table-auto w-[600px] border border-gray-300 mt-5">
            <thead class="bg-gray-400 h-10">
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Product Count</th>
                    <th colspan="2">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-gray-200">
                <tr 
                v-for="(category, index) in categories"
                :key="category.id"
                class="text-center border-0 border-b-2 border-gray-400">
                    <td>{{index}}</td>
                    <td>{{category.name}}</td>
                    <td><img :src="category.image" alt="img" class="w-28 mx-auto"></td>
                    <td>2</td>
                    <td>
                        <button 
                        @click="showUpdFormModal(category)"
                        class="bg-blue-600 text-white px-2 py-1 rounded-md border border-blue-600 hover:bg-blue-700">
                            <i class="fa-solid fa-pen-to-square"></i> update
                        </button>
                    </td>
                    <td>
                        <button 
                        @click="deleteCategory(category.id)"
                        class="bg-red-600 text-white px-2 py-1 rounded-md border border-red-600 hover:bg-red-700">
                            <i class="fa-regular fa-trash-can"></i> delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
import CategoryCreateForm from '../components/CategoryCreateForm.vue'
import CategoryUpdateForm from '../components/CategoryUpdateForm.vue'
import axios from 'axios'


export default {
    name: 'CategoryLayout',
    components: {
        CategoryCreateForm,
        CategoryUpdateForm
    },
    data() {
        return {
            categoryInput: null,
            categories: null,
            categoryUpdForm: false,
            updateCategoryItem: null,
        }
    },
    mounted() {
        this.fetchCategory();
    },
    methods: {
        fetchCategory() {
            const vm = this;
            const token = localStorage.getItem('access-token');
            let config = { headers : {'Authorization' : `Bearer ${token}`} };

            axios.get('http://127.0.0.1:8000/api/category/list', config)
            .then(response => {
                vm.categories = response.data;
                console.log(vm.categories);
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                console.log('finished')
            })
        },
        deleteCategory(id) {
            console.log(id)
        },
        showUpdFormModal(category) {
            this.updateCategoryItem = category;
            this.categoryUpdForm = true;
        }
    },
    watch: {
        updateCategoryItem(value) {
            this.updateCategoryItem = value
            console.log(value.name)
        }
    }
}
</script>