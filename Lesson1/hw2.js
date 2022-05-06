const date = require('date-and-time');
const EventEmiter = require('events');

const [ inputDate ] = process.argv.slice(2);

const PATTERN = date.compile('YYYY-MM-DD HH:mm:ss');

const dateToString = (dateString) => {
    const [ year, month, day, hour, min, sec ] = dateString.split('-');
    return new Date(Date.UTC(year, month - 1, day, hour, min, sec));
} 

const timeLeft = (userDate) => {
    var present = new Date();
    if(present >= userDate) {
        emitter.emit('timeEnd');
    } else {
        const presentFormated = date.format(present, PATTERN);
        const userDateFormated = date.format(userDate, PATTERN);

        const dif = date.subtract(new Date(userDateFormated), new Date(presentFormated)).toSeconds();
   
        console.log(toYDHMS(dif));
    }
};

const toYDHMS = (num_seconds) => {
    var days = Math.floor(num_seconds / (3600 * 24));
    var hours = Math.floor((num_seconds - (days * 24 * 3600)) / 3600);
    var minutes = Math.floor((num_seconds - (days * 24 * 3600) - (hours * 3600)) / 60);
    var seconds = num_seconds - (days * 24 * 3600) - (hours * 3600) - (minutes * 60);


    days = days > 0 ? days + (days == 1 ? ' day ' : ' days ') : '';
    hours = hours > 0 ? hours + (hours == 1 ? ' hour ' : ' hours ') : '';
    minutes = minutes > 0 ? minutes + (minutes == 1 ? ' minute ' : ' minutes ') : '';
    seconds = seconds > 0 ? seconds + (seconds == 1 ? ' second ' : ' seconds ') : '';

    return days + hours + minutes + seconds;
};

const endTime = (timerId) => {
    console.log('Finita la comedia');
}

const emitter = new EventEmiter();
const userDate = dateToString(inputDate);
const userDate1 = date.addSeconds(userDate, 15);
const userDate2 = date.addDays(userDate1, 2);

const timerId = setInterval(() => {
    console.clear();
    emitter.emit('timerTick', userDate)
    emitter.emit('timerTick', userDate1)
    emitter.emit('timerTick', userDate2)
}, 1000);

emitter.on('timerTick', timeLeft);
emitter.on('timeEnd', () => {
    endTime(timerId);
});