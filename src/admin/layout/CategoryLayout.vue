<template>
    <div>
        <h1 class="text-3xl text-gray-600">Category</h1>
        <!-- category create form  -->
        <category-create-form @addCategory="fetchCategory"></category-create-form>

        <!-- category update form modal  -->
        <category-update-form 
        :update-item="updateCategoryItem"
        v-show="categoryUpdForm"
        class="fixed top-0 left-0 z-[1000] w-full h-screen backdrop-blur-sm"
        @closeform="closeUpdFormModal"></category-update-form>

        <!-- category fetching  -->
        <table class="table-auto w-full border border-gray-300 mt-8">
            <thead class="bg-gray-300 h-14">
                <tr>
                    <th>No.</th>
                    <th>Category Name</th>
                    <th>Image</th>
                    <th>Product Count</th>
                    <th colspan="2">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-gray-200">
                <tr 
                v-for="(category, index) in categories"
                :key="category.id"
                class="text-center border-0 border-b-2 border-gray-300">
                    <td>{{index+1}}</td>
                    <td>{{category.name}}</td>
                    <td><img :src="category.image" alt="img" class="w-28 mx-auto"></td>
                    <td>2</td>
                    <td>
                        <button 
                        @click="showUpdFormModal(category)"
                        class="blue-btn">
                            update
                        </button>
                    </td>
                    <td>
                        <button 
                        @click="deleteCategory(category.id)"
                        class="red-btn">
                            delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- paginator  -->
        <paginator-one 
        v-if="pagination" 
        :data="paginationData" 
        @changepage="fetchCategory"/>

    </div>
</template>


<script>
import CategoryCreateForm from '../components/CategoryCreateForm.vue'
import CategoryUpdateForm from '../components/CategoryUpdateForm.vue'
import axios from 'axios'
import PaginatorOne from '../components/PaginatorOne.vue'


export default {
    name: 'CategoryLayout',
    components: {
        CategoryCreateForm,
        CategoryUpdateForm,
        PaginatorOne,
    },
    data() {
        return {
            categories: null,
            paginationData: null,
            pagination: false,
            categoryUpdForm: false,
            updateCategoryItem: null,
        }
    },
    mounted() {
        this.fetchCategory();
    },
    methods: {
        // fetching ---
        fetchCategory(page=1) {
            const vm = this;

            axios.get('http://127.0.0.1:8000/api/category/paginatedlist?page='+page)
            .then(response => {
                vm.categories = response.data.data;
                vm.pagination = true;
                vm.paginationData = response.data;
            })
            .catch(error => {
                console.log(error)
            })
        },

        // deleting ---
        deleteCategory(id) {
            let vm = this;
            const token = localStorage.getItem('access-token');
            let config = { headers : {'Authorization' : `Bearer ${token}`} };
            axios.delete('http://127.0.0.1:8000/api/admin/category/'+id+'/delete', config) 
            .then(() => {
                this.fetchCategory(vm.paginationData.current_page);
            })
            .catch(error => {
                console.log(error)
            })
        },

        // updating ---
        showUpdFormModal(category) {
            this.updateCategoryItem = category;
            this.categoryUpdForm = true;
        },
        closeUpdFormModal() {
            this.categoryUpdForm = false
            // refetch page 
            this.fetchCategory(this.paginationData.current_page);
        }
    },

}
</script>