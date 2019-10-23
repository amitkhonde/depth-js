module.exports = {
    cloneDeep,
    omitDeep,
    findDeep
}

function cloneDeep(source) {
    if (!isObject(source)) {
        throw "argument is not an object";
    }

    if (isArray(source)) {
        return getDeepArray(source, cloneDeep);
    }

    let target = {};
    for (let key in source) {
        if (isArray(source[key])) {
            target[key] = getDeepArray(source[key], cloneDeep);
        } else if (isObject(source[key])) {
            target[key] = cloneDeep(source[key]);
        } else {
            target[key] = source[key];
        }
    }

    return target;
}

function omitDeep(source, keys) {
    if (!isObject(source)) {
        throw "argument is not an object";
    }

    let target = {};
    for (let key in source) {
        if (!keys.includes(key)) {
            if (isArray(source[key])) {
                target[key] = getDeepArray(source[key], omitDeep, keys);
            } else if (isObject(source[key])) {
                target[key] = omitDeep(source[key], keys);
            } else {
                target[key] = source[key];
            }
        }
    }

    return target;
}

function findDeep(obj, key) {
    if (!isObject(obj)) {
        throw "argument is not an object";
    }

    for (objKey in obj) {
        if (objKey === key) {
            return obj[key];
        } else if (isArray(obj[objKey])) {
            return getDeepArray(obj[objKey], findDeep, key)[0];
        } else if (isObject(obj[objKey])) {
            return findDeep(obj[objKey], key);
        }
    }

    return undefined;
}

function getDeepArray(arr, callBack, keys = []) {
    return arr.map(ele => {
        if (isArray(ele)) {
            return getDeepArray(ele, keys);
        } else if (isObject(ele)) {
            return callBack(ele, keys);
        } else {
            return ele;
        }
    });
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

function isObject(obj) {
    return typeof(obj) === 'object';
}
