<template>
    <div>
        <h2 class="text-xl text-gray-600 mt-1 mb-4">Slideshow/ List</h2>
        <div class="overflow-x-scroll">
            <div class="w-full">
                <router-link 
                to="/admin/slideshow/create"
                class="blue-btn mb-3 float-right">
                    <i class="fa-solid fa-plus"></i> Create Slideshow
                </router-link>
            </div>
            <table class="table-auto w-[1200px] xl:w-full border border-gray-300">
                <thead class="h-10 bg-gray-300">
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Active</th>
                        <th>Show Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(slideshow, index) in slideshows" :key="index" class="text-center">
                        <td>{{index+1}}</td>
                        <td>{{slideshow.name}}</td>
                        <td>
                            <div v-if="slideshow.active" class="status-active"></div>
                            <div v-else class="status-unactive"></div>
                        </td>
                        <td>{{slideshow.show_date}}</td>
                        <td>{{slideshow.end_date}}</td>
                        <td>
                            <button type="button" class="orange-btn mb-1 me-2" @click="showView(slideshow)">View</button>
                            <button type="button" class="blue-btn mb-1 me-2" @click="showEdit(slideshow)">Edit</button>
                            <button type="button" class="red-btn mb-1" @click="slideshowDelete(slideshow.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { apiServiceWithAuth } from '@/apiService'

export default {
    name: 'SlideshowList',
    data() {
        return {
            slideshows: null,
        }
    },
    created() {
        this.fetchSlideshow();
    },
    methods: {
        fetchSlideshow() {
            apiServiceWithAuth.get('/api/admin/slideshow/list')
            .then(resp => {
                this.slideshows = resp.data;
            })
            .catch(err => console.log(err))
        },
        showView(slideshow) {
            this.$router.push({name: 'adminSlideshowView', params: {'slideshow': slideshow}});
        },
        showEdit(slideshow) {
            this.$router.push({name: 'adminSlideshowUpdate', params: {'slideshow': slideshow}});
        },
        slideshowDelete($id) {
            apiServiceWithAuth.delete('/api/admin/slideshow/'+$id+'/delete')
            .then(resp => {
                this.fetchSlideshow();
                this.$toasted.show(resp.data.message, {
                    className: ["alert-con", "!bg-red-500"]
                });
            })
            .catch(err => console.log(err))
        }
    }
}
</script>