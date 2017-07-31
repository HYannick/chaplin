<template>
    <transition name="datepicker-slide">
        <div class="datepicker" v-if="visible" @click.stop>
            <div class="datepicker__header">
                <div class="datepicker__year"> {{ year }}</div>
                <div class="datepicker__date"> {{ formatted_date }}</div>
            </div>
            <div class="datepicker__controls">
                <transition name="el-zoom-in-top">
                    <div class="datepicker__controls__label" v-for="(month, index) in [month]" :key="index" :class="classDirection">{{month.getFormatted()}}</div>
                </transition>
                <button class="datepicker__next" @click.prevent="nextMonth()">
                    <i class="el-icon-arrow-right"></i>
                </button>
                <button class="datepicker__prev" @click.prevent="prevMonth()">
                    <i class="el-icon-arrow-left"></i>
                </button>
            </div>
            <div class="datepicker__week">
                <div v-for="(day, index) in weekDays" :key="index" class="datepicker__weekdays">{{day}}</div>
            </div>
            <div class="datepicker__days" :class="classWeeks">
                <transition-group name="el-fade-in-linear" tag="div">
                    <div v-for="(month, index) in [month]" :key="index" :class="classDirection">
                        <div class="datepicker__day" :style="{width:  (month.getWeekStart() * 41) + 'px'}">
                        </div>
                        <div class="datepicker__day" v-for="(day, index) in month.getDays()" :key="index" :class="{today: isSelected(day) && isToday,selected: isInArray(day) }">
                            <div class="datepicker__block" @click="selectDate(day)">
                                <span class="datepicker__day__effect"></span>
                                <span class="datepicker__day__text">{{day.format('D')}}</span>
                            </div>
                            <transition name="el-fade-in-linear">
                                <div class="time__select" v-show="isSelected(day) && showPop">
                                    <date-item class="time__select--selector" :dateAt="day" @change="pushDateSet" @cancel="hideTimeSelect">
                                    </date-item>
                                    <div class="time__select--overlay"></div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </transition-group>
            </div>
            <div class="datepicker__actions">
                <el-button @click="cancel">Annuler</el-button>
                <el-button @click="submit">Ok</el-button>
            </div>
        </div>
    </transition>
</template>
<script>
import moment from 'moment';
import Month from './modules/month.js';
import DateItem from './DateItem';
import _ from 'lodash';
export default {
    components: {
        'date-item': DateItem
    },
    props: {
        date: {},
        visible: { type: Boolean, default: true }
    },
    data() {
        return {
            weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
            month: new Month(this.date.month(), this.date.year()),
            classDirection: 'off',
            mutatedDate: this.date,
            temp: [],
            isToday: true,
            value: '',
            dateSet: [],
            showPop: false,

        }
    },
    computed: {
        year() {
            return this.mutatedDate.format('YYYY');
        },
        formatted_date() {
            return this.mutatedDate.format('dddd DD MMM');
        },
        classWeeks() {
            return `has-${this.month.getWeeks()}-weeks`;
        },


    },
    methods: {
        hideTimeSelect(day) {
            let index = this.temp.indexOf(day.unix());
            this.temp.splice(index, 1);
            this.dateSet.splice(index, 1);
            this.showPop = false;
        },
        pushDateSet(item) {
            if (_.findIndex(this.dateSet, item) === -1) {
                this.dateSet.push(item);
            }
            this.showPop = false;
        },
        isSelected(day) {
            return this.mutatedDate.unix() === day.unix();
        },
        selectDate(day) {
            this.isToday = false;
            this.showPop = true;
            if (this.isInArray(day)) {
                let index = this.temp.indexOf(day.unix());
                this.temp.splice(index, 1);
                this.dateSet.splice(index, 1);
                this.showPop = false;
            } else {
                this.mutatedDate = day.clone();
                this.temp.push(this.mutatedDate.unix());
            }
        },
        isInArray(day) {
            const checkDay = day.unix();
            if (this.temp.indexOf(checkDay) !== -1) {
                return true;
            } else {
                return false;
            }
        },
        nextMonth() {
            this.classDirection = 'direction-next';
            let month = this.month.month + 1;
            let year = this.month.year;
            if (month > 11) {
                year += 1;
                month = 0;
            }
            this.month = new Month(month, year);
        },
        prevMonth() {
            this.classDirection = 'direction-prev';
            let month = this.month.month - 1;
            let year = this.month.year;
            if (month < 0) {
                year -= 1;
                month = 11;
            }
            this.month = new Month(month, year);
        },
        submit() {
            this.$emit('change', this.dateSet);
        },
        cancel() {
            this.$emit('cancel');
        }
    }
}
</script>

<style scoped lang="scss">
$header-height: 100px;
$day-size: 41px;
.time__select {
    background: #324157;
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.datepicker {
    position: absolute;
    top: 100%;
    box-shadow: 5px 5px 20px 0px #e2e2e2;
    z-index: 99;
    background: #fff;
    width: 315px;
}

.datepicker__header {
    background: #324157;
    color: #fff;
    padding: 20px;
}

.datepicker__year {
    opacity: 0.7;
    margin-bottom: 10px;
}

.datepicker__date {
    font-size: 32px;
    line-height: 32px;
}

.datepicker__week {
    font-size: 12px;
    line-height: 12px;
    color: rgba(0, 0, 0, 0.8);
    padding: 0 14px;
    display: table;
    width: 100%;
}

.datepicker__weekdays {
    float: left;
    width: $day-size;
    text-align: center;
}

.datepicker__days {
    padding: 0 14px;
    height: $day-size *5;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
    &.has-6-weeks {
        height: $day-size*6;
    }
}

.datepicker__day {
    .datepicker__block {
        position: relative;
    }
    width: $day-size;
    height: $day-size;
    float: left;
    cursor: pointer;
    text-align: center;
    transition: color 450ms cubic-bezier(0.07, 1.04, 0.07, 0.99);
    &:hover,
    &.selected,
    &.today {
        color: #fff;
        .datepicker__day__effect {
            transform: scale(1);
            opacity: 0.6;
        }
    }
}

.datepicker__day__effect {
    position: absolute;
    background: #324157;
    width: 36px;
    height: 36px;
    border-radius: 5px;
    top: 0;
    left: 2px;
    transition: all 450ms cubic-bezier(0.07, 1.04, 0.07, 0.99);
    transform: scale(0);
}

.datepicker__day__text {
    position: relative;
}

.datepicker__controls__label {
    position: absolute;
    text-align: center;
    width: 100%;
    height: 16px;
    line-height: 16px;
    overflow: hidden;
    top: 16px;
    left: 0;
    bottom: 0;
    right: 0;
}

.datepicker__controls {
    position: relative;
    height: 50px;
    line-height: 50px;
    text-align: center;
    button {
        border: none;
        user-select: none;
        cursor: pointer;
        background: transparent;
        outline: none;
        position: relative;
        padding: 0 5px;
    }
    .datepicker__next {
        float: right
    }
    .datepicker__prev {
        float: left
    }
}

.datepicker__actions {
    float: right;
    padding: 0 15px 15px;
}

.datepicker-slide-enter-active,
.datepicker-slide-leave-active {
    opacity: 1;
    transition: all 0.3s;
    transform: translateY(0);
}

.datepicker-slide-leave-to,
.datepicker-slide-enter {
    opacity: 0;
    transform: translateY(-15px);
}

@import './animations';
</style>