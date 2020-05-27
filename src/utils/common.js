export const filterField = (object) => {
    if (!object) {
        return {};
    }
    for (let i in object) {
        if (object.hasOwnProperty(i)) {
            if (object[i] === '') {
                delete object[i];
            }
        }
    }
    return object;
};

/**
 * 设置本地存储
 * @param {*} key       主键
 * @param {*} value     值
 */
export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 获取本地存储
 * @param {*} key       主键
 */
export const getLocalStorage = (key) => {
    return localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));
};

/**
 * 展示loading
 */
export const showLoading = () => {
    let elLoading = document.querySelector('.loading-wrapper');
    elLoading.style.display = 'block';
};

/**
 * 隐藏loading
 */
export const hideLoading = () => {
    let elLoading = document.querySelector('.loading-wrapper');
    elLoading.style.display = 'none';
};
