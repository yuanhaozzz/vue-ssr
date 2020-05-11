export const filterField = object => {
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
