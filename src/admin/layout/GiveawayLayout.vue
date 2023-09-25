<template>
    <div>
        <h1 class="text-3xl text-gray-600">Giveaway</h1>
        <!-- giveaway create form  -->
        <giveaway-create-form @addGiveaway="fetchGiveaway"></giveaway-create-form>

        <!-- category update form modal  -->
        <giveaway-update-form 
        :update-item="updateGiveawayItem"
        v-show="giveawayUpdForm"
        class="fixed top-0 left-0 z-[1000] w-full h-screen backdrop-blur-sm"
        @closeform="closeUpdFormModal"></giveaway-update-form>

        <!-- category fetching  -->
        <table class="table-auto w-lg-full w-[800px] border border-gray-300 mt-8">
            <thead class="bg-gray-300 h-14">
                <tr>
                    <th>No.</th>
                    <th>Giveaway Name</th>
                    <th>Image</th>
                    <th colspan="2">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-gray-200">
                <tr 
                v-for="(giveaway, index) in giveaways"
                :key="giveaway.id"
                class="text-center border-0 border-b-2 border-gray-300">
                    <td>{{index+1}}</td>
                    <td>{{giveaway.name}}</td>
                    <td>
                        <img 
                        :src="giveaway.image" 
                        alt="img" 
                        class="w-28 mx-auto">
                    </td>
                    <td>
                        <button 
                        @click="showUpdFormModal(giveaway)"
                        class="blue-btn">
                            update
                        </button>
                    </td>
                    <td>
                        <button 
                        @click="deleteGiveaway(giveaway.id)"
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
        button-style="pagination-btn-blue"
        @changepage="fetchGiveaway"></paginator-one>
    </div>
</template>

<script>
import GiveawayCreateForm from '../components/GiveawayCreateForm.vue'
import PaginatorOne from '../components/PaginatorOne.vue'
import GiveawayUpdateForm from '../components/GiveawayUpdateForm.vue'
import {apiServiceWithAuth} from '@/apiService'

export default {
    name: 'GiveawayLayout',
    components: {
        GiveawayCreateForm,
        PaginatorOne,
        GiveawayUpdateForm,
    },
    data() {
        return {
            giveaways: null,
            paginationData: null,
            pagination: false,
            giveawayUpdForm: false,
            updateGiveawayItem: null,
        }
    },
    created() {
        this.fetchGiveaway();
    },
    methods: {
        // fetching ---
        fetchGiveaway(page=1) {
            const vm = this;
            apiServiceWithAuth.get('/api/admin/giveaway/paginatedlist?page='+page)
            .then(response => {
                vm.giveaways = response.data.data;
                vm.pagination = true;
                vm.paginationData = response.data;
            })
            .catch(error => {
                console.log(error)
            })
        },
        // deleting ---
        deleteGiveaway(id) {
            let vm = this;
            apiServiceWithAuth.delete('/api/admin/giveaway/'+id+'/delete') 
            .then(() => {
                this.fetchGiveaway(vm.paginationData.current_page);
            })
            .catch(error => {
                console.log(error)
            })
        },
        // updating ---
        showUpdFormModal(giveaway) {
            this.updateGiveawayItem = giveaway;
            this.giveawayUpdForm = true;
        },
        closeUpdFormModal() {
            this.giveawayUpdForm = false
            // refetch page 
            this.fetchGiveaway(this.paginationData.current_page);
        }
    }
}
</script>