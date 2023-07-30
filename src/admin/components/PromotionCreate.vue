<template>
    <div>
        <h2 class="text-xl text-gray-600 mt-2">Promotion/ Create</h2>

        <router-link to="/admin/promotion/list" class="gray-btn float-right me-4">Back to list</router-link>

        <form @submit.prevent="createPromotion" class="mt-5">
            
            <label class="text-xl text-gray-800">Choose promotion type</label><br>
            
            <div class="mb-3">
                <input type="radio" id="giveaway" value="giveaway" v-model="promotionType">&nbsp;
                <label for="giveaway" class="me-3">Giveaway</label>

                <input type="radio" id="discount" value="discount" v-model="promotionType">&nbsp;
                <label for="discount" class="me-3">Discount</label>

                <input type="radio" id="cashback" value="cashback" v-model="promotionType">&nbsp;
                <label for="cashback" class="me-3">Cashback</label>
            </div>

            <!-- giveaway input  -->
            <small class="text-red-600 font-semibold" v-if="errors && errors.giveaway_id">{{errors.giveaway_id[0]}}</small>
            <div v-if="promotionType==='giveaway'" class="w-96 border-2 border-gray-400 bg-gray-500">
                <label class="text-lg text-white ps-1 py-2">Choose A Giveaway</label>

                <div class="bg-white max-h-60 overflow-y-scroll">
                    <ul
                    v-for="giveaway in giveaways"
                    :key="giveaway.id">
                        <li class="hover:bg-gray-200 py-1">
                            <input 
                            type="radio" 
                            :id="giveaway.id" 
                            :value="giveaway.id" 
                            v-model="giveawayId"
                            class="hidden"> &nbsp;
                            <label 
                            class="cursor-pointer"
                            :for="giveaway.id">
                            <i v-if="giveawayId==giveaway.id" class="fa-solid fa-check text-green-700 font-semibold"></i> 
                            {{giveaway.name}}</label>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- discount input  -->
            <small class="text-red-600 font-semibold" v-if="errors && errors.discount">{{errors.discount[0]}}</small>
            <div v-if="promotionType==='discount'">
                <label for="discount-input">Insert discount</label><br>
                <input 
                type="text"
                v-model="discount"
                id="discount-input"
                class="w-80 input-one"
                placeholder="10"><span class="text-white bg-gray-500 ms-1 py-3 px-2 rounded-md">%</span>
            </div>

            <!-- cashback input  -->
            <small class="text-red-600 font-semibold" v-if="errors && errors.cashback">{{errors.cashback[0]}}</small>
            <div v-if="promotionType==='cashback'">
                <label for="cashback-input">Insert cashback</label><br>
                <input 
                type="text"
                v-model="cashback"
                id="cashback-input"
                class="w-80 input-one"
                placeholder="500"><span class="text-white bg-gray-500 ms-1 py-3 px-2 rounded-md">Ks</span>
            </div>
            
            <!-- start date  -->
            <div class="mt-5">
                <label for="start-date" class="text-lg text-gray-800 me-2">Enter start date</label>
                <date-picker 
                id="start-date" 
                placeholder="YYYY-MM-DD" 
                valueType="date"
                v-model="pickedStartDate"></date-picker>&nbsp;
                <small class="text-red-600 font-semibold" v-if="errors && errors.start_date">{{errors.start_date[0]}}</small>
            </div>

            <!-- end date  -->
            <div class="mt-5">
                <label for="start-date" class="text-lg text-gray-800 me-2">Enter end date</label>
                <date-picker 
                id="end-date" 
                placeholder="YYYY-MM-DD" 
                v-model="pickedEndDate"></date-picker>&nbsp;
                <small class="text-red-600 font-semibold" v-if="errors && errors.end_date">{{errors.end_date[0]}}</small>
            </div>

            <button class="w-96 blue-btn mt-4">Summit create</button>
        </form>
    </div>
</template>


<script>
import axios from 'axios'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'; 

export default {
    name: 'PromotionCreate',
    components: {
        DatePicker,
    },
    mounted() {
        this.fetchGiveaway()
    },
    data() {
        return {
            giveaways: null,
            token: localStorage.getItem('access-token'),
            promotionType: 'giveaway',
            giveawayId: null,
            discount: null,
            cashback: null,
            pickedStartDate: null,
            pickedEndDate: null,
            errors: null,
        }
    },
    computed: {
        formattedStartDate: function() {
            return this.formatDate(this.pickedStartDate)
        },
        formattedEndDate: function() {
            return this.formatDate(this.pickedEndDate)
        },
    },
    methods: {
        fetchGiveaway() {
            const vm = this;
            let config = { headers : {'Authorization' : `Bearer ${this.token}`} };
            axios.get('http://127.0.0.1:8000/api/admin/giveaway/list', config)
            .then(response => {
                vm.giveaways = response.data;
            })
            .catch(error => {
                console.log(error)
            })
        },

        // format picked date
        formatDate(pickedDate) {
            let localDate = new Date(pickedDate.getTime() - pickedDate.getTimezoneOffset() * 60 * 1000);
            let formattedDate = pickedDate != null ? localDate.toISOString('YYYY-MM-DD').slice(0,10) : null
            return formattedDate;
        },

        createPromotion() {
            let config = { headers : {'Authorization' : `Bearer ${this.token}`} };
            let requestData = {
                promotion_type: this.promotionType,
                giveaway_id: this.giveawayId,
                discount: this.discount,
                cashback: this.cashback,
                start_date: this.formattedStartDate,
                end_date: this.formattedEndDate,
            }

            axios.post('http://127.0.0.1:8000/api/admin/promotion/create', requestData, config)
            .then(response => {
                console.log(response);
                this.$router.push('list')
            })
            .catch(error => {
                console.log(error)
                this.errors = error.response.data.errors;
                console.log(this.errors)
            })
        }
    },
    // watch: {
    //     endDate(value) {
    //         this.endDate = value
    //         console.log(value)
    //     }
    // }
}
</script>