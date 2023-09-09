<template>
    <div class="flex justify-between items-center w-full mt-4 pb-2">
        <p class="ms-2">showing {{data.from}} - {{data.to}} of {{data.total}}</p>
        <div class="d-flex">
            <button @click="pageChange('first')" :class="buttonStyle">first</button>
            <button @click="pageChange('prev')" :class="buttonStyle">&#60;</button>

            <div v-for="index in data.last_page" :key="index" class="inline-block">
                <button 
                v-if="data.current_page==index || 
                data.current_page-1 == index || 
                data.current_page+1 == index" 
                class="pagination-btn" 
                :class="[buttonStyle, {'border-t-4 border-e-4': data.current_page==index}]"
                @click="$emit('changepage', index)">{{index}}</button>
            </div>

            <button @click="pageChange('next')" :class="buttonStyle">&#62;</button>
            <button @click="pageChange('last')" :class="buttonStyle">last</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PaginatorOne',
    props: ['data', 'buttonStyle'],
    data() {
        return {
            
        }
    },
    mounted() {
        // console.log(this.data);
    },
    computed: {
        activeBtnColor: function() {
            return this.buttonStyle === 'pagination-btn-blue' ? 'bg-blue-600' : 'bg-orange-600';
        },
    },
    methods: {
        pageChange(btnType) {
            let page;
            switch (btnType) {
                case 'first':
                    page = 1
                    break;

                case 'last':
                    page = this.data.last_page;
                    break;
                
                case 'prev':
                    if (this.data.prev_page_url != null) {
                        page = this.data.current_page - 1;
                    }
                    break;

                case 'next':
                    if (this.data.next_page_url != null) {
                        page = this.data.current_page + 1;
                    }
                    break;

                default:
                    break;
            }

            this.$emit('changepage', page);
        }
    }
}
</script>