<template>
    <div>
        <h1 class="text-3xl text-gray-600">Feedback</h1>
        <h2 class="text-xl text-gray-600 mt-1 mb-4">Feedback/ List</h2>
        <div class="overflow-x-scroll">
            <table class="table-auto w-[1200px] xl:w-full border border-gray-300">
                <thead class="h-10 bg-gray-300">
                    <tr>
                        <th>No</th>
                        <th>User Name</th>
                        <th>Message</th>
                        <th>Public Status</th>
                        <th colspan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(feedback, index) in feedbacks" :key="index" class="text-center border-0 border-b mb-3">
                        <td>{{index+1}}</td>
                        <td>{{feedback.name}}</td>
                        <td class="max-w-lg">{{feedback.message}}</td>
                        <td>
                            <div v-if="feedback.public" class="status-active"></div>
                            <div v-else class="status-unactive"></div>
                        </td>
                        <td>
                            <button v-if="feedback.public" 
                            type="button" 
                            class="gray-btn my-1"
                            @click="controlPublc(feedback.id)">Unpublish</button>
                            <button v-else 
                            type="button" 
                            class="green-btn my-1"
                            @click="controlPublc(feedback.id)">Publish</button>
                        </td>
                        <td>
                            <button 
                            type="button"
                            class="red-btn my-1"
                            @click="deleteFeedback(feedback.id)">Delete</button>
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
        @changepage="fetchFeedback"/>
    </div>
</template>

<script>
import { apiServiceWithAuth } from '@/apiService'
import PaginatorOne from '../components/PaginatorOne.vue'

export default {
    name: 'FeedbackLayout',
    components: {
        PaginatorOne,
    },
    data() {
        return {
            feedbacks: null,
            paginationData: null,
            pagination: false,
        }
    },
    created() {
        this.fetchFeedback();
    },
    methods: {
        fetchFeedback() {
            apiServiceWithAuth.get('/api/admin/feedback/list')
            .then(resp => {
                this.feedbacks = resp.data.data;
                this.paginationData = resp.data;
                this.pagination = true;
            })
            .catch(err => console.log(err))
        },
        controlPublc(id) {
            apiServiceWithAuth.get('/api/admin/feedback/'+id+'/control-public')
            .then(() => this.fetchFeedback())
            .catch(err => console.log(err))
        },
        deleteFeedback(id) {
            apiServiceWithAuth.delete('/api/admin/feedback/'+id+'/delete')
            .then(resp => {
                this.fetchFeedback();
                this.$toasted.show(resp.data.message, {
                    className: ["alert-con", "!bg-red-500"]
                });
            })
            .catch(err => console.log(err))
        }
    }
}
</script>