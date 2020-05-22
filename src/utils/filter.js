export const format = (time, fmt) => {
    console.log(time, 'time');
    console.log(fmt, 'fmt');
    fmt = fmt || 'yyyy-MM-dd hh:mm';
    if (typeof time === 'string') {
        time = +new Date(time);
    }
    let date = new Date(time);

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }

    let dt = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };

    for (let key in dt) {
        if (new RegExp(`(${key})`).test(fmt)) {
            let str = dt[key] + '';
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
            );
        }
    }
    return fmt;
};

export const formatDate = date => {
    let nowDate = new Date();
    let oldTimestamp = +new Date(date);
    let nowTimestamp = nowDate.getTime();
    let sum = nowTimestamp - oldTimestamp;

    let minute = sum / 1000 / 60;
    let hour = sum / 1000 / 60 / 60;
    let day = hour / 24;
    let month = day / 30;
    if (minute < 1) {
        return  '刚刚';
    } else if (minute < 60) {
        return Math.floor(minute) + '分钟前';
    } else if (hour < 24) {
        return Math.floor(hour) + '小时前';
    } else if (day < 30) {
        return Math.floor(day) + '天前';
    } 
    
    
    return Math.floor(month) + '月前';
};
