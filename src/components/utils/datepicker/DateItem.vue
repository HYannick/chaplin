<template>
    <el-row class="item__row">
        <el-col :span="15">
            {{getFullDate}}
        </el-col>
        <el-col :span="2">
            <el-time-select v-model="time" :picker-options="{
                                                start: '08:30',
                                                step: '00:15',
                                                end: '18:30'
                                              }" placeholder="Select time">
            </el-time-select>
        </el-col>
        
    </el-row>
</template>
<script>
import moment from 'moment';
import DatePickerAgenda from './DatePickerAgenda';
moment.locale('fr');
export default {
    props: ['dateObj'],

    computed: {
        getFullDate() {

            const toParse = this.dateObj.date;
            const hours = this.time.split(':')
            return moment.unix(toParse).add(hours[0], 'h').add(hours[1], 'm').format('LLLL')
        }
    },
    data() {
        return {
            time: ''
        }
    },
    beforeUpdate() {
        this.$emit('transform', { 'date': this.dateObj.date, 'time': this.time })
    }
}
</script>

<style scoped lang="scss">
    .item__row{
        margin-bottom: 5px
    }
</style>