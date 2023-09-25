<template>
    <div>
        <h1 class="text-3xl text-gray-600">Contact</h1>
        <h2 class="text-xl text-gray-600 mt-1 mb-4">Contact/ List</h2>

        <div class="overflow-x-scroll">
            <table class="table-auto w-[1200px] xl:w-full border border-gray-300">
                <thead class="h-10 bg-gray-300">
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(contact, index) in contacts" :key="index" class="text-center">
                        <td>{{index+1}}</td>
                        <td>{{contact.name}}</td>
                        <td>{{contact.email}}</td>
                        <td>{{contact.message}}</td>
                        <td>{{contact.status}}</td>
                        <td>
                            <button class="blue-btn me-2">Mark as Read</button>
                            <button 
                            type="button"
                            class="red-btn my-1"
                            @click="deleteContact(contact.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- paginator  -->
        <paginator-one 
        v-if="pagination" 
        :data="paginationData" 
        button-style="pagination-btn-blue"
        @changepage="fetchContact"/>
    </div>
</template>

<script>
import { apiServiceWithAuth } from '@/apiService'
import PaginatorOne from '../components/PaginatorOne.vue'

export default {
    name: 'ContactLayout',
    components: {
        PaginatorOne
    },
    data() {
        return {
            contacts: null,
            pagination: false,
            paginationData: null,
        }
    },
    created() {
        this.fetchContact()
    },
    methods: {
        fetchContact() {
            apiServiceWithAuth.get('/api/admin/contact/list')
            .then(resp => {
                this.contacts = resp.data.data;
                this.paginationData = resp.data;
                this.pagination = true;
            })
            .catch(err => console.log(err))
        },
        deleteContact(id) {
            apiServiceWithAuth.delete('/api/admin/contact/'+id+'/delete')
            .then(resp => {
                this.fetchContact()
                this.$toasted.show(resp.data.message, {
                    className: ["alert-con", "!bg-red-500"]
                });
            })
            .catch(err => console.log(err))
        }
    }
}
</script>