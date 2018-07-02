import moment from 'moment';

export default {
    // 当天
    getNowDay() {
        return {
            startDate: moment().subtract(1, 'day'),
            endDate: moment()
        }
    },
    // 本周
    getNowWeek() {
        return {
            startDate: moment().subtract(7, 'day'),
            endDate: moment()
        }
    },
    // 本月
    getNowMonth() {
        return {
            startDate: moment().subtract(1, 'month'),
            endDate: moment()
        }
    },
    // 本季度
    getNowQuarterly() {
        return {
            startDate: moment().subtract(3, 'month'),
            endDate: moment()
        }
    },
    // 半年
    getHalfYear() {
        return {
            startDate: moment().subtract(6, 'month'),
            endDate: moment()
        };
    },
    // 获取一年
    getNowYear() {
        return {
            startDate: moment().subtract(12, 'month'),
            endDate: moment()
        };
    },
    formatDate(value) {
        if (value) {
            return moment(value).format("YYYY-MM-DD HH:mm:ss");
        } else {
            return '--'
        }
    }
}