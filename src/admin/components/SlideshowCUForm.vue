<template>
    <div>
        <div class="w-full text-right">
            <router-link to="/admin/slideshow/list" type="button" class="gray-btn">Back to list</router-link>
        </div>
        <div class="max-w-[600px] mt-3">
            <form @submit.prevent="submit">
                <label for="name" class="form-label-1">Name</label>
                <small class="error-text" v-if="errors && errors.name">{{errors.name[0]}}</small>
                <input 
                type="text" 
                id="name"
                v-model="name"
                class="input-one w-full mb-3">
                <label for="title" class="form-label-1">Title</label>
                <small class="error-text" v-if="errors && errors.title">{{errors.title[0]}}</small>
                <input 
                type="text" 
                id="title"
                v-model="title"
                class="input-one w-full mb-3">
                <label for="sub-title" class="form-label-1">Sub Title</label>
                <small class="error-text" v-if="errors && errors.sub_title">{{errors.sub_title[0]}}</small>
                <input 
                type="text" 
                id="sub-title"
                v-model="subTitle"
                class="input-one w-full mb-3">
                <label for="desc" class="form-label-1">Description</label>
                <small class="error-text" v-if="errors && errors.description">{{errors.description[0]}}</small>
                <textarea 
                id="desc" 
                v-model="description"
                class="input-one w-full h-28 py-1"></textarea>
                <label for="bg-img" class="form-label-1">Backgroud Image</label>
                <small class="error-text" v-if="errors && errors.image">{{errors.image[0]}}</small>
                <input 
                type="file" 
                id="bg-img" 
                class="mt-1"
                @change="handleFileInput"><br>
                <!-- start date  -->
                <div class="mt-3">
                    <label for="start-date" class="block form-label-1">Start date</label>
                    <small class="error-text" v-if="errors && errors.show_date">{{errors.show_date[0]}}</small>
                    <date-picker
                    id="start-date" 
                    placeholder="YYYY-MM-DD" 
                    valueType="date"
                    v-model="pickedShowDate"></date-picker>
                </div>
                <!-- end date  -->
                <div class="mt-3">
                    <label for="end-date" class="form-label-1">End date</label>
                    <small class="error-text" v-if="errors && errors.end_date">{{errors.end_date[0]}}</small>
                    <date-picker 
                    id="end-date" 
                    placeholder="YYYY-MM-DD" 
                    valueType="date"
                    v-model="pickedEndDate"></date-picker>
                </div>
                <div class="w-full">
                    <button type="submit" class="block ms-auto blue-btn px-8">{{method}}</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'; 
import {formatDate} from '@/formHandler'

export default {
    name: 'SlideshowCUForm',
    props: [
        'method',
        'errors',
        'updateItem',
    ],
    components: {
        DatePicker,
    },
    data() {
        return {
            name: null,
            title: null,
            subTitle: null,
            description: null,
            pickedShowDate: null,
            pickedEndDate: null,
            image: null,
        }
    },
    created() {
        this.updateItemParams();
    },
    methods: {
        updateItemParams() {
            this.name = this.updateItem.name;
            this.title = this.updateItem.title;
            this.subTitle = this.updateItem.sub_title;
            this.description = this.updateItem.description;
        },
        handleFileInput(e) {
            this.image = e.target.files[0];    
        },
        submit() {
            let showDate = formatDate(this.pickedShowDate);
            let endDate = formatDate(this.pickedEndDate);
            let formData = new FormData();

            this.name != null ? formData.append('name', this.name) : null;
            this.title != null ? formData.append('title', this.title) : null;
            this.subTitle != null ? formData.append('sub_title', this.subTitle) : null;
            this.image != null ? formData.append('image', this.image) : null;
            this.description != null ? formData.append('description', this.description) : null;
            showDate != null ? formData.append('show_date', showDate) : null;
            endDate != null ? formData.append('end_date', endDate) : null;

            this.$emit('formSubmitted', formData);
        }
    }
}
</script>