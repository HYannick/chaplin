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
    getSaturdays() {
        var d = new Date(this.year, this.month, 1),
            saturdays = [];
        d.setDate(d.getDate() + (10 - d.getDay()) % 7)
        while (d.getMonth() === this.month) {
            tuesdays.push(new Date(d.getTime()));
            d.setDate(d.getDate() + 7);
        }

        return saturdays;
    }
    getSundays() {
        var d = new Date(this.year, this.month, 1),
            tuesdays = [];
        d.setDate(d.getDate() + (10 - d.getDay()) % 7)
        while (d.getMonth() === this.month) {
            tuesdays.push(new Date(d.getTime()));
            d.setDate(d.getDate() + 7);
        }

        return tuesdays;
    }
    getTuesdays() {
        var d = new Date(this.year, this.month, 1),
            tuesdays = [];
        d.setDate(d.getDate() + (10 - d.getDay()) % 7)
        while (d.getMonth() === this.month) {
            tuesdays.push(new Date(d.getTime()));
            d.setDate(d.getDate() + 7);
        }

        return tuesdays;
    }
}