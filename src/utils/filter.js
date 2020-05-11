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

    return Math.floor((nowTimestamp - oldTimestamp) / 1000 / 60 / 60 / 24);
};
