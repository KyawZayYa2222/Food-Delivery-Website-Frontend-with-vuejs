<template>
    <div>
        <h1 class="text-3xl text-gray-600">Register</h1>
        <h2 class="text-xl text-gray-600 mt-1 mb-4">Register/ List</h2>
        <div class="overflow-x-scroll">
            <table class="table-auto w-[1200px] xl:w-full border border-gray-300">
                <thead class="h-10 bg-gray-300">
                    <tr>
                        <th>No</th>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in registers" :key="index" class="text-center">
                        <td>{{index+1}}</td>
                        <td>
                            <img :src="user.image" class="w-12 h-12 mx-auto my-1">
                        </td>
                        <td>{{user.name}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.phone}}</td>
                        <td>{{user.address}}</td>
                        <td>
                            <button type="button"
                            class="red-btn mb-1"
                            @click="deleteUser(user.id)">Delete</button>
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
        @changepage="fetchOrder"/>
    </div>
</template>

<script>
import {apiServiceWithAuth} from '@/apiService'
import PaginatorOne from '../components/PaginatorOne.vue'

export default {
    name: 'RegisterLayout',
    components: {
        PaginatorOne,
    },
    data() {
        return {
            registers: null,
            pagination: false,
            paginationData: null,
        }
    },
    created() {
        this.fetchRegisteredUser()
    },
    methods: {
        fetchRegisteredUser(page) {
            apiServiceWithAuth.get('/api/admin/user/list?page=' + page)
            .then(resp => {
                this.pagination = true;
                this.paginationData = resp.data;
                this.registers = resp.data.data;
            })
            .catch(error => {
                console.log(error);
            })
        },
        deleteUser(id) {
            apiServiceWithAuth.delete('/api/admin/user/'+id+'/delete')
            .then(resp => {
                this.fetchRegisteredUser()
                this.$toasted.show(resp.data.message, {
                    className: ["alert-con", "!bg-red-500"]
                });
            })
            .catch(err => console.log(err))
        } 
    }
}
</script>