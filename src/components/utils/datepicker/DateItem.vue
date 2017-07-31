<template>
    <el-row class="item__row">
        <el-col :span="24">
            <h3>{{time || '00:00'}}</h3>
        </el-col>
        <el-col :span="24">
            <el-time-select class="timer__select" v-model="time" :picker-options="{
                                                    start: '08:30',
                                                    step: '00:15',
                                                    end: '18:30'
                                                  }" placeholder="Select time">
            </el-time-select>
        </el-col>
        <el-button type="primary" @click="confirmDate">Confirm</el-button>
        <el-button  @click="cancelDate">Cancel</el-button>
    
    </el-row>
</template>
<script>
import moment from 'moment';
import DatePickerAgenda from './DatePickerAgenda';
moment.locale('fr');
export default {
    props: ['dateAt'],
    data() {
        return {
            time: ''
        }
    },
    beforeUpdate() {

    },
    methods: {
        getFullDate() {
            const toParse = this.dateAt.unix();
            const hours = this.time.split(':')
            return moment.unix(toParse).add(hours[0], 'h').add(hours[1], 'm')
        },
        confirmDate() {
            this.$emit('change', { 'date': this.dateAt.unix(), 'time': (this.time !== "") ? this.time : '00:00', 'fullDate': this.getFullDate()})
        },
        cancelDate(){
            this.$emit('cancel', this.dateAt);
        }
    }

}
</script>

<style scoped lang="scss">
.item__row{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    h3{
        color: #fff;
        opacity: 0.8;
    }
}
.timer__select{
    margin-bottom: 10px;
}
</style>