<template>
    <div class="agenda_container">
        <input type="button" class="el-input__inner" v-model="inputVal" :name="name" @click="showAgenda">
        <dp-agenda :date="date" @change="selectDate" @cancel="hideAgenda" :visible="isVisible"></dp-agenda>
    </div>
</template>
<script>
import moment from 'moment';
import DatePickerAgenda from './DatePickerAgenda';
moment.locale('fr');
export default {
    components: {
        'dp-agenda': DatePickerAgenda
    },
    props: {
        value: { type: String, require: true },
        format: { type: String, default: 'YYYY-MM-DD' },
        name: { type: String }
    },

    methods: {
        selectDate(date) {
            this.date = date;
            this.inputVal = date.map(({date}) => moment.unix(date).format('LLLL'));
            this.hideAgenda();
            console.log('updating')
            this.$emit('change', this.date);
        },
        showAgenda() {
            this.isVisible = !this.isVisible;
            setTimeout(() => document.addEventListener('click', this.hideAgenda), 0);
        },
        hideAgenda() {
            this.isVisible = false;
            document.removeEventListener('click', this.hideAgenda);
        }
    },
    data() {
        return {
            isVisible: false,
            date: moment(this.value, 'YYYY-MM-DD'),
            inputVal: 'Sélectionnez une date'
        }
    }
}
</script>

<style scoped lang="scss">
.agenda_container {
    position: relative;
    width: 100%;
}
</style>