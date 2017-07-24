import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

export default class Month {
    constructor(month, year) {
        this.start = moment([year, month]);
        this.end = this.start.clone().endOf('month');
        this.month = month;
        this.year = year;
    }

    getWeekStart() {
        return this.start.weekday();
    }
    getWeeks() {
        return this.end.week() - this.start.week() + 1;
    }
    getDays() {
        const range = moment.range(this.start, this.end);

        for (let month of range.by('month')) {
            month.format('YYYY-MM-DD');
        }

        const days = Array.from(range.by('days'));
        return days.map(d => d);
    }

    getFormatted() {
        return this.start.format('MMMM YYYY');
    }
}