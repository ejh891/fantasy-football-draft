import moment from 'moment';

const parseTimestamp = (timestamp) => {
    return {
        fromNow: moment(timestamp).fromNow(),
        date: moment(timestamp).format('dddd MMM Do YYYY')
    }
}

export default {
    parseTimestamp
}
