/*
//解除循环引用的toJson
window.toJson = function (o, skipKeys, space) {
    let cache = [];
    let json = JSON.stringify(o, function (key, value) {
        if (skipKeys != null && skipKeys.indexOf(key) !== -1) {
            return;
        }
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }-----------//weixin ： vip-v66666---------
            // Store value in our collection
            cache.push(value);
        }
        return value;
    }, space);
    cache = null;
    return json;
}

//object to Array
window.toArray = function (obj) {
    let array = [];
    if (obj === null || typeof obj !== 'object') {
        return array;
    }

    for (const key in obj) {
        const value = obj[key];
        array.push(value);
    }

    return array;
}

//只拷贝第一层
window.copy = function (obj) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    const copy = Array.isArray(obj) ? [] : {};
    Object.keys(obj).forEach(key => {
        copy[key] = obj[key];
    })

    return copy;
}

//Vuex源码中发现了一个深拷贝方法
window.deepCopy = function (obj, cache = []) {
    function find(list, f) {
        return list.filter(f)[0];
    }

    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj)
    if (hit) {
        return hit.copy;
    }

    const copy = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy
    });

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache);
    });

    return copy;
}*/

window.isNullOrEmpty = function (str) {
    if (str == null) {
        return true;
    }
    if (str == "") {
        return true;
    }
    let type = typeof (str);
    if (type != "string" && type != "number") {
        cc.error("isNullOrEmpty error type", str)
    }
    return false;
};

window.GameMaxOf = function (a, b) {
    if (a < b) return a; return b;
}

cc.Vec2.prototype.Perp = function () {
    return cc.v2(-this.y, this.x);
}

cc.Vec2.prototype.Sign = function (v2) {
    if (this.y * v2.x > this.x * v2.y) return -1;
    else return 1;
}

cc.Vec2.prototype.Truncate = function (max) {
    if (max <= 0) return cc.Vec2.ZERO;
    if (this.mag() > max) {
        return this.normalize().mul(max);
    } else {
        return this;
    }
}
/*
window.assign = function (dst, scr) {
    if (scr === null || typeof scr !== 'object') {
        return;
    }

    if (dst === null || typeof dst !== 'object') {
        return;
    }

    Object.keys(scr).forEach(key => {
        dst[key] = scr[key];
    })
}

window.costFormat = function (haveNum, needNum, color) {
    if (color == null) {
        //white
        color = "FFFFFF";
    }
    if (haveNum >= needNum) {
        return `<color=#${color}>${haveNum}/${needNum}</c>`;
    }

    return `<color=#FF0000>${haveNum}</c><color=#${color}>/${needNum}</c>`;
}

window.shortFormat = function (value) {
    if (value < 10000) {
        return value.toString();
    } else if (value < 100000000) {
        return (value / 10000).toFixed(1) + "万";
    } else {
        return (value / 100000000).toFixed(1) + "亿";
    }
}*/