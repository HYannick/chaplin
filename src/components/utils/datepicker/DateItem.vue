<template>
    <el-row class="item__row">
        <el-col :span="24">
            <h3>{{time || '00:00'}}</h3>
        </el-col>
        <el-col :span="24">
            <el-time-select class="timer__select" v-model="time" :picker-options="{
                                                    start: '16:00',
                                                    step: '00:30',
                                                    end: '21:00'
                                                  }" placeholder="Select time">
            </el-time-select>
            <el-select v-model="dubbing" class="timer__dubbing" placeholder="Select">
                <el-option v-for="item in dubbingArray" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-button type="primary" @click="confirmDate">Confirm</el-button>
        <el-button  @click="cancelDate">Annuler</el-button>
    
    </el-row>
</template>
<script>
import moment from 'moment';
import DatePickerAgenda from './DatePickerAgenda';
import dubbingArray from '../../movies/datas/dubbing';
moment.locale('fr');
export default {
    props: ['dateAt'],
    data() {
        return {
            time: '',
            dubbing: [],
            dubbingArray
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
            this.$emit('change', { 
                'date': this.dateAt.unix(),
                'time': (this.time !== "") ? this.time : '00:00', 
                'fullDate': this.getFullDate(), 
                'dubbing': (this.dubbing.length === 0) ? ['VF'] : this.dubbing
                }
            )
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
.timer__select, .timer__dubbing{
    margin-bottom: 10px;
}
</style>